import {
    getBasicInfo
} from '@/api/user'

export default {
    state: {
        info: {},
        isLogin: false,
        loginFilter: false
    },
    mutations: {
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
        getUserInfo({
            commit
        }) {
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