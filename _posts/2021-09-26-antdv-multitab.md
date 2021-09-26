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

- 整体效果

  <img class="shadow" src="/img/in-post/post-antdv-multitab/antdv-multitab.jpg" >

- 右键效果

  <img class="shadow" src="/img/in-post/post-antdv-multitab/antdv-multitab-close.jpg" >

- 多语言国际化效果

  <img class="shadow" src="/img/in-post/post-antdv-multitab/antdv-multitab-i18n.jpg" >

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

## 配置多语言

- src/locales/lang/zh-CN/global.js
- src/locales/lang/en-US/global.js

在多语言配置中，分别增加多页签用到的翻译文本

```js
export default {
  submit: '提交',
  save: '保存',
  'submit.ok': '提交成功',
  'save.ok': '保存成功',
  'canNotCloseTab': '这是最后一个标签了, 无法被关闭',
  'noTabsLeft': '左侧没有标签',
  'noTabsRight': '右侧没有标签',
  'closeThat': '关闭当前标签',
  'closeRight': '关闭右侧',
  'closeLeft': '关闭左侧',
  'closeAll': '关闭全部',
  'input': '请输入',
  'choose': '请选择'
}
```

```js
export default {
  submit: 'Submit',
  save: 'Save',
  'submit.ok': 'Submit successfully',
  'save.ok': 'Saved successfully',
  'canNotCloseTab': 'This is the last tab, it cannot be closed',
  'noTabsLeft': 'No tabs on the left',
  'noTabsRight': 'No tabs on the right',
  'closeThat': 'Close current tab',
  'closeRight': 'Close right',
  'closeLeft': 'Close left',
  'closeAll': 'Close all',
  'input': 'Please input',
  'choose': 'Please choose'
}
```

- src/components/MultiTab/MultiTab.vue

使用 `$t()` 替换原来的中文描述文本。

```js
<script>
import events from './events'

export default {
  name: 'MultiTab',
  data () {
    return {
      fullPathList: [],
      pages: [],
      activeKey: '',
      newTabIndex: 0
    }
  },
  created () {
    //...
  },
  methods: {
    onEdit (targetKey, action) {
      // ...
    },
    remove (targetKey) {
      // ...
    },
    selectedLastPath () {
      // ...
    },

    // content menu
    closeThat (e) {
      // 判断是否为最后一个标签页，如果是最后一个，则无法被关闭
      if (this.fullPathList.length > 1) {
        this.remove(e)
      } else {
        this.$message.info(this.$t('canNotCloseTab'))
      }
    },
    closeLeft (e) {
      const currentIndex = this.fullPathList.indexOf(e)
      if (currentIndex > 0) {
        this.fullPathList.forEach((item, index) => {
          if (index < currentIndex) {
            this.remove(item)
          }
        })
      } else {
        this.$message.info(this.$t('noTabsLeft'))
      }
    },
    closeRight (e) {
      const currentIndex = this.fullPathList.indexOf(e)
      if (currentIndex < (this.fullPathList.length - 1)) {
        this.fullPathList.forEach((item, index) => {
          if (index > currentIndex) {
            this.remove(item)
          }
        })
      } else {
        this.$message.info(this.$t('noTabsRight'))
      }
    },
    closeAll (e) {
      // ...
    },
    closeMenuClick (key, route) {
      // ...
    },
    renderTabPaneMenu (e) {
      return (
        <a-menu {...{ on: { click: ({ key, item, domEvent }) => { this.closeMenuClick(key, e) } } }}>
          <a-menu-item key="closeThat">{ this.$t('closeThat') }</a-menu-item>
          <a-menu-item key="closeRight">{ this.$t('closeRight') }</a-menu-item>
          <a-menu-item key="closeLeft">{ this.$t('closeLeft') }</a-menu-item>
          <a-menu-item key="closeAll">{ this.$t('closeAll') }</a-menu-item>
        </a-menu>
      )
    },
    // render
    renderTabPane (title, keyPath) {
      const menu = this.renderTabPaneMenu(keyPath)

      return (
        <a-dropdown overlay={menu} trigger={['contextmenu']}>
          <span style={{ userSelect: 'none' }}>{ this.$t(title) }</span>
        </a-dropdown>
      )
    }
  },
  watch: {
    // ...
  },
  render () {
    // ...
  }
}
</script>

```

## 软件版本：vue-antd-pro 3.0.2

## 参考资料
- [ant design vue pro 支持多页签模式 页签可以缓存](https://blog.csdn.net/abcdefg182/article/details/108454433)
- [开启multiTab后, keep-alive 没有生效](https://github.com/vueComponent/ant-design-vue-pro/issues/794)  
