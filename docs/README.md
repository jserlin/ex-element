## 快速开始

> 在 main.js 中引入组件库

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

## 导航
-  [组件库搭建全流程](/guide)
- [自定义按钮](/customComponents/button)
- [扩展switch](/extendComponents/switch)