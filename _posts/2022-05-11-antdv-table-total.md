---
layout: post
title:  "Ant Design Vue Pro 列表展示数据总数"
subtitle: "s-table 组件修改, 显示总数和自定义页码跳转"
author: xtong
date:   2022-05-11 19:32:52 +0800
catalog: true
tags: [vue, antdv, 前端]
header-img: "img/post-bg-node.png"
comments: true
---
# antd vue 的官方文档

- [antd vue: Table](https://antdv.com/components/table#API)
- [antd vue: Pagination](https://antdv.com/components/pagination#components-pagination-demo-total)

# s-table 增加自定义页码跳转的支持

- src/components/Table/index.js

```
// 在 props 中增加 showQuickJumper
...
showSizeChanger: {
  type: Boolean,
  default: true
},
+ showQuickJumper: {
+   type: Boolean,
+   default: false
+ },
...


// 在 loadData 方法的 Pagination 配置，增加对 showQuickJumper 配置
...
this.localPagination = this.showPagination && Object.assign({}, this.localPagination, {
  current: r.pageNo, // 返回结果中的当前分页数
  total: r.totalCount, // 返回结果中的总记录数
  showSizeChanger: this.showSizeChanger,
+   showQuickJumper: this.showQuickJumper,
  pageSize: (pagination && pagination.pageSize) ||
    this.localPagination.pageSize
}) || false
...

```
如果在 props 中设置了默认 `false`，则在 s-table 组件调用时可以配置 `show-quick-jumper` 来开启自定义页码跳转

```
<s-table
  ref="table"
+   show-quick-jumper
  :columns="columns"
  :data="loadData"
  :alert="options.alert"
  :rowKey="(record) => record.id"
  :rowSelection="options.rowSelection"
>
```

# s-table 增加数据总数 total 显示
与改造 s-table 组件，支持自定义页码跳转类似，我们只需把原 antd vue table 组件中的 showTotal 封装进 s-table 组件中即可。


- src/components/Table/index.js

```
// 在 props 中增加 showTotal
...
showSizeChanger: {
  type: Boolean,
  default: true
},
showQuickJumper: {
  type: Boolean,
  default: false
},
+ showTotal: {
+   type: Boolean,
+   default: true
+ },
...


// 在 loadData 方法的 Pagination 配置，增加对 showTotal 配置
...
this.localPagination = this.showPagination && Object.assign({}, this.localPagination, {
  current: r.pageNo, // 返回结果中的当前分页数
  total: r.totalCount, // 返回结果中的总记录数
  showSizeChanger: this.showSizeChanger,
  showQuickJumper: this.showQuickJumper,
+   showTotal: this.showTotal ? (total) => `共 ${total} 条` : false,
  pageSize: (pagination && pagination.pageSize) ||
    this.localPagination.pageSize
}) || false
...

```


# 软件版本：vue-antd-pro 3.0.2

- "ant-design-vue": "^1.7.6"
- "vue": "^2.6.0",

# 参考链接
- [ant design vue pro表格分页栏添加查询数据总数](https://blog.csdn.net/weixin_39429253/article/details/102683264)
- [antd s-table 分页时显示 total 当前总数据条数](https://blog.csdn.net/qq_44741558/article/details/118577068)
