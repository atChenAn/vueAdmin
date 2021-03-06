import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { Message, MessageBox } from 'element-ui'

const user = {
  state: {
    token: getToken(),
    name:  sessionStorage.getItem("name") || '',
    password: sessionStorage.getItem("password") || '',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    roles: [],
    userInfo: JSON.parse(sessionStorage.getItem("userInfo")) || []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_USERINFO: (state, data) => {
      state.userInfo = data
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.phone.trim();
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          console.log(response.data)
          const data = response.data;
          Message({
            message: "登录成功!",
            type: 'success',
            duration: 5 * 1000
          })
          setToken(data.userData.token)
          commit('SET_TOKEN', data.userData.token) // 设置token
          commit('SET_ROLES', data.userData.rid) // 设置角色权限
          commit('SET_NAME', username)
          sessionStorage.setItem("name",username);
          sessionStorage.setItem("password",userInfo.password);
          sessionStorage.setItem("userInfo",JSON.stringify(data));
          commit('SET_USERINFO',data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        // getInfo(state.token).then(response => {
        //   const data = response.data
        //   if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
        //     commit('SET_ROLES', data.roles)
        //   } else {
        //     reject('getInfo: roles must be a non-null array !')
        //   }
        //   commit('SET_NAME', data.name)
        //   commit('SET_AVATAR', data.avatar)
        //   resolve(response)
        // }).catch(error => {
        //   reject(error)
        // })
        resolve(state.userInfo);
      })
    },

    // 登出
    LogOut({ commit }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_USERINFO', [])
        removeToken()
        sessionStorage.clear();
        resolve();
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
