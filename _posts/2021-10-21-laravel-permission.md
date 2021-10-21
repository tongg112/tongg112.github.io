---
layout: post
title:  "Laravel笔记：配置permission角色权限"
subtitle: ""
author: xtong
date:   2021-10-21 21:32:52 +0800
catalog: true
tags: [laravel, php]
header-img: "img/post-bg-node.png"
comments: true
---

## laravel-permission 安装

- php版本：7.4
- laravel版本：8.54

```shell
composer require spatie/laravel-permission
```
可以直接参考官方文档。

## 配置

### 1、发布配置文件

```shell
# 这条命令会在 config 下增加一个 permission.php 的配置文件
php artisan vendor:publish --provider="Spatie\Permission\PermissionServiceProvider"
```

### 2、注册 Autoloaded Service Providers

- config/app.php

```php
return [
    ...
    'providers' => [
        // ...
        Spatie\Permission\PermissionServiceProvider::class,
    ]
];
```

### 3、运行数据库迁移

```shell
php artisan migrate
```
这里的表结构都可以根据业务进行调整。  
比如，我们和前端 antd vue pro 框架对接，需要返回用户的菜单和权限，那么在 permission 表中，就可以增加【是否菜单：is_menu】字段，来区分菜单权限和普通权限。  

- 需要排序，就增加对应的排序字段；
- 需要图标icon，就增加对应储存icon的字段；
- 需要层级结构，就增加父级id的字段；
- ...

## 数据库初始化时创建权限

在 `database/seeders/DatabaseSeeder.php` 中的 `run()` 方法中，可以创建系统默认权限、角色和用户。


```php

use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

// 重置角色和权限的缓存
app()['cache']->forget('spatie.permission.cache');

// 创建权限（这里储存 xx.xxx.xx 的英文格式，多语言由前端实现）
// menu 创建菜单 和 权限
$user = Permission::create([
    'name' => 'menu.user.manage',
    'is_menu' => '1',
    'show' => '1',
    'parent_id' => '0',
    'parent_ids' => ',0,',
    'icon' => 'user',
    'sort' => '100',
    'component' => 'user/UserList',
    'path' => '/user/list'
]);
Permission::create([
    'name' => 'menu.user.manage^add',
    'parent_id' => $user->id,
    'parent_ids' => ',0,'.$user->id.',' // ",0,{$user->id}," 这种写法也可以，需要使用双引号
]);
Permission::create([
    'name' => 'menu.user.manage^list',
    'parent_id' => $user->id,
    'parent_ids' => ',0,'.$user->id.','
]);
Permission::create([
    'name' => 'menu.user.manage^info',
    'parent_id' => $user->id,
    'parent_ids' => ',0,'.$user->id.','
]);
Permission::create([
    'name' => 'menu.user.manage^edit',
    'parent_id' => $user->id,
    'parent_ids' => ',0,'.$user->id.','
]);
Permission::create([
    'name' => 'menu.user.manage^delete',
    'parent_id' => $user->id,
    'parent_ids' => ',0,'.$user->id.','
]);

// role 创建角色并赋予已创建的权限
$role = Role::create([
    'name' => 'super',
    'show_name' => 'superAdmin',
    'sort' => '1',
]);
$role->givePermissionTo(Permission::all());

// create admin 创建管理员，分配角色
$user = Users::create([
    'name' => 'admin',
    'display_name' => '系统管理员',
    'department_id' => $department->id,
    'password' => bcrypt(Constants::DEFAULT_PASSWORD),
]);
$user->assignRole('super');

```

## 资源路由使用 permission 中间件

> 此软件包附带 RoleMiddleware 和 PermissionMiddleware 中间件。 你可以将它们添加到你的 app/Http/Kernel.php 文件中。

```php
protected $routeMiddleware = [
    // ...
    'role' => \Spatie\Permission\Middlewares\RoleMiddleware::class,
    'permission' => \Spatie\Permission\Middlewares\PermissionMiddleware::class,
];
```

> 然后，你可以使用中间件规则保护你的路由：

```php
Route::group(['middleware' => ['role:super-admin']], function () {
    //
});

Route::group(['middleware' => ['permission:publish articles']], function () {
    //
});

Route::group(['middleware' => ['role:super-admin','permission:publish articles']], function () {
    //
});
```

但是，当路由使用 apiResources 时，对不同路由需要进行权限控制，我们不能直接在 Route 中使用中间件，因为不同的请求方式，我们需要验证不同的权限。（post验证有无【新增】权限，put和patch验证有无【编辑】权限，......）

```php
// 角色、部门、用户、字典
Route::apiResources([
    'roles' => \App\Http\Controllers\Api\v1\RoleController::class,
    'departments' => \App\Http\Controllers\Api\v1\DepartmentController::class,
    'users' => \App\Http\Controllers\Api\v1\UserController::class,
    'dictionaries' => \App\Http\Controllers\Api\v1\DictController::class,
]);
```

在 Laravue框架 的文档中，找到如下处理办法：

```php
# File: routes/api.php
// All api requests to categories need "manage category" permission
Route::apiResource('categories', 'CategoryController')->middleware('permission:manage category');
// Listing category will require "view category" or "manage category"
Route::get('categories', 'CategoryController@index')->name('categories.index')->middleware('permission:view category|manage category');
```

即 额外定义对应路由中间件。个人觉得这样虽然可以实现功能，但破坏了 route 的美感，相当于不使用 `apiResources`，手动定义了一遍全部的资源路由。

最后，研究中间件的时候，终于找到了一种我可以接受的解决方案：在 controller 中定义中间件。

```php
// 权限配置
public function __construct()
{
    // Middleware only applied to these methods
    $this->middleware('permission:publish articles', ['only' => [
        'update' // Could add bunch of more methods too
    ]]);
}
```


# 软件版本：laravel 8.54

# 参考资料
- [Laravel-permission 官方文档](https://docs.spatie.be/laravel-permission/v3/introduction/)
- [用户角色权限控制包 Laravel-permission 使用说明](https://learnku.com/articles/9842/user-role-permission-control-package-laravel-permission-usage-description#79863f)
- [Laravue 框架 官网文档](https://doc.laravue.dev/guide/development/work-with-permission.html#permissions-and-api-resources)
- [Laravel在控制器功能中添加中间件](https://ask.csdn.net/questions/794718)
- [Laravel中间件](https://laravel.com/docs/5.4/controllers#controller-middleware)
