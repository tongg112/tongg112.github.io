---
layout: post
title:  "Laravel笔记：日志打印"
subtitle: "API业务打印事务中的异常"
author: xtong
date:   2022-03-28 19:32:52 +0800
catalog: true
tags: [laravel, php]
header-img: "img/post-bg-node.png"
comments: true
---

## 错误打印

- php版本：7.4 / 8.0
- laravel版本：8.54

```php

\Illuminate\Support\Facades\Log::error($e);

```

在业务场景中使用

```
DB::beginTransaction();
try {
    // do sth.

    DB::commit();
} catch (\Exception $e){
    DB::rollBack();
    // 打印错误信息（可以字符串拼接）
    \Illuminate\Support\Facades\Log::error('Err-010101：数据库事务异常：' . $e);
    return $this->err(Errors::DB_ROLLBACK);
}
```        

可以打印
```php
use Illuminate\Support\Facades\Log;

Log::emergency($message);
Log::alert($message);
Log::critical($message);
Log::error($message);
Log::warning($message);
Log::notice($message);
Log::info($message);
Log::debug($message);
```
参考官方文档。



# 软件版本：laravel 8.54

# 参考资料
- [Laravel 官方文档](https://laravel.com/docs/9.x/logging#logging-deprecation-warnings)
