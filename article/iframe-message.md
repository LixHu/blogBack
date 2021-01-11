
---
title: iframe跨域同域子父通信方法
date: 2019-05-15 10:05:12
tags: 
- JavaScript
categories:
- JavaScript
---

##### 前端iframe同域互相调用方法

* 假设A.html 与B.html domain 都是localhost(本地同域)
* A.html中有iframe嵌入B.html name=myiframe
* A.html 有js function fMain()
* B.html 有js function fMain()
* <font color='red'>需要实现A.html调用B.html mainIframe(), B.html调用A.html的mainIframe()</font>


<h4 style="color:red;">A.html</h4>

```
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>A</title>
        <script>
            function mainIframe() {
                alert('A.html function success');
            }
    
            function exec_iframe() {
                window.myframe.mainIframe();
            }
        </script>
    </head>
    <body>
        <p>A.html</p>
        <p><input type="button" value="exec iframe function" onclick="exec_iframe()"></p>
        <iframe src="B.html" name="myframe" frameborder="0" width="500" height="500"></iframe>
    </body>
    </html>
```

<h4 style="color:red;">B.html</h4>

```
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>B</title>
        <script>
            function mainIframe() {
                alert('B.html function success');
            }
    
            function exec_main() {
                parent.mainIframe();
            }
        </script>
    </head>
    <body>
    <p>B.html</p>
    <p><input type="button" value="exec main function" onclick="exec_main()"></p>
    </body>
    </html>
```

点击A.html的button 调用的是B.html中的方法
![avatar](http://liahu.cauyyl.com/1557971719847.jpg)

点击B.html的button 调用的是A.html中的方法
![avatar](http://liahu.cauyyl.com/1557971738047.jpg)

#### 跨域互相调用方法

- 假设A.html的 domain 是http://a.com ， B.html 的domain 是http://b.com
- A.html中的iframe嵌入B.html, name=myframe
- A.html有js function fMain()
- B.html有js function fIframe()

<font color='red'>需要实现A.html调用B.html的fIframe(), B.html调用A.html的fMain()</font>

如果上面是同域的方法，浏览器判断A.html和B.html不同域，会有错误提示。

![avatar](http://liahu.cauyyl.com/1557976836471.jpg)

实现原理：
因为浏览器为了安全，禁止不同域访问。<font color="red">因此只要调用与执行的双方是同域则可以互相访问</font>

首先，A.html 如何调用B.html的fIframe方法

1. 在A.html创建一个iframe
2. iframe的页面放入B.html 同域下，命名为execB.html
3. execB.html里有调用B.html fIframe 方法的js调用

这样，A.html 就能通过execB.html调用B.html的 fIframe 方法了

同理，B.html 需要调用A.html fMain方法，需要在B.html 嵌入与A.html 同域的 execA.html 

execA.html 里有调用 A.html fMain 方法的js 调用

<h4 style="color:red;">A.html</h4>

```
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>A</title>
        <script>
            // main js function
            function fMain(){
                alert('a.html function success');
            }
    
            // exec iframe function
            function exec_iframe(){
                if(typeof(exec_obj)=='undefined'){
                    exec_obj = document.createElement('iframe');
                    exec_obj.name = 'tmp_frame';
                    exec_obj.src = 'http://b.com/execB.html';
                    exec_obj.style.display = 'none';
                    document.body.appendChild(exec_obj);
                }else{
                    exec_obj.src = 'http://b.com/execB.html?' + Math.random();
                }
            }
        </script>
    </head>
    <body>
    <p>A.html</p>
    <p><input type="button" value="exec iframe function" onclick="exec_iframe()"></p>
    <iframe src="http://b.com/B.html" name="myframe" frameborder="0" width="500" height="500"></iframe>
    </body>
    </html>
```

<h4 style="color:red;">B.html</h4>

```
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>B</title>
        <script>
            function fIframe(){
                alert('b.html function success');
            }
    
            // exec main function
            function exec_main() {
                if (typeof (exec_obj) == 'undefined') {
                    exec_obj = document.createElement('iframe');
                    exec_obj.name = 'tmp_frame';
                    exec_obj.src = 'http://a.com/execA.html';
                    exec_obj.style.display = 'none';
                    document.body.appendChild(exec_obj);
                } else {
                    exec_obj.src = 'http://a.com/execA.html?' + Math.random();
                }
            }
        </script>
    </head>
    <body>
    <p>B.html</p>
    <p><input type="button" value="exec main function" onclick="exec_main()"></p>
    </body>
    </html>
```

<h4 style="color:red;">execA.html</h4>

```
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
    </head>
    <body>
        <script>
            parent.parent.fMain();
        </script>
    </body>
    </html>
```

<h4 style="color:red;">execB.html</h4>

```
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
    </head>
    <body>
        <script>
            parent.window.myframe.fIframe();
        </script>
    </body>
    </html>
```

执行如下图
![avatar](http://liahu.cauyyl.com/1557978129803.jpg)


![avatar](http://liahu.cauyyl.com/1557978154771.jpg)