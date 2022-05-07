---
layout: post
title:  "Laravel笔记：如何启用软删除"
subtitle: ""
author: xtong
date:   2021-09-23 13:32:52 +0800
catalog: true
tags: [laravel, php]
header-img: "img/post-bg-laravel.png"
comments: true
---
## 什么是软删除
软删除就是逻辑删除，并非将数据从数据库中真正的删除掉，即在 sql 中体现为用 update 语句替代 delete 语句，更新删除标记字典来实现。  
在实际业务中，很多“删除”的数据，并不是永远不再需要的数据。我们仍然会有关联查询已删除数据的场景，这里就需要引入软删除（标记删除）来避免数据真正被删除而无法关联查询的情况。比如，企业中的用户（用户表中）被删除后，该用户在系统中产生的数据一般会包含其姓名等信息，这些信息可通过软删除查询很方便地被查询到，当然，信息冗余储存也是一种办法，但会带来数据更新的业务复杂度增加，相比之下，软删除的引入更简洁直观。

## laravel开启软删除

- laravel 框架中自带软删除支持，需要手动开启

- 数据库表中增加字段 `deleted_at`，可以使用数据库迁移的方式增加，也可以手动创建。

```php
public function up()
{
    Schema::table('asset_info', function (Blueprint $table) {
        $table->softDeletes();
    });
}

public function down()
{
    Schema::table('asset_info', function (Blueprint $table) {
        $table->dropSoftDeletes();
    });
}

```


- 在 model 文件中，引入 SoftDeletes

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AssetInfo extends Model
{
    use HasFactory;
    use SoftDeletes;

    /**
     * 与模型关联的表名
     *
     * @var string
     */
    protected $table = 'asset_info';
}
```

## 软件版本：laravel 8.54

## 参考资料
- [Laravel 8 中文文档 软删除](https://learnku.com/docs/laravel/8.x/eloquent/9406#soft-deleting)
