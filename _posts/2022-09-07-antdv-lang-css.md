---
layout: post
title:  "Ant Design Vue Pro 多语言切换不同CSS"
subtitle: "不同语言使用不同的CSS"
author: xtong
date:   2022-09-07 21:32:52 +0800
catalog: true
tags: [vue, antdv, 前端]
header-img: "img/post-bg-node.png"
comments: true
---
在使用 locales 切换多语言时，英文有时候需要换行，就需要手动修改对应的CSS，而中文下不需要换行的样式，怎样做到根据语言选择的不同应用不同的样式呢？

# 为英文版本设置特定的CSS

label设置自动换行：
```
>>> .ant-form-item-label {
  display: inline-block;
  overflow: hidden;
  line-height: 18px;
  white-space: normal;
  text-align: right;
  vertical-align: middle;
}
```
仅在英文版本下，label自动换行：

```
<template>
  <a-form :form="form" :lang="$i18n.locale">
    ...
  </a-form>
</template>

<script>
  ...
</script>

<style scoped>
:lang(en-US) >>> .ant-form-item-label {
  display: inline-block;
  overflow: hidden;
  line-height: 18px;
  padding-right: 8px;
  white-space: normal;
  text-align: right;
  vertical-align: middle;
}
</style>
```

# 软件版本：vue-antd-pro 3.0.2

- "ant-design-vue": "^1.7.6"
- "vue": "^2.6.0",

# 参考资料
- [VUE 不同语言使用不同 CSS](https://blog.csdn.net/MAIMIHO/article/details/121152696)
- [Web 开发技术 CSS（层叠样式表）lang](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:lang)
