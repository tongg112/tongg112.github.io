---
layout: post
title:  "windwos下powershell设置代理"
subtitle: ""
author: xtong
date:   2021-08-26 13:32:52 +0800
catalog: true
tags: [Windows]
header-img: "img/post-bg-node.png"
comments: true
---

## powershell
```shell
# 当前 shell 的代理
$env:HTTP_PROXY="http://127.0.0.1:7890"
```

## cmd
```shell
set http_proxy=http://127.0.0.1:1080
```

## 参考资料
- [powershell 设置代理](https://www.cnblogs.com/xch-jiang/p/14324636.html)
