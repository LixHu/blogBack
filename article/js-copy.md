---
title: JS数组浅拷贝和深拷贝
date: 2019-06-05 10:30:46
tags:
- JavaScript
categories:
- JavaScript
---

##### JS数组浅拷贝和深拷贝

> javascript 在数组使用中，时常会遇到数组备份的情况，之后对数组做些修改，再同原数组比较，查看数组变化，这里就涉及到一个数组拷贝问题
> 浅拷贝只一层对象的属性，深拷贝递归复制了所有层级
> 数组的拷贝，通常可以使用一个新的数组，指向现有数组

> 浅拷贝：
> 通常使用concat 和 slice 方法返回一个新数组的特性来实现拷贝

```
    var arr = [ 'str', 1, true, null, undefined ];
    var new_arr = arr.concat();  // arr.slice();
    new_arr[0] = 'newstr';   // 操作new_arr 不会影响arr 的值
    console.log(arr);
    console.log(new_arr);
```

> 深拷贝：
> 深拷贝就是指完全的拷贝一个对象，即使嵌套了对象，两者也相互分离，修改一个对象的属性，也不会影响另一个

> 技巧1： 不仅可拷贝数组还能拷贝对象（但不能拷贝函数）

```
    var arr = [ 'str', 1, true, null, [ 'str', 'newstr' ], { str: 'str' } ];
    var new_arr = JSON.parse(JSON.stringify(arr));
    console.log(new_arr);
```

> 浅拷贝通用方法： 实现思路： 遍历对象，把属性和属性值都放在一个新的对象里。

```
    function shallowCopy(obj) {
        // 只拷贝对象
        if(typeof obj !== 'object') return;
        // 根据类型新建一个对象或者数组
        var newObj = obj instanceof Array ? [] : {};
        for(var key in obj) {
            if(obj.hasOwnProperty(key)) {
                newObj[key] = obj[key];
            }
        }
    }
```

> 深拷贝通用方法：实现思路： 拷贝时判断属性值类型，如果是对象，继续递归调用深拷贝函数

```
    function deepCopy(obj) {
        if(typeof obj !== 'object') return;
        for(key in obj) {
            if(obj.hasOwnProperty(key)) {
                newObj[key] = typeof obj[key] == 'object' ? deepCopy(obj[key]): obj[key];
            }
        }
    }
```