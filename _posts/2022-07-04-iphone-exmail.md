---
layout: post
title:  "在 iPhone 系统邮箱中添加腾讯企业邮箱账号"
subtitle: "使用苹果手机默认邮箱应用收发腾讯企业邮箱邮件"
author: xtong
date:   2022-07-04 23:32:52 +0800
catalog: true
tags: [iPhone]
header-img: "img/post-bg-node.png"
comments: true
---
# 1 在 iPhone 上如何添加邮箱账号

iPhone 在系统 ios15 及 ios16 上，添加邮箱账号，需要在系统设置中，找到邮件；

<img class="shadow" src="/img/in-post/post-iphone/iphone-1.jpeg" >

进入后选择账户 => 添加账户

<img class="shadow" src="/img/in-post/post-iphone/iphone-2.jpeg" >

选择【其他】，开始新增邮箱

<img class="shadow" src="/img/in-post/post-iphone/iphone-3.png" >


# 2 腾讯企业邮箱的收发信服务器配置

输入自己的企业邮箱地址，可以是自定义邮箱地址，也可以是`exmail.qq.com`的地址。

<img class="shadow" src="/img/in-post/post-iphone/iphone-4.png" >

选择 IMAP 类型，分别填写收件服务器和发件服务器的主机名，同时填写自己邮箱地址和密码。

<img class="shadow" src="/img/in-post/post-iphone/iphone-5.png" >

保存就可以在邮箱应用中收发邮件了。

可以在【高级】中，打开SSL。采用SSL方式时，**如果使用POP协议，使用SSL，端口号为995，如果是IMAP协议，使用SSL，端口号为993。** 这里使用 iPhone 默认端口设置即可，不用手动修改。



# 3 腾讯 imap 与 pop 配置参考

## 3.1 IMAP

**收信服务器**：imap.exmail.qq.com

**用户名**：填写完整邮箱地址

**密码**：填写帐号密码



**发信服务器**：smtp.exmail.qq.com

**用户名**：填写完整邮箱地址

**密码**：填写帐号密码

海外用户可使用以下服务器

接收邮件服务器：hwimap.exmail.qq.com

发送邮件服务器：hwsmtp.exmail.qq.com

## 3.2 POP

**收信服务器**：pop.exmail.qq.com

**用户名**：填写完整邮箱地址

**密码**：填写帐号密码



**发信服务器**：smtp.exmail.qq.com

**用户名**：填写完整邮箱地址

**密码**：填写帐号密码


海外用户可使用以下服务器

接收邮件服务器：hwpop.exmail.qq.com

发送邮件服务器：hwsmtp.exmail.qq.com

# 参考资料
- [群晖NAS使用Docker安装配置frpc内网穿透教程](https://service.exmail.qq.com/cgi-bin/help?subtype=1&id=28&no=1000583)
