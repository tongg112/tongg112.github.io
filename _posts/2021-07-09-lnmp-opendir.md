---
layout: post
title:  "lnmp环境open_basedir报错解决"
subtitle: ""
author: xtong
date:   2021-07-09 21:32:52 +0800
catalog: true
tags: [Linux, php]
header-img: "img/post-bg-node.png"
comments: true
---
在Linux环境下安装了lnmp集成环境（Linux-nginx-MySQL-PHP），运行php后端接口程序，请求接口页面空白，不知道哪里出了问题。
# 定位问题
首先排除nginx配置文件的问题，`nginx -t`没有异常。  
然后在代码运行目录'/home/wwwroot/carapi/public'下的框架入口文件index.php中插入调试代码
```php
echo 1;die;
```
页面成功显示`1`。php也正常，看来像是框架的问题。  
但是框架的debug模式也打开了，但是页面没有任何错误提示，原来是需要在 php.ini 中打开错误显示。
```
vim /usr/local/php/etc/php.ini
```
```
display_errors = On
```
```
lnmp restart
```
这下错误显示出来了
```

Warning: require_once(): open_basedir restriction in effect. File(/home/wwwroot/carapi/vendor/autoload.php) is not within the allowed path(s): (/home/wwwroot/carapi/public/:/tmp/:/proc/) in /home/wwwroot/carapi/public/init.php on line 13

Warning: require_once(/home/wwwroot/carapi/vendor/autoload.php): failed to open stream: Operation not permitted in /home/wwwroot/carapi/public/init.php on line 13

Fatal error: require_once(): Failed opening required '/home/wwwroot/carapi/public/../vendor/autoload.php' (include_path='.:/usr/local/php/lib/php') in /home/wwwroot/carapi/public/init.php on line 13
```
有了错误信息，就好解决了  
# 解决办法
因为nginx中配置的网站根目录是`/home/wwwroor/carapi/public`，所以在获取public之外的目录文件时出错。  
只要修改`open_basedir`，增加`/home/wwwroor/carapi/`目录就可以了。  
lnmp的nginx配置文件
```
vim /usr/local/nginx/conf/fastcgi.conf
```
```

fastcgi_param  SCRIPT_FILENAME    $document_root$fastcgi_script_name;
fastcgi_param  QUERY_STRING       $query_string;
fastcgi_param  REQUEST_METHOD     $request_method;
fastcgi_param  CONTENT_TYPE       $content_type;
fastcgi_param  CONTENT_LENGTH     $content_length;

fastcgi_param  SCRIPT_NAME        $fastcgi_script_name;
fastcgi_param  REQUEST_URI        $request_uri;
fastcgi_param  DOCUMENT_URI       $document_uri;
fastcgi_param  DOCUMENT_ROOT      $document_root;
fastcgi_param  SERVER_PROTOCOL    $server_protocol;
fastcgi_param  REQUEST_SCHEME     $scheme;
fastcgi_param  HTTPS              $https if_not_empty;

fastcgi_param  GATEWAY_INTERFACE  CGI/1.1;
fastcgi_param  SERVER_SOFTWARE    nginx/$nginx_version;

fastcgi_param  REMOTE_ADDR        $remote_addr;
fastcgi_param  REMOTE_PORT        $remote_port;
fastcgi_param  SERVER_ADDR        $server_addr;
fastcgi_param  SERVER_PORT        $server_port;
fastcgi_param  SERVER_NAME        $server_name;

# PHP only, required if PHP was built with --enable-force-cgi-redirect
fastcgi_param  REDIRECT_STATUS    200;
fastcgi_param PHP_ADMIN_VALUE "open_basedir=$document_root/:/tmp/:/proc/";
```
对最后一行的`open_basedir`进行修改：
```
fastcgi_param PHP_ADMIN_VALUE "open_basedir=$document_root/:/tmp/:/proc/:/home/wwwroot/carapi/";
```
然后重启服务，接口就可以正常访问了。
