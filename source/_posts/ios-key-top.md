---
title: IOS在web端调起键盘时页面上升解决方案
date: 2019-07-11 11:34:18
tags:
- Javascript
- ios
---

## IOS在web端调起键盘时页面上升解决方案

> ios在web端如果有键盘输入框的话，如果你页面有postion: fixed 这个属性，有这个属性的地方只要调起键盘之后整体会上浮一段距离。
> 所以说能感觉到input的焦点会上升一段距离，但是页面布局没有动。

![图先欠着](http://liahu.cauyyl.com/huananstudio1.png)

> 极大影响了用户的体验感。
> 此处的解决思路是，每当用户从input失去焦点时，把scollTop值设为0
> 方法如下

```
    // input onblur 时 加入此方法
    resetWindow() {
        let scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
        window.scrollTo(0, Math.max(scrollHeight - 1, 0));
    }
```

> 此时效果图：

![图先欠着](http://liahu.cauyyl.com/huananstudio1.png)

