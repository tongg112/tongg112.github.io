---
layout: post
title:  "Linux常用命令"
subtitle: "《Linux就该这么学》"
author: xtong
date:   2021-07-15 21:42:52 +0800
catalog: true
tags: [Linux, 阅读, 笔记]
header-img: "img/post-bg-miui6.jpg"
comments: true
---
# Linux常用基本命令
> Shell就是终端程序的统称，它担当起了人与内核（硬件）之间的翻译工作，用户把一些命令“告诉”终端程序，它就会调用相应的程序服务去完成某些工作。现在包括红帽系统在内的许多主流Linux系统默认使用的终端是Bash（Bourne-Again SHell）解释器。

Linux命令的参数长格式与短格式示例

| 长格式     | 短格式 |
| ---------- | ------ |
| man --help | man -h |

## man
```shell
man man
```
## 快捷键
- ctrl+c：停止脚本
- ctrl+d：退出终端
- ctrl+l：清屏
- ctrl+shift+c：Ubuntu终端中复制选中文本
- ctrl+shift+v：Ubuntu终端中粘贴文本

## echo
echo  [字符串] [$变量]  
```shell
echo xtongs.com $SHELL
```
显示
```
xtongs.com /bin/bash
```
## date
date [+指定的格式]  
在打包文件时常常用到。
```shell
date "+%Y-%m-%d %H:%M:%S"
```
显示
```
2021-07-15 21:12:17
```
## 关机与重启
```
poweroff
reboot
```
## wget
> wget命令用于在终端命令行里下载网络文件，英文全称为：“web get”，语法格式为：“wget [参数] 网址”。

## ps 和 pstree
> ps命令用于查看系统中的进程状态，英文全称为：“processes”，语法格式为：“ps [参数]”。

```shell
# 下面三条命令是一样的，ps命令允许省略`-`
ps aux
ps -aux
ps -a -u -x
```
> pstree命令用于以树状图的形式展示进程之间的关系，英文全称为：“process tree”，输入后回车执行即可。

```shell
pstree
```
显示
```
systemd─┬─ModemManager───2*[{ModemManager}]
        ├─NetworkManager───2*[{NetworkManager}]
        ├─accounts-daemon───2*[{accounts-daemon}]
        ├─acpid
        ├─avahi-daemon───avahi-daemon
        ├─bluetoothd
        ├─boltd───2*[{boltd}]
        ├─colord───2*[{colord}]
...省略...
```
## top
> top命令用于动态地监视进程活动及系统负载等信息，输入后回车执行即可。

## pidof
> pidof命令用于查询某个指定服务进程的PID号码值，语法格式为：“pidof [参数] 服务名称”。

```shell
pidof systemd
3816
```
## kill
> kill命令用于终止某个指定PID值的服务进程，语法格式为：“kill [参数] 进程的PID”。  
> 但也有时候会提示进程无法被终止，则可以加参数-9，代表最高级别的强制杀死进程

## ifconfig
> ifconfig命令用于获取网卡配置与网络状态等信息，英文全称为：“interface config”，语法格式为：“ifconfig [参数] [网络设备]”。

## uname
> uname命令用于查看系统内核版本与系统架构等信息，英文全称为：“Unix name”，语法格式为：“uname [-a]”。

```
xtong@xtong-TM1704:~$ uname -a
Linux xtong-TM1704 5.8.0-59-generic #66~20.04.1-Ubuntu SMP Thu Jun 17 11:14:10 UTC 2021 x86_64 x86_64 x86_64 GNU/Linux
```
## uptime
> 它可以显示当前系统时间、系统已运行时间、启用终端数量以及平均负载值等信息。平均负载值指的是系统在最近1分钟、5分钟、15分钟内的压力情况，负载值越低越好

```
xtong@xtong-TM1704:~$ uptime
 21:48:50 up 6 days, 15:31,  1 user,  load average: 0.79, 0.83, 0.72
```
## free
> free命令用于显示当前系统中内存的使用量信息，语法格式为：“free [-h]”。

```
xtong@xtong-TM1704:~$ free -m
              总计         已用        空闲      共享    缓冲/缓存    可用
内存：        7869        4126         839         906        2903        2544
交换：        8191         834        7357
xtong@xtong-TM1704:~$ free -h
              总计         已用        空闲      共享    缓冲/缓存    可用
内存：       7.7Gi       4.0Gi       844Mi       899Mi       2.8Gi       2.5Gi
交换：       8.0Gi       834Mi       7.2Gi
```

## who
> who命令用于查看当前登入主机的用户终端信息，输入后回车执行即可。

## last
调取主机的被访记录。

## tracepath
> tracepath命令用于显示数据包达到目的主机途中所经过的路由信息，语法格式为：“tracepath [参数] 域名”。

## netstat
> netstat命令用于显示如网络连接、路由表、接口状态等的网络相关信息，英文全称为：“network status”，语法格式为：“netstat [参数]”。

## history
> history命令用于显示执行过的命令历史，语法格式为：“history [-c]”。

## pwd
> pwd命令用于显示用户当前所处的工作目录，英文全称为：“print working directory”，输入后回车执行即可。

# 其他常用命令
- 查看硬件信息相关命令（8个）
```
ifconfig free fdisk ethtool mii-tool dmidecode dmesg lspci
```
- 其他
```
echo printf rpm yum watch alias unalias date clear
history eject time nohup nc xargs exec export unset type
```
- 系统性能监视高级命令(12个)
```
uptime top free vmstat mpstat iostat sar chkconfig
```
- 内存
```
top free vmstat mpstat iostat sar
```
- CPU
```
top vmstat mpstat iostat sar
```
- I/O
```
vmstat mpstat iostat sar
```
- 进程
```
ipcs ipcrm lsof strace lstrace
```
- 负载
```
uptime mount umount df du fsck dd dumpe2fs dump
```
- 关机和查看系统信息的命令（3个）
```
shutdown halt init
```
- 系统管理相关命令（8个）
```
uptime top free vmstat mpstat iostat sar chkconfig
```
- 系统安全相关命令（10个）
```
chmod chown chgrp chage passwd su sudo umask chattr
```

# 参考资料
文章：<a href="https://www.linuxprobe.com/linux-command-skill.html" target="_blank" >《实用技能：60个常用的Linux命令》</a>    

---
图书：《Linux就该这么学》  
<img class="shadow" src="/img/in-post/post-linux/post-linux.png" >  

---

地址：https://book.douban.com/subject/27198046/  
在线阅读：https://www.linuxprobe.com/basic-learning-00.html  
PDF在线阅读：https://www.linuxprobe.com/docs/LinuxProbe.pdf
