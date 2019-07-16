---
title: react显示HTML代码： dangerouslySetInnerHTML
date: 2019-07-16 18:52:41
tags:
- react
- react 学习路线
---

> 有时候后台配置前端文案时，需要在前端显示html代码，但是直接输入的话肯定会把字符原样输出，所以，react 提供了这个方法让我们在代码中输出html代码

```
    // content 为一段html代码
    <div dangerouslySetInnerHTML={ { __html:content } }></div>
```
