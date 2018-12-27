import { getAccess } from '@/libs/localStorage'
export const hasPermission = {
  bind: function (el, binding, vnode) {
    let btnPermission = binding.value
    if (!hasBtnPermission(btnPermission)) {
      el.parentNode.removeChild(el)
    }
  }
}

export const hasMenuAccess = (menuAccess, userAccess) => {
  // 如果没有配置权限则默认拥有权限
  if (!menuAccess) {
    return true
  }
  let btnAccessArr
  if (typeof menuAccess === 'string') {
    btnAccessArr = menuAccess.split(',')
  } else if (Array.isArray(menuAccess)) {
    btnAccessArr = menuAccess
  }
  if (!userAccess || !Array.isArray(userAccess)) {
    return false
  }
  return btnAccessArr.some(function (item) {
    // 用户权限包含按钮权限返回true
    return userAccess.indexOf(item) > -1
  })
}
// 权限检测
export const hasBtnPermission = function (access, returnValue) {
  let isExist = false
  let userAccess = getAccess()
  if (userAccess === undefined || !userAccess) {
    if (returnValue === undefined) {
      return false
    } else if (Array.isArray(returnValue)) {
      return []
    } else if (typeof returnValue === 'object') {
      return {}
    } else if (typeof returnValue === 'string') {
      return ''
    }
  }
  if (hasMenuAccess(access, userAccess)) {
    if (returnValue === undefined) {
      return true
    } else {
      return returnValue
    }
  } else {
    if (returnValue === undefined) {
      return false
    } else if (Array.isArray(returnValue)) {
      return []
    } else if (typeof returnValue === 'object') {
      return {}
    } else if (typeof returnValue === 'string') {
      return ''
    }
  }
  return isExist
}
