---
layout: post
title:  "Python 简易爬虫实现"
subtitle: "使用 urllib、bs4 爬取图片网站"
author: xtong
date:   2022-05-12 21:52:52 +0800
catalog: true
tags: [python, 后端, 爬虫]
header-img: "img/post-bg-python.jpeg"
comments: true
---

# 准备工作

使用 python3 环境，用 pip3 安装需要用到的 modules
```sh
# 安装 pip3
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
python3 get-pip.py
pip3 -v

# 安装 modules
pip3 install bs4 xlwt

```

# 爬取思路
- 打开需要爬取的网站，一般来说，图片网站都会有：分类、图集、页码，在浏览器中找到这些元素
- 第一步：获取全部图集信息
  - 图集名称、图集编号、图集地址、图集封面
- 第二步：将图集信息储存在数据库中或Excel中
- 第三步：从数据库中获取 url，对图集下的图片进行爬取下载，图集下载成功后标记数据库图集为已爬取状态

# 代码实现
- 引入 modules

```python
import os
import sqlite3
import sys
import urllib.request
import re

import xlwt
from bs4 import BeautifulSoup

```

- 请求头设置

```python
# 浏览器请求头
head = {
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36",
    # "Referer": "https://www.xtongs.com/"
}
# 图片下载请求头
img_header = [
    ('User-Agent',
     'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36'),
    ('Referer', 'https://xtongs.com/')
]


# 获取页面内容
def get_page_content(url):
    print('获取页面内容:%s' % url)
    request = urllib.request.Request(url, headers=head)
    html = ''
    try:
        response = urllib.request.urlopen(request, timeout=5)
        html = response.read().decode()
    except Exception as e:
        print(e)
    return BeautifulSoup(html, "html.parser")
```

- 获取网站专辑总页数，这个可以浏览器里看一眼总页数，不麻烦

- 保存专辑信息到本地

```python
# 专辑数据爬取到本地
def album_to_local():
    print('开始')
    # 爬取地址
    baseurl = 'https://xtongs.com/'
    save_path = '专辑.xls'
    print('爬取地址：%s' % baseurl)
    # 总页数
    # total_page = get_album_total_page(baseurl)
    # 这个自己上网站上看一眼就行
    total_page = 58
    print('专辑总页数：%d' % total_page)
    print('要从第几页开始？请输入数字：')
    try:
        page = int(input())
    except Exception as e:
        print(e)
        print('页码必须是大于0的整数，不要超过最大页码')
        sys.exit()
    if page < 1:
        print('页码从1开始')
        page = 1
    # 爬取专辑信息
    save_album_list(baseurl, total_page, page)
```

```python

# 爬取保存专辑信息
def save_album_list(baseurl, total_page, page):
    print('获取图集信息')
    for i in range(page - 1, int(total_page)):
        data_list = []
        print(i + 1)
        # 修改专辑地址
        url = baseurl + 'page_' + str(i + 1) + '.html'
        soup = get_page_content(url)
        # 修改专辑信息获取 find_all_next
        for item in soup.find(class_="main").find_all(class_='thumbmm'):
            item = str(item)
            print(item)
            # <a href="https://xtongs.com/web/1001.html" target="_blank" title="自然风景之美丽夕阳"><img src="https://xtongs.com/static/24/03/db/aHR0cHM6Ly9udXlvdTguY2MvemJfdXNlcnMvdXBsb2FkLzIwMjIvMDQvMjAyMjA0MjQxNjUwNzY2MzgzMzcwNDgxLmpwZw-190-285-index-a.jpg"/></a>
            data = []
            album_id = re.findall(re_album_id, item)[0]
            album_name = re.findall(re_album_name, item)[0]
            album_link = re.findall(re_album_link, item)[0]
            cover_link = re.findall(re_cover_link, item)[0]
            data.append(album_id)
            data.append(album_name)
            data.append(album_link)
            data.append(cover_link)
            data.append('0')
            data_list.append(data)
        # 每页的图集保存到数据
        save_to_db(data_list)
    # 所有的图集保存到 Excel    
    # save_to_excel(data_list, 'test.xlsx')
    return


# 保存到excel测试
def save_to_excel(data_list, save_path):
    print('保存execl')
    book = xlwt.Workbook(encoding="utf-8", style_compression=0)
    sheet = book.add_sheet('专辑', cell_overwrite_ok=True)
    col = ('专辑id', '专辑名称', '专辑地址', '专辑封面')
    for i in range(0, 4):
        sheet.write(0, i, col[i])
    for i in range(0, len(data_list)):
        print("第%d条" % i)
        data = data_list[i]
        for j in range(0, 4):
            sheet.write(i + 1, j, data[j])
    book.save(save_path)
```

- 专辑信息正则与图片正则

```python
# <a href="https://xtongs.com/web/1001.html" target="_blank" title="自然风景之美丽夕阳"><img src="https://xtongs.com/static/24/03/db/aHR0cHM6Ly9udXlvdTguY2MvemJfdXNlcnMvdXBsb2FkLzIwMjIvMDQvMjAyMjA0MjQxNjUwNzY2MzgzMzcwNDgxLmpwZw-190-285-index-a.jpg"/></a>

# 专辑 ID
re_album_id = re.compile(r'.*\/(.*?)\.html')

# 专辑标题
re_album_name = re.compile(r'title="(.*)"><img')

# 专辑链接地址
re_album_link = re.compile(r'href="(.*)" target="_blank" title')

# 专辑封面图片
re_cover_link = re.compile(r'src="(.*?)"')

# ##########################################

# 图片地址
re_image_src = re.compile(r'src="(.*?)"')

# 图片 ID
re_image_id = re.compile(r'.*\/(.*?)\.jpg')


# 数据库储存地址
db_path = 'spider2022.db'

```

- 创建 sqlite 数据库 spider2022.db

```sql
-- auto-generated definition
create table album
(
    id         integer not null
        constraint album_pk
            primary key autoincrement,
    album_id   integer,
    album_name text,
    album_link text,
    cover_link text,
    status     integer
);

create unique index album_id_index
    on album (id);

-- auto-generated definition
create table failed
(
    url string not null
);

```

- 专辑保存到数据库

```python
# 保存专辑信息到数据库
def save_to_db(data_list):
    print('保存到数据库')
    conn = sqlite3.connect(db_path)
    cur = conn.cursor()

    for data in data_list:
        data[1] = data[1].replace("'", '"')
        data[1] = "'" + data[1] + "'"
        data[2] = "'" + data[2] + "'"
        data[3] = "'" + data[3] + "'"
        sql = '''
            insert into album (
               album_id, album_name, album_link, cover_link, status
            ) values (%s)
        ''' % ",".join(data)
        print(sql)
        cur.execute(sql)
        conn.commit()
    cur.close()
    conn.close()
```

- 下载图片

```python
# 获取当爬取队列
def get_album():
    print('获取当爬取队列')
    conn = sqlite3.connect(db_path)
    cur = conn.cursor()
    sql = '''
        select * from album where status = 0 limit 1
    '''
    cur.execute(sql)
    res = cur.fetchall()
    cur.close()
    conn.close()
    return res


# 获取专辑内总页数
def get_total_page(url):
    print('获取页数')
    soup = get_page_content(url)
    # 需要修改正则
    # res = soup.find_all('a', class_="page-numbers")
    res = soup.find_all('ul', id="dm-fy")
    print(res)
    breakpoint()
    return res[-2].text


# 更新当爬取队列信息
def update_album(id):
    print('更新当爬取队列:%d' % id)
    conn = sqlite3.connect(db_path)
    cur = conn.cursor()
    sql = '''
        update album set status = 1 where id = %d
    ''' % id
    cur.execute(sql)
    conn.commit()
    conn.close()
    print('更新成功！')
    return    


# 下载失败 URL 储存到数据库
def failed_to_db(img_page_url):
    print('失败 url 保存到数据库')
    conn = sqlite3.connect(db_path)
    cur = conn.cursor()
    sql = '''
        insert into failed (
           url
        ) values ('%s')
    ''' % img_page_url
    print(sql)
    cur.execute(sql)
    conn.commit()


# 获取下载失败的队列
def get_failed():
    print('获取失败队列')
    conn = sqlite3.connect(db_path)
    cur = conn.cursor()
    sql = '''
        select * from failed limit 1
    '''
    cur.execute(sql)
    res = cur.fetchall()
    cur.close()
    conn.close()
    return res    


# 下载成功后移除 URL
def failed_remove(url):
    print('删除下载成功的 url')
    conn = sqlite3.connect(db_path)
    cur = conn.cursor()
    sql = '''
        delete from failed where url = '%s'
    ''' % url
    print(sql)
    cur.execute(sql)
    conn.commit()

```

> 下载图片方法可以拆出来下载方法 和 图片地址获取方法，但是这里我很懒不想搞了，熬夜不好，早点睡了

```python
# 下载图片
def download_images():
    print('下载图片')
    while 1:
        album = get_album()
        if not album:
            print('全部完成！')
            break
        album_id = album[0][1]
        album_name = album[0][2]
        url = album[0][3]

        try:
            soup = get_page_content(url)

            # 获取页数
            # res_page = soup.select('.pagenavi > a > span')
            res_page = soup.select('#dm-fy > li > a')
            # album_page = res_page[-2].text
            # 根据网站实际情况，这里最后一页是广告，取倒数第二页为总页数
            album_page = res_page[-3].text
            # 文件夹名称
            folder_path = './pic/%d_%s/' % (album_id, album_name)
        except Exception as e:
            print('出错了！继续下次循环！')
            print('=' * 30)
            continue

        for i in range(0, int(album_page)):
            # 需要修改地址
            img_page_url = url + '?page=' + str(i + 1)

            soup = get_page_content(img_page_url)
            # 修改图片所在主题元素
            res = str(soup.find(class_="entry"))

            try:
                image_src = str(re.findall(re_image_src, res)[0])
                # print(image_src)
                if not os.path.exists(folder_path):
                    os.makedirs(folder_path)
                filepath = folder_path + '%s.jpg' % re.findall(re_image_id, image_src)[0]

                opener = urllib.request.build_opener()
                opener.addheaders = img_header
                urllib.request.install_opener(opener)

                urllib.request.urlretrieve(image_src, filepath)
            except Exception as e:
                print(e)
                print('出现错误，跳过本次，重新爬取整个专辑')
                print(album_id, album_name)
                print('-' * 30)
                # 将出错的 img_page_url 放到数据库 下次再爬
                failed_to_db(img_page_url)
                continue

        update_album(album[0][0])

    while 1:
        failed = get_failed()
        if not failed:
            print('全部完成！')
            break

        print(failed)
        url = album[0][0]

        soup = get_page_content(url)
        # 修改图片所在主题元素
        res = str(soup.find(class_="entry"))

        try:
            image_src = str(re.findall(re_image_src, res)[0])
            print(image_src)
            if not os.path.exists(folder_path):
                os.makedirs(folder_path)
            filepath = folder_path + '%s.jpg' % re.findall(re_image_id, image_src)[0]

            opener = urllib.request.build_opener()
            opener.addheaders = img_header
            urllib.request.install_opener(opener)

            urllib.request.urlretrieve(image_src, filepath)
        except Exception as e:
            print(e)
            print('出现错误，跳过本次，重新爬取整个专辑')
            print(album_id, album_name)
            print('-' * 30)
            # 将出错的 img_page_url 放到数据库 下次再爬
            failed_to_db(img_page_url)
            continue

        # 删除 failed 队列
        failed_remove(url)

```

- 主程序

```python

def main():
    # 专辑数据爬取到本地
    album_to_local()
    # 下载图片
    download_images()

if __name__ == '__main__':
    main()
```

# 豆瓣电影 top250 爬取

```python
# Author:Xtongs
# -*- coding = utf-8 -*-
# @Time: 2023/3/2 下午7:14
# @Author: xtong
# @File: main.py
# @Software: VScode

# 爬取地址:https://movie.douban.com/top250

import urllib.request
import re

import xlwt
from bs4 import BeautifulSoup

# 浏览器请求头
head = {
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36",
    # "Referer": "https://movie.douban.com/"
}

# 需要修改的地方，注意正则要与网站对应

# 电影排名
re_movie_rank = re.compile(r'<em class="">(.*?)</em>')

# 电影标题
# re_album_name = re.compile(r'.*>(.*)</a></span>')
re_album_name = re.compile(r'<span class="title">(.*?)</span>')

# 电影链接地址
# re_album_link = re.compile(r'href="(.*)" target="_blank"><img')
re_album_link = re.compile(r'<a href="(.*)">')

# 电影封面图片
# re_cover_link = re.compile(r'data-original="(.*?)"')
re_cover_link = re.compile(r'src="(.*?)"')



def main():
    # 电影数据爬取到本地
    album_to_local()


# 电影数据爬取到本地
def album_to_local():
    print('开始')
    # 爬取地址
    baseurl = 'https://movie.douban.com/top250'
    save_path = '豆瓣250.xls'
    print('爬取地址：%s' % baseurl)
    # 爬取电影信息
    save_movie_list(baseurl, 10)


# 获取页面内容
def get_page_content(url):
    print('获取页面内容:%s' % url)
    request = urllib.request.Request(url, headers=head)
    html = ''
    try:
        response = urllib.request.urlopen(request, timeout=5)
        html = response.read().decode()
    except Exception as e:
        print(e)
    return BeautifulSoup(html, "html.parser")



# 爬取保存电影信息
def save_movie_list(baseurl, total_page):
    print('获取电影信息')
    all_data = []
    for i in range(0, int(total_page)):
        data_list = []
        # 修改电影地址
        url = baseurl + '?start=' + str((i)*25)
        soup = get_page_content(url)
        # 修改电影信息获取 find_all_next
        for item in soup.find(id="content").find_all(class_='item'):
            item = str(item)
            # print(item)
            data = []
            movie_rank = re.findall(re_movie_rank, item)[0]
            # print(re.findall(re_album_name, item))
            album_name = re.findall(re_album_name, item)[0]
            # print(album_name)
            album_link = re.findall(re_album_link, item)[0]
            # print(album_link)
            cover_link = re.findall(re_cover_link, item)[0]
            # print(cover_link)
            data.append(movie_rank)
            data.append(album_name)
            data.append(album_link)
            data.append(cover_link)
            data_list.append(data)
            # print(data)
            # print(data_list)
            # break
        # break
        # print(data_list)
        # break
        # save_to_db(data_list)
        all_data.extend(data_list)
    print(all_data)
    save_to_excel(all_data, 'movie.xls')
    return data_list


# 保存到excel测试
def save_to_excel(data_list, save_path):
    print('保存execl')
    book = xlwt.Workbook(encoding="utf-8", style_compression=0)
    sheet = book.add_sheet('电影', cell_overwrite_ok=True)
    col = ('电影排名', '电影名称', '介绍地址', '电影海报')
    for i in range(0, 4):
        sheet.write(0, i, col[i])
    for i in range(0, len(data_list)):
        print("第%d条" % i)
        data = data_list[i]
        for j in range(0, 4):
            sheet.write(i + 1, j, data[j])
    book.save(save_path)



if __name__ == '__main__':
    main()
```

# 参考资料
- [Python 官网](https://www.python.org/)

<style>
header.intro-header {
    background-blend-mode: multiply;
}
</style>
