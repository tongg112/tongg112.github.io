var posts=["2021/07/04/饥荒联机版游戏服务器搭建/","2021/07/03/NHK《简明日语》第01课/","2021/07/02/Windows10下切换日语输入法/","2021/07/01/Ubuntu下连接并使用Airpods/","2021/06/30/centos下安装node环境/","2021/06/25/git常用命令速查/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };