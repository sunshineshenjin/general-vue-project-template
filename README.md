# 项目说明：
  - vue 模板项目
  - 用户登录只远程验证了用户名是否存在，密码不校验
  - 项目结构基于iview-admin-2.0
  
# 项目启动步骤：
# install dependency
npm install

# develop start
npm run dev

# product start
1. npm run build
2. npm run start 或 node ./bin/www
3. http://localhost:9000/

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


