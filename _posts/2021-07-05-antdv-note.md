---
layout: post
title:  "蚂蚁金服antdv的使用笔记"
subtitle: "Ant Design 的 Vue 实现"
author: xtong
date:   2021-07-05 22:45:00 +0800
catalog: true
tags: [vue, 前端, 笔记]
header-img: "img/post-bg-universe.jpg"
comments: true
---
# antdv是什么
ant-design-vue 是 Ant Design 的 Vue 实现，组件的风格与 Ant Design 保持同步，组件的 html 结构和 css 样式也保持一致，组件 API 也尽量保持了一致。  
Ant Design: https://ant.design/index-cn
# 使用中的一些笔记
## 修改logo和系统名称
在`src/layouts/UserLayouts.vue`中,替换路径`src/assets/logo.svg`下的logo文件；修改 title 【Ant Design】为系统名称。
```html
<img src="~@/assets/logo.svg" class="logo" alt="logo">
<span class="title">Ant Design</span>
```
在`src/config/defaultSettings.js`中，修改 title 【Ant Design】为系统名称。
```js
/**
 * 项目默认配置项
 * primaryColor - 默认主题色, 如果修改颜色不生效，请清理 localStorage
 * navTheme - sidebar theme ['dark', 'light'] 两种主题
 * colorWeak - 色盲模式
 * layout - 整体布局方式 ['sidemenu', 'topmenu'] 两种布局
 * fixedHeader - 固定 Header : boolean
 * fixSiderbar - 固定左侧菜单栏 ： boolean
 * contentWidth - 内容区布局： 流式 |  固定
 *
 * storageOptions: {} - Vue-ls 插件配置项 (localStorage/sessionStorage)
 *
 */

export default {
  navTheme: 'dark', // theme for nav menu
  primaryColor: '#F5222D', // primary color of ant design
  layout: 'sidemenu', // nav menu position: `sidemenu` or `topmenu`
  contentWidth: 'Fluid', // layout of content: `Fluid` or `Fixed`, only works when layout is topmenu
  fixedHeader: false, // sticky header
  fixSiderbar: false, // sticky siderbar
  colorWeak: false,
  menu: {
    locale: true
  },
  title: 'Ant Design Pro',
  pwa: false,
  iconfontUrl: '',
  production: process.env.NODE_ENV === 'production' && process.env.VUE_APP_PREVIEW !== 'true'
}

```
## 设置中文语言，关闭语言切换
在`src/locales/index.js`中，修改默认语言为中文
```js
// default lang
import zhCN from './lang/zh-CN'

Vue.use(VueI18n)

export const defaultLang = 'zh-CN'

const messages = {
  'zh-CN': {
    ...zhCN
  }
}

```
在`src/config/defaultSettings.js`中，关闭locale
```js
menu: {
	// locale: true
	disableLocal: true // 关闭全球化
},
```
在`scr/store/modules/app.js`中，lang 修改为 `zh-CN`
```js
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
    lang: 'zh-CN',
    _antLocale: {}
  },
```
在`src/core/bootstrap.js`中，最后几行修改`en-US`为`zh-CN`
```js
store.dispatch('setLang', storage.get(APP_LANGUAGE, 'zh-CN'))
// last step
}
```
在`src/layouts/UserLayouts.vue`和`src/components/GlobalHeader/RightContent.vue`中，删除`SelectLang`的引用。
```js
import { deviceMixin } from '@/store/device-mixin'
// import SelectLang from '@/components/SelectLang'

export default {
  name: 'UserLayout',
  components: {
    // SelectLang
  },
```
## 加载动画内容修改
在`public/index.html`中，`<div class="first-loading-wrp">`标签内的加载文字内容自行修改

## 页脚版权信息修改
在`src/components/GlobalFooter/index.vue`

## 调试模式，初始化完成console输出内容
在`src/utils/screenLog.js`
字体使用【ASCII - ANSI Shadow】  
工具地址：https://patorjk.com/software/taag/#p=display&f=ANSI%20Shadow&t=xtong

## Empty组件使用
html部分
```html
<a-card v-if="no_data" :bordered="true" style='height: 500px;'>
  <Empty style='margin-top: 80px;'>
    <h2 slot="description"> 您没有待审批的申请 </h2>
    <span slot="description"> 已通过的申请单，请您在申请记录中查看 </span>
    <a-button type="primary">
      立即添加
    </a-button>
  </Empty>
</a-card>
```
js部分
```js
// ...
import { Empty } from 'ant-design-vue'

export default {
  name: 'Home',
  components: {
    Info,
    Empty,
    STable
  },
  data () {
    return {
      no_data: true,
// ...			
```
## 图片点击预览
使用【v-viewer】实现  
v-viewer：https://www.npmjs.com/package/v-viewer
```shell
yarn install v-viewer
```
在`src/main.js`中引入 v-viewer
```js
// ...
import './global.less' // global style

+ import 'viewerjs/dist/viewer.css'
+ import Viewer from 'v-viewer'

Vue.config.productionTip = false

// mount axios to `Vue.$http` and `this.$http`
Vue.use(VueAxios)
// 引入图片预览
+ Vue.use(Viewer, { name: 'v-viewer' })
// ...
```
在页面中直接使用
```html
<viewer v-viewer="{toolbar: false}">
  <img src="~@/assets/car.png" class="car-img" alt="car">
</viewer>
```
## 离线部署的生产环境打包配置
在`vue.config.js`中，只需要将`assetsCDN`里的内容注释掉
```js
const assetsCDN = {
  // webpack build externals
  externals: {
    // vue: 'Vue',
    // 'vue-router': 'VueRouter',
    // vuex: 'Vuex',
    // axios: 'axios'
  },
  css: [],
  // https://unpkg.com/browse/vue@2.6.10/
  js: [
    // '//cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js',
    // '//cdn.jsdelivr.net/npm/vue-router@3.1.3/dist/vue-router.min.js',
    // '//cdn.jsdelivr.net/npm/vuex@3.1.1/dist/vuex.min.js',
    // '//cdn.jsdelivr.net/npm/axios@0.19.0/dist/axios.min.js'
  ]
}
```
## 根据查询条件导出excel
html部分
```html
<a-button style="margin-left: 8px" @click="excel_export">导出</a-button>
```
js部分
```js
// ...
import { applicationList, applicationExport } from '@/api/application'
// ...

export default {
  name: 'List',
  components: {
    Empty,
    STable
  },
  data () {
    return {
    // ...
    }
  },
  filters: {
		// ...
  },
  methods: {
    // ...
    excel_export () {
      if (this.queryParam.submit_time[0]) {
        this.queryParam.submit_time[0] = moment(this.queryParam.submit_time[0]).format('YYYY-MM-DD HH:mm:ss')
        this.queryParam.submit_time[1] = moment(this.queryParam.submit_time[1]).format('YYYY-MM-DD HH:mm:ss')
      }
      return applicationExport(this.queryParam)
        .then(blob => {
          const a = document.createElement('a')
          const url = window.URL.createObjectURL(blob)
          const filename = '导出结果.xlsx'
          a.href = url
          a.download = filename
          a.click()
          window.URL.revokeObjectURL(url)
        })
    },
    moment
  }
}
```
