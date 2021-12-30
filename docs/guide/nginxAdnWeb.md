## 前端Nginx指南

Nginx是一款轻量级的HTTP服务器，采用事件驱动的异步非阻塞处理方式框架，这让其具有极好的IO性能，时常用于服务端的反向代理和负载均衡。大多数情况下，我们不需要去配置它，但是了解它在应用程序中担任的角色，以及如何解决这些问题是非常必要的。

![image-20211230165858692](https://cdn.jsdelivr.net/gh/jserlin/pic233@main/img/image-20211230165858692.png)

### 1. 负载均衡

客户端的流量首先会到达负载均衡服务器，由负载均衡服务器通过一定的调度算法将流量分发到不同的应用服务器上面，同时负载均衡服务器也会对应用服务器做周期性的健康检查，当发现故障节点时便动态的将节点从应用服务器集群中剔除，以此来保证应用的高可用。

#### 1.1 负载均衡的几种常用方式

- 轮询（默认）

```nginx
// nginx.config
upstream backserver {
    server 192.168.0.1;
    server 192.168.0.2;
}
```

- 权重weight，适用于不同性能的服务器，指定不同ip的权重，权重越高访问越大。

```nginx
// nginx.config
upstream backserver {
    server 192.168.0.1 weight=2;
    server 192.168.0.2 weight=8;
}
```

- 响应时间来分配，谁响应快，谁处理，需要依赖到第三方插件`nginx-upstream-fair`

```nginx
// nginx.config
upstream backserver {
    server 192.168.0.1;
    server 192.168.0.2;
    fair;
}

server {
    listen 80;
    server_name localhost; 
    location / {
      proxy_pass  http://backserver;
    }
}

```



#### 1.2 健康检查

Nginx 自带健康检测模块，本质上服务器心跳的检查，通过定期轮询向集群里的服务器发送健康检查请求,来检查集群中是否有服务器处于异常状态。

如果检测出其中某台服务器异常,那么在通过客户端请求nginx反向代理进来的都不会被发送到该服务器上（直至下次轮训健康检查正常）

涉及两个配置：

- fail_timeout : 设定服务器被认为不可用的时间段以及统计失败尝试次数的时间段，默认为10s
- max_fails : 设定Nginx与服务器通信的尝试失败的次数，默认为：1次

```nginx
upstream backserver{
    server 192.168.0.1  max_fails=1 fail_timeout=40s;
    server 192.168.0.2  max_fails=1 fail_timeout=40s;
}

server {
    listen 80;
    server_name localhost; 
    location / {
      proxy_pass http://backend;
    }
}

```

### 2. 反向代理

当一个请求想要访问服务器上的内容时，该请求会先访问到代理服务器，代理服务器再将请求发送到目标服务器。反向代理流程图如下，是不是看着像负载均衡的流程，其实负载均衡就是反向代理的一种应用场景。

<img src="https://cdn.jsdelivr.net/gh/jserlin/pic233@main/img/image-20211230113635784.png" alt="image-20211230113635784"  />

使用反向代理，会通过 location 匹配指定的URI，然后将匹配的URI请求通过proxy_pass 转向到之前定义好的节点池。

```nginx
// nginx.config
server  {
  listen 80;
  server_name localhost;
  location / {
    proxy_pass http://127.0.0.1:8000;
  }
}

```

### 3. 配置Https

Nginx可以用来配置Https认证，主要两个步骤，申请 SSL 证书 和 配置 HTTPS

#### 3.1 申请SSL证书

SSL证书的介绍跟申请，可以看下腾讯云文档 [SSL证书](https://cloud.tencent.com/product/ssl/faqs)

#### 3.2 Nginx配置https

要开启 HTTPS 服务，在配置文件信息块**server**，必须使用监听命令 **listen** 的 **ssl** 参数和定义服务器证书文件和私钥文件，如下所示：

- **ssl_certificate**: 证书的绝对路径
- **ssl_certificate_key**:  密钥的绝对路径;

```nginx
server {
   #ssl参数
   listen              443 ssl; //监听443端口，443端口是https的默认端口 80是http的默认端口
   server_name         example.com;
   #证书文件
   ssl_certificate     example.com.crt;
   #私钥文件
   ssl_certificate_key example.com.key;
}
```

### 4. 常用的配置

#### 4.1 IP白名单

可以配置nginx的白名单，规定有哪些ip可以访问你的服务器，比如防爬虫

- 简单配置

  ```nginx
   server {
      location / {
          deny  192.168.0.1; // 禁止该ip访问
          deny  all; // 禁止所有
      }
    }
  ```

- 白名单配置

  ```nginx
  # 1
  # 新建文件 /etc/nginx/white_ip.conf
  # 在white_ip.conf中加入ip
   ...
  192.168.0.1 1; 
   ...
  
  # 2
  # 修改配置nginx.conf
  # geo 指令主要是可以根据指定变量的值映射出一个新变量。 如果不指定变量，默认为$remote_addr
  geo $remote_addr $ip_whitelist{
      default 0;
      include ip.conf;
  }
  #3 为匹配项做白名单设置
  server {
      location / {
          if ( $ip_whitelist = 0 ){
              return 403; //不在白名单返回 403
          }
          index index.html;
          root /tmp;
      }
  }
  ```

#### 4.2 自动适配PC/移动端页面

当从Pc端或者H5端打开应用时，自动跳转到对应的Pc或H5端应用，Nginx可以通过内置变量**$http_user_agent**，获取到请求客户端的userAgent，从而判断用户当前终端环境。

```nginx
server {
 location / {
        //移动、pc设备agent获取
        if ($http_user_agent ~* '(Android|webOS|iPhone)') {
            set $mobile_request '1';
        }
        if ($mobile_request = '1') {
            rewrite ^.+ http://m.baidu.com;
        }
    } 
}
```

#### 4.3 配置gzip

开启Nginx gzip，压缩后,静态资源的大小会大大的减少，从而可以节约大量的带宽，提高传输效率。

```
server{
    gzip on; //启动
    gzip_buffers 32 4K;
    gzip_comp_level 6; //压缩级别，1-10，数字越大压缩的越好
    gzip_min_length 100; //不压缩临界值，大于100的才压缩，一般不用改
    gzip_types application/javascript text/css text/xml;
    gzip_disable "MSIE [1-6]\."; // IE6对Gzip不友好，对Gzip
    gzip_vary on;
}
```

#### 4.4 Nginx配置跨域请求

跨域请求这里有两个场景：

- 客户端访问其他第三方服务出现跨域问题，通过反向代理的形式实现

```
server {
    listen       80;
    server_name  local.server.com;
    location / {
    	proxy_pass other.server.com;
    }
}
```

- 客户端访问我们的服务出现跨域问题，nginx通过cors设置header实现跨域.

```nginx
# 允许任何域
location / {  
    add_header Access-Control-Allow-Origin *;
    add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
    add_header Access-Control-Allow-Headers 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization';

    if ($request_method = 'OPTIONS') {
        return 204;
    }
} 
# 允许指定域名
location / {
    ...
    add_header 'Access-Control-Allow-Origin' 'http://example.com';
    ...
}
# 多个域名跨域访问 思路是通过$http_origin去匹配允许的域名 匹配成功则返回cors相关字段
# 方法1
map $http_origin $corsHost {
    default 0;
    "~http://www.example.com" http://www.example.com;
    "~http://m.example.com" http://m.example.com;
    "~http://wap.example.com" http://wap.example.com;
}
 
server {
    listen 80;
    server_name www.example2.com;
    root /usr/share/nginx/html;
    location / {
        add_header Access-Control-Allow-Origin $corsHost;
    }
}
#方法2
set $cors '';
if ($http_origin ~* 'https?://(localhost|www\.example\.com|m\.example\.com)') {
        set $cors 'true';
}
 
if ($cors = 'true') {
    	#跨域控制配置
    	#允许跨域访问的域名,可以是一个域的列表，也可以是通配符*
        add_header 'Access-Control-Allow-Origin' "$http_origin"; 
    	#是否允许请求带有验证信息
        add_header 'Access-Control-Allow-Credentials' 'true'; 
    	#允许使用的请求方法，以逗号隔开
        add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS';
        #允许自定义的头部，以逗号隔开,大小写不敏感
        add_header Access-Control-Expose-Headers 'WWW-Authenticate,Server-Authorization';
    	#允许脚本访问的返回头
        add_header 'Access-Control-Allow-Headers' 'Accept,Authorization,Cache-Control,Content-Type,DNT,If-Modified-Since,Keep-Alive,Origin,User-Agent,X-Mx-ReqToken,X-Requested-With';
}
 
if ($request_method = 'OPTIONS') {
        return 204;
}
```

#### 4.5 请求过滤

根据状态码过滤

```nginx
error_page 500 501 502 503 504 506 /50x.html;
    location = /50x.html {
        #将跟路径改编为存放html的路径。
        root /root/static/html;
    }
```

根据URL名称过滤，精准匹配URL，不匹配的URL全部重定向到主页。

```
location / {
    rewrite  ^.*$ /index.html  redirect;
}
```

根据请求类型过滤。

```
if ( $request_method !~ ^(GET|POST|HEAD)$ ) {
return 403;
}
```

#### 4.6 客户端IP绑定

来自同一个ip的请求只分配一台服务器，

```nginx
upstream balanceServer {
    ip_hash;
    server 10.1.22.33:12345;
    server 10.1.22.34:12345;
    server 10.1.22.35:12345;
}
```

#### 4.7 静态资源服务器

```nginx
location ~* \.(png|gif|jpg|jpeg)$ {
    root    /root/static/;  
    autoindex on;
    access_log  off;
    expires     10h;# 设置过期时间为10小时          
}
```

#### 4.8 单页面应用刷新404问题

```nginx
server {
    listen	80;
    server_name example.com;
    
    location / {
      root /usr/share/nginx/html/dist; #打包后的dist目录
      index	index.html index.htm;
      try_files $uri $uri/ /index.html;
    }
}
```

### 5. nginx文件与配置

#### 5.1  配置文件介绍

先对配置文件做一个简单的描述：

```
worker_processes  1；                			 # worker进程的数量
events {                              			  # 事件区块开始
    worker_connections  1024；          			 # 每个worker进程支持的最大连接数
}                               				  # 事件区块结束
http {                           				  # HTTP区块开始
    include       mime.types；         			 # Nginx支持的媒体类型库文件
    default_type  application/octet-stream；      # 默认的媒体类型
    sendfile        on；       				     # 开启高效传输模式
    keepalive_timeout  65；       			     # 连接超时
    server {            		                  # 第一个Server区块开始，表示一个独立的虚拟主机站点
        listen       80；      			         # 提供服务的端口，默认80
        server_name  localhost；    			     # 提供服务的域名主机名
        location / {            	        	  # 第一个location区块开始
            root   html；       			         # 站点的根目录，相当于Nginx的安装目录
            index  index.html index.htm；       	 # 默认的首页文件，多个用空格分开
        }          				        	      # 第一个location区块结果
        error_page   500502503504  /50x.html；    # 出现对应的http状态码时，使用50x.html回应客户
        location = /50x.html {          	      # location区块开始，访问50x.html
            root   html；      		      	     # 指定对应的站点目录为html
        }
    }  
    ......


```

ngxin.conf 相当于是入口文件，nginx启动后会先从nginx.conf里面读取基础配置

conf 目录下面的各种xxx.conf文件呢，一般就是每一个应用的配置，比如a网站的nginx配置叫a.conf，b网站的叫b.conf，可以方便我们去便于管理

加载conf目录下的配置，在主配置文件nginx.conf中，一般会有这么一行代码

#### 5.2  nginx.conf主配置文件介绍

```nginx
# 运行用户，默认既是nginx, 可以不进行设置
user nginx;
# nginx进程， 一般设置为和cpu核数一眼
worker_processes 1;
# 错误日志存放目录
error_log /var/log/nginx/error.log warn;
# 进程pid存放位置
pid /var/run/nginx.pid

events {
	worker_connections 1024; # 单个后台进程的最大并发数
}

http {
    include		/etx/nginx/mime.types; #文件扩展名与类型映射表
    defualt_type 	application/octet-stream; #默认文件类型
    # 设置日志模式
    log_format	main '$remote_addr - $remote_user [$time_local] "$request"';
    
    access_log /var/log/nginx/access.log main; #nginx访问日志存放位置
    
    sendfile	on; #开启搞笑传输模式
    #tcp_nopush	on; #减少网络报文段的数量
    keepalive_timeout	65; # 超时时间
    #gzip	on; #开启gzip压缩
    include /etc/nginx/conf.d/*.conf; #包含的子配置项位置和文件
}
```

#### 5.3  xx.conf 子配置文件介绍

我们最常改动nginx的，就是子配置文件

```nginx
server {
    listen	80; #配置监听端口
    servver_name localhost; #配置域名
    
    location / {
        root /use/share/nginx/html;	#默认启动的目录
        index index.html index.htm; #默认访问文件
    }
    
    error_page	500 502 503 504 /50x.html; #错误状态码的显示页面，配置后需要重启
    location = 50x.html {
        root /usr/share/nginx/html;
    }
}
```

#### 5.4. 关于location匹配

```nginx
# 优先级1，精确匹配，根路径
location =/ {
    return 400
}
#优先级2，以某个字符串开头，以m开头的，优先匹配这里，区分大小写
location ^~ /m {
    root /data/av/;
}
#优先级3，区分大小写的正则匹配，匹配/m**路径
location ~ /m {
    alias /data/static/;
}
#优先级4，不区分大小写的正则匹配，所有的**.jpg|gif都走这里
location ~* .*\.(jpg|gif|png|js|css)$ {
    root /data/m
}
```



#### 5.5 Nginx 常用命令

- 2种启动命令 `nginx`或者`systemctl start nginx.service`
- 常见的4种停止命令

```
 nginx  -s stop //立即停止服务
 nginx -s quit // 进程完成当前工作后再停止
 killall nginx //直接杀死nginx进程
 systemctl stop nginx.service //systemctl停止

```

- 2种重启命令 `nginx -s reload`或者`systemctl reload nginx.service`
- 检查配置是否正确 `nginx -t`

