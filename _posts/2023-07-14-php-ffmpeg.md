---
layout: post
title:  "PHP脚本批量视频转码"
subtitle: "使用ffmpeg工具"
author: xtong
date:   2023-07-14 21:32:52 +0800
catalog: true
tags: [php]
header-img: "img/post-bg-node.png"
comments: true
---
有给视频转码的需求，但是视频很多，一个一个转太累，所以写一个脚本来转码。

又因为熟悉php，就直接写php脚本了。

# 1 准备工作

使用php，当然需要php环境了，还有转码的软件ffmpeg。

# 1.1 PHP运行环境下载

在php官网上下载php7.4的windows版：

https://www.php.net/releases/

> php-7.4.33-nts-Win32-vc15-x64.zip

# 1.2 ffmpeg下载

在ffmpeg官网下载最新的Windows版：

https://ffmpeg.org/download.html

> ffmpeg-master-latest-win64-gpl.zip


# 2 环境配置

- 将php-7.4.33-nts-Win32-vc15-x64.zip解压，并将 php-7.4.33-nts-Win32-vc15-x64 目录添加到环境变量 PATH中

在cmd 或 powershell 中 执行 php -v，显示

```
PHP 7.4.33 (cli) (built: Nov  2 2022 15:06:48) ( NTS Visual C++ 2017 x64 )
Copyright (c) The PHP Group
Zend Engine v3.4.0, Copyright (c) Zend Technologies
```

- 将ffmpeg-master-latest-win64-gpl.zip解压，并将 ffmpeg-master-latest-win64-gpl\bin 目录添加到环境变量PATH中

在 cmd 或 powershell 中执行 ffmpeg -version，显示
```
ffmpeg version N-110402-ge3143703e9-20230427 Copyright (c) 2000-2023 the FFmpeg developers
...
...
libpostproc    57.  2.100 / 57.  2.100
```

# 3 脚本编写

新建 run.php

```php
<?php
error_reporting(E_ALL);
ini_set('display_errors', 'On');
ini_set('memory_limit', '1024m');

// 原来的目录（当前目录）
$fileDir = '.';
// 新的目录
$fileOutput = '.' . DIRECTORY_SEPARATOR . 'Videos';


$mp4Files = [];


// 目录下是否有mp4
$files = scandir($fileDir);
foreach ($files as $file) {
    if ('mp4' === strtolower(pathinfo($file, PATHINFO_EXTENSION))) {
        $mp4Files[] = $fileDir . DIRECTORY_SEPARATOR . $file;
    }
}

$videoCount = count($mp4Files);

foreach ($mp4Files as $i => $mp4) {
    $outPath = $fileOutput . DIRECTORY_SEPARATOR . substr($mp4, 2);
    $cmd = "ffmpeg -i $mp4 -b:v 1M $outPath -loglevel quiet";
    echo 'current:' . ($i + 1) . '/ total: ' . $videoCount . PHP_EOL;
    echo "Starting ffmpeg...\n\n";
    echo shell_exec($cmd);
    echo "Done.\n";
}

?>
```

# 4 执行脚本

进入脚本存放的目录（转码视频目录）
在 cmd 或 powershell 中直接执行

```
php run.php
```

- 核心内容就是：使用php的 `shell_exec` 直接执行拼接好的命令。

# 参考链接
- [php官网](https://php.net)
- [ffmpeg官方文档](https://ffmpeg.org/ffmpeg.html)
