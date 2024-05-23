---

title: GIT命令整理以及使用场景说明（不包含基本的提交命令）

date: 2024-05-23-10:40:03

tags:
- git

categories:
- git

---

新增项目.gitignore 中配置时，经常会出现已经被git跟踪的目录，还是能提交目录，这时候就需要清理跟踪

```
//.gitignore 配置
.idea/
.vscode/
.......

// 清除已经被跟踪的目录.idea 的缓存，这时候就不会被提交了
git rm -r --cached .idea 
```

这个整理一些不常用的但是能用到的git命令，后面持续更新。。。。
