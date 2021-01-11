---
title: js对象根据对象属性做排序
date: 2019-05-28 19:40:21
tags:
- JavaScript
categories:
- JavaScript
---

### js对象根据对象属性做排序
- 最常见的对数组排序， 直接使用sort() 方法，按照数组中的元素首字母或者数字大小进行排序
```
    var arr = [2, 13, 6, 7, 3];
    var arr1 = arr.sort();
    console.log(arr);   // [13, 2, 3, 6, 7]
    console.log(arr1);  // [13, 2, 3, 6, 7]
```

- sort()方法会改变原来的数组，并且sort() 方法并不是严格按照数字大小进行排序的。
- 如果想对数组按照大小进行排序，则需要在sort() 方法添加比较函数

```
   var arr = [2, 13, 6, 7, 3];
   arr.sort(
        function(a, b) {
            return a - b;
        }
   );
   console.log(arr); //[2, 3, 6, 7, 13]
```

> 若a小于b, 在排序后的数组a应该出现在b之前（即升序排列），返回小于0的值
> 若a等于b, 则返回0
> 若a大于b, 则返回一个大于0的值

#### 使用sort() 方法对对象数组按照对象属性进行排序

```
    var obj = [
        { a: 5, b: 2, c:3},
        { a: 7, b: 5, c: 1},
        { a: 6, b: 7, c: 7}
    ];
    function sortByObj(pro) {
        return function(a, b) {
            var value1 = a[pro];
            var value2 = b[pro];
            return value1 - value2;
        }
    }
    var sortObj = obj.sort(sortByObj('a'));
    console.log(sortObj);
```

> 查看打印结果

```
[
    { a: 5, b: 2, c: 3},
    { a: 6, b: 7, c: 7},
    { a: 7, b: 5, c: 1}
]

```

> 这样就完成了对象数组按照对象属性排序啦