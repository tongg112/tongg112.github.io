---
layout: post
title:  "蚂蚁金服antdv快速上手"
subtitle: "快速构建一个antdv的前端项目"
author: xtong
date:   2021-07-05 22:45:00 +0800
catalog: true
tags: [vue, antd, 前端, 笔记]
header-img: "img/post-bg-universe.jpg"
comments: true
---
# antdv是什么
ant-design-vue 是 Ant Design 的 Vue 实现，组件的风格与 Ant Design 保持同步，组件的 html 结构和 css 样式也保持一致，组件 API 也尽量保持了一致。

Ant Design:  [https://antdv.com/components/overview](https://antdv.com/components/overview)

中文介绍：[https://antdv.com/docs/vue/introduce-cn](https://antdv.com/docs/vue/introduce-cn)

中文文档：[https://antdv.com/components/overview-cn](https://antdv.com/components/overview-cn)

# 如何安装

使用 npm 或者 [yarn](https://yarnpkg.com/) 都可以，个人推荐 yarn，速度比 npm 快。

## 安装yarn

[安装 yarn](https://yarn.bootcss.com/docs/install#mac-stable)：`npm install --global yarn` 安装成功后 `yarn -v` 查看版本确认安装成功

## 安装vue脚手架工具

```shell
yarn global add @vue/cli
```
全局安装 vue-cli
```shell
yarn global add @vue/cli
yarn global v1.22.17
[1/4] 🔍  Resolving packages...
warning @vue/cli > @vue/cli-ui > apollo-server-express > subscriptions-transport-ws@0.9.19: The `subscriptions-transport-ws` package is no longer maintained. We recommend you use `graphql-ws` instead. For help migrating Apollo software to `graphql-ws`, see https://www.apollographql.com/docs/apollo-server/data/subscriptions/#switching-from-subscriptions-transport-ws    For general help using `graphql-ws`, see https://github.com/enisdenjo/graphql-ws/blob/master/README.md
warning @vue/cli > @vue/cli-ui > apollo-server-express > apollo-server-core > subscriptions-transport-ws@0.9.19: The `subscriptions-transport-ws` package is no longer maintained. We recommend you use `graphql-ws` instead. For help migrating Apollo software to `graphql-ws`, see https://www.apollographql.com/docs/apollo-server/data/subscriptions/#switching-from-subscriptions-transport-ws    For general help using `graphql-ws`, see https://github.com/enisdenjo/graphql-ws/blob/master/README.md
warning @vue/cli > @vue/cli-ui > apollo-server-express > apollo-server-core > apollo-cache-control@0.14.0: The functionality provided by the `apollo-cache-control` package is built in to `apollo-server-core` starting with Apollo Server 3. See https://www.apollographql.com/docs/apollo-server/migration/#cachecontrol for details.
warning @vue/cli > @vue/cli-ui > apollo-server-express > apollo-server-core > apollo-tracing@0.15.0: The `apollo-tracing` package is no longer part of Apollo Server 3. See https://www.apollographql.com/docs/apollo-server/migration/#tracing for details
warning @vue/cli > @vue/cli-ui > apollo-server-express > apollo-server-core > graphql-extensions@0.15.0: The `graphql-extensions` API has been removed from Apollo Server 3. Use the plugin API instead: https://www.apollographql.com/docs/apollo-server/integrations/plugins/
warning @vue/cli > @vue/cli-ui > apollo-server-express > graphql-tools@4.0.8: This package has been deprecated and now it only exports makeExecutableSchema.\nAnd it will no longer receive updates.\nWe recommend you to migrate to scoped packages such as @graphql-tools/schema, @graphql-tools/utils and etc.\nCheck out https://www.graphql-tools.com to learn what package you should use instead
warning @vue/cli > @vue/cli-ui > apollo-server-express > apollo-server-core > graphql-tools@4.0.8: This package has been deprecated and now it only exports makeExecutableSchema.\nAnd it will no longer receive updates.\nWe recommend you to migrate to scoped packages such as @graphql-tools/schema, @graphql-tools/utils and etc.\nCheck out https://www.graphql-tools.com to learn what package you should use instead
warning @vue/cli > @vue/cli-ui > apollo-server-express > graphql-tools > uuid@3.4.0: Please upgrade  to version 7 or higher.  Older versions may use Math.random() in certain circumstances, which is known to be problematic.  See https://v8.dev/blog/math-random for details.
warning @vue/cli > vue-codemod > jscodeshift > micromatch > snapdragon > source-map-resolve@0.5.3: See https://github.com/lydell/source-map-resolve#deprecated
warning @vue/cli > vue-codemod > jscodeshift > micromatch > snapdragon > source-map-resolve > resolve-url@0.2.1: https://github.com/lydell/resolve-url#deprecated
warning @vue/cli > vue-codemod > jscodeshift > micromatch > snapdragon > source-map-resolve > source-map-url@0.4.1: See https://github.com/lydell/source-map-url#deprecated
warning @vue/cli > vue-codemod > jscodeshift > micromatch > snapdragon > source-map-resolve > urix@0.1.0: Please see https://github.com/lydell/urix#deprecated
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 🔨  Building fresh packages...
success Installed "@vue/cli@5.0.4" with binaries:
      - vue
✨  Done in 167.46s.
```
## 创建一个vue项目

```shell
vue create antd-demo
```

选择 `vue2` 版本，使用 yarn 安装（antdv 的 1.7.6 版本，不支持最新的 vue3）

```
Vue CLI v5.0.4
? Please pick a preset:
  Default ([Vue 3] babel, eslint)
❯ Default ([Vue 2] babel, eslint)
  Manually select features
```

```
Vue CLI v5.0.4
✨  Creating project in /Users/xtong/code/demo/antd-demo.
🗃  Initializing git repository...
⚙️  Installing CLI plugins. This might take a while...

yarn install v1.22.17
info No lockfile found.
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...

success Saved lockfile.
✨  Done in 54.09s.
🚀  Invoking generators...
📦  Installing additional dependencies...

yarn install v1.22.17
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 🔨  Building fresh packages...

success Saved lockfile.
✨  Done in 11.58s.
⚓  Running completion hooks...

📄  Generating README.md...

🎉  Successfully created project antd-demo.
👉  Get started with the following commands:

 $ cd antd-demo
 $ yarn serve
```

在 antd-demo 目录下，运行 `yarn serve` 查看 demo 页面。

## 安装 antdv 组件（版本@1.7.6）

在 antd-demo 目录下，执行

```shell
// npm 安装 antdv
npm install ant-design-vue --save
// yarn 安装 antdv
yarn add ant-design-vue@1.7.6
```

```shell
➜  antd-demo git:(master) ✗ yarn add ant-design-vue@1.7.6
yarn add v1.22.17
[1/4] 🔍  Resolving packages...
info There appears to be trouble with your network connection. Retrying...
warning ant-design-vue > babel-runtime > core-js@2.6.12: core-js@<3.4 is no longer maintained and not recommended for usage due to the number of issues. Because of the V8 engine whims, feature detection in old core-js versions could cause a slowdown up to 100x even if nothing is polyfilled. Please, upgrade your dependencies to the actual version of core-js.
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 🔨  Building fresh packages...
success Saved lockfile.
success Saved 39 new dependencies.
info Direct dependencies
└─ ant-design-vue@1.7.6
info All dependencies
├─ @ant-design/colors@3.2.2
├─ @ant-design/icons-vue@2.0.0
├─ @ant-design/icons@2.1.1
├─ @simonwep/pickr@1.7.4
├─ add-dom-event-listener@1.1.0
├─ ant-design-vue@1.7.6
├─ array-tree-filter@2.1.0
├─ async-validator@3.5.2
├─ babel-helper-vue-jsx-merge-props@2.0.3
├─ babel-runtime@6.26.0
├─ classnames@2.3.1
├─ component-classes@1.2.6
├─ component-indexof@0.0.3
├─ dom-align@1.12.3
├─ dom-closest@0.2.0
├─ dom-matches@2.0.0
├─ dom-scroll-into-view@2.0.1
├─ enquire.js@2.1.6
├─ intersperse@1.0.0
├─ is-mobile@2.2.2
├─ is-negative-zero@2.0.2
├─ ismobilejs@1.1.1
├─ json2mq@0.2.0
├─ loose-envify@1.4.0
├─ moment@2.29.3
├─ mutationobserver-shim@0.3.7
├─ nanopop@2.1.0
├─ node-emoji@1.11.0
├─ omit.js@1.0.2
├─ performance-now@2.1.0
├─ raf@3.4.1
├─ regenerator-runtime@0.11.1
├─ resize-observer-polyfill@1.5.1
├─ shallow-equal@1.2.1
├─ shallowequal@1.1.0
├─ string-convert@0.2.1
├─ tinycolor2@1.4.2
├─ vue-ref@2.0.0
└─ warning@4.0.3
✨  Done in 50.41s.
```

## 引入 antd

在 vue 项目的 main.js 中，增加引入 antd 的代码。

```
import Vue from 'vue'
import App from './App.vue'
+ import Antd from 'ant-design-vue'
+ import 'ant-design-vue/dist/antd.css'

Vue.config.productionTip = false

+ Vue.use(Antd)

new Vue({
  render: h => h(App),
}).$mount('#app')

```

在 HelloWord.vue 文件中插入 antdv 的按钮元素查看效果: `a-button`

```
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <a-button type="primary" >新增</a-button>
    ...
```

<img class="shadow" src="/img/in-post/post-antd-note/post-antdv-button.jpg" >

可以看到，antdv 的元素可以正常展示了。

# 参考资料
- <a href="https://antdv.com/components/overview-cn" target="_blank">Ant Design Vue 官方中文文档</a>
