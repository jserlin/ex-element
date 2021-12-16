## 用途
> 可以用这套当作模板，搭建、扩展组件库或者存放一些代码片段



## 快速开始

> 当将打包的dist目录发布到npm后，在 main.js 中引入组件库

```javascript
// 全部引入
import 'ex-component/dist/css/index.css'
import ExComponent from "ex-component";
Vue.use(ExComponent);

// 按需引入
import 'ex-component/dist/css/index.css'
import { XButton } from "ex-component";
Vue.use(XButton);

```


## 目录说明
- docs 基于vuepress的组件文档目录，可以在文档中对组件进行交互
- packages 组件目录 
- examples 组件示例目录
- deploy.sh 文档部署脚本，这里用的github Page

## 注意事项
- 扩展依赖第三方包的组件时，记得配置`externals`, 不然会将第三方包打包到一起，导致打包的体积过大
  ```javascript
  externals: { 
    Vue: 'Vue',
    'element-ui': 'element-ui',
  },
  ```

## 文档地址
- [https://jserlin.github.io/ex-element/](https://jserlin.github.io/ex-element/)



