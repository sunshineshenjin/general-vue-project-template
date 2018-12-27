import permissionRouter from '../router/permission-routers'
import { deepCopyRoutes } from '@/utils/assist'
import { getAccess } from '@/libs/localStorage'

export const hasMenuAccess = (menuAccess, userAccess) => {
  if (!menuAccess || !Array.isArray(menuAccess)) {
    return true
  }
  if (!userAccess || !Array.isArray(userAccess)) {
    console.info('无法获取用户权限')
    return false
  }
  return menuAccess.some(function (item) {
    return userAccess.indexOf(item) > -1
  })
}

export const filterRoutersByAccess = () => {
  let access = getAccess()
  let showRouters = []
  if (!access) {
    return []
  }
  // 一定要使用路由的深复制方法，保留原始路由不被污染
  let routes = deepCopyRoutes(permissionRouter)
  // 固定路由权限判断
  routes.forEach(route => {
    // 对于无child的路由，判断access,无access视为所有角色共享权限，否则检测权限
    if ((!route.children) || route.children.length === 0) {
      if (route.meta && route.meta.access) {
        if (hasMenuAccess(route.meta.access, access)) {
          showRouters.push(route)
        }
      } else {
        showRouters.push(route)
      }
    } else {
      // 对于有child的路由，判断child的access,无access视为所有角色共享权限，否则检测权限
      if (route.children.length > 0) {
        let newChildrens = []
        route.children.forEach((childItem) => {
          if (childItem.meta.access) {
            if (hasMenuAccess(childItem.meta.access, access)) {
              newChildrens.push(childItem)
            }
          } else {
            newChildrens.push(childItem)
          }
        })
      }
    }
  })
  return showRouters
}
