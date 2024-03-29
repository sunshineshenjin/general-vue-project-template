import httpApi from './../libs/httpRequestUtil'

export const login = ({ userName, password }) => {
  const data = {
    userName,
    password
  }
  return httpApi.request('POST', '/admin/login', data)
}

export const getUserInfo = (token) => {
  return httpApi.request('get', 'get_info', {token})
}

export const logout = (token) => {
  return httpApi.request('post', '/admin/user/logout')
}
