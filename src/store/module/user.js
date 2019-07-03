import {
    login,
    getBasicInfo
} from '@/api/user'

export default {
    state: {
        info: {},
        isLogin: false,
        loginFilter: false
    },
    mutations: {
        setLogin(state){
            state.isLogin=true
        },
        setUserInfo(state, info) {
            state.info = info
            state.isLogin = true
        },
        setLoginFilter(state) {
            state.loginFilter = true;
            setTimeout(() => {
                state.loginFilter = false
            }, 200)
        },
    },
    actions: {
        handleLogin({commit},{username,password}){
            return new Promise((resolve, reject) => {
                login(username,password).then(res => {
                  if(res.data.code==="200"){
                      commit("setLogin")
                      resolve("success")
                  }else{
                    resolve(res.data.data)
                  }
                }).catch(err => {
                  reject(err)
                })
            })
        },
        getUserInfo({commit}) {
            return new Promise((resolve, reject) => {
                try {
                    getBasicInfo().then(res => {
                        if (res.data.data === '200') {
                            commit('setUserInfo', res.data.data)
                        }
                        resolve(res)
                    })
                } catch (error) {
                    reject(error)
                }
            })
        }
    }
}