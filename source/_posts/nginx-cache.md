---
title: Nginx配置静态文件缓存
date: 2019-07-11 11:32:18
tags: 
- Nginx
- Server
---

## Nginx配置静态文件缓存服务器

> 如果web项目很大，用户很多，静态资源很多，多次加载静态资源就会很慢，服务器性能也会下降，这种情况就需要做一个静态资源服务器


> 下面是配置静态资源文件的nginx 配置

```
    location ~ ^/(images|img|javascript|js|css|flash|media|static)/ {
        root   /www/wwwroot/;   ##静态资源的路径
        autoindex on;
        access_log  off;
        expires     30d;           ##设置缓存时间
    }
```