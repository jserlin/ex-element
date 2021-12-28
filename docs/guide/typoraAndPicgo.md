##  Typora结合picGo使用

> Typora是一款跨平台的markDown编辑器，picGo是一款图床工具，可以支持七牛云，腾讯云COS，又拍云，GitHub，阿里云OSS，SM.MS，imgur 等常用图床，这里将两者结合起来，使用GitHub作为图床，GitHub作为图床的好处是可以不用考虑迁移图片。

### 工具介绍

#### Typora

> 一款跨平台的markDown编辑器，主要功能：

- 实时预览，编写预览同一个界面，所见即所得。
-  GitHub 风格的 Markdown 语法，扩展了任务列表、表格、表情符号、数学公式、代码高亮等功能
- 导出支持PDF，Word，Html等多种格式
- 图片拖拽，本地图片或者网络图片拖拽进编辑器，自动生成 Markdown 格式，可以结合图床工具使用。

官网地址 [https://www.typora.net/](https://www.typora.net/)



#### picGo

> 一款用于快速上传图片并获取图片 URL 链接的工具，主要功能：

- 支持拖拽图片上传
- 支持快捷键上传剪贴板里第一张图片
- Windows 和 macOS 支持右键图片文件通过菜单上传 (v2.1.0+)
- 上传图片后自动复制链接到剪贴板
- 支持插件系统，已有插件支持 Gitee、青云等第三方图床
- 支持通过发送 HTTP 请求调用 PicGo 上传（v2.2.0+)
- 更多功能，可以去[github](https://github.com/Molunerfinn/PicGo)看下这个项目。

下载地址，选择对应的安装包即可。

[https://github.com/Molunerfinn/PicGo/releases](https://github.com/Molunerfinn/PicGo/releases)

### 开始

> 现在我们开始使用 Typora配置PicGo，以及PicGo结合GitHub图床，实现直接上传图片到GitHub。

#### GitHub设置

需要生成GItHub Tokens， 步骤如下

- 登录GitHub后，点击右上角的头像，选择【Settings】

- 进入Settings后，点击左侧下方的【Developer settings】
- 跳转后，选左边的【Personal access tokens】，点击【Generate new token】
- ![image-20211228143102000](https://cdn.jsdelivr.net/gh/jserlin/pic233@main/img/image-20211228143102000.png)
- 滑到最下方点击【Generate token】
- 然后会生成一条Token信息，生成的Token只会出现一次，记得复制保存
- ![image-20211228143543146](https://cdn.jsdelivr.net/gh/jserlin/pic233@main/img/image-20211228143543146.png)



#### Typora设置

- 打开偏好设置

![image-20211228144017533](https://cdn.jsdelivr.net/gh/jserlin/pic233@main/img/image-20211228144017533.png)

- 左侧选择图像，图像设置如下

  ![image-20211228144650677](https://cdn.jsdelivr.net/gh/jserlin/pic233@main/img/bicAmDeFQGKI5N6.png)

#### PicGo设置

> 打开运行PicGo，左侧打开【图床设置】，选择【GitHub图床】

- git仓库名格式为  `[username]/[仓库名]`

- 分支名默认为main

- Token是前面生成的github Token 

- 存储路径这个可以填也可以不填，填写时要注意路径要加`/`如： `img/`

- 自定义域名，按照格式`https://raw.githubusercontent.com/[username]/[仓库名]/main`填写

  > 这里有一个加速访问图片的方法：CDN加速
  >
  > 实现的方法为将域名的填写格式改为`https://cdn.jsdelivr.net/gh/[username]/[仓库名]@[分支名]`

  ![image-20211228162734060](https://cdn.jsdelivr.net/gh/jserlin/pic233@main/img/image-20211228162734060.png)

### 验证图片上传

在Typora偏好设置的那个界面，点击左下的【验证图片上传选项】

![image-20211228155838249](C:\Users\daydao\AppData\Roaming\Typora\typora-user-images\image-20211228155838249.png)

此时应该是成功的

![image-20211228160929942](https://cdn.jsdelivr.net/gh/jserlin/pic233@main/img/image-20211228160929942.png)

在github仓库中能看到对应的记录

![image-20211228162641701](https://cdn.jsdelivr.net/gh/jserlin/pic233@main/img/image-20211228162641701.png)



### 可能遇到的坑

如果图片没有上传成功，下面可能的问题供参考

#### 图床设置的问题

- 检查图床路径设置是否正确
- 检查仓库名是否正确，仓库名不能出现空格
- 不要出现一些奇怪的符号
- `Github Token`生成时，确认勾选了`repo`选项
- 现在github的默认分支是main

#### 上传文件的问题

- 文件名不要包含空格，不要出现一些奇怪的符号

- 相同文件名的文件上传失败，开启时间戳重命名

  ![image-20211228164422234](https://cdn.jsdelivr.net/gh/jserlin/pic233@main/img/image-20211228164422234.png)







