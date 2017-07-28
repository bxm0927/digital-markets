
# 电子产品售卖平台

这一个基于 Vue.js 的小型电子产品售卖平台，使用了 vue-router、vue-resource 等。

![图片预览](http://oph264zoo.bkt.clouddn.com/17-7-28/12124023.jpg)
![图片预览](http://oph264zoo.bkt.clouddn.com/17-7-28/27008677.jpg)


## 技术栈

【前端】

- ES6：ECMAScript 新一代语法，这也是以后的趋势
- Vue.js：界面框架
- vue-router：配合 Vue 进行路由管理
- vue-resource：配合 Vue 进行 HTTP 请求处理

【后端】

- Express：模拟后端服务器
- json-server：一个测试服务器，用来模拟后端数据

【自动化构建】

- webpack：vue-cli 自带的前端自动化编译工具

## 实现细节

**根组件**

根组件 `app.vue` 中实现了顶部和尾部的全局样式，主要包括弹窗组件组件和登录注册组件，用到了简单的正则验证。

**首页**

首页左侧为两个导航，主要使用了 `<template>` 模版、`v-for` 列表渲染、`v-if` 条件渲染。

“全部产品” 的数据是在 `data` 中模拟的后端数据，“最新消息” 的数据是用 `json-server` 这个测试服务器来模拟的后端数据，但是发现 `POST` 请求失败，所以改用了 `express` 来模拟的后端数据;

首页右侧为一个轮播图组件，为了更好的实践我并没有采用第三方插件。

**详情页**

为详情页分配四个子路由，并实现各自的组件功能，其中包含了众多小组件


## 收获

1. 对 vue 的组件、指令、选项、模版渲染、事件绑定、计算属性等有了一定了解
2. 了解了 vue 组件之间的交互、传值
3. 熟悉了在 vue 项目中使用第三方插件（组件）
4. 熟悉了组件化、模块化的开发思维
5. 熟悉了 vue-router 控制路由和子路由的方式
6. 再次熟悉项目开发流程：项目分析设计 -> 项目环境搭建 -> 依赖安装 -> 页面架构设计 -> 组件开发 -> 测试联调 -> 发布上线


## TODO

1. 纯前端项目，数据是模拟的 json 数据
2. 没有使用 vuex 来管理数据状态
3. 不是响应式网站


## Build Setup

``` bash
# clone the repo into your disk.
$ git clone https://github.com/bxm0927/digital-markets.git

# install dependencies
$ npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```


## License

The code is available under the [MIT license](https://opensource.org/licenses/MIT).


## Thanks
@fishenal
