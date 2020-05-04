---
title: 【React&后端】手摸手带你搭建一个表情包管理网站（三）
date: 2020-05-04 21:48:00
tags:
- React
- TypeScript
- JavaScript
---
> 上期介绍了react-router 的安装与使用， 这次没有安装什么东西，直接调试页面把，下期我会更新redux和fetch的安装与使用

> 1.调试页面，首先更改router/index.ts 创建路由页面,本次就创建了两个页面

```
    import App from '../view/App';
    import Home from '../view/Home';
    import Hot from '../view/Hot';
    // import Link from '../views/Link';
    // import Other from '../views/Other';
    
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

> 2. 其次，创建对应路由的文件 src/view/Home/index.tsx src/view/Hot/index.tsx

Home/index.tsx
```tsx
   import React from 'react';
   import IndexCard from "../../component/IndexCard";
   import LeftFlex from "../../component/LeftFlex";
   import RightBorder from "../../component/RightBorder";
   const data = [123, 321, 123, 123, 123, 123];
   const leftMenu = [ 124, 567, 8999 ];
   const buttonList = [
       { title: '不知道111111111111111111111', link: '123' },
       { title: '不知道', link: '123' },
       { title: '不知道', link: '123' },
       { title: '不知道', link: '123' },
       { title: '不知道', link: '123' },
       { title: '不知道', link: '123' },
       { title: '不知道', link: '123' },
       { title: '不知道', link: '123' },
       { title: '不知道', link: '123' },
       { title: '不知道', link: '123' },
       { title: '不知道', link: '123' },
       { title: '不知道', link: '123' },
       { title: '不知道', link: '123' },
       { title: '不知道', link: '123' },
       { title: '不知道', link: '123' },
       { title: '不知道', link: '123' },
       { title: '不知道', link: '123' },
       { title: '不知道', link: '123' },
   ]
   class Home extends React.PureComponent {
   
       render() {
           return(
               <div>
                   <IndexCard Items={ data } />
                   <LeftFlex data={ leftMenu } />
                   <RightBorder list={ buttonList } />
               </div>
           );
       }
   }
   
   export default Home;
```

> 3. 对应的IndexCard LeftFlex RightBorder 内容如下

src/component/RightBorder/index.tsx
```tsx
    import React from 'react';
    import { Button } from "antd";
    import './index.scss';
    
    interface BorderInterface {
        list: Array<{ title: string , link?: string }>
    }
    
    
    class RightBorder extends React.Component<BorderInterface, any> {
        render() {
            return (
                <div className="right-boder">
                    { this.props.list.map((val, key) => (
                        <div className="btn">
                            <Button onClick={ this.toLink.bind(this, val.link)} key={ key } size="small">{ val.title }</Button>
                        </div>
                    ))}
                </div>
            )
        }
    }
    
    export default RightBorder
```

src/component/IndexCard/index.ts
```tsx
import React from "react";
import { Card, List } from "antd";

export interface CardInterface { Items?: Array<any> }

export default class IndexCard extends React.Component<CardInterface, any> {
    render() {
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
                    }} dataSource={ this.props.Items } renderItem={ item => (
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
src/component/LeftFlex/index.ts

```
    import React from "react";
    
    
    class LeftFlex extends React.Component<any, any> {
    
        render() {
            return (
                <div>
                    123
                </div>
            )
        }
    }
    
    export default LeftFlex;
```

> 目前调试好应该是这样子的

![图片](https://liahu.imfast.io/blog-react-1.png)

> 最近因为在找cdn 和其它事情耽误了进程，这边会加紧赶上之前的进度。如果有什么疑问请在下方评论哦，我这边会回复的





