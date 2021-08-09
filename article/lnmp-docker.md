---
title: docker安装LNMP环境
date: 2021-08-09 14:50:29
tags:
- docker
categories:
- docker
---

### centos 下使用docker 安装 lnmp

#### 前言:
```text
    最近做了一个小程序项目，然后买了一个服务器，之前搭建服务器就是直接用yum装的
    然后最近面试遇到了很多使用docker的问题，所以就想学习一下docker。这期就准备使用docker安装一个环境使用一下。
    服务器镜像使用的是centos8
```

#### 1. 准备docker
下载安装包
```
yum install -y yum-utils device-mapper-persistent-data lvm2
```

可能会遇到网络问题，换一下源
```
yum-config-manager --add-repo https://mirrors.ustc.edu.cn/docker-ce/linux/centos/docker-ce.repo
```
更新缓存，安装docker-ce
```
yum makecache fast
yum install docker-ce
```
启动docker
```
   systemctl enable docker
   systemctl start docker
   
   docker run hello-world
```
添加国内镜像加速，在这边用的是阿里云的镜像加速,下面是配置教程
1. 到阿里云获取镜像地址
    登录阿里云控制台-容器镜像服务-镜像工具-镜像加速器 到此处获取镜像地址，这边因为每个人的不通，我自己打码了
   ![镜像服务1](https://qiniu.lixhuan.com/lnmp-docker1.png)
2. 然后根据下面提供的步骤依次执行代码
```
    sudo mkdir -p /etc/docker
    sudo tee /etc/docker /daemon.json <<-'EOF'
    {
        "registry-mirrors": ["https://xxxx.mirror.aliyuncs.com"]
    }
    EOF
    sudo systemctl daemon-reload
    sudo systemctl restart docker
```
至此，docker安装结束


### 2.拉取镜像(nginx1.21.1,mysql5.7,php7.4)

此处备注一下docker镜像地址，有需要的话到此处去搜索镜像进行pull
[docker镜像地址](https://hub.docker.com/)

1. 拉取mysql镜像
```
    docker pull mysql:5.7
```
2. 启动容器
```shell
docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123 --name do-mysql mysql:5.7

-p 端口映射
-e 配置的密码
--name 容器名称
```
管理容器我放到最后再讲解，因为后面遇到几个坑

3.拉取php
```shell
docker pull php:7.4-fpm
```

4.创建phpfpm 容器
```shell
docker run -d -v /home/www/html:/var/www/html -p 9000:9000 --link do-mysql:mysql --name do-phpfom php:7.4-fpm

-v 挂载本地目录到镜像
--link 挂载容器 后面跟的是容器名称
```

5.进入fpm容器并修改配置项
```shell
# 进入容器
docker exec -it do_phpfpm bash
# 安装扩展
docker-php-ext-install pdl_mysql (....) # 安装更多扩展请自行配置
# redis
pecl install redis && docker-php-ext-enable redis
```

6.获取nginx 镜像

```shell
docker pull nginx:1.21.1
```

7. 启动nginx容器
```shell
docker run -d -p 80:80 -0 443:443 -v /home/www/html:/var/www/html -v /etc/nginx/conf:/etc/nginx/conf.d  --link do_phpfpm:phpfpm --name do_nginx nginx:1.21.1

# 此处我把配置目录和文件目录挂载到镜像上面，方便在本地做配置和放入证书文件等
```

8. 进入nginx 容器并修改配置
```shell
docker exec -it do_nginx bash 

cd /etc/nginx/conf.d/
# 此处会没有vim，需要装一下
apt-get update
apt-get install vim 
#default文件可能因为 被挂载了，文件不存在，去找一份默认配置放到里面即可
vim default.conf
```
然后找到php配置，修改为如下内容
```
    location ~ \.php$ {
        root /var/www/html;
        fastcgi_pass phpfpm:9000; # 这地方的phpfpm 是挂载进来的phpfpm，也就是--linnk时的do_phpfpm
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include      fastcgi_params;
    }
```
保存退出
```shell
nignx -s reload 
exit #退出容器
```


### 3. 遇到的问题以及解决方法
1.数据库使用root账号连接的时候可能找不到数据库
    出现原因：laravel框架直接连接本地数据库，然后连接地址是直接放的 mysql:3306, 这个地方的mysql是link的mysql
    解决方法： 我是直接创建了个账号，然后数据库该账号只有一个，这样就解决了
2. php的pdo_mysql 等扩展找不到
    解决方法: 进入 phpfpm 容器， 找到php.ini.develop 文件，修改里面的扩展把注释去掉

之后出现的问题我会一一更新。。。



