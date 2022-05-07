---
layout: post
title:  "Laravel笔记：生成 UUID"
subtitle: ""
author: xtong
date:   2021-09-24 13:32:52 +0800
catalog: true
tags: [laravel, php]
header-img: "img/post-bg-laravel.png"
comments: true
---

## 生成 UUID

- 使用 Str 类提供的方法。

```php
use Illuminate\Support\Str;

Str::orderedUuid()->toString();
```
如果不要UUID中间的横杠，加上 getHex 就可以了。  

```php
Str::orderedUuid()->getHex()->toString();
```

## 软件版本：laravel 8.54

## 参考资料
- [Laravel UUID generation](https://stackoverflow.com/questions/37948764/laravel-uuid-generation)
