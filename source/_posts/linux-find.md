---
title: Linux Find命令
date: 2018-08-22 09:53:58
tags: Linux
categories:
- Linux
---

# find 命令详解

## find 命令格式
```
    find pathname -options [ -print -exec -ok ...]
    pathname       #所查找的目录路径，例如.表示当前目录，/表示根目录
    -print         #将匹配的文件输出到标准输出中
    -exec          #对匹配的文件执行该参数给出的shell 命令
    -ok            #跟exec 一样，只是需要用户交互，更安全
```

## find 命令的选项
```
    -name           #按照文件名查找文件
    -perm           #按照权限查找文件
    -prune          #使find命令不在当前指定的目录中查找，如果同时使用-depth选项，那么-prune将被find命令忽略
    -user           #按照文件属主来查找文件
    -group          #按照文件属组来查找文件
    -mtime -n +n    #按照文件的更改时间来查找文件
            -n      #表示从此刻算起，文件的更改在n天以内
            +n      #更改时间在n天以前

    -nogroup        #查找无有效属组的文件 即文件所属的组在 /etc/groups中不存在
    -nouser         #查找无有效属主的文件 即文件的属主在/etc/passwd中不村子
    -newer file1|file2   #查找更改时间比file1 新但比file2旧的文件
    -type
        b           # 表示块设备文件 block
        d           #表示目录  directory
        c           #表示字符设备文件 char
        p           #表示管道文件 pipe
        l           #表示符号链接文件 link
        f           #表示普通文件 file

    -depth          #在查找文件时，首先查找当前目录中的文件，然后再在其子目录中查找
    -fstype         #表示查找位于某一类型文件系统中的文件，这些文件系统类型通常可以在配置文件/etc/fstab中找到
    -mount          #表示在查找文件时不跨越文件系统的mount 点
    -follow         #表示如果find 命令遇到符号链接文件，就跟踪至链接所指向的文件
    -cpio           #表示对匹配的文件使用cpio命令，将这些文件备份到磁带设备中
```


## find实例
```
    在logs目录查找更改时间在5日内的文件并删除它们
    find /logs -mtime +5 -exec rm {} \;
```

```
    找nginx.conf 在哪个目录
    find / -name nginx.conf -type f
```

### 更多详细命令解释在这里 ：<a href='https://blog.csdn.net/wanglei_storage/article/details/48339439'>linux find 命令详解</a>