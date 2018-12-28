import { getBreadCrumbList, getMenuByRouter, getHomeRoute } from '@/libs/util'

import { filterRoutersByAccess } from '@/libs/routerHelp'
import router from './../../router/index'
export default {
  state: {
    breadCrumbList: [],
    tagNavList: [],
    homeRoute: getHomeRoute(filterRoutersByAccess()),
    local: ''
  },
  getters: {
    menuList: (state, getters, rootState) => getMenuByRouter(router.options.routes, rootState.user.access)
  },
  mutations: {
    setBreadCrumb (state, routeMetched) {
      state.breadCrumbList = getBreadCrumbList(routeMetched)
    },
    setLocal (state, lang) {
      state.local = lang
    }
  }
}
