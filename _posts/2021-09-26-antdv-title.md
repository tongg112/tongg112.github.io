---
layout: post
title:  "Ant Design Vue Pro 修改系统名称与 logo"
subtitle: ""
author: xtong
date:   2021-09-26 13:32:52 +0800
catalog: true
tags: [vue, antdv, 前端]
header-img: "img/post-bg-node.png"
comments: true
---
## 修改全局title

- src/config/defaultSettings.js

修改 title 的值

## 修改登陆界面的系统名称和logo

- src/layouts/UserLayout.vue 中修改对应的信息

```html
...
<div class="header">
  <a href="/">
    <img src="~@/assets/new-logo.svg" class="logo" alt="logo">
    <span class="title">{{ title }}</span>
  </a>
</div>
...
```

title 使用 config 中设置的，这里要引入一下。

```js
// ...
import defaultSettings from '@/config/defaultSettings'

export default {
  name: 'UserLayout',
  components: {
    SelectLang
  },
  data () {
    return {
      title: defaultSettings.title
    }
  },
// ...  
```
## 修改后标题过长，在侧边菜单无法显示的问题

- src/layouts/BasicLayout.vue

给 `<h1>` 标签设置字体大小，调整到合适显示的大小。

```html
<!-- 1.0.0+ 版本 pro-layout 提供 API，
      我们推荐使用这种方式进行 LOGO 和 title 自定义
-->
<template v-slot:menuHeaderRender>
  <div>
    <logo-svg />
    <h1 style="font-size: 16px;">{{ title }}</h1>
  </div>
</template>
<!-- 1.0.0+ 版本 pro-layout 提供 API,
      增加 Header 左侧内容区自定义
-->
```
## 修改菜单栏上的 logo

- src/layouts/BasicLayout.vue

修改 logo 的图片引用。

```js
import LogoSvg from '../assets/new-logo.svg?inline'
```

## 修改网站icon

- public/index.html

将网站 icon 替换成新的 icon：favicon.ico

```html
<link rel="icon" href="<%= BASE_URL %>favicon.ico">
```

## 软件版本：vue-antd-pro 3.0.2

- "ant-design-vue": "^1.7.6"
  - "vue": "^2.6.0",
