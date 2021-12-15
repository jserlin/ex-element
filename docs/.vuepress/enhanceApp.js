import 'element-ui/lib/theme-chalk/index.css';
import '../../packages/css/index.scss'

import ElementUI from 'element-ui';
import ExElement from '../../packages/lib/index'

export default async ({
  Vue
}) => {
  if (typeof process === 'undefined') {
    Vue.use(ElementUI)
    Vue.use(ExElement)
  }
}