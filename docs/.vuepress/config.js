module.exports = {
  title: 'ExElement',
  description: '文档模板，组件模板，扩展模板，按需使用',
  base: '/ex-element/',
  port: '8080',
  theme: 'reco',
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
        path: '/',
      },
      {
        title: '从零开始搭建组件库',
        path: '/guide/',
      },
      {
        title: 'Typora结合picGo',
        path: '/guide/typoraAndPicgo',
      },
      {
        title: 'Sentry前端监控指南',
        path: '/guide/sentryAndWeb',
      },
      {
        title: 'nginx常用配置',
        path: '/guide/nginxAdnWeb',
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
    ],
    subSidebar: 'auto'
  },
  head: [],
  plugins: [ 'demo-container' ],
  markdown: {}
}