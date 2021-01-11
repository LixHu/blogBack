---
title: 记录一次解决死锁过程
date: 2019-08-29 17:35:23
tags:
- Mysql
categories:
- Mysql
---

> 今天作死，把线上运行中的表优化了一下，结果把表锁住了。

> 下面记录一下解决死锁的两种方法

> 第一种：
- 查询是否锁表

```
    SHOW OPEN TABLES WHERE In_use > 0;    
```
- 查询进程（如果您有SUPER权限，您可以看到所有线程。否则，您只能看到自己的）

```
    SHOW processlist
```

- 杀死进程ID（就是上面命令的id列）

```
    kill {id}
```

> 第二种

- 查看在锁的事务

```
    SELECT * FROM INFORMATION_SCHEMA.INNODB_TRX;
```

- 杀死进程id（上面命令返回的trx_mysql_thread_id）

```
    kill {id}
```

> 其它关于查看死锁的命令

```
-- 查看当前的事务
SELECT * FROM INFORMATION_SCHEMA.INNODB_TRX;

-- 查看当前锁定的事务
SELECT * FROM INFORMATION_SCHEMA.INNODB_LOCKS;

-- 查看当前等锁的事务
SELECT * FROM INFORMATION_SCHEMA.INNODB_LOCK_WAITS; 
```