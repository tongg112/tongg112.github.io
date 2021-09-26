---
layout: post
title:  "Ant Design Vue Pro 配置多页签"
subtitle: ""
author: xtong
date:   2021-09-26 14:32:52 +0800
catalog: true
tags: [vue, antdv, 前端]
header-img: "img/post-bg-node.png"
comments: true
---

## 最终效果

<img class="shadow" src="/img/in-post/post-antdv-multitab/antdv-multitab.jpg" >

## 修改配置文件

- src/config/defaultSettings.js

增加 multiTab 配置，设置为 true

```js
export default {
  navTheme: 'dark', // theme for nav menu
  primaryColor: '#1890ff', // primary color of ant design
  layout: 'sidemenu', // nav menu position: `sidemenu` or `topmenu`
  contentWidth: 'Fluid', // layout of content: `Fluid` or `Fixed`, only works when layout is topmenu
  fixedHeader: false, // sticky header
  fixSiderbar: false, // sticky siderbar
  colorWeak: false,
  multiTab: true, // <----- 增加 multiTab 配置
// ...
```  

## 布局模版中增加 multitab

- src/layouts/BasicLayout.vue

```html
<template v-slot:rightContentRender>
  <right-content :top-menu="settings.layout === 'topmenu'" :is-mobile="isMobile" :theme="settings.theme" />
</template>
<!-- multiTab -->
<a-layout-content>
  <multi-tab v-if="settings.multiTab"></multi-tab>
  <transition name="page-transition">
  </transition>
</a-layout-content>
<!-- custom footer / 自定义Footer -->
<template v-slot:footerRender>
  <global-footer />
</template>
```

在 data 中，定义 multiTab 的值，从 config 中读取。

```js
export default {
  name: 'BasicLayout',
  components: {
    // ...
  },
  data () {
    return {
      // ...
      settings: {
        // ...
        colorWeak: defaultSettings.colorWeak,
        multiTab: defaultSettings.multiTab,
// ...
```

## 参考资料
- [ant design vue pro 支持多页签模式 页签可以缓存](https://blog.csdn.net/abcdefg182/article/details/108454433)
- [开启multiTab后, keep-alive 没有生效](https://github.com/vueComponent/ant-design-vue-pro/issues/794)  
