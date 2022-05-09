---
layout: post
title:  "饥荒联机版游戏服务器搭建"
subtitle: "多人存档从windows迁移到centos服务器"
author: xtong
date:   2021-07-04 23:50:00 +0800
catalog: true
tags: [游戏, 饥荒, centos]
header-img: "img/post-bg-dst.jpg"
comments: true
---

# 背景故事
和朋友一起玩饥荒是非常快乐的事情。在和朋友在开新档时总说：“这个是长期档，咱们好好玩”，然而总是“半途而废”。  
饥荒弃坑已经很久了，前一阵儿和朋友偶然说玩一玩饥荒，我们离开的时间里klei一直勤奋地更新着，攒了好大一波对我们来说的“新内容”，可以一次体验个够了。而我们又发现了一些有趣的mod，比如《神话书说》、《棱镜》，这下料就更足了。  
我用windows在游戏内，开mod，创建存档，断断续续玩了差不多200天（饥荒游戏内的日历）。最近工作上开始忙了，不能稳定地创建服务器，所以想把这个存档迁移到云服务器上，这样就方便多了。
# 存档迁移

## 本地准备工作

### 找到存档
既然是迁移存档，首先要找到存档的位置。
windows的饥荒联机版存档位置一般在这个目录，（`87037553`这个可能是用来区分不同steam账户的）
```
C:\Users\{用户名}\Documents\Klei\DoNotStarveTogether\87037553\Cluster_1
```
<img class="shadow" src="/img/in-post/post-dst-server/save.png" >

### 创建并下载服务端配置
登录klei账号：https://accounts.klei.com/account/game/list  
使用steam登录，登录后选择【《饥荒：联机版》的游戏服务器】按钮  
（https://accounts.klei.com/account/game/servers?game=DontStarveTogether）
添加新服务器，填写好服务器配置后，点击【下载设置】按钮，得到一个压缩文件`MyDediServer.zip`。
### 解压空白存档，将其替换成要迁移的存档
解压`MyDediServer.zip`后，把我们的存档替换进来：
- 删除 MyDediServer 下的 Master 和 Caves 文件夹；
- 将我们需要迁移的存档 Cluster 目录下的 Master 和 Caves 文件夹拷贝到 MyDediServer目录里。

## 服务器准备工作

### 环境安装
登录云服务器，执行
```shell
yum install -y libstdc++6:i386 libgcc1:i386 libcurl4-gnutls-dev:i386 screen
```
### 安装steamcmd
```shell
mkdir ~/steamcmd && cd ~/steamcmd
wget "https://steamcdn-a.akamaihd.net/client/installer/steamcmd_linux.tar.gz"
tar -zxvf steamcmd_linux.tar.gz
```
### 创建游戏存档目录
```shell
mkdir -p ~/.klei/DoNotStarveTogether
```
### 上传空白存档
把之前得到的`MyDediServer.zip`,上传到`~/.klei/DoNotStarveTogether`并解压。
```shell
# 空白存档的位置
~/.klei/DoNotStarveTogether/MyDediServer
```
## 开始迁移

### 启动脚本上传至云服务器
上传或者创建以下脚本到云服务器的当前用户目录（~/）：
下载地址：https://accounts.klei.com/assets/gamesetup/linux/run_dedicated_servers.sh  
```shell
#!/bin/bash

steamcmd_dir="$HOME/steamcmd"
install_dir="$HOME/dontstarvetogether_dedicated_server"
cluster_name="MyDediServer"
dontstarve_dir="$HOME/.klei/DoNotStarveTogether"

function fail()
{
	echo Error: "$@" >&2
	exit 1
}

function check_for_file()
{
	if [ ! -e "$1" ]; then
		fail "Missing file: $1"
	fi
}

cd "$steamcmd_dir" || fail "Missing $steamcmd_dir directory!"

check_for_file "steamcmd.sh"
check_for_file "$dontstarve_dir/$cluster_name/cluster.ini"
check_for_file "$dontstarve_dir/$cluster_name/cluster_token.txt"
check_for_file "$dontstarve_dir/$cluster_name/Master/server.ini"
check_for_file "$dontstarve_dir/$cluster_name/Caves/server.ini"

./steamcmd.sh +force_install_dir "$install_dir" +login anonymous +app_update 343050 validate +quit

check_for_file "$install_dir/bin"

cd "$install_dir/bin" || fail

run_shared=(./dontstarve_dedicated_server_nullrenderer)
run_shared+=(-console)
run_shared+=(-cluster "$cluster_name")
run_shared+=(-monitor_parent_process $$)

"${run_shared[@]}" -shard Caves  | sed 's/^/Caves:  /' &
"${run_shared[@]}" -shard Master | sed 's/^/Master: /'
```
### 赋予脚本可执行权限
```shell
chmod u+x run_dedicated_servers.sh
```
### 执行脚本启动服务
```shell
screen
./run_dedicated_servers.sh

```
执行成功后，服务器上会生成一些目录，Ctrl+c停止脚本，进行后续操作。
- 生成的`~/dontstarvetogether_dedicated_serve`可以存放稍后上传mod
- 生成的`~/.klei/DoNotStarveTogether`用来存放存档

### 上传需要迁移的游戏存档
将准备好的 MyDediServer 文件夹，上传到`~/.klei/DoNotStarveTogether`下。
```shell
# 存档上传后的路径：
~/.klei/DoNotStarveTogether/MyDediServer
```

### 上传游戏mod
windows本地饥荒游戏mod一般在  
```
{steam安装目录}\Steam\steamapps\common\Don't Starve Together\mods
# 比如
D:\Program Files (x86)\Steam\steamapps\common\Don't Starve Together\mods
```
将这个mods文件夹里的文件上传到服务器下面的目录中
```
~/dontstarvetogether_dedicated_server/mods
```
对于《神话书说》《棱镜》等mod，并没有在上面的mods目录中，需要在这个目录下找
```
{steam安装目录}\Steam\steamapps\workshop\content\322330
# 比如
D:\Program Files (x86)\Steam\steamapps\workshop\content\322330
```
找到对应的mod，并上传到服务器`~/dontstarvetogether_dedicated_server/mods`中。  
注意，需要将这些mod的文件夹命名为`workshop-{mod ID}`的格式。  
比如`workshop-727774324`。


# 其他注意
## 报`libcurl-gnutls.so.4`找不到的错误
```
./dontstarve_dedicated_server_nullrenderer: error while loading shared libraries: libcurl-gnutls.so.4: cannot open shared object file: No such file or directory]
```
解决办法：
```
# 给steamcmd创建软连接
ln -s /usr/lib64/libcurl.so.4 ~/steamcmd/linux32/libcurl-gnutls.so.4
ln -s /usr/lib64/libcurl.so.4 ~/steamcmd/linux64/libcurl-gnutls.so.4
```
```
# 注意查看 /usr/lib64 下是否存在 libcurl.so.4
# 如果不存在，查看有没有 libcurl.so.4.XX，有的话创建一个软连接
ln -s /usr/lib64/libcurl.so.4 /usr/lib64/libcurl.so.4.3.0
```

## 报`ld-linux.so.2`找不到的错误
安装ld-linux.so.2：
```
yum install ld-linux.so.2
```
# 参考资料


- [Dedicated Server Quick Setup Guide - Linux](https://forums.kleientertainment.com/forums/topic/64441-dedicated-server-quick-setup-guide-linux/  )
- [Dedicated Server Quick Setup Guide - Windows](https://forums.kleientertainment.com/forums/topic/64212-dedicated-server-quick-setup-guide-windows/)
