module.exports = {
  theme: '',
  title: 'ex-element',
  description: '一些片段集合',
  base: '/',
  port: '8080',
  themeConfig: { // 新增代码
    nav: [ // 配置顶部导航栏
      {
        text: '首页',
        link: '/'
      },
      {
        text: '组件',
        link: '/componentDocs/button'
      }
    ],
    sidebar: ['/', '/componentDocs/button' ]
  },
  head: [],
  plugins: [ 'demo-container' ],
  markdown: {}
}