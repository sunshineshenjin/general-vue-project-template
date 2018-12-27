import Main from '@/view/main'
/**
 * 这里是不需要权限的路由
 */
export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true,
      public:true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: 'home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true,
      title: '首页'
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          notCache: true,
          title: '首页'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '/product',
    name: 'product',
    meta: {
      icon: 'ios-card',
      title: 'product'
    },
    component: Main,
    children: [
      {
        path: 'list',
        name: 'product_list',
        meta: {
          icon: 'md-basketball',
          notCache: true
        },
        component: () => import('@/view/product/product.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    component: () => import('@/view/error-page/404.vue')
  }
]
