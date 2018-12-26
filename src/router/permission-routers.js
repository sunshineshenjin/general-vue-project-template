import Main from '@/view/main'

/**
 *  这里保存需要权限的路由
 */
export default [

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
          access: ['test'],
          icon: 'md-basketball',
          notCache: true
        },
        component: () => import('@/view/product/product.vue')
      }
    ]
  },
]
