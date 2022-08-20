---

title: 前端面试总结

date: 2021-09-07-20:48:48

tags:
- JavaScript
- 面试

categories:
- JavaScript
- 面试

---

> 最近可能心态不对，有点着急，然后自己对自己接下来的路有点迷茫，不过，人总是要往前看，留下来的不过就是一些压力和自我总结,也总是劝自己冷静下来，用自己最平静的状态来面对整个压力。接下来这期就整理下最近的前端面试经验。

> 前端这边面试也是刚开始面，感觉自己欠缺的东西很多，也有可能是受到了打击，但是后期会把这些打击换成动力。

### 深拷贝和浅拷贝的区别

浅拷贝是指复制一层对象，当对象的属性是引用类型时，实质复制的是其已用，当引用指向的值改变时也会跟着变化，
内存地址无变化。


深拷贝是指复制对象的所有层级。也就是把对象拷贝了一份。 内存地址不同。

> 这道题目我之前遇到过，但是没有深入研究，接下来会继续整理这篇文章的内容 ，把内存变化以及更多的内容整理出来，更深入的研究
[JS对象的深拷贝和浅拷贝](https://lixhu.github.io/article/js-copy.html)

### Vue computed 和watch 的区别

computed：计算属性，基于data中声明过或者父组件传递的props中的数据通过计算得到一个新值，这个新值只会根据已知只的变化而变化。 computed有内存。

应用场景： 用于处理复杂的逻辑欲奴是哪，一个数据或者多个数据影响，用来处理watch和methods 无法处理的，或处理起来不方便的情况。例如处理模板中的复杂表达式、购物车里面的商品数量和总金额之间的变化等。

watch: 监听属性， 通过vm对象的$watch 或者配置watch来监听Vue实例上的属性变化，活某些特定数据的变化，然后执行某些具体的业务逻辑操作。

应用场景：用于处理当一个属性的值发生变化时，需要执行某些具体的业务逻辑操作，或要在数据变化时执行异步活开销交大的操作。


> 以下是遇到的其它问题，我这边先把题目整理出来，后期都会补上
### 四个元素田字格排列

第一种实现方式
```html
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>测试</title>
    <style>
        .cc {
            width: 400px;
            height: 400px;
        }
        .c1 {
            width: 200px;
            height: 200px;
            background: #000;
            float: left;
        }
        .c2 {
            width: 200px;
            height: 200px;
            background: green;
            float: left;
        }
        .c3 {
            width: 200px;
            height: 200px;
            background: navy;
            float: left;
        }
        .c4 {
            width: 200px;
            height: 200px;
            background: red;
            float: left;
        }
    </style>
</head>
<body>
    <div class="cc">
        <div class="c1"></div>
        <div class="c2"></div>
        <div class="c3"></div>
        <div class="c4"></div>
    </div>
</body>
</html>
```

第二种简单点的
```html
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>测试</title>
    <style>
        .c1{
            width: 100px;
            height: 100px;
            background: black;
            float: left;
        }
        .c2{
            width: 100px;
            height: 100px;
            background: green;
            float: left;
        }
        .c3{
            width: 100px;
            height: 100px;
            background: navy;
            float: left;
            clear: left;

        }
        .c4{
            width: 100px;
            height: 100px;
            background: yellow;
            float: left;
        }
    </style>
</head>
<body>
    <div class="c1"></div>
    <div class="c2"></div>
    <div class="c3"></div>
    <div class="c4"></div>
</body>
</html>
```
### js实现数组公共前缀

思路：
- 当字符串数组长度为0时，直接返回空
- 令最长公共前缀ans的值为第一个字符串，进行初始化
- 遍历后面的字符串，一次将其与ans进行比较，两两找出公共前缀，最终结果即为最长公共前缀。
- 如果查找过程中出现了ans为空的情况，则公共前缀为空，直接返回

```javascript
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
        if(strs.length <= 0) {
            return ''
        }
        let ans = strs[0]
        for(let i = 0; i< strs.length;i++) {
            let j = 0;
            for(;j<= ans.length && j< strs[i].length; j++) {
                if(ans[j] !== strs[i][j]) {
                    break
                }
            }
            console.log(strs[i].substr(0, j))
            ans = strs[i].substr(0, j);
            if(ans == '') {
                return '';
            }
        }
        return ans
    };
```


### vue常用的模板语法
    
- v-for 循环
- v-html 输出原始html
- v-model 实现数据双向绑定
- v-on 监听dom事件 缩写：
- v-bind 用于响应式更新htmlattribute 缩写@
- v-if 根据表达式来决定是否插入元素

### typeof 和instance的区别

- typeof:
    
    typeof 是一个一元运算，放在一个运算数之前，运算数可以是任意类型。返回值是一个字符串，该字符串说明运算数的类型。
- instanceof
    instanceof 主要的目的是用来检测引用类型，返回值只有true和false

### 闭包的优点和缺点

- 概念 
    
    闭包就是能够读取其他函数内部变量的函数。
- 三大特性

    - 函数嵌套函数
    - 函数内部可以引用外部的参数和变量
    - 参数和变量不会被垃圾回收机制回收
    
- 优点

    - 希望一个变量长期存储在内存中。
    - 避免全局变量的污染
    - 私有成员的存在

- 缺点
    
    - 常驻内存，增加内存使用量
    - 使用不当会很容易造成内存泄漏
  
示例：
```javascript
function outer() {
    let name = 'jack';
    function inner() {
        console.log(name)
    }
    return inner()
}
outer()();

function sayHi(name) {
    return () => {
        console.log(`Hi! ${name}`);
    }
}
const test = sayHi('xiaoming');
test();
```
虽然sayHi函数已执行完毕，但是其活动对象也不会被小慧，因为test函数仍然饮用者sayHi函数中的name，这就是闭包。
单页因为闭包饮用者另一个函数的变量，导致另一个函数已经不使用了也无法销毁，所以闭包使用过多，会占用较多的内存，这也是一个副作用。

### css 实现向上的剪头

源码如下
```css
    .attr {
        width: 7px;
        height: 7px;
        border-top: 2px solid #000;
        border-right: 2px solid #000;
        transform:rotate(-45deg);
    }
```


### 防抖和节流

> 这个其实也不是很难，就是一些经常使用到的页面优化之类的东西。

> 简单来说就是控制时间的触发频率，优化用户性能。

- 函数防抖

> 函数防抖，就是在触发时间后在 n 秒内函数只执行一次，如果在n秒内又触发了时间，则会重新计算函数时间。

这里的抖动就是执行的意思，而一般的抖动都是持续的，多次的。假设函数持续多次执行，我们希望它最后一次触发结束后再去执行。

简单的说，就是一个动作连续触发，我们只执行最后一次。

- 应用场景：

    -  搜索框用户输入。只需用户最后一次输入。
    -  手机号，账号密码验证输入检测。（表单输入检测）
    -  窗口大小变化，只需窗口调整完成后，计算窗口大小。防止重复执行
    

- 函数节流

> 限制一个函数在一定时间内只执行一次。

节流的意思是让函数有节制的执行，而不是毫无节制的触发一次就执行一次。在一段时间内只执行一次。

- 应用场景：

    - 滚动加载，加载更多
    - 搜索联想功能
    - 高频点击提交，表单重复提交等。


### 前端防CSRF， xss攻击

> CSRF： 跨站请求伪造，攻击者使用模仿参数请求服务器。获得一些数据。

防止CSRF攻击的方式有多种：

- 前端增加验证码，检查请求是否来自合法的源
- 通用方法：请求加入token（令牌）可以放入header中，token 的值是随机的（使用安全算法随机生成）

> XSS: 跨站脚本攻击，攻击者借用输入请求模拟脚本，在没有验证是否有不可信数据的情况下，发送给网页浏览器，从而劫持用户会话，危害网站，或者将用户信息转向恶意网站

防止XSS攻击的方式：

- 所有输入对内容做格式检查，可以让一些有特殊字符的攻击失效。（比如html， script等标签做一些特定的替换）
- 富文本：对一些特定的标签，比如iframe， script， base，form等标签严格禁止、
- 输入位置特定内容，应该填什么和不应该填什么。


> 下面是我搜的几个感觉面试的会问的问题。。。 我第一次面前端。

### 宏任务，微任务

- 宏任务： 当前调用栈中执行的任务成为宏任务（主代码块，定时器等等）
- 微任务： 当前宏任务执行完，在下一个宏任务开始之前需要执行的任务为微任务（可以理解为回调，callback，promise.then）
- 宏任务中的事件放在callback queue中，由时间出发线程维护，微任务的时间放在微任务队列中，用js引擎线程维护。

### 页面渲染html的过程

- 浏览器解析html源码，创建dom树
- 浏览器解析css代码，计算出最终的样式数据。
- 渲染dom树
- 一旦渲染树创建好了，浏览器根据渲染树绘制到屏幕上

> 这题应该还有一个就是解释下从用户输入请求到展示页面都进行了什么操作？ 我这边都列出来。

- 用户输入浏览器请求，浏览器进行地址解析。
- 应用层将解析后的地址进行域名解析。
- 传输层进行tcp三次握手，建立tcp连接。
- 应用层客户端向web服务器发送http请求
- 网络ip协议查看Mac地址
- 服务器收到处理请求。
- 服务器发送http响应报文，浏览器收到服务器响应，得到html代码
- 之后进行html渲染

### 介绍下盒子模型
盒模型的组成，由里向外 content，padding， border， margin
在ie盒子模型中，width表示content + padding + border这三个部分的宽度
在标准盒子模型中，width指content的部分的宽度。


> 今天先整理这么多，然后遇到的都是一些更深入的题目，总的来说，我这边基础太差了！后面需要弥补的东西还是太多。后期的学习计划也安排上了。希望可以更多的弥补自己的不足。这篇文章会持续更新。


#### 感谢阅读。



