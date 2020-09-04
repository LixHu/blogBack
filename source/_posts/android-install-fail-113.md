---
title: android studio 打包之后手机安装不上问题
date: 2020-09-04 09:57:45
tags:
- android
- uni-app
---

> Android打包之后使用adb安装apk文件时报错信息如下：
```
 Failure [INSTALL_FAILED_NO_MATCHING_ABIS: Failed to extract native libraries, res=-113]
```

> 灵感来源：[根据不同的cpu架构打包](https://juejin.im/post/6844903522392080392)

> 看到这篇文章之后，有根据不同的CPU打包，不如直接在配置中放入配置文件，所有的架构打一个包。配置文件如下：

> 在android 的defaultConfig中加入ndk目录，后面加上所有的cpu支持
```
android{
    ...
    defaultConfig {
        ndk {
            abiFilters 'x86', 'armeabi-v7a','x86_64'
        }
    }
    ...
}

```