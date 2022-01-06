---
title: JS数组浅拷贝和深拷贝
date: 2021-09-09 23:59:59
tags:
- JavaScript
categories:
- JavaScript
---

> 今天过来重新整理一下这篇文章。接来来会对深拷贝和浅拷贝都进行分析。让自己更深入的理解这块。

### 简介

    深拷贝和浅拷贝，简单来说，就是当B复制了A，当修改A时，如果B也变了，说明是浅拷贝，如果B没变，就是深拷贝。

### 浅拷贝
    
    先写个方法来实现浅拷贝一句功能数据展示

```
    let a = [0, 1, 2, 3, 4], 
    b = a;
    console.log(a, b);
    a[0] = 1;
    console.log(a, b);
```

    接下来看一下控制台的效果

![copy-1](https://lixhuan.com/upload/copy-1.jpg)

    b 复制了a， 修改了a， 数组b也跟着发生了变化，这就是浅拷贝

>    深入研究一下浅拷贝
    
    这个涉及到了基本数据类型和引用类型的概念了。
    基本数据类型：number，string, boolean, null, undefined 等，
    引用数据类型： Object类，有常规名值对的无序对象，以及函数等。
    
    两种数据类型的存储方式在内存中表现如下。


### 基本类型：
        
名值存放在栈内存中，例如 let a = 1;

| 栈内存  |  |
| ---- | ---- |
| 名 | 值 |
|  a | 1 |

当复制了 b = a 时，栈内存会开辟一个新的内存：

| 栈内存  |  |
| :----: | :----: |
| 名 | 值 |
| a | 1 |
| b | 1 |

所以此时你修改a = 2 时，对b不受影响。当然，在let a = 1, b = a;虽然b不受影响
，但这也算不上深拷贝，因为深拷贝本身只针对较为复杂的对象类型的数据。
    

### 引用类型：

名存在栈内存中，值存放在堆内存中，但是栈内存会提供一个引用地址指向堆内存中的值。


| 栈内存   |        | 堆内存 |          |
| :----:  | :----: | ----  |    ----  |
| 名      | 值      |  地址  |   val   |
| a       | 堆地址1 |  地址1 |  [0, 1, 3, 4, 5] |

之后进行b = a 进行拷贝时，其实就是复制a的引用地址

| 栈内存   |        | 堆内存 |          |
| :----:  | :----: | ----  |    ----  |
| 名      | 值      |  地址  |   val   |
| a       | 地址1 |  地址1 |  [0, 1, 3, 4, 5] |
| b       | 地址1 |       |          |

当我们进行a[1] = 3修改时由于a和b指向通一个地址，所以自然b也受影响，这就是浅拷贝。

| 栈内存   |        | 堆内存 |          |
| :----:  | :----: | ----  |    ----  |
| 名      | 值      |  地址  |   val   |
| a       | 地址1 |  地址1 |  [0, 3, 3, 4, 5] |
| b       | 地址1 |       |          |

深拷贝实现逻辑就是在堆内存中开一个新的内存为b放值，就像基本类型那样。


| 栈内存   |        | 堆内存 |          |
| :----:  | :----: | ----  |    ----  |
| 名      | 值      |  地址  |   val   |
| a       | 地址1 |  地址1 |  [0, 1, 3, 4, 5] |
| b       | 地址2 |  地址2 |  [0, 1, 3, 4, 5] |

### 深拷贝

首先实现一个深拷贝的函数

```javascript
function deepclone(obj) {
    let cloneObj = Array.isArray(obj) ? [] : {};
    if(obj && typeof obj === 'object') {
        for(key in obj) {
            if(obj.hasOwnProperty(key)) {
                if(obj[key] && typeof obj[key] == 'object') {
                    cloneObj[key] = deepclone(obj[key]);
                }else {
                    cloneObj[key] = obj[key];
                }
            }
        }
    }
    return cloneObj;
}

let a = [0, 1, 2, 3],
    b = deepclone(a);
a[0] = 3;
console.log(a, b);
```

运行效果如下图

![深拷贝1](https://lixhuan.com/upload/copy_2.jpg)

可以看出，a的修改不会影响b的变化，也就是说b脱离了a的控制，不再受a的影响

深拷贝，是拷贝对象各个层级的属性。


除了递归，还可以使用JSON对象的parse 和 stringify 方法

```javascript
function deepClone(obj){
    let _obj = JSON.stringify(obj),
        objClone = JSON.parse(_obj);
    return objClone
}    
let a = [0,1,[2,3],4],
    b = deepClone(a);
a[0] = 1;
a[2][0] = 1;
console.log(a,b);
```

效果如下图：

![深拷贝1](https://lixhuan.com/upload/copy_3.jpg)

### 总结

说了这么多，了解深拷贝也不仅仅是为了应付面试题，
在实际开发中也是非常有用的。例如后台返回了一堆数据，你需要对这堆数据做操作，但多人开发情况下，
你是没办法明确这堆数据是否有其它功能也需要使用，直接修改可能会造成隐性问题，深拷贝能帮你更安全安心的去操作数据，根据实际情况来使用深拷贝，大概就是这个意思。