---
layout: post
title:  "Ant Design Vue Pro 表格前的checkbox根据条件禁用"
subtitle: ""
author: xtong
date:   2021-10-19 21:32:52 +0800
catalog: true
tags: [vue, antdv, 前端]
header-img: "img/post-bg-node.png"
comments: true
---

## 最终效果

- 整体禁用

  <img class="shadow" src="/img/in-post/post-antdv-table-checkbox/post-antdv-table-1.jpg" >

- 某一行禁用

  <img class="shadow" src="/img/in-post/post-antdv-table-checkbox/post-antdv-table-2.jpg" >


## 实现
首先，使用 Table 组件

```html
<a-table
  size="middle"
  :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange, getCheckboxProps: (record) => getCheckboxProps(record) }"
  :columns="columns"
  :dataSource="loadData"
  :pagination="false"
  :loading="loading"
  :rowKey="(record) => record.id"
/>
```
其中实现`复选框禁用`是`getCheckboxProps: (record) => getCheckboxProps(record)`  

在 methods 中定义：
```js
getCheckboxProps (record) {
  console.log(record)
  return {
    props: {
      disabled: record.id === 3
      // disabled: this.isSuper
    }
  }
},
```
这样就可以根据数据行条件判断，并禁用该行的复选框了，也可以根据外部条件，整体禁用复选框。

## 软件版本：vue-antd-pro 3.0.2

## 参考资料
- [ant design vue pro 文档：Table 表格](https://antdv.com/components/table-cn/#rowSelection)  
- [table rowSelection 支持指定某一行的 checkbox 是否是 disabled](https://github.com/ant-design/ant-design/issues/252)
- [在Table组件的rowSelection属性中，使用getCheckboxProps回调函数，并不能将Table中的Checkbox disable掉](https://github.com/vueComponent/ant-design-vue/issues/639)
