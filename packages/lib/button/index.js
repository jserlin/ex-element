import XButton from './src/main.vue'

// eslint-disable-next-line func-names
XButton.install = function install(vue) {
  vue.component(XButton.name, XButton)
}

export default XButton