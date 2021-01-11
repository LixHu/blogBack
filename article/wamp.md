---
title: WNMP 手动安装
date: 2018-12-22 16:16:59
tags:
 - PHP
categories: 
 - PHP
---

### 第一部分：准备工作.

1. 首先是下载软件。 

- Nginx官网下载：<a href="http://nginx.org/en/download.html">Nginx</a>
- PHP73下载地址：<a href="http://www.php.net/downloads.php">PHP</a>
- Mysql下载地址：<a href="http://www.mysql.com/downloads/mysql/">Mysql</a>
2. 安装mysql软件。
3. 解压Nginx和PHP到你自己安装位置。这里我在D盘新建一个文件夹：WNMP把下面的软件安装到这个文件夹里面。
    Nginx目录D:\WNMP\nginx
    PHP目录D:\WNMP\php73
###第二部分：安装nginx

1. 打开D:\nginx目录，运行该文件夹下的nginx.exe
2. 测试是否启动nginx。打开浏览器访问http://localhost 或 http://127.0.0.1，看看是否出现“Welcome to nginx!”，出现的证明已经启动成功了。没有启动的话，看看80端口有占用没。
注意：该网站的默认目录在"D:\WNMP\nginx\html"下

### 第三部分：安装php（这里主要讲nginx配置启动php，以cgi运行php）

nginx配置文件是conf文件夹里的nginx.conf
```
    location /{
        root   html;
        index  index.html index.htm;
    }
```
修改为
```
     location / {
        root   D:\WNMP/nginx/html;
        index  index.php index.html index.htm;
    }
```
```
    location ~ \.php$ {
        root           html;
        fastcgi_pass   127.0.0.1:9000;
        fastcgi_index  index.php;
        fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        include        fastcgi_params;
    }
```
修改为
```
    location ~ \.php$ {
        root          D:\WNMP/nginx/html;
        fastcgi_pass   127.0.0.1:9000;
        fastcgi_index  index.php;
        fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
        include        fastcgi_params;
    }
```
 

-  D:\wnmp\php73\ext下修改php.ini-development文件，将文件名修改为php.ini，打开php配置文件php.ini，保存即可。
- 搜索“extension_dir”，找到： extension_dir = "ext" 先去前面的分号再改为 extension_dir = "D:\WNMP\php73\ext"
- 搜索“date.timezone”，找到：;date.timezone = 先去前面的分号再改为 date.timezone = Asia/Shanghai
- 搜索“enable_dl”，找到：enable_dl = Off 改为 enable_dl = On
- 搜索“cgi.force_redirect” ;cgi.force_redirect = 1 先去前面的分号再改为 cgi.force_redirect = 0
- 搜索“fastcgi.impersonate”，找到： ;fastcgi.impersonate = 1 去掉前面的分号
- 搜索“cgi.rfc2616_headers”，找到：;cgi.rfc2616_headers = 0 先去前面的分号再改为 cgi.rfc2616_headers = 1

<p style="color:blue;">其他的配置请按照自己的需求更改。</p>

### 第三部分试运行以及编辑运行配置文件
```
    D:
    cd WNMP\php73
    php-cgi.exe -b 127.0.0.1:9000-c D:\WNMP\php73\php.ini
```

D:\WNMP\nginx\html下新建一个index.php，
```
<?php phpinfo(); ?>
```
 
- 访问http://localhost/phpinfo.php
出现如下的信息就说明php已经成功安装:
* 开启php-cgi和nginx.exe，保存为start.bat (自己写的，你们可以自己优化下，我测试了能用就没管了)
```
echo Starting nginx...
D:
cd WNMP\nginx
nginx -s reopen
D:\WNMP\php73\php-cgi.exe -b 127.0.0.1:9000-c D:\WNMP\php73\php.ini
exit
```
* 停止php-cgi和nginx.exe，保存为stop.bat
```
@echo off
echo Stopping nginx...
taskkill /F /IM nginx.exe > nul
echo Stopping PHP FastCGI...
taskkill /F /IM php-cgi.exe > nul
exit
```