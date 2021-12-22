## 从零实现一个Vue的组件库
从零实现一个Vue的组件库, 包含组件调试，全局引入，按需引入，组件文档和发布到npm，基于此项目可以搭建属于你自己的组件库。
- [演示地址](https://jserlin.github.io/ex-element/)
- [仓库地址](https://github.com/jserlin/ex-element)
## 主要目录一览
```
...
├─packages  // 组件目录
├─examples  // 调试组件的目录
├─docs      // 文档目录
├─dist      // 发布到npm的目录
├─deploy.sh // 自动部署文档命令
├─gulpfile.js // gulp打包css相关设置
├─vue.config.js  // vue-cli配置文件
├─webpack.component.js  // 组件库打包成设置
...
```

## 新建vue项目
使用vue-cli生成vue项目，根据命令行提示，选择默认配置，vue版本选择2.x
```sh
# 安装vue-cli，已安装直接进入下一步
npm install -g @vue/cli
# OR
yarn global add @vue/cli

# 使用vue命令创建项目
vue create ex-repo

```
调整生成后的的目录结构，增加packages目录用来放组件，将src目录改成example目录，方便本地开发测试组件。
需要注意的是`vue-cli`默认入口文件是`src/main.js`，修改目录结构后，需要在`vue.config.js`中修改入口信息，如下：

```javascript
// vue.config.js
...
pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  }
...

```
调整后执行`npm run serve` 就能跑起来了，接下来编写组件

## 添加组件
在`packages`目录中添加组件，这里以一个button按钮作为示例，此时`packages`的结构如下
```
├─packages
|    ├─lib  // 组件结构
|    |  ├─index.js  // 提供了一个install方法注册所有组件,将所有引入的组件暴露出去
|    |  ├─button
|    |  |   ├─index.js  // 提供了一个install方法注册当前组件
|    |  |   ├─src
|    |  |   |  └main.vue  // 组件内容
|    ├─css  
|    |  ├─button.scss // 组件样式
|    |  └index.scss // 全局引入样式
```

### 编写组件
在`packages/lib/`添加button组件目录，button目录下的`index.js` 引入`src/mian.vue`文件并添加一个install方法暴露出来,如下：

导出组件
```javascript
// packages/lib/button/index.js
import XButton from './src/main.vue'

XButton.install = function install(vue) {
  vue.component(XButton.name, XButton)
}

export default XButton
```
编写结构和样式

```html
<!-- 样式路径 packages/css/button.scss -->
<!-- packages/lib/button/src/main.vue -->
<template>
  <button :class="['x-button', type ? 'x-button--' + type : '']">
    <slot/>
  </button>
</template>

<script>
export default {
  name: "xButton",
  props: {
    type: { 
      type: String, 
      default: 'default' 
    }
  }
}
</script>

```

### 测试组件
在`examples/main.js`中引入`packages`中的组件，进行测试
```javascript
import Vue from 'vue'
import App from './App.vue'

// 引入packages中 未编译的源文件
import '../packages/css/index.scss' 
import ExComponent from '../packages/lib/index'

Vue.use(ExComponent)

new Vue({
  render: h => h(App),
}).$mount('#app')
```
此时能看到的效果应该是这样的：
<div>
  <x-button>default</x-button>
  <x-button type="primary">primary</x-button>
  <x-button type="success">success</x-button>
  <x-button type="info">info</x-button>
  <x-button type="warning">warning</x-button>
  <x-button type="danger">danger</x-button>
</div>

## 打包组件库
### 前端模块化几种方案
模块化主要是用来抽离公共代码，隔离作用域，避免变量冲突等。将一个复杂的系统分解为多个模块以方便编码
  - `CommonJS` 同步加载,`CommonJS API`是以在浏览器环境之外构建`JS`生态系统为目标而产生的项目
  - `AMD` 异步加载
  - `UMD` 兼容AMD，CommonJS 模块化语法。
  - `CMD` 由`sea.js`提出的按需解析加载模块
  - `ES6 Module` 加载引用，编译时加载（静态执行）

### webpack打包组件
在项目根目录下新建`wepack`配置文件`webpack.component.js`，将组件打包成`UMD`格式，配置如下
```javascript
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')  // 清理文件夹
const { VueLoaderPlugin } = require('vue-loader')  // 解析vue文件
const glob = require("glob");

const list = {};
// 解析获取组件结构
async function makeList(dirPath,list){  
  const files = glob.sync(`${dirPath}/**/index.js`);
  for(let file of files){
    const output = file.split(/[/.]/)[2];
    list[output] = `./${file}`;
  }
}

makeList('packages/lib',list);
// list 
// { 
//   button: './packages/lib/button/index.js',
//   index: './packages/lib/index.js' 
// }

module.exports = {
  entry: list,
  mode: 'production', // production development
  output: {
    filename: '[name].umd.js',
    path: path.resolve(__dirname, 'dist'), //输出在当前dist目录
    library: 'mui',
    libraryTarget: 'umd' // 选择umd格式
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
          }
        ]
      }
    ]
  },
};
```
安装完对应依赖后，`在package.json`中增加命令
```javascript
...
"scirpts": {
  "build:js": "webpack --config ./webpack.component.js"
}
...
```

在命令行中执行`npm run "build:js`后，能看会出现`dist`目录如下
```
├─dist
|  ├─button.umd.js
|  ├─index.umd.js
```


### gulp 打包css
新建gulpfile.js文件配置插件来打包css，配置内容如下：
```javascript
const gulp = require("gulp")

// gulp-sass手册地址 https://www.npmjs.com/package/gulp-sass
const sass = require('gulp-sass')(require('sass'))

const minifyCSS = require('gulp-minify-css')
const del = require('del');

gulp.task("sass", async function() {
  await del(['dist/css']);    
  return gulp.src("packages/css/**/*.scss")    
    .pipe(sass())
    .pipe(minifyCSS())    
    .pipe(gulp.dest("dist/css"))
})

```
需要注意的是，样式使用的是`scss`，`scss`文件编译使用的是`gulp-sass`, `gulp-sass`会依赖`node-sass`这个包，安装这个包容易出现问题，而且官方已经在2020.10.27宣布弃用, 推荐使用dart-sass。
那怎么让包名是`node-sass`，但实际使用的是`dart-sass`呢？解决方式是，对包重命名，npm6.9以上支持，使用方式是这样`npm install node-sass@npm:dart-sass `

安装完对应依赖后，`在package.json`中增加命令
```javascript
...
"scirpts": {
  "build": "npm run build:js && npm run build:css",
}
...
```
在命令行中执行`npm run "build:css`后，能看会出现`dist`目录如下
```
├─dist
|  ├─css
|  |  ├─button.css
|  |  └index.css
```

### 测试打包后的组件
在`package.json`中增加命令
```javascript
...
"scirpts": {
  "build": "npm run build:js && npm run build:css",
}
...
```
执行`npm run build`后，现在来测试一下打包后的组件，修改`examples/main.js`，引入编译后的文件，如下

```javascript
...

// 引入编译后的文件
import '../dist/css/index.css'  // 引入本地编译的文件
import ExComponent from '../dist/index.umd.js'
Vue.use(ExComponent)
...
```
此时启动的`example`项目呈现应跟之前一致

## 发布组件到npm
- 先到npm上检查包名是否存在，已存在的包名不能注册
- 在`package.json`的`files`字段设置要发布的文件，不设置默认为所有文件
  ```javascript
  // package.json 这里只上传了编译后的`dist`
  ...
    "files": [
      "dist"
    ]
  ...
  ```
  
- `npm login` 登录你的npm账号
- `npm public` 推上去后就可以使用`npm` 安装了
### 发布后使用使用
在项目中使用`npm i ex-component`安装包就可以使用了。
```javascript
// 全部引入
import 'ex-component/dist/css/index.css'
import ExComponent from "ex-component";
Vue.use(ExComponent);

// 按需引入
import 'ex-component/dist/css/button.css'
import { XButton } from "ex-component";
Vue.use(XButton);

```

## 搭建组件库文档站点
### 使用vuepress
  - 初始化组件库结构目录
  - 编写按钮组件文档  
  - 应用demo插件,使用reco主题
  - 在github上创建github Pages
  - 将文档发布到 githud.io

