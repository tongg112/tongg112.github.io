---
layout: post
title:  "Linux服务器增加swap分区"
subtitle: "centos操作过程记录"
author: xtong
date:   2021-07-08 21:32:52 +0800
catalog: true
tags: [Linux, swap, centos]
header-img: "img/post-bg-node.png"
comments: true
---
# 查看swap分区大小
`free -m`查看内存。
```shell
[root@localhost ~]# free -m
              total        used        free      shared  buff/cache   available
Mem:            972         149         392           6         430         654
Swap:             0           0           0
```
# 创建swap分区
创建2G大小的swap
```shell
# 2G = 2*1024*1024 = 2097152
dd if=/dev/zero of=/var/swap bs=1024 count=2097152
mkswap /var/swap
# chmod 0600 /var/swap
swapon /var/swap
vim /etc/fstab
```
```shell
# 添加一行
/var/swap            swap                 swap       defaults              0 0
```

# 运行结果
```
[root@localhost ~]# dd if=/dev/zero of=/var/swap bs=1024 count=2097152
记录了2097152+0 的读入
记录了2097152+0 的写出
2147483648字节(2.1 GB)已复制，9.82065 秒，219 MB/秒
[root@localhost ~]# mkswap /var/swap
正在设置交换空间版本 1，大小 = 2097148 KiB
无标签，UUID=bd890611-ddbe-4eaa-a4c2-3b7e7e2af347
[root@localhost ~]# swapon /var/swap
swapon: /var/swap：不安全的权限 0644，建议使用 0600。
[root@localhost ~]# chmod 0600 /var/swap
[root@localhost ~]# vim /etc/fstab
```
```shell

#
# /etc/fstab
# Created by anaconda on Thu Sep 14 11:27:20 2017
#
# Accessible filesystems, by reference, are maintained under '/dev/disk'
# See man pages fstab(5), findfs(8), mount(8) and/or blkid(8) for more info
#
/dev/sda1                        /                       ext4    defaults        1 1
/dev/sdb1               /data                   ext4    defaults        0 0
/var/swap            swap                 swap       defaults              0 0

```
```
[root@localhost ~]# free -m
              total        used        free      shared  buff/cache   available
Mem:            972         149          80           6         742         650
Swap:          2047           0        2047
```
