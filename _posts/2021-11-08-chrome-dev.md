---
layout: post
title:  "Chrome 浏览器下 .dev域名自动跳转 https"
subtitle: ""
author: xtong
date:   2021-11-08 13:32:52 +0800
catalog: true
tags: [Chrome]
header-img: "img/post-bg-node.png"
comments: true
---

## 使用 *.local 作为本地开发域名
之前一直使用 xxx.test 作为项目的本地开发域名，今天创建新项目时，觉得本地应该用 xxx.dev，把 xxx.test 让给测试环境才对。

于是修改了本地的开发域名，并配置好了 hosts。然而，奇怪的是在 chrome 浏览器中，开发域名 xxx.dev 会自动加上 https，这导致了项目在使用 dev 域名时无法顺利运行的问题。

在网上找到了答案：

> 由于今天 Chrome 升级了浏览器版本到 63，现在所有的 .dev 和 .app 都将会自动将 HTTP 转到 HTTPS 上，原因是谷歌已经拿下了 .dev 的顶级域名；在9月份的报告中已经对 .dev 即将带来的问题进行了说明。目前唯一的方法就是修改你的 .dev 或者 .app 域名了，或者换成火狐浏览器开发；建议将你的域名改成 .test 或者 .localhost

> Starting today, Google Chrome is rolling out v63 that now forces all .dev domains to use HTTPS. There is no workaround and they are apparently not changing this. Back in September Mattias Geniar wrote a post warning every one of the changes, and his post is a great primer on what the Chrome team has done.  
>
> This will affect everyone using .dev and if you are using Valet the recommended fix is to switch to a new unused extension like .test. To change this in valet you can run the following:
>
> valet domain test  
> Based on this article by Danny Wahl he recommends you use one of the following: “.localhost”, “.invalid”, “.test”, or “.example”.
>
> If all this sounds like too much trouble another viable option is to switch to Firefox as your development browser. It’s fast, has comfortable dev tools, and has really made a ton of improvements over the past few years.

## 参考资料
- [.dev 域名 chrome 自动 https](https://www.google.com/search?q=.dev+%E5%9F%9F%E5%90%8D+chrome+%E8%87%AA%E5%8A%A8+https&newwindow=1&sxsrf=AOaemvIVwOxt1nve41X3UTQlPmRcqosx4Q%3A1636352584978&ei=SMKIYYuQO8TK-gSfyquADg&oq=.dev+%E5%9F%9F%E5%90%8D+chrome+%E8%87%AA%E5%8A%A8+https&gs_lcp=Cgdnd3Mtd2l6EAMyBQghEKABMgUIIRCgATIFCCEQoAEyBQghEKABOgUIABCABDoFCC4QgAQ6BQgAEMsBOgkIIRAKEKABECo6BwghEAoQoAFKBAhBGABQAFixYWCqZGgGcAB4B4ABpQ2IAexokgERMS4wLjQuNC41LjIuNC4yLjGYAQCgAQHAAQE&sclient=gws-wiz&ved=0ahUKEwiL1Le0kIj0AhVEpZ4KHR_lCuAQ4dUDCA8&uact=5)
- [本地配置的 *.dev,*.app域名 在谷歌浏览器中总是自动转跳到https上，导致不能访问？](https://segmentfault.com/q/1010000012339191)
- [Chrome 63 now forces .dev domains to HTTPS](https://laravel-news.com/chrome-63-now-forces-dev-domains-https)
