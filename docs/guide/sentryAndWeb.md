## Sentry前端监控指南

![img](https://cdn.jsdelivr.net/gh/jserlin/pic233@main/img/bige-798515-9673-undefined-2-b7e4f890c0f6c89071417ab66cb6b7a5.png)

### 背景

现在的网络环境用户环境错综复杂，如何保持应用的质量及稳定性是个问题。BUG 产生的变量太多，如：浏览器的版本、用户所处的网络环境、操作方式与时间等等都可能产生不一样的 BUG，前期测试很难做到 100%覆盖；我们不能奢求每个用户遇到问题时候都会主动向我们反馈，而且对于用户反馈的 BUG，会因为专业术语不通、表达不清晰等沟通问题，也难以复现 BUG。所以需要一个远程收集客户端错误的方案，能在项目出现异常时主动对其进行收集上报，便于快速定位问题并解决，这就是本文要介绍的 Sentry。

### Sentry介绍

sentry是一个开源的异常监控系统，能支持服务端与客户端的监控，多平台支持、实时收集、完整复现，还有个强大的后台错误分析、报警平台。

### 接入流程

这里以前端项目使用的Vue3 框架为例，介绍下接入流程，其他平台根据提示接入即可。

#### 1. 新建项目

登录sentry平台，点击右上角【Add new】新建一个项目，框架选择 Vue ，填入项目名称，再选择所属Team，点击【Create Project】创建项目。

![image-20211229102742709](https://cdn.jsdelivr.net/gh/jserlin/pic233@main/img/image-20211229102742709.png)

新建完项目后，会生成一个**DNS**（可以在引导页或者设置中看到），它是和sentry服务通信的标识，在项目配置时要用到。进入项目后看到界面如图。

![image-20211229104855575](https://cdn.jsdelivr.net/gh/jserlin/pic233@main/img/image-20211229104855575.png)

点击【Create a simple event】会产生一条错误信息

![image-20211229115305863](https://cdn.jsdelivr.net/gh/jserlin/pic233@main/img/image-20211229115305863.png)

异常信息点进去，能看到错误明细与用户的操作时间轨迹等信息，很方便。

![image-20211229115936838](https://cdn.jsdelivr.net/gh/jserlin/pic233@main/img/image-20211229115936838.png)

![image-20211229115822863](https://cdn.jsdelivr.net/gh/jserlin/pic233@main/img/image-20211229115822863.png)

​	

#### 2. 安装SDK

创建完项目后，首先要项目中安装依赖。

```sh
# Using yarn
$ yarn add @sentry/vue @sentry/tracing

# Using npm
$ npm install --save @sentry/vue @sentry/tracing
```

#### 3. 配置

配置应该在应用程序的生命周期中尽早进行，Vue 应用初始化 Sentry，将其添加到`app.js`中。

Vue3 接入

```javascript
import Vue from "vue";
import Router from "vue-router";
import * as Sentry from "@sentry/vue";
import { Integrations } from "@sentry/tracing";

Vue.use(Router);

const router = new Router({
  // ...
});

Sentry.init({
  Vue,
  // 创建项目时，生成的DSN标识 
  dsn: "https://examplePublicKey@o0.ingest.sentry.io/0", 
  integrations: [
    new Integrations.BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      // tracingOrigins: ["localhost", "my-site-url.com", /^\//],
    }),
  ],
  enabled: process.env.NODE_ENV !== 'development',  // 开发环境不上报
  environment: process.env.NODE_ENV, // 设置应用环境
  logErrors: true, // 设置成true之后将同时在浏览器控制台输出错误信息，否则错误信息被sentry拦截，浏览器控制台不输出错误
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

// ...

new Vue({
  router,
  render: h => h(App),
}).$mount("#app");
```

Vue3 多个应用

```javascript
const appOne = Vue.createApp(App);
const appTwo = Vue.createApp(App);
const appThree = Vue.createApp(App);

Sentry.init({
  app: [appOne, appTwo, appThree],
});
```

#### 4. 验证

完成了项目的初始化后，SDK 会自动捕获应用运行时的错误进行上报。我们可以在管理后台实时监控到错误信息，这里我们在项目中抛出一个错误，然后进入sentry对应项目查看问题。

```javascript
// ...
<button @click="throwError">Throw error</button>
// ...

export default {
  // ...
  methods: {
    throwError() {
      throw new Error('Sentry Error');
    }
  }
};
```

异常信息界面，这里的异常信息是点击【create a simple event】产生的，用来做参考.

![image-20211229115305863](https://cdn.jsdelivr.net/gh/jserlin/pic233@main/img/image-20211229115305863.png)

### 其他

#### init配置选项

`Sentry.init`时，还可以传入根据需要一些有用的参数：

- `enabled`（默认为`true`）是否上报信息
- `environment` 应用环境，同一应用可能有多个环境，设置这个值方便区分环境。

- `attachProps`（默认为`true`） - 包括所有 Vue 组件的props和events。
- `logErrors`（默认为`false`） - 决定 SDK 是否也应该调用 Vue 的原始`logError`函数。
- `trackComponents`（默认为`false`） - 决定是否通过挂钩到其生命周期方法来跟踪组件。可以设置为`boolean`，以启用/禁用对所有组件的跟踪，或设置为特定组件名称的数组（区分大小写）。
- `timeout`（默认为`2000`） - 以毫秒为单位的时间，指示等待被跟踪的根活动被标记为完成并发送到 Sentry 的时间。
- `hooks`（默认为`['activate', 'mount', 'update']`）- 在组件生命周期中跟踪的钩子列表`'activate' | 'create' | 'destroy' | 'mount' | 'unmount' | 'update'`。

#### 主动上报异常

通过自动上报，我们已经能成功监控到vue中的错误、异常，但是还不能捕捉到异步操作、接口请求中的错误，比如接口返回404、500等信息，此时我们可以通过可以通过`Sentry`方法进行手动进行主动上报

```javascript
Sentry.captureMessage("Something went wrong")

Sentry.captureException(new Error("my error"))

// 接口异常
axios.interceptors.response.use(data => {
    return data;
  }, error => {
    Sentry.captureException(error);
  })
// 异步操作异常 在异步操作中的异常也不能被自动捕捉，需要手动处理
setTimeout(()=>{
    try {
        // do some
    } catch (err) {
        window.$Raven.captureException(err);
    }
}, 1000)
```

#### 上报额外信息

Sentry自动上报的信息除了错误信息之外，还包括一些基本的浏览器信息和系统信息。当这些信息不满足我们的需求时，可以额外自定义一些信息进行上报，比如：将用户的相关信息进行上报，将上报的错误与用户关联起来，当用户遇到故障时，就能在Sentry后台通过ID搜索用户遇到了哪些错误。

Sentry里这个能力叫Scope。其可以包含 user、tags、level、fingerprint、extra data 等丰富信息，分别通过 `scope.setUser`、`scope.setTags` 、`scope.setLevel`、`scope.setFingerprint`、`scope.setExra`调用。具体例子：

```
// 设置用户信息：
scope.setUser({ 'userId': '233'})
// 给事件定义标签：
scope.setTags({ 'api', '233tag'})
// 设置事件的严重性：
scope.setLevel('urgent')
// 设置事件的分组规则：
scope.setFingerprint(['{{ default }}', url])
// 设置附加数据：
scope.setExtra('data', { exInfo: { id: 233, corpId: 2333 })
```

创建 scope 有两种方式：

- 全局 scope
- 局部 scope

全局 scope 通过`Sentry.configureScope` 创建：

```js
Sentry.configureScope(function (scope) {
  scope.setTag("my-tag", "my value");
  scope.setUser({
    id: 42,
    email: "john.doe@example.com",
  });
});
```

创建后，应用的所有的错误都被关联到当前 scope 信息

局部 scope 通过 `Sentry.withScope` 创建：

```js
Sentry.withScope(function (scope) {
  scope.setTag("my-tag", "my value");
  scope.setLevel("warning");
  // will be tagged with my-tag="my value"
  Sentry.captureException(new Error("my error"));
});

// will not be tagged with my-tag
Sentry.captureException(new Error("my other error"));
```



#### 上传 Source Maps 文件

Sentry提供了一个webpack插件`@sentry/webpack-plugin`，可以配置source Maps并自动上传到Sentry。

1. 安装插件

   ```sh
   # npm
   npm install --save-dev @sentry/webpack-plugin
   # or
   # yarn
   yarn add --dev @sentry/webpack-plugin
   ```

2. 配置

   Webpack 插件会自动设置`window.SENTRY_RELEASE`，所以`Sentry.init`调用不需要包含`release`值，

   ```javascript
   const SentryWebpackPlugin = require("@sentry/webpack-plugin");
   
   module.exports = {
     // other webpack configuration
     devtool: 'source-map',
     plugins: [
       new SentryWebpackPlugin({
         // sentry-cli configuration - can also be done directly through sentry-cli
         // see https://docs.sentry.io/product/cli/configuration/ for details
         authToken: process.env.SENTRY_AUTH_TOKEN,
         org: "example-org",
         project: "example-project",
         release: process.env.SENTRY_RELEASE,  // 一致的版本号
   
         // other SentryWebpackPlugin configuration
         include: "./dist",  // 作用的文件夹
         ignore: ["node_modules", "webpack.config.js"],
       }),
     ],
   };
   ```

#### 项目配置

进入项目点击【Settings】进入项目设置

![image-20211229144458965](https://cdn.jsdelivr.net/gh/jserlin/pic233@main/img/image-20211229144458965.png)

点击后跳转到这个界面

![image-20211229150124417](https://cdn.jsdelivr.net/gh/jserlin/pic233@main/img/image-20211229150124417.png)

- 设置允许访问域名` CLIENT SECURITY -> Allowed Domains`，建议填入自己的业务域名。避免恶意的接入导致Sentry接收太多的无效错误，以至于正常的错误被淹没，是去捕获的意义。

- 设置警报规则 (Alerts -> Rules)，这里可以根据 BUG 第一次出现、BUG 状态变更、单位时间内一个 BUG 被触发了多少次等等进行设置

  ![image-20211229145926931](https://cdn.jsdelivr.net/gh/jserlin/pic233@main/img/image-20211229145926931.png)

- 错误过滤 （Inbound Filters）

  有些错误并不是应用本身产生的（如浏览器插件产生的），或者是可以忽略的错误，如：低版本浏览器产生的、本地开发的错误。可以在这里进行配置。

  ![image-20211229151426333](https://cdn.jsdelivr.net/gh/jserlin/pic233@main/img/image-20211229151426333.png)

### 最后

开发最糟心的问题之一，莫过于遇到本身和测试环境甚至生产环境都是好的， 但由于应用运行的真实环境很复杂，用户使用时可能会产生各类各样还复现不了的问题。所以接入前端监控系统，主动收集错误，对整个前端业务的稳定，用户体验提升都大有好处。

### 参考

- [Sentry Docs Vue](https://docs.sentry.io/platforms/javascript/guides/vue/)

- [Sentry source Maps](https://docs.sentry.io/platforms/javascript/guides/vue/sourcemaps/)

  