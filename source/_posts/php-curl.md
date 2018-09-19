---
title: PHP使用CURL POST 数据和GET数据
date: 2018-09-14 11:18:28
tags: PHP
---

# PHP使用CURL POST数据

- 后期整理下，先记录一下，备忘。。

```
    $url = 'XXX';
    $post_data = array(
        'test' => 1
    );
    $ch = curl_init();   // 初始化curl
    curl_setopt($ch,CURLOPT_URL,$url); // 设置URL
    curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
    curl_setopt($ch,CURLOPT_POST,1);
    curl_setopt($ch,CURLOPT_POSTFIELDS,$post_data);
    $output = curl_exec($ch);
    curl_close($ch);
    echo $output;
```