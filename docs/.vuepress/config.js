module.exports = {
  title: 'ExElement',
  description: '片段拾遗',
  base: '/ex-element/',
  port: '8080',
  themeConfig: { // 新增代码
    nav: [ // 配置顶部导航栏
      { text: '首页',link: '/' },
      {
        text: '组件',
        ariaLabel: 'Language Menu',
        items: [
          { text: '自定义组件', link: '/customComponents/' },
          { text: '扩展组件', link: '/extendComponents/' }
        ]
      },
      { text: 'Github', link: 'https://github.com/jserlin/ex-element' }
    ],
    sidebar: [
      {
        title: '指南',
        path: '/'
      },
      {
        title: '自定义组件',   // 必要的
        path: '/customComponents/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        children: [
          '/customComponents/button'
        ]
      },
      {
        title: '扩展组件',
        path: '/extendComponents/',
        children: [
          '/extendComponents/switch'
        ]
      }
    ]
  },
  head: [],
  plugins: [ 'demo-container' ],
  markdown: {}
}