---
layout: post
title:  "Docker 安装 SQLserver"
subtitle: "CentOS 下安装 SQLserver2017 并导入 bak 备份"
author: xtong
date:   2022-10-09 21:32:52 +0800
catalog: true
tags: [SQLserver, 数据库, 服务器, linux, docker]
header-img: "img/post-bg-node.png"
comments: true
---
在 Linux 服务器上安装运行 SQLserver2017，并导入 bak 格式备份。

# CentOS 安装 docker

使用官方脚本自动安装

```shell
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
```

启动服务

```shell
service docker start
```

# docker 安装 SQLserver2017

从 Microsoft 容器注册表中请求 SQL Server 2017 (14.x) Linux 容器映像。

```shell
docker pull mcr.microsoft.com/mssql/server:2017-latest
```

查看镜像

```shell
docker images
```

运行容器

```shell
# 示例
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<YourStrong@Passw0rd>" `
   -p 1433:1433 --name sql1 --hostname sql1 `
   -d `
   mcr.microsoft.com/mssql/server:2017-latest

# 密码应符合 SQL Server 默认密码策略，否则容器无法设置 SQL Server，将停止工作。 默认情况下，密码必须为至少八个字符且包含以下四种字符中的三种：大写字母、小写字母、十进制数字、符号。   
```

可以不使用后台运行，使用screen，只在用的时候打开它。

```shell
screen -S mssql

vim mssql.sh

```

编写脚本
```shell
#!/bin/bash
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<密码>" -p <端口号>:1433 --name sql1 --hostname sql1 mcr.microsoft.com/mssql/server:2017-latest
# 密码必须为至少八个字符且包含以下四种字符中的三种：大写字母、小写字母、十进制数字、符号。  
```

给予执行权限

```
chmod +x mssql.sh

./mssql.sh

ctrl + a, ctrl + d
```

关闭 SQLserver

```
screen -r mssql

ctrl + c, ctrl + a, ctrl + d

或者直接 ctrl + c, ctrl + d
```

# 连接到 SQLserver

```
docker exec -it sql1 "bash"

/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "<密码>"
# 或者
/opt/mssql-tools/bin/sqlcmd -S localhost -U SA
```
# 创建数据库

```sql
CREATE DATABASE TestDB;
SELECT Name from sys.databases;
GO
```

# 还原 bak

- [Navicat导入SqlServer备份的bak文件(超详细)](https://blog.csdn.net/u010667011/article/details/118569150)

# 服务器

- CentOS 7.6 2c4g

# 参考资料
- [快速入门：使用 Docker 运行 SQL Server Linux 容器映像](https://learn.microsoft.com/zh-cn/sql/linux/quickstart-install-connect-docker?view=sql-server-2017&pivots=cs1-cmd)
- [Navicat导入SqlServer备份的bak文件(超详细)](https://blog.csdn.net/u010667011/article/details/118569150)
