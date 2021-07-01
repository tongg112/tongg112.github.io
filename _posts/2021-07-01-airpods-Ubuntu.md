---
layout: post
title:  "Airpods连接Ubuntu"
subtitle: ""
author: xtong
date:   2021-06-25 21:32:52 +0800
catalog: true
tags: [Ubuntu, Linux]
header-img: "img/post-bg-node.png"
comments: true
---

# Airpods 连接 Ubuntu

在 Ubuntu 20.04 上连接 Airpods 终于成功了，记录一下过程吧。
> Ubuntu系统版本：Ubuntu 20.04.1  
> AirPods型号： Airpods1（第二代）

- 编辑 `/etc/bluetooth/main.conf` 文件，设定`ControllerMode = bredr`
- 重启蓝牙 `sudo /etc/init.d/bluetooth restart`
- 在 Ubuntu 设置中找到蓝牙，搜索 Airpods 配对。

如果连接上了，但是没有声音。就按如下的操作。  
- 在 Ubuntu 设置中找到声音，设定声音输出设备为 AirPods。

如果还是不行，就把当前用户注销，再重新登录登进来。

连接成功之后可以再把那个设置加上`#`注释掉。

耳机和蓝牙鼠标都可以正常使用了。

# 参考资料
https://jixiaobai.club/airpods-connection-guide/
