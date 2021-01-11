---
title: 记录Mac Pro M1芯片安装HomeBrew的过程吧
date: 2021-01-09 13:43:39
tags:
- Mac
- 环境安装
categories:
- Mac
- 环境安装
---

### 简介
---
刚入手了一个MacPro M1芯片的电脑，这边马上就准备安装开发环境，这边记录下遇到的坑，以及怎么解决。M1芯片装起来还是有点东西的。。不过网上的文章也很多，搜索起来比较复杂，我这边就整理一下。。

### 首先，安装HomeBrew
因为直接安装brew安装软件的时候会出错误，这边错误你们装软件的时候应该能看到。。稍微晚点我把截图扔过来。这边需要安装两个版本的HomeBrew
- 首先，安装ARM版本的HomeBrew
  根据官方规划，ARM 版 Homebrew 必须安装在 `/opt/homebrew` 路径下，而非此前的 `/usr/local/Homebrew`，通过下面命令来安装：
```
	cd /opt
	mkdir homebrew
	curl -L https://github.com/Homebrew/brew/tarball/master | tar xz --strip 1 -C homebrew
```
如果安装和使用过程中报错，可能是因为当前用户对于 `/opt/homebrew` 路径没有权限。对此，可以通过 `sudo chown -R $(whoami) /opt/homebrew` 接管该目录。

- 然后安装X86版本的HomeBrew
```
	arch -x86_64 /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"	#官方
	arch -x86_64 /bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"		#这是一键安装脚本
```
官方脚本应该是跑不动的，如果跑不动的话使用一键安装脚本运行

- 两个版本安装完之后，设置下别名，避免两个brew重复
  直接编辑`~/.zshrc`，添加如下内容
```
abrew="/opt/homebrew/bin/brew"
xbrew="arch -x86_64 /usr/local/bin/brew"
```
`abrew`就是ARM版本的brew `xbrew`就是x86版本的brew，然后运行`source ~/.zshrc` 或者重启终端生效命令。


### 快快乐乐的安装git和其它内容
```
xbrew install git 	#使用xbrew安装git
xbrew install node 
```
使用记录我以及遇到的困难我这边都会更新一下，这边会持续更新。
持续更新中~