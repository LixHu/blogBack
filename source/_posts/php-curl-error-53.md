---
title: 记录一次解决PHP Curl errCode 53 的问题
date: 2020-08-21 11:37:31
tags:
- php
- linux
---

> 昨天开发过程中碰到了请求https服务器的时候curl报错53的问题，本地请求完全正常，然后上线之后，请求就一直报错errcode53

> 这里记录一下解决方法，查询了很多办法，有说把sslVersion指定一下，也有升级nss，我的解决方法如下：

> 服务器环境
    
- centos6.4
- php5.6

> 解决方法：
>
1. 升级服务器的nss， curl
    ```
        yum -y update curl
        yum -y update nss
    ```
2. 重启php-pfm
    ```
        service restart php-fpm
   ```

> 也是翻了很久的资料才解决这个坑。之前一直没遇到过。目前解决方法就是这样，如果你按照上面方法没解决的话，在下方评论，我看到了可以帮你一起看一下。