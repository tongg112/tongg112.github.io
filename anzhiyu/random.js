var posts=["2025/04/08/歌词again/","2025/01/21/Ubuntu安装企业微信/","2024/11/20/歌词たぶん/","2024/09/27/NHK《简明日语》第09课/","2024/09/24/NHK《简明日语》第08课/","2024/03/06/歌词群青/","2023/11/09/Dota2LOD人机对战配置/","2023/04/14/歌词猫/","2022/10/13/宝可梦属性相克关系表/","2022/10/09/Docker安装SQLserver/","2022/09/07/Ant-Design-Vue-Pro多语言切换不同CSS/","2022/07/04/在iPhone系统邮箱中添加腾讯企业邮箱账号/","2022/07/01/NAS中使用frp实现互联网访问/","2022/06/13/Laravel笔记-创建文件夹/","2022/05/12/Python简易爬虫实现/","2022/05/11/Ant-Design-Vue-Pro列表展示数据总数/","2022/05/07/PHP好用的内建函数推荐/","2022/05/07/PHP脚本批量视频转码/","2022/05/07/Ant-Design-Vue-Pro图片点击预览/","2022/03/28/Laravel笔记-日志打印/","2022/02/16/转-代码贡献提交规范/","2021/11/29/歌词Lemon/","2021/11/08/Chrome浏览器下dev域名自动跳转https/","2021/11/02/NHK《简明日语》第07课/","2021/10/21/Laravel笔记-配置permission角色权限/","2021/10/20/Laravel笔记-配置jwt登陆/","2021/10/19/Ant-Design-Vue-Pro表格前的checkbox根据条件禁用/","2021/10/18/Laravel笔记-常用命令行/","2021/10/18/macOS-bigsur安装记录/","2021/09/26/Ant-Design-Vue-Pro组件使用时提示Unknown/","2021/09/26/Ant-Design-Vue-Pro配置多页签/","2021/09/26/Ant-Design-Vue-Pro修改系统名称与logo/","2021/09/26/Ant-Design-Vue-Pro隐藏多语言切换/","2021/09/24/Laravel笔记-生成UUID/","2021/09/23/Laravel笔记-如何启用软删除/","2021/08/26/windwos下powershell设置代理/","2021/08/18/歌词打上花火/","2021/08/17/NHK《简明日语》第06课/","2021/08/11/gedit编辑器使用技巧/","2021/08/02/减肥课程笔记/","2021/07/27/NHK《简明日语》第05课/","2021/07/19/Excel使用公式某一列乘以固定单元格/","2021/07/18/微信小程序getUserProfile报错解决/","2021/07/17/歌词Happy-Birthday/","2021/07/16/NHK《简明日语》第04课/","2021/07/15/Linux常用命令/","2021/07/14/GTD引子清单/","2021/07/13/项目中软删除的实现思路/","2021/07/12/redis实战/","2021/07/11/NHK《简明日语》第03课/","2021/07/10/ssh连接超时解决办法/","2021/07/09/lnmp环境open-basedir报错解决/","2021/07/08/Linux服务器增加swap分区/","2021/07/07/服务器SSH密钥登录设置/","2021/07/06/NHK《简明日语》第02课/","2021/07/05/蚂蚁金服antdv快速上手/","2021/07/04/饥荒联机版游戏服务器搭建/","2021/07/03/NHK《简明日语》第01课/","2021/07/02/Windows10下切换日语输入法/","2021/07/01/Ubuntu下连接并使用Airpods/","2021/06/30/centos下安装node环境/","2021/06/25/git常用命令速查/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };