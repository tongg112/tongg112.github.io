---
layout: post
title:  "Laravel笔记：常用命令行"
subtitle: ""
author: xtong
date:   2021-10-18 22:32:52 +0800
catalog: true
tags: [laravel, php]
header-img: "img/post-bg-node.png"
comments: true
---

## 生成接口文档

如果使用了 knuckleswtf/scribe 来生成 api文档

```
php artisan scribe:generate
```

## 数据库数据初始化

重新加载数据库

```
php artisan scribe:generate
```

## 生成 model

```
php artisan make:model Roles
```

## 生成 controller

```
php artisan make:controller Api/v1/RoleController --api
```

## 生成 Request

```
php artisan make:request CarStoreRequest
php artisan make:request CarQueryRequest

php artisan make:request DepartmentStoreRequest
php artisan make:request DepartmentQueryRequest

php artisan make:request UserStoreRequest
```

## 生成中间件

```
php artisan make:middleware SetPageSize
php artisan make:middleware SetSort
```


## 软件版本：laravel 8.54

## 参考资料
- [Laravel 8 中文文档](https://learnku.com/docs/laravel/8.x)
- [scribe 文档](https://scribe.knuckles.wtf/laravel/)
