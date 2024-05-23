---

title: react避坑指北

date: 2022-04-24-09:56:29

tags:
- React

categories:
- React

---

1. setState更新对象值时，不能直接更新
错误更新方法：
```javascript
    this.state = {
      a: [{ item: 1}, { item: 2} ]
    }
    
    const { a } = this.state

    a[0].item = 2

    this.setState({
      a: a
    })
    
```
正确更新方法：
```javascript
this.state = {
      a: [{ item: 1}, { item: 2} ]
    }
    // 首先拷贝一下
    const { a } = JSON.parse(JSON.stringify(this.state))

    a[0].item = 2

    this.setState({
      a: a
    })
    
```