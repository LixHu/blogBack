---
title: 【React&后端】手摸手带你搭建一个表情包管理网站（一）
date: 2020-04-23 13:14:01
tags:
- React
- JavaScript
categories:
- React
- JavaScript
---

# 开源项目- 爱发表情，网站域名待定

> 使用语言：

- 前端：
1. React
2. Typescript
3. React-router
4. mobx
5. axios
6. sass
7. ant-design

- 后端
1. Laravel
2. Python ? (打算做爬虫处理，但是可有可无)

> 当前按每个步骤来，首先我这边先讲解下前端环境的搭建，每个步骤我都会详细来讲，跟着我的步骤我来手摸手的带着你们一起来做吧！

## 前端搭建环境：

> 全局安装Typescript
```
    npm install -g typescript
```

> 前端使用react-create-app 创建环境(包括typescript)
```
    npx create-react-app fabiaoqing --typescript
    # 或者
    yarn create-react-app fabiaoqing --typescript
```

> 将typescript添加到create-react-app项目，需安装一下内容

```
    npm install --save typescript @types/node @types/react @types/react-dom @type/jest
    # 或者
    yarn add typescript @types/node @types/react @types/react-dom @type/jest
```


> 我这边前期是没有装redux & fetch & sass ，项目前期没有用到，后面该用的时候我这边会一步步安装, 如果你们前期需要安装，请转到下一章查看： [跳转地址](test)

>  配置好之后目录应该是这样的

```
 |-- fabiaoqing
     |-- package.json
     |-- README.md
     |-- tsconfig.json
     |-- yarn.lock
     |-- .idea
     |   |-- .gitignore
     |   |-- fabiaoqing-react.iml
     |   |-- misc.xml
     |   |-- modules.xml
     |   |-- vcs.xml
     |   |-- workspace.xml
     |   |-- inspectionProfiles
     |       |-- Project_Default.xml
     |-- config
     |   |-- env.js
     |   |-- getHttpsConfig.js
     |   |-- modules.js
     |   |-- paths.js
     |   |-- pnpTs.js
     |   |-- webpack.config.js
     |   |-- webpackDevServer.config.js
     |   |-- jest
     |       |-- cssTransform.js
     |       |-- fileTransform.js
     |-- public
     |   |-- favicon.ico
     |   |-- index.html
     |   |-- logo.png
     |   |-- logo192.png
     |   |-- logo512.png
     |   |-- manifest.json
     |   |-- robots.txt
     |-- scripts
     |   |-- build.js
     |   |-- start.js
     |   |-- test.js
     |-- src
         |-- index.css
         |-- index.tsx
         |-- App.css
         |-- App.test.tsx
         |-- App.tsx
         |-- logo.svg
         |-- react-app-env.d.ts
         |-- serviceWorker.ts
         |-- setupTests.ts
         |-- router
         |   |-- index.ts

```

> 安装antd,步骤如下，根据官网安装即可， 我这边只说yarn 的安装方法，npm 的安装方法去官网查看[antd在TypeScript中使用](https://ant.design/docs/react/use-in-typescript-cn)

> 首先安装装antd
```
    yarn add antd
```
> 然后根据高级配置，配置react-app-rewired（一个对 create-react-app 进行自定义配置的社区解决方案）。

```
    yarn add react-app-rewired customize-cra
```
> 安装完成后修改 package.json, 只需修改start， build， test。 eject不用修改，eject 后面有用处
```
    "scripts": {
    -   "start": "react-scripts start",
    +   "start": "react-app-rewired start",
    -   "build": "react-scripts build",
    +   "build": "react-app-rewired build",
    -   "test": "react-scripts test",
    +   "test": "react-app-rewired test",
    }
```
> 然后创建一个 config-overrides.js 用于修改配置

```
    module.exports = function override(config, env) {
      // do stuff with the webpack config...
      return config;
    };
```

> 使用babel-plugin-imoport（ant的按需加载组件代码和样式的babel插件）
```
    yarn add babel-plugin-import
```
> 安装完成后修改config-overrides.js

```
    + const { override, fixBabelImports } = require('customize-cra');
    
    - module.exports = function override(config, env) {
    -   // do stuff with the webpack config...
    -   return config;
    - };
    + module.exports = override(
    +   fixBabelImports('import', {
    +     libraryName: 'antd',
    +     libraryDirectory: 'es',
    +     style: 'css',
    +   }),
    + );
```
> 其它配置去官网查看，我这边就说到这里。基本配置到这项目antd就可以正常运行了

#### 运行项目测试antd 是否正常

> 修改App.tsx 内容如下

```
     // src/App.tsx
      import React, { Component } from 'react';
      import { Button } from 'antd';
      import './App.css';
    
      class App extends Component {
        render() {
          return (
            <div className="App">
              <Button type="primary">Button</Button>
            </div>
          );
        }
      }
    
      export default App;
```

> 之后直接运行 yarn start 查看button是否和官网的一致就ok 了。 这期就说到这里，然后下篇文章我会更新react-router 的安装以及使用，只是自己的记录，也是方便后期如果有再搭建这个项目的时候的备份，我这边也是根据官网一步步来的。
>如果有问题的话，可以直接在下面进行回复


> 记录这个东西的开始，只是可以让我这边的开源代码更公开一点。这边会把每个步骤都记录下来，因为我这边代码可能会每日进行更新，所以我每天都会记录。

> 有错误的地方还是勿喷，因为我这边对react框架也不是很熟悉，这样记录下来应该会对自己有提升吧。感谢查看此篇博客。

