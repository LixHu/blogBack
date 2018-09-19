---
title: 阿里云服务器搭建LAMP 环境
date: 2018-07-24 11:50:29
tags: Linux
categories:
- Linux
---
# 手动搭建LAMP 过程 

## 安装版本：



apache ：Apache/2.4.6

PHP: 7.2

Mysql : 



### 材料：



阿里云服务器一台

防火墙要放行80 和 3306 端口 以及https 协议的443 端口

安全组放行80，22，3306端口

服务器版本CentOS 7.5

首先登录服务器执行：
```
    yum update -y
```
## 一 安装Apache 服务 
### 1. 安装Apache 
```
    yum install httpd
```
### 2.开启Apache 服务
```
    systemctl start httpd.service
```
### 3.设置Apache 开机启动
```
    systemctl enable httpd.service
```
### 5.开启防火墙80和443 端口，防火墙未开启请忽略，设置完要重启防火墙
```
    firewall-cmd --permanent --zone=public --add-port=80
    firewall-cmd --permanent --zone=public --add-port=443
```
### 6.验证Apache 是否安装成功

访问外网IP，如果看到apache 默认的页面



就是成功安装了

## 二  yum 安装PHP

### 1.安装之前先卸载一下
```
    yum remove php*
```
### 2.yum 源不存在php72 的版本，修改yum 源

```
    rpm -Uvh https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
    rpm -Uvh https://mirror.webtatic.com/yum/el7/webtatic-release.rpm、
```
### 3.yum 安装php72w和各种拓展，选自己需要的即可
```
    yum -y install php72w php72w-cli php72w-common php72w-devel php72w-embedded php72w-fpm php72w-gd php72w-mbstring php72w-mysqlnd php72w-opcache php72w-pdo php72w-xml
```
## 三 安装Mysql
安装mariadb 
```
yum install mariadb mariadb-server mariadb-libs mariadb-devel
```
开启mysql 服务并设置开机启动
```
systemctl start mariadb
systemctl enable mariadb
```
设置数据库密码，输入命令，设置密码，按需设置
```
    mysql_secure_installation
```
查看是否安装完成
```
    mysql -u root -p
```
 输入密码

 四  安装完成 ，测试是否安装完成
```
    cd /var/www/html
    vi index.php
    :wq
    systemctl restart httpd
```
在浏览器查看是否有刚才的修改。如果有就安装完成了。

