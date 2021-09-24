---
layout: post
title:  "Laravel笔记：使用软删除"
subtitle: ""
author: xtong
date:   2021-09-23 13:32:52 +0800
catalog: true
tags: [laravel, php]
header-img: "img/post-bg-node.png"
comments: true
---

## 软删除 softdelete

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


## 参考资料
- [Laravel 8 中文文档 软删除](https://learnku.com/docs/laravel/8.x/eloquent/9406#soft-deleting)
