---
title: 【React&后端】手摸手带你搭建一个表情包管理网站（四）
date: 2020-05-25 23:33:52
tags:
- TypeScript
- React
- mobx
categories:
- React
- JavaScript
- mobx
---

> 最近看了redux很久，但是还是决定不用了，不是没学会，是感觉太繁琐，就一个简单的网站主页，感觉没必要套那么复杂的东西，就决定用了mobx，也对自己有点小失望，哈哈哈，最近也在备考，学习成本有点大了。

> 下面我们就来讲怎么安装和使用mobx，这边前期一直用的yarn，所以这边一直会用yarn安装

1. 首先安装mobx & mobx-react 
```
    yarn add mobx mobx-react
```
> 其实mobx这边不需要ts的包装，这边只需要安装mobx 和mobx-react即可。

> 然后创建stores 目录，放入ui.ts 文件(放入的是ui的公共变量以及可变变量，这边的配置还是看个人习惯。)

```
    import { observable, computed, action} from "mobx";
    
    class UIStore {
        @observable exList: Array<any> =  [123, 321, 123, 123, 123, 123];
        @observable activeMenu: string = 'index';
    
        @action setActiveMenu = (index: string) =>{
            this.activeMenu = index
        }
    
        @action setExList = (value: Array<any>) => {
            this.exList = value
        }
    }
    
    export default UIStore
```

> 接着在当前目录创建index.ts 用来初始化uiStore

```
    import UIStore from './ui'
    
    const initStore = () => ({
        ui: new UIStore
    })
    
    export { initStore }
```

> 至此，项目文件中的mobx的基本文件创建完毕，接下来我们来使用mobx吧

> 在index.tsx 中编辑文件 引入 mobx （目录结构和其它配置等在前几篇文章，这边就不一一介绍了） 如果感兴趣可以去看一下。
```
    import { initStore } from "./stores";
    import * as mobx from 'mobx';
    import { Provider } from 'mobx-react';
```
> 这边引入了mobx初始化文件和mobx 以及mobx-react中的Provider

> render 里面修改结构

```
    ReactDOM.render(
      // <React.StrictMode>
+        <Provider ui={ store.ui }>
            <App />
+        </Provider>,
      // </React.StrictMode>
      document.getElementById('root')
    );
```

> 这样，我们就能在组件中使用mobx的功能了。下面开始使用

> 修改 component/IndexCard/index.tsx

```
import React from "react";
import { Card, List } from "antd";
import { inject, observer } from "mobx-react";

- export interface CardInterface { Items?: Array<any> }
@inject('ui') @observer
- export default class IndexCard extends React.Component<CardInterface, any> {
+ export default class IndexCard extends React.Component<any, any> {
    componentDidMount(): void {
    }

    render() {
+        let { exList } = this.props.ui
        return (
            <div>
                <Card title="最新表情" style={{ width: "70%" }}>
                    <List  grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 4,
                        lg: 4,
                        xl: 6,
                        xxl: 3,
-                    }} dataSource={ this.props.Items } renderItem={ item => (
+                    }} dataSource={ exList } renderItem={ item => (
                        <List.Item>
                            <img src='/logo.png' alt="" width="100%" height="100%"/>
                        </List.Item>
                    )}/>
                </Card>
            </div>
        )
    }
}

```

> 这样的展示效果和上面一期的结果是一样的，可以测试一下，<font color='red'>上面的 - 是删除的内容， + 是更新的内容</font>，复制的时候可以注意一下

> 先说到这里，后面会更新后端异步请求和接口的布置文件，应该更新会比较晚，马上考试了。2333 ，等吧。这个月应该还会更新一波~