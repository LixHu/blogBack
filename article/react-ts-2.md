---
title: 【React&后端】手摸手带你搭建一个表情包管理网站（二）
date: 2020-04-26 21:12:46
tags:
- React
- JavaScript
categories:
- React
- JavaScript
---

# 开源项目- 爱发表情，网站域名待定

> 上期介绍了基本的react-create-app的安装与使用，这期更新react-router的安装以及使用

> 如果想了解基本安装和使用请查看上篇文档[【React&后端】手摸手带你搭建一个表情包管理网站（一）](https://lixhu.github.io/2020/04/23/react-ts-1/)

### react-router 在ts中使用
> 首先，安装react-router，因为需要ts支持，所以安装@types 下的react-router 等功能

```
    yarn add react-router react-router-dom @types/react-router @typs/react-router-dom
```

> 接着建立一个文件夹，放一些路由文件，我这边建立的文件夹是router文件夹，目录结构如下,放到了src下面的router，
> 以及支持react的ts写法， 来规范整个项目结构的文件夹assets

```
    |-- src
        |-- assets
        |   |-- common.tsx
        |   |-- interface.ts
        |-- router
        |   |-- index.ts
```

> router/index.ts 内容如下，基本的react-router 配置, 因为是我编辑好的，所以直接就上我项目代码。后期可能还会有更新，目前结构如下

```
    import App from '../view/App';
    import Home from '../view/Home';
    import Hot from '../view/Hot';
    
    const routes = [
        {
            path: '/App',
            component: App
        },
        {
            path: '/hot',
            component: Hot,
        },
        {
            path: '',
            component: Home
        }
    ];
    
    export default routes;
```

> 接着编辑规范文件， assets/interface.ts , 定义路由参数的格式， 这边使用接口定义
```
   interface routeInterface {
       path: string,
       component: any,
       routes?: Array<any>
   }
   
   export type RouteInterface = routeInterface
```
> 然后创建一个tsx 文件，作为路由的使用，我这边命名为common.tsx 放在assets目录， 结构如下,这边定义的接口规范以及使用router的时候的规范，定义整个路由的规范等
```
    import React from 'react';
    import {
        Route
    } from 'react-router-dom';
    import { RouteInterface } from './interface';
    
    const RouteWithSubRoutes = (route: RouteInterface, index: number) => {
        return (
            <Route
                key={ index }
                path={route.path}
                render={props => (
                    <route.component {...props} routes={route.routes} />
                )}
            />
        );
    }
    
    export {
        RouteWithSubRoutes
    }
```
> 接着，我们来使用router来试一下，我这边App.tsx 换了目录结构，上期的目录结构更改了一下，所以，这边把我自己的目录结构发一下，你们如果无需更改的话就不用作为参考

```
    |-- src
        |-- view
            |-- App.css
            |-- App.test.tsx
            |-- App.tsx
            |-- Home
            |   |-- index.tsx
            |-- Hot
                |-- index.tsx
```
> 改文件目录时，在index.tsx 中一定要吧 import App from './App'; 改成 import App from './view/App';


> 废话不多说，直接编辑App.tsx, 使用react， 我这边做了样式，基本使用主要还是 <Switch> & <Link>

```tsx
    import React from 'react';
    import {
        BrowserRouter as Router,
        Switch,
        Link
    } from 'react-router-dom';
    import routes from '../router';
    import { RouteWithSubRoutes } from '../assets/common';
    import { RouteInterface } from '../assets/interface'
    import { Layout, Menu } from "antd";
    import './App.css';
    
    
    const { Header, Content, Footer } = Layout;
    const Items = [
        { index: 1, link: '/home', title: '首页' },
        { index: 2, link: '/hot', title: '热门表情' },
    ];
    
    const App: React.FC = () => {
        return (
            <Router>
                <Layout>
                    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                        <div className="logo"> <img src="/logo.png" alt=""/></div>
                        <Menu mode="horizontal" defaultSelectedKeys={['1']}>
                            { Items.map((val: any, key: number) => (
                                <Menu.Item key={ val.index } >
                                    <Link to={ val.link }>{ val.title }</Link>
                                </Menu.Item>
                            ))}
                        </Menu>
                    </Header>
                    <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 600 }}>
                            <Switch>
                                {routes.map((route: RouteInterface, i: number) => {
                                    return RouteWithSubRoutes(route, i)
                                })}
                            </Switch>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant</Footer>
                </Layout>
            </Router>
        );
    }
    
    export default App;
```

> 好了，这期就到这里，这边现在cdn还没配置好，等配置好之后我在上传个图片之类的，基本上按照上面配置已经可以行得通了。如果跑不通，可以再下方评论区回复，我看到会一一回答的。可以帮你看看配置文件之类的。
