---
title: 搭建Shadowsocks服务
date: 2019-09-17 09:47:35
tags:
- ssr
- Linux
- CentOs
---

> 主要是先准备一个国外服务器。。。 国外服务器的话你们自己找地方买，不管你们。下面直接教你们怎么搭

#### 安装pip

```
[root@vultr ~]# curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
% Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 1733k  100 1733k    0     0  8624k      0 --:--:-- --:--:-- --:--:-- 8669k
```

> 然后输入 python get-pip.py

```
[root@vultr ~]# python get-pip.py
    DEPRECATION: Python 2.7 will reach the end of its life on January 1st, 2020. Please upgrade your Python as Python 2.7 won't be maintained after that date. A future version of pip will drop support for Python 2.7. More details about Python 2 support in pip, can be found at https://pip.pypa.io/en/latest/development/release-process/#python-2-support
Collecting pip
  Downloading https://files.pythonhosted.org/packages/30/db/9e38760b32e3e7f40cce46dd5fb107b8c73840df38f0046d8e6514e675a1/pip-19.2.3-py2.py3-none-any.whl (1.4MB)
     |████████████████████████████████| 1.4MB 29.0MB/s 
Collecting setuptools
  Downloading https://files.pythonhosted.org/packages/b2/86/095d2f7829badc207c893dd4ac767e871f6cd547145df797ea26baea4e2e/setuptools-41.2.0-py2.py3-none-any.whl (576kB)
     |████████████████████████████████| 583kB 45.8MB/s 
Collecting wheel
  Downloading https://files.pythonhosted.org/packages/00/83/b4a77d044e78ad1a45610eb88f745be2fd2c6d658f9798a15e384b7d57c9/wheel-0.33.6-py2.py3-none-any.whl
Installing collected packages: pip, setuptools, wheel
Successfully installed pip-19.2.3 setuptools-41.2.0 wheel-0.33.6
```

#### 安装shadowsocks

> 输入pip install shadowsocks

```
[root@vultr ~]# pip install shadowsocks
DEPRECATION: Python 2.7 will reach the end of its life on January 1st, 2020. Please upgrade your Python as Python 2.7 won't be maintained after that date. A future version of pip will drop support for Python 2.7. More details about Python 2 support in pip, can be found at https://pip.pypa.io/en/latest/development/release-process/#python-2-support
Collecting shadowsocks
  Downloading https://files.pythonhosted.org/packages/02/1e/e3a5135255d06813aca6631da31768d44f63692480af3a1621818008eb4a/shadowsocks-2.8.2.tar.gz
Building wheels for collected packages: shadowsocks
  Building wheel for shadowsocks (setup.py) ... done
  Created wheel for shadowsocks: filename=shadowsocks-2.8.2-cp27-none-any.whl size=51658 sha256=560e0fe28948974284610da1388cadc73bb3311fafd1b494e2fdac6730fb978a
  Stored in directory: /root/.cache/pip/wheels/5e/8d/b6/3e2243a7e116984b2c3597c122c29abcfeac77daa260079e88
Successfully built shadowsocks
Installing collected packages: shadowsocks
Successfully installed shadowsocks-2.8.2
```
提示安装成功~~~

#### 配置shadowsocks

> 输入vi /etc/shadowsocks.json
```
[root@vultr ~]# vi /etc/shadowsocks.json
```

> 上面命令创建的是一个新文件，进入编辑 按i键，粘贴如下内容

```
{
    "server":"0.0.0.0",
    "server_port":50013,
    "local_port":1080,
    "password":"1234567890",
    "timeout":600,
    "method":"aes-256-cfb"
}
```

> server        本地运行ip，
> server_port   端口 
> local_port    本地端口
> password      密码
> timeout       超时时间
> method        加密方式

#### 将shadowsocks加入系统服务
```
[root@vultr ~]# vi /etc/systemd/system/shadowsocks.service
```

> 同上方法，也是创建一个新文件，粘贴以下内容
```
[Unit]
Description=Shadowsocks
[Service]
TimeoutStartSec=0
ExecStart=/usr/bin/ssserver -c /etc/shadowsocks.json
[Install]
WantedBy=multi-user.target
```

#### 启动shadowsocks并设置开机启动
```
[root@vultr ~]# systemctl enable shadowsocks
Created symlink from /etc/systemd/system/multi-user.target.wants/shadowsocks.service to /etc/systemd/system/shadowsocks.service.
[root@vultr ~]# systemctl start shadowsocks
[root@vultr ~]# 
[root@vultr ~]# systemctl status shadowsocks
● shadowsocks.service - Shadowsocks
   Loaded: loaded (/etc/systemd/system/shadowsocks.service; enabled; vendor preset: disabled)
   Active: active (running) since 三 2019-09-25 09:01:49 UTC; 9s ago
 Main PID: 1691 (ssserver)
   CGroup: /system.slice/shadowsocks.service
           └─1691 /usr/bin/python /usr/bin/ssserver -c /etc/shadowsocks.json

9月 25 09:01:49 vultr.guest systemd[1]: Started Shadowsocks.
9月 25 09:01:49 vultr.guest ssserver[1691]: INFO: loading config from /etc/...n
9月 25 09:01:49 vultr.guest ssserver[1691]: 2019-09-25 09:01:49 INFO     lo...0
9月 25 09:01:49 vultr.guest ssserver[1691]: 2019-09-25 09:01:49 INFO     st...3
Hint: Some lines were ellipsized, use -l to show in full.
```

> 最后会发现设置成功后有可能不能正常访问，可能是因为防火墙未开启，因为我运行端口是50013，所以我打开50013的端口

```
[root@vultr ~]# firewall-cmd --zone=public --add-port=50013/tcp --permanent
[root@vultr ~]# firewall-cmd --reload
```

> 关于firewall-cmd 命令的内容请自行查阅。
