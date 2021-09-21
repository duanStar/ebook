# ebook

> 基于mpvue开发的微信小程序阅读器

## 技术栈

```
1.使用mpvue完成项目初始化、开发及构建
2.集成scss、vant-weapp组件库、mpvue-router-patch路由插件
3.使用flyio完成异步请求
```

## 打包构建

``` bash
# 安装依赖
yarn

# 开发时构建
npm dev

# 打包构建
npm build

# 指定平台的开发时构建(微信、百度、头条、支付宝)
npm dev:wx

# 指定平台的打包构建
npm build:wx

# 生成 bundle 分析报告
npm run build --report
```
