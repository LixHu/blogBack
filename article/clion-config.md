---
title: Windos10下Clion+MinGW环境配置
date: 2019-05-22 19:32:38
tags:
- C
categories:
- C
---

#### 一、Clion下载
- 链接： <a href='https://www.jetbrains.com/clion/'>clion下载</a>
- 一路跟着安装就行
######激活码自己去找应该能找到吧！
 

#### 二、MinGW 环境配置
Clion 下载安装完之后并不能直接运行C++项目，需要配置一个环境

链接：http://sourceforge.net/projects/mingw/files/

1. 点击下方按钮进入下载页面

![minGW配置](http://liahu.cauyyl.com/minGW1.png)

2. 运行安装包进行安装


![minGW配置](http://liahu.cauyyl.com/minGW2.png)

3. 下一步


![minGW配置](http://liahu.cauyyl.com/minGW3.png)

4. 等待安装，安装完直接下一步

![minGW配置](http://liahu.cauyyl.com/minGW4.png)


5. 安装完之后会打开如下页面


![minGW配置](http://liahu.cauyyl.com/minGW5.png)

6. 开始安装


![minGW配置](http://liahu.cauyyl.com/minGW6.png)

7. 选完之后点击这个进行安装


![minGW配置](http://liahu.cauyyl.com/minGW7.png)

8. 反正经过了很久很久很久很久，终于安装完了

![minGW配置](http://liahu.cauyyl.com/minGW7.png)


#### 三、接下来处理Clion
1. 打开你的Clion，新建一个项目

![minGW配置](http://liahu.cauyyl.com/Clion2.png)

2. 点击New Project,此处文件夹已example为例
![Clion配置](http://liahu.cauyyl.com/Clion3.png)

3. 点击create 创建项目，进入项目

![Clion配置](http://liahu.cauyyl.com/Clion4.png)

4. 点击左上角File- Settion,配置 minGW
![Clion配置](http://liahu.cauyyl.com/Clion5.png)

5. 选择Build, Execution... - Toolchains 选项

![Clion配置](http://liahu.cauyyl.com/Clion6.png)

6. 自动检测minGW 配置，所以此处直接点击OK就可以

#### 四、Run & Debug

1. 创建一个文件，此处随便输入一行代码，比如
![Clion配置](http://liahu.cauyyl.com/Clion7.png)

2. 点击Run 来运行当前c程序

![Clion配置](http://liahu.cauyyl.com/Clion8.png)

![Clion配置](http://liahu.cauyyl.com/Clion9.png)

3. 创建断点，debug


![Clion配置](http://liahu.cauyyl.com/Clion10.png)

4. 点击debug

![Clion配置](http://liahu.cauyyl.com/Clion11.png)

5. 此处可以看到a&b的值

![Clion配置](http://liahu.cauyyl.com/Clion12.png)



#### 配置完成，再见