---
layout: post
title:  "Laravel笔记：配置jwt登陆"
subtitle: ""
author: xtong
date:   2021-10-20 21:32:52 +0800
catalog: true
tags: [laravel, php, jwt]
header-img: "img/post-bg-node.png"
comments: true
---

## jwt安装

- php版本：7.4
- laravel版本：8.54

```shell
composer require tymon/jwt-auth
```
## jwt配置

### 1、发布配置文件

```shell
# 这条命令会在 config 下增加一个 jwt.php 的配置文件
php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
```

### 2、生成加密密钥

```shell
# 这条命令会在 .env 文件下生成一个加密密钥，如：JWT_SECRET=foobar
php artisan jwt:secret
```

### 3、更新你的模型

如果你使用默认的 User 表来生成 token，你需要在该模型下增加一段代码：

```php
# 原来的 User
<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    // ... code ...
}

## 增加的代码
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    // ... code ...

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
}

```

### 4、注册两个 Facade

这两个 Facade 并不是必须的，但是使用它们会给你的代码编写带来一点便利。

- config/app.php

```php
<?php

return [
    ...
    'aliases' => [
            ...
            // 添加以下两行
            'JWTAuth' => 'Tymon\JWTAuth\Facades\JWTAuth',
            'JWTFactory' => 'Tymon\JWTAuth\Facades\JWTFactory',
    ],
]
```

### 5、修改 auth.php

- config/auth.php

```php
<?php

return [
    // 开发接口，设置默认 guard 为 api
    'defaults' => [
        'guard' => 'api',
        'passwords' => 'users',
    ],
    'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'users',
        ],
        // 这里增加 guard api 并设置验证使用 jwt
        'api' => [
            'driver' => 'jwt',
            'provider' => 'users',
        ],
    ],
    'providers' => [
        'users' => [
            'driver' => 'eloquent',
            'model' => \App\Models\User::class,
        ],

        // 'users' => [
        //     'driver' => 'database',
        //     'table' => 'users',
        // ],
    ],
    ...
  ]

```
### 6、创建 token 控制器

```shell
php artisan make:controller Api/v1/AuthController
```

```php
<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use Tymon\JWTAuth\Facades\JWTAuth;

/**
 * @group auth 登陆相关接口
 *
 * <aside class="warning">用户登陆</aside>
 */
class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     * 要求附带 name 和 password（数据来源users表）
     *
     * @return void
     */
    public function __construct()
    {
        // 这里额外注意了：官方文档样例中只除外了『login』
        // 这样的结果是，token 只能在有效期以内进行刷新，过期无法刷新
        // 如果把 refresh 也放进去，token 即使过期但仍在刷新期以内也可刷新
        // 不过刷新一次作废
        $this->middleware('auth:api', ['except' => ['login', 'logout']]);
        // 另外关于上面的中间件，官方文档写的是『auth:api』
        // 但是我推荐用 『jwt.auth』，效果是一样的，但是有更加丰富的报错信息返回
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);

        if (! $token = auth('api')->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60
        ]);
    }

    ...
}

```

### 7、注册路由



- routes/api.php

```php
<?php

Route::group([
    'prefix' => 'auth'
], function ($router) {

    Route::post('login', [\App\Http\Controllers\Api\v1\AuthController::class, 'login']);
    ...
});
```

## 实现 jwt token 过期时间动态设置（记住我）

jwt token 的过期时间在 config/jwt.php 中可以配置，默认1小时。

而实际项目中，前端登陆时有【记住我】这个功能，勾选后需要过期时间设置为7天。最终找到解决办法如下：

- App\Http\Controllers\Api\v1\AuthController::login

```
/**
 * login 用户登录
 *
 * Get a JWT via given credentials.
 * @bodyParam name string required 用户名。
 * @bodyParam password string required 密码（不用加密）。
 * @bodyParam remember bool 记住我（自动登录）。
 *
 * @return \Illuminate\Http\JsonResponse
 */
public function login()
{
    $credentials = request(['name', 'password']);

    if (request(['remember'])) {
        JWTAuth::factory()->setTTL(60 * 24 * 7);
    }

    $token = JWTAuth::attempt($credentials);

    if (! $token) {
        return response()->json(['error' => 'Unauthorized'], 401);
    }

    return $this->respondWithToken($token);
}
```

## 软件版本：laravel 8.54

## 参考资料
- [JWT 完整使用详解](https://learnku.com/articles/10885/full-use-of-jwt)
- [Set expiry time for laravel jwt dynamically](https://stackoverflow.com/questions/41141063/set-expiry-time-for-laravel-jwt-dynamically)
