var posts=["2025/01/02/Ubuntu下连接并使用Airpods/","2021/06/30/centos下安装node环境/","2021/06/25/git常用命令速查/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };