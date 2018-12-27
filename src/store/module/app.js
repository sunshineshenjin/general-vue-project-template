import { getBreadCrumbList, getMenuByRouter, getHomeRoute } from '@/libs/util'
import { setTagNavListInLocalstorage, getTagNavListFromLocalstorage } from '@/libs/localStorage'

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
    setTagNavList (state, list) {
      if (list) {
        state.tagNavList = [...list]
        setTagNavListInLocalstorage([...list])
      } else state.tagNavList = getTagNavListFromLocalstorage()
    },
    addTag (state, item, type = 'unshift') {
      if (state.tagNavList.findIndex(tag => tag.name === item.name) < 0) {
        if (type === 'push') state.tagNavList.push(item)
        else state.tagNavList.unshift(item)
        setTagNavListInLocalstorage([...state.tagNavList])
      }
    },
    setLocal (state, lang) {
      state.local = lang
    }
  }
}
