import '../packages/css/index.scss'
import 'element-ui/lib/theme-chalk/index.css';

import App from './App.vue'
import ElementUI from 'element-ui'
import Vue from 'vue'
import exElement from '../packages/lib/index'

Vue.use(ElementUI)

Vue.use(exElement)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
