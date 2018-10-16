---
title: Vue-Echarts 安装步骤以及需要注意的内容
date: 2018-10-16 17:30:46
tags:
- VUE
- Echarts
---

# Vue-Echarts 安装步骤以及需要注意的内容

## github 仓库地址： <a href='https://github.com/ecomfe/vue-echarts'>Vue-echarts</a>
## 安装步骤 安装cli 和 创建项目就不多废话了
 - 首先安装好vue-cli创建一个项目，运行
 ```
    $ npm install vue-echarts
 ```
## 其它也就不废话了，git 仓库里面有详细说明


### 主要要注意的是，echarts 的所有组件可能要一个个的引入，今天碰到的问题是title 和 legend 不显示，搞了半天，所有的组件都要重新引入
- 例：
```
    import ECharts from 'vue-echarts/components/ECharts'
    import 'echarts/lib/chart/line'
    import 'echarts/lib/component/title'
    import 'echarts/lib/component/legend'
    import 'echarts/lib/chart/bar'
```
- 比如上面这些代码，没个图形在chart 里面，每个组件在component 里面，按需引入