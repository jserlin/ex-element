import '../packages/css/index.scss' //引入未编译的源文件
import 'element-ui/lib/theme-chalk/index.css';

import App from './App.vue'
import ElementUI from 'element-ui'
import ExComponent from '../packages/lib/index'
import Vue from 'vue'

// import '../dist/css/index.css'  // 引入本地编译的文件
// import ExComponent from '../dist/index.umd.js'

// import 'ex-component/dist/css/index.css' // npm 引入
// import ExComponent from "ex-component";



Vue.use(ElementUI)

Vue.use(ExComponent)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
