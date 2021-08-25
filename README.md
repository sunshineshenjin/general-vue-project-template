# 项目说明：
  - vue 模板项目
  - 用户登录只远程验证了用户名是否存在，密码不校验

# 项目启动步骤：
# install dependency
npm install

# develop start
npm run dev

# product start
1. npm run build

# 新项目启动需要替换的内容

- 模块已经自带登录页，启动时不需要登录是应为在 router/index.js中


```
// 正在开发应该打开此行注释，获取真实的token
  // const token = getToken()
  const token = 'sdsdsd'
```

>获取token的代码被注释了，给了默认的token,应打开注释，实现登录接口返回token值

- 替换业务系统的icon，logo，logo在asset文件下

- 修改router下面的路由为真实的业务路由

- 打包发布： 在vue.config.js中有打包的地址配置，dev启动时请求接口是http://loaclhost:8092方便开发调试
build是使用cdn的地址，这里需要在前端发布系统申请项目

# 重要项目结构说明
## 文件结构
```shell
.
├── config: 全局项目配置
├── public: 静态资源文件
└── src
    ├── api: 远程调用
    ├── assets: 静态资源
    ├── components: 自定义组件
    ├── config: 项目配置
    ├── directive: 自定义指令
    ├── libs:工具类
    ├── local: 国际化
    ├── router: 项目路由配置
    ├── store: vuex 状态配置
    └── views
        ├── login: 登录页面
        ├── main: 项目框架页面
        ├── product: 产品页面
    ├── App.vue: Vue 根实例
    ├── main.js: 项目入口文件
└── package.json: 依赖包
└── vue.config.js: 环境/编译配置

Use // eslint-disable-next-line to ignore the next line.
Use /* eslint-disable */ to ignore all warnings in a file.

