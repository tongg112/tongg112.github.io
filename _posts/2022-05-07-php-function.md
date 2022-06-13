---
layout: post
title:  "PHP 好用的内建函数推荐"
subtitle: "常用函数的使用场景"
author: xtong
date:   2022-05-07 21:52:52 +0800
catalog: true
tags: [php, 后端]
header-img: "img/post-bg-php.jpeg"
comments: true
---

# in_array — 检查数组中是否存在某个值

文档：[https://www.php.net/manual/zh/function.in-array](https://www.php.net/manual/zh/function.in-array)

常用在一些简单验证上，如：
```php
// 用户权限范围数组
$user_auth = [1,3,5,6,7];
// 查阅当前数据所需权限
$need_auth = 9;
// 判断当前用户查看权限
if(!in_array($need_auth, $user_auth)){
  err('无权查看！');
}
```
# explode — 使用一个字符串分割另一个字符串

文档：[https://www.php.net/manual/zh/function.explode.php](https://www.php.net/manual/zh/function.explode.php)

数据库经常会在一个字段中储存用逗号','（或其他字符）分割的一组数据，用 explode 可以方便地将其转换为数组，同时可以配合 in_array 进行数据验证，如：


```php
// 修改当前部门的父级部门时，判断父级部门是否合法
// （本部门的）父部门不能是（本部门的）子部门
if(in_array($id, explode(',', $parent->parent_ids))) {
    return $this->err(Errors::DEPT_PARENT_CANT_BE_CHILDREN);
}
```
`explode` 对应的相反操作是 `implode`。implode 可以将数组转换成字符串进行存储。

前端提交来的附件id数组，我们可以转成逗号分割的字符串储存到数据库字段中。

# array_column — 返回输入数组中指定列的值

文档：[https://www.php.net/manual/zh/function.array-column.php](https://www.php.net/manual/zh/function.array-column.php)

当要从二维数组中获取某一个 key 的所有值组成一个数组时，就可以使用这个函数。
```php
// 班级学生信息
$students = [
  [
    'id' => 1,
    'name' => '张三',
    'age' => 14,
  ],
  [
    'id' => 4,
    'name' => '李四',
    'age' => 12,
  ],
  [
    'id' => 34,
    'name' => '王五',
    'age' => 13,
  ],
  [
    'id' => 55,
    'name' => '赵六',
    'age' => 14,
  ],
];
// 获取学生名单的数组
$student_names = array_column($students, 'name');
// 新学生是否和班里的其他学生重名
$new_student = [
  'name' => '李三',
  'age' => 15,
];
if(in_array($new_student['name'], $student_names)) {
  echo '巧了，本班也有一名同学叫：' . $new_student['name'];
}
```

# array_values — 返回数组中所有的值

文档：[https://www.php.net/manual/zh/function.array-values](https://www.php.net/manual/zh/function.array-values)

通常在遍历处理数组内容时，使用 `unset()` 去除不需要的元素后，会导致数组的索引不连续，写接口返回给前端就会变成对象；要避免这种情况，可以在这里使用 `array_values` 进行索引重建。

```php
print_r($list);

Array(
  [0] => 'apple'
  [4] => 'car'
  [5] => 'google'
  [7] => 'youtube'
)

// array_values() 返回 input 数组中所有的值并给其建立数字索引。
$list = array_values($list);

Array(
  [0] => 'apple'
  [1] => 'car'
  [2] => 'google'
  [3] => 'youtube'
)

```


# 参考资料
- [PHP 官方手册](https://www.php.net/)

<style>
header.intro-header {
    background-blend-mode: multiply;
}
</style>
