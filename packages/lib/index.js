import ExSwicth from './ex-swicth'
import XButton from './button'
import { version } from '../../package.json'

const components = {
  XButton,
  ExSwicth
}

const install = function(vue) {
  if (install.installed) return 
  Object.keys(components).forEach(key => {
    vue.component(components[key].name, components[key])
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version,
  install,
  ...components
}