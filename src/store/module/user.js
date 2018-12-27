import { login, logout } from '@/api/user'
import { setToken, getToken, setUserName, getUserName, getAccess, setAccess, removeAllCookies, removeAllLocalStorage } from '@/libs/localStorage'

export default {
  state: {
    userName: '',
    userId: '',
    avatorImgPath: '',
    token: getToken(),
    access: getAccess,
    flag: 0,
    msg: ''
  },
  mutations: {
    setAvator (state, avatorPath) {
      state.avatorImgPath = avatorPath
    },
    setUserId (state, id) {
      state.userId = id
    },
    setUserName (state, name) {
      state.userName = name
    },
    setAccess (state, access) {
      state.access = access
      setAccess(access)
    },
    setToken (state, token) {
      if (token && token !== 'undefined') {
        state.token = token
        setToken(token)
      }
    },
    setMsg (state, msg) {
      state.msg = msg
    },
    setFlag (state, flag) {
      state.flag = flag
    }
  },
  getters: {
    getUserName: state => {
      return state.userName
    }
  },
  actions: {
    // 登录
    handleLogin ({ commit }, {userName, password}) {
      userName = userName.trim()
      return new Promise((resolve, reject) => {
        login({
          userName,
          password
        }).then(res => {
          const data = res.data
          if (data.flag) {
            let roles = []
            if (data.data && data.data.roles) {
              data.data.roles.forEach(item => {
                roles.push(item.authority)
              })
            }
            commit('setAccess', roles)
            commit('setFlag', 1)
            commit('setToken', data.data.tokenId)
            commit('setUserName', data.data.username)
            setUserName(data.data.username)
            commit('setUserId', data.data.id)
          }
          commit('setMsg', data.des)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('setToken', '')
          commit('setAccess', [])
          commit('setUserName', '')
          commit('setUserId', '')
          commit('setMsg', '')
          removeAllCookies()
          removeAllLocalStorage()
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取用户相关信息
    getUserInfo ({ state, commit }) {
      return new Promise((resolve, reject) => {
        let userName = getUserName()
        if (userName) {
          commit('setUserName', userName)
        }
        commit('setAccess', getAccess())
        const data = {}
        commit('setAvator', 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png')
        resolve(data)
      })
    }
  }
}
