---
title: PHP多线程模式配置
date: 2020-03-18 19:20:12
tags:
- PHP
categories:
- PHP
---

# PHP多线程模式配置
> 个人理解的PHP多线程模式是一次调用可以发送出多个请求，因为PHP的生命周期可能就设置了30s，PHP的数据处理可能还没完成，生命周期就结束了，这时就需要异步并发处理策略。

> 实现思路： 一次调用发出的多个请求，这些请求不按顺序来执行，而且可以异步并发执行的，一些请求用于在后台处理数据，一些请求用户接受后台响应状态，根据状态，与用户做一个简单的交互。

> 书写部分来源于[通俗易懂的php多线程](https://www.w3cschool.cn/php/php-thread.html) <span style="color:red">侵删</span> 后面我会整理下我的思路，现在部分思路来源于此文章

### 一、 PHP模式实现多线程的三种方法

1. linux下的PHP现成
> 下面所讲的东西是源自php的pcntl_fork函数.方法说明来源于PHP官网：

#### pcntl_fork
-------------------------------
(PHP 4 >= 4.1.0, PHP 5, PHP 7)

pcntl_fork — 在当前进程当前位置产生分支（子进程）。译注：fork是创建了一个子进程，父进程和子进程 都从fork的位置开始向下继续执行，不同的是父进程执行过程中，得到的fork返回值为子进程 号，而子进程得到的是0。

pcntl_fork()函数创建一个子进程，这个子进程仅PID（进程号） 和PPID（父进程号）与其父进程不同。
#### 返回值
--------------------------

成功时，在父进程执行线程内返回产生的子进程的PID，在子进程执行线程内返回0。失败时，在 父进程上下文返回-1，不会创建子进程，并且会引发一个PHP错误。

#### 例子

```
<?php
    $pid = pcntl_fork();
    //父进程和子进程都会执行下面代码
    if ($pid == -1) {
        //错误处理：创建子进程失败时返回-1.
         die('could not fork');
    } else if ($pid) {
         //父进程会得到子进程号，所以这里是父进程执行的逻辑
         pcntl_wait($status); //等待子进程中断，防止子进程成为僵尸进程。
    } else {
         //子进程得到的$pid为0, 所以这里是子进程执行的逻辑。
    }
?>
```
如果你父进程希望知道子进程正常退出的话,可以加上前面的pcntl_wait。这边就不做说明

2. 通过stream_socket_client 方式

```
    function sendStream() { 
        $english_format_number = number_format($number, 4, '.', ''); 
  
        echo $english_format_number;  
        exit(); 
        $timeout = 10; 
        $result = array(); 
        $sockets = array(); 
        $convenient_read_block = 8192; 
        $host = "localhost.com"; 
        $sql = "select waybill_id,order_id from xm_waybill where status>40 order by update_time desc limit 1 ";  
        $data = Yii::app()->db->createCommand($sql)->queryAll(); 
        $id = 0; 
  
        foreach ($data as $k => $v) { 
            if ($k % 2 == 0) { 
            $send_data[$k]['body'] = NoticeOrder::getSendData($v['waybill_id']); 
  
         } else { 
            $send_data[$k]['body'] = array($v['order_id'] => array('extra' => 16));  
        }  
        $data = json_encode($send_data[$k]['body']); 
        $s = stream_socket_client($host . ":80", $errno, $errstr, $timeout, STREAM_CLIENT_ASYNC_CONNECT | STREAM_CLIENT_CONNECT); 
        if ($s) {  
            $sockets[$id++] = $s; 
            $http_message = "GET /php/test.php?data=" . $data . " HTTP/1.0\r\nHost:" . $host . "\r\n\r\n";  
            fwrite($s, $http_message); 
        } else {  
            echo "Stream " . $id . " failed to open correctly."; 
        }  
    } 
  
    while (count($sockets)) { 
  
        $read = $sockets; 
  
        stream_select($read, $w = null, $e = null, $timeout); 
        if (count($read)) {  
        /* stream_select generally shuffles $read, so we need to 
         compute from which socket(s) we're reading. */
            foreach ($read as $r) { 
  
            $id = array_search($r, $sockets); 
            $data = fread($r, $convenient_read_block); 
            if (strlen($data) == 0) { 
                echo "Stream " . $id . " closes at " . date('h:i:s') . ".<br>  "; 
                fclose($r); 
                unset($sockets[$id]); 
            } else { 
                $result[$id] = $data; 
            } 
        } 
      } else {  
        /* A time-out means that *all* streams have failed 
         to receive a response. */
            echo "Time-out!\n"; 
            break; 
        }  
    }  
    print_r($result); 
  
  }
```

3. 通过多进程代替多线程
```
function daemon($func_name,$args,$number){ 
    while(true){ 
        $pid=pcntl_fork(); 
        if($pid==-1){ 
            echo "fork process fail"; 
            exit(); 
        }elseif($pid){//创建的子进程 
            static $num=0; 
            $num++; 
            if($num>=$number){ 
                //当进程数量达到一定数量时候，就对子进程进行回收。 
                pcntl_wait($status); 
      
                $num--; 
            }  
        }else{ 
            //为0 则代表是子进程创建的，则直接进入工作状态 
            if(function_exists($func_name)){ 
                while (true) { 
                    $ppid=posix_getpid(); 
                    var_dump($ppid); 
                    call_user_func_array($func_name,$args); 
                    sleep(2); 
                } 
            }else{ 
                echo "function is not exists"; 
            } 
            exit();   
        } 
    } 
}  
function worker($args){  
  //do something 
  
}  
daemon('worker',array(1),2); 
```

### 二、真正实现php多线程的方法

php 真正实现多线程的方法，通过安装PHP扩展pthread 可以做到

[点击下载扩展](https://github.com/krakjoe/pthreads)

<font color='red'>但是下载的是 版本3 也就是PHP7才能用的，我们需要下载版本2</font>

![pthread1](http://liahu.cauyyl.com/pthread1.png)

然后刷新的页面如下，拖到最底部：

![pthread2](http://liahu.cauyyl.com/pthread2.png)

找到版本2

下载下来，这个V2才是PHP5用的

下载下来，安装

或者，可以直接这样安装
```
cd /tools  
   wget https://github.com/krakjoe/pthreads/archive/v2.0.10.zip  
   unzip   v2.0.10.zip  
   cd pthreads-2.0.10  
   /usr/local/php/bin/phpize  
   ./configure --with-php-config=/usr/local/php/bin/php-config    
   make  
   make install
 ```
注意：您的php 在编译的时候需要开启 –enable-maintainer-zts

```
./configure --prefix=/usr/local/php --disable-fileinfo   --enable-fpm --with-config-file-path=/etc --with-config-file-scan-dir=/etc/php.d --with-openssl --with-zlib --with-curl --enable-ftp --with-gd --with-xmlrpc  --with-jpeg-dir --with-png-dir --with-freetype-dir --enable-gd-native-ttf --enable-mbstring --with-mcrypt=/usr/local/libmcrypt --enable-zip --with-mysql=/usr/local/mysql --without-pear --enable-maintainer-zts 
```

```
vim /etc/php.ini 
添加
extension=pthreads.so
```

```
重启php  
/etc/init.d/php-fpm restart
```
