---
title: Laravel安装valet-Mac环境
date: 2019-10-18 17:48:09
tags:
- Laravel
- PHP
- valet
categories:
- Laravel
- PHP
- valet
---

> 当前文章记录mac安装valet的过程，以及中间遇到的问题解答，废话不多说，下面开始安装
#### 安装步骤
1. valet需要 macOs系统和Homebrew。 在安装之前，在确保没有其它程序（如apace或者nginx）占用了本地的80端口
    - 使用 brew update 将 Homebrew 安装或更新到最新版本
    - 使用 brew install php 命令安装php73  （此处可能需要安装xcode，如没有错误就不需要，如果遇到就运行 xcode-select --install 即可 ）
    - 安装composer （这步骤就不废话了，安装就行）
    - 使用composer的 composer global request laravel/valet 命令安装Valet.并确保 ~/.composer/vendor/bin 目录在系统的"PATH"中 （编辑这个东西下面说明）
    - 运行 valet install 命令来配置和安装Valet 和 DnsMasq, 并注册Valet后台服务，随系统运行自行启动。

> 测试
- 安装完 Valet 后，可以尝试使用类似 ping foobar.test 的命令在终端上 ping 任何一个 *.test 的域名。如果 Valet 安装正确，可以在终端上看到来自 127.0.0.1 的响应。
- 每次机器启动时，Valet 会自动启动其进程。所以只要完成了 Valet 的初始化，就无需再次运行 valet start 或 valet install。
- 其余请查看文档[Larave6.0中文文档](https://learnku.com/docs/laravel/6.x/valet/5128)
### 遇到问题及解决方案
> 将~/.composer/vendor/bin 放入系统的"PATH" 中

    ```
        vi /etc/profile
        
        
        // 将下面这行放入最后
        export PATH="~/.composer/vendor/bin:$PATH"
        
        source /etc/profile
        echo $PATH
        // 会出现刚才编辑的~/.composer/vendor/bin:$PATH
    ```
> brew link php 时会报错
```
Linking /usr/local/Cellar/php/7.3.10... 
Error: Could not symlink sbin/php-fpm
/usr/local/sbin is not writable.
```
> 解决方法
```
    cd /usr/local
    sudo mkdir sbin
    sudo chown -R $(whoami) $(brew --prefix)
    brew link php
```
