module.exports = {
  title: 'ExFragment',
  description: '片段拾遗',
  base: '/ex-element/',
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
    sidebar: [
      '/', 
      '/componentDocs/button',
      '/componentDocs/switch',
    ]
  },
  head: [],
  plugins: [ 'demo-container' ],
  markdown: {}
}