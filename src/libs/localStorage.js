import Cookies from 'js-cookie'
// cookie保存的天数
import config from './cookie-config'

export const TOKEN_KEY = 'token'
export const USER_NAME = 'user_name'
export const ACCESS = 'access'

export const removeAllCookies = () => {
  clearGoPath()
  Cookies.remove(TOKEN_KEY)
  deleteAccess()
  Cookies.remove(USER_NAME)
}

export const removeAllLocalStorage = () => {
  localStorage.clear()
}

export const setToken = (token) => {
  Cookies.set(TOKEN_KEY, token, {expires: config.cookieExpires || 1})
}

export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY)
  if (token) return token
  else return false
}

export const setAccess = (access) => {
  Cookies.set(ACCESS, JSON.stringify(access), {expires: config.cookieExpires || 1})
}

export const getAccess = () => {
  const access = Cookies.get(ACCESS)
  if (access) {
    let cookieAccess = JSON.parse(access)
    if (Array.isArray(cookieAccess)) {
      return cookieAccess
    } else {
      deleteAccess()
      return ['test']
    }
  } else {
    return ['test']
  }
}

export const deleteAccess = () => {
  Cookies.remove(ACCESS)
}
export const setUserName = (userName) => {
  Cookies.set(USER_NAME, userName, {expires: config.cookieExpires || 1})
}

export const getUserName = () => {
  const userName = Cookies.get(USER_NAME)
  if (userName) return userName
  else return false
}

/**
 * @description 本地存储和获取标签导航列表
 */
export const setTagNavListInLocalstorage = list => {
  localStorage.tagNaveList = JSON.stringify(list)
}
/**
 * @returns {Array} 其中的每个元素只包含路由原信息中的name, path, meta三项
 */
export const getTagNavListFromLocalstorage = () => {
  const list = localStorage.tagNaveList
  return list ? JSON.parse(list) : []
}
