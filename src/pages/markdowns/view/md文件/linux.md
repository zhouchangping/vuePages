+ npm list -g --depth 0 // 查看包
+ app.js main.js里面的内容
+ npm install -g cnpm --registry=https://registry.npm.taobao.org
+ 查看端口： lsof -i tcp:8080
+ mac上想查找npm包的安装目录/usr/local/bin/
+ 切换协议：
  - 1. 查看当前remote: git remote -v
+ 切换到http：git remote set-url https://github.com/username/repository.git
+ 切换到ssh： git remote set-url git@github.com:username/repository.git
+ scp root@49.235.238.235:/usr/local/nginx/html/wechat/index.html ~     复制到本地
+ scp ~/Desktop/wechatEat/index.html root@49.235.238.235:/usr/local/nginx/html/wechat/ 复制到linux
+ netstat -anp | grep pid 查看到进程占用的端口号
+ lsof -i:8000 查看8000端口的使用情况
+ netstat命令各个参数说明如下：
```
　　-t : 指明显示TCP端口
　　-u : 指明显示UDP端口
　　-l : 仅显示监听套接字(所谓套接字就是使应用程序能够读写与收发通讯协议(protocol)与资料的程序)
　　-p : 显示进程标识符和程序名称，每一个套接字/端口都属于一个程序。
　　-n : 不进行DNS轮询，显示IP(可以加速操作)
```
+ ps -ef | grep
+ mysql -u root -p 链接数据库
  + SHOW DATABASES;
  + ps -ef | grep mysqld 命令来检查MySQL服务器是否启动：
+ git remote -v 查看git下载方式









