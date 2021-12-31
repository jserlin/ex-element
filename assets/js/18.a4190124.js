(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{669:function(t,a,i){"use strict";i.r(a);var e=i(8),r=Object(e.a)({},(function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[i("h2",{attrs:{id:"typora结合picgo使用"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#typora结合picgo使用"}},[t._v("#")]),t._v(" Typora结合picGo使用")]),t._v(" "),i("blockquote",[i("p",[t._v("Typora是一款跨平台的markDown编辑器，picGo是一款图床工具，可以支持七牛云，腾讯云COS，又拍云，GitHub，阿里云OSS，SM.MS，imgur 等常用图床，这里将两者结合起来，使用GitHub作为图床，GitHub作为图床的好处是可以不用考虑迁移图片。")])]),t._v(" "),i("h3",{attrs:{id:"工具介绍"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#工具介绍"}},[t._v("#")]),t._v(" 工具介绍")]),t._v(" "),i("h4",{attrs:{id:"typora"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#typora"}},[t._v("#")]),t._v(" Typora")]),t._v(" "),i("blockquote",[i("p",[t._v("一款跨平台的markDown编辑器，主要功能：")])]),t._v(" "),i("ul",[i("li",[t._v("实时预览，编写预览同一个界面，所见即所得。")]),t._v(" "),i("li",[t._v("GitHub 风格的 Markdown 语法，扩展了任务列表、表格、表情符号、数学公式、代码高亮等功能")]),t._v(" "),i("li",[t._v("导出支持PDF，Word，Html等多种格式")]),t._v(" "),i("li",[t._v("图片拖拽，本地图片或者网络图片拖拽进编辑器，自动生成 Markdown 格式，可以结合图床工具使用。")])]),t._v(" "),i("p",[t._v("官网地址 "),i("a",{attrs:{href:"https://www.typora.net/",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://www.typora.net/"),i("OutboundLink")],1)]),t._v(" "),i("h4",{attrs:{id:"picgo"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#picgo"}},[t._v("#")]),t._v(" picGo")]),t._v(" "),i("blockquote",[i("p",[t._v("一款用于快速上传图片并获取图片 URL 链接的工具，主要功能：")])]),t._v(" "),i("ul",[i("li",[t._v("支持拖拽图片上传")]),t._v(" "),i("li",[t._v("支持快捷键上传剪贴板里第一张图片")]),t._v(" "),i("li",[t._v("Windows 和 macOS 支持右键图片文件通过菜单上传 (v2.1.0+)")]),t._v(" "),i("li",[t._v("上传图片后自动复制链接到剪贴板")]),t._v(" "),i("li",[t._v("支持插件系统，已有插件支持 Gitee、青云等第三方图床")]),t._v(" "),i("li",[t._v("支持通过发送 HTTP 请求调用 PicGo 上传（v2.2.0+)")]),t._v(" "),i("li",[t._v("更多功能，可以去"),i("a",{attrs:{href:"https://github.com/Molunerfinn/PicGo",target:"_blank",rel:"noopener noreferrer"}},[t._v("github"),i("OutboundLink")],1),t._v("看下这个项目。")])]),t._v(" "),i("p",[t._v("下载地址，选择对应的安装包即可。")]),t._v(" "),i("p",[i("a",{attrs:{href:"https://github.com/Molunerfinn/PicGo/releases",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://github.com/Molunerfinn/PicGo/releases"),i("OutboundLink")],1)]),t._v(" "),i("h3",{attrs:{id:"开始"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#开始"}},[t._v("#")]),t._v(" 开始")]),t._v(" "),i("blockquote",[i("p",[t._v("现在我们开始使用 Typora配置PicGo，以及PicGo结合GitHub图床，实现直接上传图片到GitHub。")])]),t._v(" "),i("h4",{attrs:{id:"github设置"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#github设置"}},[t._v("#")]),t._v(" GitHub设置")]),t._v(" "),i("p",[t._v("需要生成GItHub Tokens， 步骤如下")]),t._v(" "),i("ul",[i("li",[i("p",[t._v("登录GitHub后，点击右上角的头像，选择【Settings】")])]),t._v(" "),i("li",[i("p",[t._v("进入Settings后，点击左侧下方的【Developer settings】")])]),t._v(" "),i("li",[i("p",[t._v("跳转后，选左边的【Personal access tokens】，点击【Generate new token】")])]),t._v(" "),i("li",[i("p",[i("img",{attrs:{src:"https://cdn.jsdelivr.net/gh/jserlin/pic233@main/img/image-20211228143102000.png",alt:"image-20211228143102000"}})])]),t._v(" "),i("li",[i("p",[t._v("滑到最下方点击【Generate token】")])]),t._v(" "),i("li",[i("p",[t._v("然后会生成一条Token信息，生成的Token只会出现一次，记得复制保存")])]),t._v(" "),i("li",[i("p",[i("img",{attrs:{src:"https://cdn.jsdelivr.net/gh/jserlin/pic233@main/img/image-20211228143543146.png",alt:"image-20211228143543146"}})])])]),t._v(" "),i("h4",{attrs:{id:"typora设置"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#typora设置"}},[t._v("#")]),t._v(" Typora设置")]),t._v(" "),i("ul",[i("li",[t._v("打开偏好设置")])]),t._v(" "),i("p",[i("img",{attrs:{src:"https://cdn.jsdelivr.net/gh/jserlin/pic233@main/img/image-20211228144017533.png",alt:"image-20211228144017533"}})]),t._v(" "),i("ul",[i("li",[i("p",[t._v("左侧选择图像，图像设置如下")]),t._v(" "),i("p",[i("img",{attrs:{src:"https://cdn.jsdelivr.net/gh/jserlin/pic233@main/img/bicAmDeFQGKI5N6.png",alt:"image-20211228144650677"}})])])]),t._v(" "),i("h4",{attrs:{id:"picgo设置"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#picgo设置"}},[t._v("#")]),t._v(" PicGo设置")]),t._v(" "),i("blockquote",[i("p",[t._v("打开运行PicGo，左侧打开【图床设置】，选择【GitHub图床】")])]),t._v(" "),i("ul",[i("li",[i("p",[t._v("git仓库名格式为  "),i("code",[t._v("[username]/[仓库名]")])])]),t._v(" "),i("li",[i("p",[t._v("分支名默认为main")])]),t._v(" "),i("li",[i("p",[t._v("Token是前面生成的github Token")])]),t._v(" "),i("li",[i("p",[t._v("存储路径这个可以填也可以不填，填写时要注意路径要加"),i("code",[t._v("/")]),t._v("如： "),i("code",[t._v("img/")])])]),t._v(" "),i("li",[i("p",[t._v("自定义域名，按照格式"),i("code",[t._v("https://raw.githubusercontent.com/[username]/[仓库名]/main")]),t._v("填写")]),t._v(" "),i("blockquote",[i("p",[t._v("这里有一个加速访问图片的方法：CDN加速")]),t._v(" "),i("p",[t._v("实现的方法为将域名的填写格式改为"),i("code",[t._v("https://cdn.jsdelivr.net/gh/[username]/[仓库名]@[分支名]")])])]),t._v(" "),i("p",[i("img",{attrs:{src:"https://cdn.jsdelivr.net/gh/jserlin/pic233@main/img/image-20211228162734060.png",alt:"image-20211228162734060"}})])])]),t._v(" "),i("h3",{attrs:{id:"验证图片上传"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#验证图片上传"}},[t._v("#")]),t._v(" 验证图片上传")]),t._v(" "),i("p",[t._v("在Typora偏好设置的那个界面，点击左下的【验证图片上传选项】")]),t._v(" "),i("p",[i("img",{attrs:{src:"C:%5CUsers%5Cdaydao%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5Cimage-20211228155838249.png",alt:"image-20211228155838249"}})]),t._v(" "),i("p",[t._v("此时应该是成功的")]),t._v(" "),i("p",[i("img",{attrs:{src:"https://cdn.jsdelivr.net/gh/jserlin/pic233@main/img/image-20211228160929942.png",alt:"image-20211228160929942"}})]),t._v(" "),i("p",[t._v("在github仓库中能看到对应的记录")]),t._v(" "),i("p",[i("img",{attrs:{src:"https://cdn.jsdelivr.net/gh/jserlin/pic233@main/img/image-20211228162641701.png",alt:"image-20211228162641701"}})]),t._v(" "),i("h3",{attrs:{id:"可能遇到的坑"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#可能遇到的坑"}},[t._v("#")]),t._v(" 可能遇到的坑")]),t._v(" "),i("p",[t._v("如果图片没有上传成功，下面可能的问题供参考")]),t._v(" "),i("h4",{attrs:{id:"图床设置的问题"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#图床设置的问题"}},[t._v("#")]),t._v(" 图床设置的问题")]),t._v(" "),i("ul",[i("li",[t._v("检查图床路径设置是否正确")]),t._v(" "),i("li",[t._v("检查仓库名是否正确，仓库名不能出现空格")]),t._v(" "),i("li",[t._v("不要出现一些奇怪的符号")]),t._v(" "),i("li",[i("code",[t._v("Github Token")]),t._v("生成时，确认勾选了"),i("code",[t._v("repo")]),t._v("选项")]),t._v(" "),i("li",[t._v("现在github的默认分支是main")])]),t._v(" "),i("h4",{attrs:{id:"上传文件的问题"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#上传文件的问题"}},[t._v("#")]),t._v(" 上传文件的问题")]),t._v(" "),i("ul",[i("li",[i("p",[t._v("文件名不要包含空格，不要出现一些奇怪的符号")])]),t._v(" "),i("li",[i("p",[t._v("相同文件名的文件上传失败，开启时间戳重命名")]),t._v(" "),i("p",[i("img",{attrs:{src:"https://cdn.jsdelivr.net/gh/jserlin/pic233@main/img/image-20211228164422234.png",alt:"image-20211228164422234"}})])])])])}),[],!1,null,null,null);a.default=r.exports}}]);