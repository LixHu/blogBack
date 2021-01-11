---
title: php安装geoIp扩展及获取用户地址
date: 2019-07-19 10:41:28
tags:
- PHP
categories:
- PHP
---



> 很多时候需要用户需要获取用户ip地址来根据不同的地区来做不同的内容，这时，就需要获取用户ip，但是请求接口时会影响接口速度。所以这时就用到了PHP的GeoIp扩展。

<!-- toc -->

# 安装geoIp扩展
> 1. 安装geoIp扩展 我环境是CentOs ，官网提供的安装方式为

```
   @CentOs 6.4
   # yum install GeoIP-devel
   # pecl install geoip
```

> 或者手动下载包安装

```
   # wget https://pecl.php.net/get/geoip-1.1.1.tgz
   # tar -zxvf geoip-1.1.1.tgz 
   # cd geoip-1.1.1
   # phpize
   # .configure --with-php-config=php-config --with-geoip
   # make && make install 
```

> 2. 然后把extension=geoip.so 加入php.ini 

# 测试geoIp

>  下面就直接用php获取用户的地址信息

```
    <?php
        $ip = $_SERVER['REMOTE_ADDR'];
        $address = geoip_record_by_name($ip);
        var_dump($address);
    ?>
```

> 我知道的region编号所代表的地区如下:

    - 30 广东
    - 22 北京
    - 23 上海
    - 2  浙江
    - 11 湖南
    - 15 甘肃
    - 10 河北
    - 29 云南
    - 25 山东
    - 4  江苏
    - 33 重庆
    - 5  吉林