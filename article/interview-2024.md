---
title: 前端面试记录以及整理
date: 2024-04-19 10:19:30
tags:
- 面试题
categories:
- 面试题
---
# 框架系列

## Vue框架 

### 1. Vue 和 React 的相同点和区别。
 相同点：
   - 都有组件化思想
   - 都支持服务端渲染
   - 都有虚拟DOM
   - 数据驱使视图
   - 都有支持Native的工具
   - 都有自己的构建工具

 区别：
   - 数据流向的不同，react是单向数据流，而Vue是双向数据流。
   - 数据变化的实现原理不同。react是不可变数据，而Vue使用的是可变数据
   - 组件化通信不同，react中通过使用回调函数来进行通信的，而Vue中子组件向父组件传递消息有两种方式：事件和回调函数
   - diff算法不同。react主要使用diff队列保存哪些要更新的DOM，得到Patch树，再统一操作批量更新DOM，vue使用的是双向指针，边对比，边更新dom。

### 2.Vue和React的生命周期：

Vue的生命周期：

    - 创建阶段 beforeCreate， Created
    - 挂载阶段 beforeMount Mounted
    - 运行阶段 beforeUpdate Updated
    - 销毁阶段 beforeDestroy Destroyed
React的生命周期：

    - 创建阶段 constructor render componentDidMount
    - 更新阶段 shouldComponentUpdate render componentDidUpdate
    - 卸载阶段 componentWillUnMount

### 3. SPA单页面应用首屏加载慢怎么解决？
要解决首屏加载慢的原因首先要知道是什么问题造成的：

- 网络延时问题
- 资源文件体积过大
- 资源是否重复发送请求
- 加载脚本的时候，渲染内容堵塞了

解决方法：

- 减小入口文件体积
- 静态资源本地缓存
- UI框架按需加载
- 图片资源压缩
- 组件重复打包
- 开启GZIP压缩
- 使用SSR

### 4. Vue2 和Vue3的区别

性能优化： 重写了虚拟DOM，提升了渲染性能，Vue3的Tree-Shaking支持更好，构建时剔除了未使用的代码，打包体积更小。

响应式系统的改进：Vue3使用了Proxy，Vue2 使用Object.defineProperty, 提供了更好的类型判断，使得在ts等静态类型语言中开发更加友好

组件化改进：采用了Composition API，vue2 采用options API。

TS支持更加完善：vue3支持ts，更易开发，更易维护，更易测试。

### 5. vue computed 和 watch 的区别
computed： 计算属性，依赖其他属性值，并且当依赖的属性值发生变化时，会重新计算，并且缓存计算结果，只有依赖的属性值发生变化时才会重新计算。
watch： 监听属性，当属性值发生变化时，会执行回调函数，可以执行一些逻辑操作。

### 6. Vue2 的data属性为什么是一个函数而不是一个对象
根实例对象的data可以是对象也可以是函数（根实例是单例的），不会产生污染情况
组件实例必须是函数，目的是为了防止多个组件实例对象公用一个data，产生数据污染，采用函数的形式，
initData 时会将其作为工厂函数，每次创建组件实例时，都会调用该函数，返回一个新的对象。

### 7. V-for 和 V-if 为什么不建议一起使用
每次渲染都会先循环再进行条件判断，带来性能浪费
如果要避免出现这种情况，则在外层套一个template（页面渲染不生成DOM节点）在这一层进行v-if 判断，然后在内部进行v-for循环
如果条件出现循环内部，可通过计算属性computed 提前过滤

### 8. VueX 和Pinia的区别
 - pinia 没有mutation，通过action修改state数据
 - pinia 没有modules 配置，通过defineStore生成出来
 - pinia state是一个对象

### 9. Vue diff算法的原理

diff算法的实现原理是从根节点开始逐层遍历新旧两个DOM树，比较节点的类型、属性和子节点等内容。
如果节点有差异，则记录该差异，并将其添加到一个差异队列中。在比较完成后，对于存在差异的节点，
根据其类型进行相应的更新操作，比如替换节点，修改属性，移动节点位置等。

vue2: 

首先比较新旧节点的标签名称，如果不同，直接替换成新节点。如果标签名相同，则比较旧节点的
属性和时间，如果不同，替换成新节点。

如果节点相同，则比较节点的子节点，如果子节点不同，则继续比较自己点，知道所有子节点比较完成。

如果子节点也相同，则不需要更新，直接退出比较。

vue3:

双端对比算法及静态标记。
头和头比，尾和尾比，基于最长递增子序列进行移动添加删除。

## React框架

### 1. 常用的hook
- useState 定义state对象以及回调函数
- useEffect 副作用hook
- useLayoutEffect 有DOM操作的副作用hook，作用是在DOM更新完成之后执行某个操作。
- useMemo 只有在依赖项发生变化的时候才会重新调用该函数， 返回任何，函数、对象都可以
- useCallback 返回一个函数
- useRef 返回一个子元素索引
- useContext 是让子组件之间共享父组件传入状态的。
- useReducer 从状态管理中获取想要的状态。

### 2. Redux 和 mobx的区别
- Redux更多的是遵循函数式编程思想，而mobx更多的是从面向对象角度考虑问题。
- Redux将共享的应用数据集中在一个大的store中，而mobx通常将模块将应用状态划分，在多个store中管理。
- Redux默认以原生对象存储数据，而mobx使用可观察对象。
- Redux对象通常是不可变的，而mobx可以直接使用新值更新状态对象。
- Redux更适合大型项目，mobx更适合小型项目。

### 3. React 真实DOM 和虚拟DOM的区别，以及优缺点。
RealDOM： 真实DOM，意思是文档对象类型。在页面渲染的每一个节点都是一个真实DOM结构。
VirtualDOM: 虚拟DOM，本质上是JavaScript对象存在的形式对DOM的描述。
区别：
- 虚拟DOM不会进行排版和重绘操作，而真实DOM会频繁进行排版和重绘。
- 虚拟DOM的总损耗是“虚拟DOM增删改+真实DOM差异增删改+排版和重绘”，真实DOM的总损耗是“真实DOM完全增删改+排版和重绘”

优缺点：
- 真实DOM的优势：
    - 易用
- 真实DOM的缺点：
    - 效率低，解析速度慢，内存占用量过高。
    - 性能差，频繁操作真实DOM，易于导致重绘与回流。
- 虚拟DOM的优势：
    - 简单方便：如果手动操作真实DOM来完成页面，繁琐又容易出错，在大规模应用维护起来也很困难。
    - 性能方面：使用虚拟DOM，能够有效的避免真实DOM树频繁更新，减少多次引起重绘与回流，提高性能。
    - 跨平台：React借助虚拟DOM，带来了跨平台的能力，一套代码多段运行。
- 虚拟DOM的缺点：
    - 在一些性能要求极高的应用中使用虚拟DOM无法进行针对性的极致优化。
    - 首次渲染大量DOM时，由于多了一些虚拟DOM的计算，速度比正常稍慢。

## JavaScript基础

### 1. 什么是闭包， 闭包的优点和缺点
闭包是指有权访问另一个函数作用域中的变量的函数。闭包是在其词法作用域外部执行的函数，它使用这个作用域中的变量。闭包是一种保护私有变量的机制。
优点： 
- 可以访问外部函数的变量
- 可以保护私有变量
- 可以实现数据封装
- 可以实现模块化
- 可以减少全局变量的使用
缺点：
- 闭包会使得内存泄漏
- 闭包会使得性能下降

### 2. 什么是防抖和节流
防抖：防抖是指在一段时间内，不管触发多少次回调，只执行最后一次。防抖的实现方式是使用定时器，当触发事件时，清除定时器，然后重新设置定时器。
节流：节流是指在一段时间内，不管触发多少次回调，只执行一次。节流的实现方式是使用时间戳，当触发事件时，获取当前时间戳，然后与上一次触发事件的时间戳进行比较，如果大于指定时间间隔，则执行回调。

### 3. 什么是事件委托
事件委托是指将事件绑定到父元素上，然后通过事件冒泡的原理，将事件委托给父元素的子元素。事件委托的好处是可以减少内存消耗，提高性能。

### 4. typeof 和 instanceof 的区别
typeof 会返回一个变量的基本类型， instanceof 返回布尔值
instanceof 可以准确的判断复杂引用数据类型，但是不能正确判断基础数据类型
typeof 也存在弊端，它虽然可以判断基本数据类型（null除外， typeof null 会返回 object），
但是引用数据类型中，除了function类型以外，其它的也无法判断

### 5. Symbol和Bigint的使用场景
Symbol是一种新的数据类型，用来表示独一无二的值，主要用来解决对象属性名冲突的问题。
BigInt是一种新的数据类型，用来表示大整数，主要用来解决大整数计算的问题。

### 6. JS垃圾回收机制
Javascript 具有自动垃圾回收机制，也就是说，执行环境会负责管理代码执行过程中使用的内存。

原理：垃圾收集器会定期找出不在继续使用的变量，然后释放内存，通常有两种实现方式

标记清除：JavaScript最常用的垃圾回收机制，当变量进入执行环境，标记为“进入环境”， 进入环境的变量内存就不会被释放，当变量离开环境时，则标记为离开环境，
垃圾回收程序运行的时候，会标记内存中存储的变量，然后它会将所有在上下文中的变量，以及在上下文中的变量引用的变量的标记去掉，
在此之后，再被加上标记的变量就是待删除的了，原因是任何在上下文中的变量都访问不到他们了，然后垃圾回收程序进行一次内存清理，销毁代表及的所有值并回收他们的内存。
                    
引用计数：语言引擎有一张“引用表”，保存了内存里面的所有资源的引用次数，如果一个值的引用次数为0，就表示这个值不在用到了，因此可以将这块内存释放掉。

### 7. bind、call、apply的区别， 如何实现一个bind？
apply 接受两个参数，第一个是this的指向，第二个参数是函数接受的参数，以数组形式传入
改变this指向会立即执行，且此方法只是临时改变this指向一次
当第一个参数为null或undefined，则默认指向window

call 方法第一个参数也是this的指向，后面传入一个参数列表
跟apply 一样，改变this指向后原函数会立即执行，且此方法只是临时改变this指向一次
同样，当一个参数为null或undefined，则默认指向window

bind和call很相似，第一个参数也是this的指向，后面传入的也是一个参数列表（但是这个参数列表可以分多次传入）
改变this指向不会立即执行，而是返回一个永久改变this指向的函数

区别：
- 三者都可以改变函数的this指向
- 三者第一个参数都是this指向的对象，如果没有这个参数，或者参数为null或undefined，则默认指向全局window
- 三者都可以传参，apply 是数组，而call是参数列表，且apply和call是一次性传入参数，而bind 可以分为多次传参
- bind是返回绑定this之后的函数，apply和call是立即执行

实现bind：

实现bind的步骤，我们可以分为三步：
1. 修改this指向
2. 动态传递参数
3. 兼容new关键字

整体实现代码如下

```javascript
Function.prototype.myBind = function(context) {
    // 判断调用对象是否为函数
    if (typeof this !== 'function') {
        throw new TypeError('Error')
    }
    // 获取参数
    const args = [...arguments].slice(1), fn = this;
    
    return function Fn() {
        //根据调用方式，传入不同的绑定值
        return fn.apply(this instanceof Fn ? new fn(...arguments) : context, args.concat(...arguments))
    }
}
```
### 8. TCP三次握手和四次挥手
三次握手：建立TCP连接时，需要客户端和服务器总共发送3个包
过程如下：
1. 客户端发送SYN包，请求与服务器建立连接
2. 服务器收到SYN包，确认连接，发送SYN+ACK包
3. 客户端收到SYN+ACK包，确认连接，发送ACK包

四次挥手：TCP终止连接，需要经过四次挥手
过程如下：
1. 客户端发送FIN包，表示自己不再发送数据，等待服务器
2. 服务器收到FIN包，确认收到数据，发送ACK包
3. 如果服务器也想断开连接，则发送FIN包，等待客户端
4. 客户端收到FIN包，确认收到数据，发送ACK包，服务器收到ACK包，断开连接

## CSS系列

### 1. 水平垂直居中的方法,并且写出代码
- flex布局
```css
  .parent {
    display: flex;
    justify-content: center;
    align-items: center;
  }
```
- 绝对定位
```css
  .parent {
    position: relative;
  }
  .child {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
```
- table-cell
```css
  .parent {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
  }
```

### 2. 盒子模型
- 标准盒子模型：浏览器默认的盒子模型，盒子的宽高都和border、padding、margin有关。
- 怪异盒子模型：width 和height 包含了padding 和border 的值。

css中的box-sizing 属性定义了应该如何计算一个元素的总宽高。
- content-box：默认值，width和height只包含内容部分。
- border-box：width和height包含内容、padding和border。
- inherit：继承父元素的box-sizing属性。

### 3. position
- static：默认值，元素不会被定位，元素出现在正常的流中。
- relative：元素相对于其正常位置进行定位。
- absolute：元素相对于最近的已定位的父元素进行定位。
- fixed：元素相对于浏览器窗口进行定位。

## TypeScript

### interface 和type的区别，定义类型时如何选择

- interface 可多次声明合并，type一旦声明无法修改
- type可表示基本类型，联合类型交叉类型等。interface只能定义对象、函数类型
- interface可继承其他接口，type需要使用交叉类型来实现

定义对象、类结构时候使用interface，便于扩展和继承，需要联合类型、交叉类型或者基本类型使用type

## HTTP系列

### 1. HTTP和HTTPS
- HTTP： 是一种用于传输超文本的协议，它使用TCP/IP协议栈。
- HTTPS： 是一种安全协议，它使用TCP/IP协议栈，并使用SSL/TLS协议来加密传输的数据。

区别：
1. HTTPS是HTTP协议的安全版本，HTTP协议的数据传输是明文的，是不安全的，HTTPS使用SSL/TLS协议进行了加密处理，相对更安全。
2. HTTP和HTTPS使用链接方式不同，HTTP使用http://开头，HTTPS使用https://开头。默认端口也不一样，HTTP默认端口是80，HTTPS默认端口是443。
3. HTTPS由于需要涉及加密以及多次握手，所以性能相对HTTP会慢一些。
4. HTTPS需要SSL/TLS证书，需要购买证书，或者使用自签名证书。

### 2. UDP 和 TCP

## ThreeJS & WebGL & Canvas ==

### 1. ThreeJS 中自带灯光的材质
- MeshBasicMaterial: 不受光影响的基本材质，不会考虑任何光照信息。
- MeshLambertMaterial: Lambert 材质，考虑漫反射光照，不会产生高光效果，适用于创建没有镜面反射的表面。
- MeshPhongMaterial: Phong 材质，考虑漫反射光照和镜面反射光照，可以产生高光效果，适用于需要有镜面反射的光滑表面
- MeshPhysicalMaterial: 物理材质，扩展了标准材质，更加精细的模拟物理光照效果，包括金属度和粗糙度等属性

