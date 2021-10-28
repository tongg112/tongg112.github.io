---
layout: post
title:  "Ant Design Vue Pro 组件使用时提示 Unknown"
subtitle: "树选择组件的引入"
author: xtong
date:   2021-09-26 20:32:52 +0800
catalog: true
tags: [vue, antdv, 前端]
header-img: "img/post-bg-node.png"
comments: true
---

## 问题

- 在使用树形选择器组件时，提示错误

  <img class="shadow" src="/img/in-post/post-antdv-lazy/antdv-select-err.jpg" >

- 文档地址：[TreeSelect 树型选择控件](https://antdv.com/components/tree-select-cn/)

## 懒加载中引入组件

- src/core/lazy_use.js

import 组件：
<img class="shadow" src="/img/in-post/post-antdv-lazy/antdv-lazy-use-1.jpg" >

use 组件：
<img class="shadow" src="/img/in-post/post-antdv-lazy/antdv-lazy-use-2.jpg" >

## 代码
```js
import Vue from 'vue'

// base library
import {
  ConfigProvider,
  Layout,
  Input,
  InputNumber,
  Button,
  Switch,
  Radio,
  Checkbox,
  Select,
  Card,
  Form,
  Row,
  Col,
  Modal,
  Table,
  Tabs,
  TreeSelect, // 增加组件
  Icon,
  Badge,
  Popover,
  Dropdown,
  List,
  Avatar,
  Breadcrumb,
  Steps,
  Spin,
  Menu,
  Drawer,
  Tooltip,
  Alert,
  Tag,
  Divider,
  DatePicker,
  TimePicker,
  Upload,
  Progress,
  Skeleton,
  Popconfirm,
  PageHeader,
  Result,
  Statistic,
  Descriptions,
  Space,
  message,
  notification
} from 'ant-design-vue'
import Viser from 'viser-vue'

// ext library
import VueCropper from 'vue-cropper'
import Dialog from '@/components/Dialog'
import MultiTab from '@/components/MultiTab'
import PageLoading from '@/components/PageLoading'
import PermissionHelper from '@/core/permission/permission'
import './directives/action'

Vue.use(ConfigProvider)
Vue.use(Layout)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Button)
Vue.use(Switch)
Vue.use(Radio)
Vue.use(Checkbox)
Vue.use(Select)
Vue.use(Card)
Vue.use(Form)
Vue.use(Row)
Vue.use(Col)
Vue.use(Modal)
Vue.use(Table)
Vue.use(Tabs)
Vue.use(TreeSelect) // 增加组件
Vue.use(Icon)
Vue.use(Badge)
Vue.use(Popover)
Vue.use(Dropdown)
Vue.use(List)
Vue.use(Avatar)
Vue.use(Breadcrumb)
Vue.use(Steps)
Vue.use(Spin)
Vue.use(Menu)
Vue.use(Drawer)
Vue.use(Tooltip)
Vue.use(Alert)
Vue.use(Tag)
Vue.use(Divider)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(Upload)
Vue.use(Progress)
Vue.use(Skeleton)
Vue.use(Popconfirm)
Vue.use(PageHeader)
Vue.use(Result)
Vue.use(Statistic)
Vue.use(Descriptions)
Vue.use(Space)

Vue.prototype.$confirm = Modal.confirm
Vue.prototype.$message = message
Vue.prototype.$notification = notification
Vue.prototype.$info = Modal.info
Vue.prototype.$success = Modal.success
Vue.prototype.$error = Modal.error
Vue.prototype.$warning = Modal.warning

Vue.use(Viser)
Vue.use(Dialog) // this.$dialog func
Vue.use(MultiTab)
Vue.use(PageLoading)
Vue.use(PermissionHelper)
Vue.use(VueCropper)

process.env.NODE_ENV !== 'production' && console.warn('[antd-pro] NOTICE: Antd use lazy-load.')


```

## 软件版本：vue-antd-pro 3.0.2

- "ant-design-vue": "^1.7.6"
  - "vue": "^2.6.0",

## 参考资料
- [ant design pro vue 组件未注册 Unknown custom element:＜a-tree＞](https://blog.csdn.net/SeasmallTop/article/details/109117059)
- [Unknown custom element: \<a-carousel\> #689](https://github.com/vueComponent/ant-design-vue-pro/issues/689)  
- [组件a-tree-select 无法使用，请问应该需要引入 #546](https://github.com/vueComponent/ant-design-vue-pro/issues/546)  
