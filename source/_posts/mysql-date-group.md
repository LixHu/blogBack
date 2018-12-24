---
title: Mysql 根据日期分组查询
date: 2018-08-01 10:21:20
tags:
- Mysql
categories:
- Mysql
---


# Mysql 根据日期进行分组

### time 字段为dateTime 类型

```
    SELECT * FROM `test` GROUP BY DATE_FORMAT(time,'%Y-%M-%D');
```