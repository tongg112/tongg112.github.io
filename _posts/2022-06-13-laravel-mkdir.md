---
layout: post
title:  "Laravel笔记：创建文件夹"
subtitle: ""
author: xtong
date:   2022-06-13 13:32:52 +0800
catalog: true
tags: [laravel, php]
header-img: "img/post-bg-laravel.png"
comments: true
---

## 创建文件夹

- 可以使用 php 的 mkdir 直接创建文件夹

```php

// mkdir(
//     string $pathname,
//     int $mode = 0777,
//     bool $recursive = false,
//     resource $context = ?
// ): bool
mkdir("/path/to/my/dir", 0700);

# 目录已存在时，产生 E_WARNING错误。

# 如果因为权限问题无法创建目录，导致 E_WARNING错误。
```

- 使用 laravel 框架中提供的方法

```php
use Illuminate\Support\Facades\Storage;

if (!Storage::exists("/export")) {
	Storage::makeDirectory("/export");
}
```
export 目录会创建在 `项目目录/storage/app/` 下。

如果要下载这个目录下的文件，可以使用 laravel 提供的 `storage_path()` 函数。

这里 `storage_path` 参数路径，默认是 `storage` 下，需要加上 `./app` 这层路径

```php
return response()->download(storage_path("./app/export/{$filename}.xlsx"));
```

## 软件版本：laravel 8.54

## 参考资料
- [Laravel filesystem directories](https://learnku.com/docs/laravel/5.7/filesystem/2281#directories)
