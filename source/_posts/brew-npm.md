---
title: Homebrew 安装node 成功，但是npm 不能用解决方案
date: 2018-09-20 15:05:56
tags:
- brew
- node
categories:
- brew
- node
---

- 这些命令我也不知道干啥的，反正就是解决了 转载来自这里 <a href="https://www.jianshu.com/p/0b681b53f61d">node成功安装 但是npm用不了</a>


"-bash : npm: command not found" 解决方法，卸载重装

brew uninstall node

brew update

brew upgrade

brew cleanup

brew install node

sudo chown -R myusername /usr/local

brew link --overwrite node

brew postinstall node