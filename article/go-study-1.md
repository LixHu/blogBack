---
title: 野生小白学Go路线【持续更新】
date: 2021-02-01 12:00:00
tags: 
- Go
categories:
- Go
---

> 本文章也是自己在学习Go语言的时候遇到的一些问题还有自己感觉可以记录的问题，都会在这里更新。主要是记录自己学习Go的路程。。虽然进度有点慢。

一些基础的数据类型。变量类型还有条件语句和循环语句的内容我就不一一讲了。感觉都是些基础内容。

## Go 环境安装

### windows下安装Go
[Go安装包下载地址](https://golang.google.cn/dl/)
下载之后按需安装就可以了
### Mac 下安装Go
【待更新】

## Go的面向对象

Go并没有像Java，PHP那样的Class，所以Go的面向对象使用的是结构体。先声明一个结构体，如下：

如果是直接在单个文件中使用结构体，可以直接使用`new`函数给一个新的结构体分配一个内存，它反馈指向已分配内存的指针。

```go
package main
import "fmt"
type struct1 struct {
    f1 int
    f2 string
}

func main() {

    ms := new(struct1)
    ms.f1 = 1
    ms.f2 = "test"
    fmt.Println(ms)
}
```

如果是在想用别的包下面的结构体，可以使用如下方式，我这边的目录结构如下：
```
    ├── go
    |├── Struct
    ||└── struct.go
    |└── main.go
```
首先在`struct.go`文件中写入如下内容
```go
package struct
type Struct1 struct {
    f1 int
    f2 string
}
```
然后在`main.go`中写入如下内容
```go
package main
import (
    "./Struct"
    "fmt"
)
func main() {
    ms := new(Struct.Struct1)
    ms.f1 = 1
    ms.f2 ="test"
    fmt.Println(ms)
}
```

还可以使用方法，在`struct.go`中添加如下内容

```go
    func (S Struct1) TestStruct() (S Struct1) {
        return S
    }
```
在`main.go`中调用如下
```go
    func main() {
        ms := new(Struct.Struct1)
        fmt.Println(ms.TestStruct())
    }
```
还可以设置构造方法,更改`struct.go`中如下内容：
```go
    type Struct1 struct{
        f1 int
        f2 string
    }
    
    func (S Struct1) SetStruct(f1 int, f2 string) (S *Struct1) {
        return &Struct1{f1: f1, f2: f2}
    }
```
在main.go 中修改为如下内容：
```go
    func main() {
        ms:= Struct.Struct1{}.SetStruct(1, "test")
        fmt.println(ms)
    }
```

## 写一个Go程序吧(我准备先写一个用MySQL的实例)

野生小白过于自信，导致自己失败了，前面先整理下自己写的代码，然后后面看完interface和reflection再来接着搞，下面是我没看之前的代码：

[github地址](https://github.com/LixHu/go-mysql)

目录结构如下：
```
    ├── go
    |├── sqlDriver
    ||└── sqlDriver.go
    |└── main.go
```

`sqlDriver.go`
```go
    package sqlDrvier

import (
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
)

type Driver struct {
	Port     string
	Host     string
	User     string
	Pass     string
	Database string
	Type     string
}

var db *sql.DB

type Test struct {
	id   int
	test string
}

// 初始化
func (d Driver) SetDriver(port string, host string, user string, pass string, database string, _type string) (dri *Driver) {
	return &Driver{Port: port, Host: host, User: user, Pass: pass, Database: database, Type: _type}
}

func (d Driver) GetDriver() (dri Driver) {
	return d
}

func (d Driver) connection() (err error) {
	dsn := d.User + ":" + d.Pass + "@" + d.Type + "(" + d.Host + ":" + d.Port + ")/" + d.Database
	db, err = sql.Open("mysql", dsn)
	return err
}

func (d Driver) Select() (err error, row sql.Row) {
	err = d.connection()
	if err != nil {
		return
	}
	rows, err := db.Query("select * from test")

	defer db.Close()
	if err != nil {
		return
	}

	for rows.Next() {
		var t Test
		err1 := rows.Scan(&t.id, &t.test)
		if err1 != nil {
			return
		}
		fmt.Println(t)
	}
	return err, row
}
```

`main.go`

```go
package main

import (
	"./sqlDriver"
)

func main() {
	var (
		host     string
		user     string
		port     string
		_type    string
		database string
		pass     string
	)
	host = "127.0.0.1"
	user = "root"
	port = "3306"
	_type = "tcp"
	database = "test"
	pass = "root"
	d := sqlDrvier.Driver{}.SetDriver(port, host, user, pass, database, _type)
	d.Select()
}

```

反正总之还是没完全学会，接着学习去！

【待更新】