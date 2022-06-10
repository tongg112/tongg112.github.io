---
layout: post
title:  "Ant Design Vue Pro 隐藏多语言切换，并设置默认中文"
subtitle: ""
author: xtong
date:   2021-09-26 13:32:52 +0800
catalog: true
tags: [vue, antdv, 前端]
header-img: "img/post-bg-node.png"
comments: true
---
## 隐藏切换语言按钮

- src/components/GlobalHeader/RightContent.vue

```
<template>
  <div :class="wrpCls">
    <avatar-dropdown :menu="showMenu" :current-user="currentUser" :class="prefixCls" />
    <!-- 隐藏语言选择 <select-lang :class="prefixCls" />-->
  </div>
</template>
```

- src/layouts/UserLayout.vue

```
<template>

  <div id="userLayout" :class="['user-layout-wrapper', isMobile && 'mobile']">
    <div class="container">
      <div class="user-layout-lang">
      <!-- 隐藏语言选择 <select-lang class="select-lang-trigger" />-->
      </div>
...

```

## 设置默认中文

- src/store/modules/app.js

```js
...
const app = {
  state: {
    sideCollapsed: false,
    isMobile: false,
    theme: 'dark',
    layout: '',
    contentWidth: '',
    fixedHeader: false,
    fixedSidebar: false,
    autoHideHeader: false,
    color: '',
    weak: false,
    multiTab: true,
    lang: 'zh-CN', // 默认中文
    _antLocale: {}
  },
...
```

- src/core/bootstrap.js

```js
...
  store.dispatch('setLang', storage.get(APP_LANGUAGE, 'zh-CN')) // 默认中文
  // last step
}
```

## 软件版本：vue-antd-pro 3.0.2

- "ant-design-vue": "^1.7.6"
- "vue": "^2.6.0",
