---
title: SSR一键搭建
date: 2019-09-17 09:47:35
tags:
- ssr
- Linux
- CentOs
---

### 依次执行下面这些链接就可以安装ssr服务器，不过需要国外服务器。国外服务器自己找地方买一下。
```
    wget --no-check-certificate https://freed.ga/github/shadowsocksR.sh; bash shadowsocksR.sh
```
> 然后按提示继续，会需要输入密码，以及选择端口。注意别一直回车就行，默认密码是www.qcgzxw.cn

### 安装锐速
> 首先获取系统内核版本
```
    uname -r
```

> 回车后输出当前系统版本。分为三种情况
1. 结果以 2 开头，例如 2.6.32-696.18.7.el6.x86_64。
    > 这种输出结果说明我们的服务器为 CentOS6 x64 系统
2. 结果以 3 开头，例如 3.10.0-693.11.6.el7.x86_64。
    > 这种输出结果说明我们的服务器为 CentOS7 x64 系统
3. 结果以 4 开头，例如 4.12.10-1.el7.elrepo.x86_64。
    > 这种输出结果说明我们的服务器已经安装 Google BBR 拥塞控制算法，此时已经无法继续安装锐速。

### CentOS6 x64 系统安装锐速
```
    wget --no-check-certificate -O appex.sh https://raw.githubusercontent.com/hombo125/doubi/master/appex.sh && bash appex.sh install '2.6.32-642.el6.x86_64'
```

### CentOS7 x64 系统安装锐速

```
    wget --no-check-certificate -O rskernel.sh https://raw.githubusercontent.com/hombo125/doubi/master/rskernel.sh && bash rskernel.sh
```

> 执行完这条命令会断开连接，重新连接后执行

```
    yum install net-tools -y && wget --no-check-certificate -O appex.sh https://raw.githubusercontent.com/0oVicero0/serverSpeeder_Install/master/appex.sh && bash appex.sh install
```