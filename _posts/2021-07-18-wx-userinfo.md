---
layout: post
title:  "微信小程序getUserProfile报错解决"
subtitle: "wx.getUserProfile is not a function"
author: xtong
date:   2021-07-18 22:45:00 +0800
catalog: true
tags: [微信小程序, 前端, 笔记]
header-img: "img/post-bg-universe.jpg"
comments: true
---
# 背景
我三年前做了一个微信小程序【今天喝水了么】（喝了么），用来记录自己每天喝8杯水。今天突然想看看我的小程序账号怎么样了，于是登陆微信小程序后台，发现我的小程序应用版本是0.0.3。但还有一个未提交审核的0.0.4版本，这个版本新功能就一个：允许将小程序分享给好友。  

当时为什么不提交这个版本并发布呢？我想不起来了，就干脆现在提交发布吧。不一会儿，微信通知小程序审核通过，我就到后台发布了这个版本。  

打开小程序，发现分享功能的确有了，但是用户昵称和头像却获取不到了。这是怎么回事呢？

在微信开发者工具中一切却都正常，清理缓存后也可以获取到用户头像和昵称。开启真机调试却不能获取到用户头像昵称，只会获取到一个头像【默认图片】和一个昵称【微信用户】。真的很奇怪，两个版本代码的区别只有允许分享这一行代码啊。  
```js
wx.showShareMenu();
```
网上搜索了一下，原来是微信对小程序获取用户信息接口进行了调整：  

> ## 小程序登录、用户信息相关接口调整说明官方
>
> 微信团队*02-24*
>
> > 公告更新时间：2021年04月15日
>
> 考虑到近期开发者对小程序登录、用户信息相关接口调整的相关反馈，为优化开发者调整接口的体验，回收wx.getUserInfo接口可获取用户授权的个人信息能力的截止时间由2021年4月13日调整至2021年4月28日24时。
>
> 为﻿优化用户的使用体验，平台将进行以下调整：
>
> 1. 2021年2月23日起，若小程序已在微信开放平台进行绑定，则通过wx.login接口获取的登录凭证可直接换取unionID
> 2. 2021年4月28日24时后发布的小程序新版本，无法通过wx.getUserInfo与`<button open-type="getUserInfo"/>`获取用户个人信息（头像、昵称、性别与地区），将直接获取匿名数据（包括userInfo与encryptedData中的用户个人信息），获取加密后的openID与unionID数据的能力不做调整。此前发布的小程序版本不受影响，但如果要进行版本更新则需要进行适配。
> 3. 新增getUserProfile接口（基础库2.10.4版本开始支持），可获取用户头像、昵称、性别及地区信息，开发者每次通过该接口获取用户个人信息均需用户确认。具体接口文档：[《getUserProfile接口文档》](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/user-info/wx.getUserProfile.html)
> 4. 由于getUserProfile接口从2.10.4版本基础库开始支持（覆盖微信7.0.9以上版本），考虑到开发者在低版本中有获取用户头像昵称的诉求，对于未支持getUserProfile的情况下，开发者可继续使用getUserInfo能力。开发者可参考[getUserProfile接口文档中的示例代码](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/user-info/wx.getUserProfile.html#示例代码)进行适配。
>
> **请使用了wx.getUserInfo接口或`<button open-type="getUserInfo"/>`的开发者尽快适配。**[开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/nightly.html)[1.05.2103022版本](https://developers.weixin.qq.com/miniprogram/dev/devtools/nightly.html)开始支持getUserProfile接口调试，开发者可下载该版本进行改造。
>
> 小游戏不受本次调整影响。  
>
> ...(略)...  
>
> **回收wx.getUserInfo接口可获取用户个人信息能力**
> 4月28日24时后发布的新版本小程序，开发者调用wx.getUserInfo或`<button open-type="getUserInfo"/>`将不再弹出弹窗，**直接返回匿名的用户个人信息**，获取加密后的openID、unionID数据的能力不做调整。

# 修改代码
按照官方API文档的示例代码，对自己的小程序代码进行了修改，结果报错
```
wx.getUserProfile is not a function; [Component] Event Handler Error @ pages/index/index#bound getUserProfile
```

# 解决问题
看到在《getUserInfo和getUserProfile 对比》文中提到的使用`getUserProfile`两个前提条件：
> 1.开发者工具版本不低于 1.05.2103022  
> 2.基础库版本不低于 2.10.4

这才恍然大悟，原来官方在《微信官方文档-API-wx.getUserProfile》中也有说明。将基础库从原来设置的 2.6.2 修改为最新的 2.18.0 后，再进行真机调试，果然可以获取到用户昵称和头像了。

# 参考资料
- <a href="https://developers.weixin.qq.com/community/develop/doc/000cacfa20ce88df04cb468bc52801" target="_blank">小程序登录、用户信息相关接口调整说明</a>
- <a href="https://developers.weixin.qq.com/miniprogram/dev/api/open-api/user-info/wx.getUserProfile.html#Bug-Tip" target="_blank">微信官方文档-API-wx.getUserProfile</a>
- <a href="https://developers.weixin.qq.com/community/develop/doc/000e6e0dc08f00b0cdcb13b3653400" target="_blank">wx.getUserProfile is not a function?</a>
- <a href="https://developers.weixin.qq.com/community/develop/article/doc/00040885c386f81e96cbf93cf51013" target="_blank">getUserInfo和getUserProfile 对比</a>
