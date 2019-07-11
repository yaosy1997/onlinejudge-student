/*
 * File: user.js
 * Project: onlinejudge_student
 * File Created: Wednesday, 3rd July 2019 3:42:39 pm
 * Author: syyao yao__sy@163.com
 * -----
 * Last Modified: Thursday, 4th July 2019 4:29:03 pm
 * Modified By: syyao yao__sy@163.com
 * -----
 * Copyright 2019 - 2019 syyao, NJU_JLXY
 * HISTORY:
 * Date         	By  	Comments
 * -------------	-----	---------------------------------------------------------
 * 
 * 11th July 2019	syyao	修改学生信息获取方式
 * 
 * 10th July 2019	syyao	增加获取学生信息
 * 
 * 4th July 2019	syyao	加入注册与短信
 */

import {
    login,
    logon,
    logout,
    getUserInfo,
    getCaptcha,
    getPicture
} from '@/api/user'

export default {
    state: {
        info: {},
        picture: '',
        isLogin: false,
        loginFilter: false,
    },
    mutations: {
        setLogin(state) {
            state.isLogin = true
        },
        setUserInfo(state, info) {
            state.info = info
            state.isLogin = true
        },
        setUserPicture(state, info) {
            state.picture = info
        },
        setLoginFilter(state) {
            state.loginFilter = true;
            setTimeout(() => {
                state.loginFilter = false
            }, 200)
        },
        reset(state) {
            state.info = {},
            state.picture='',
            state.isLogin=false,
            state.loginFilter=false
        }
    },
    actions: {
        handleLogin({ dispatch }, { username, password }) {
            return new Promise((resolve, reject) => {
                login(username, password).then(res => {
                    if (res.data.code === "200") {
                        dispatch('handleAllInfo')
                        resolve("success")
                    } else {
                        resolve(res.data.data)
                    }
                }).catch(err => {
                    reject(err)
                })
            })
        },
        handleLogon({ dispatch }, { username, password, captcha }) {
            return new Promise((resolve, reject) => {
                logon(username, password, captcha).then(res => {
                    if (res.data.code === "200") {
                        dispatch('handleAllInfo')
                        resolve("success")
                    } else {
                        resolve(res.data.data)
                    }
                }).catch(err => {
                    reject(err)
                })
            })
        },
        handleLogout({ commit }) {
            return new Promise((resolve, reject) => {
                logout().then(() => {
                        commit('reset')
                        resolve("success")
                }).catch(err => {
                    reject(err)
                })
            })
        },
        handleGetCaptcha({ commit }, { username }) {
            return new Promise((resolve, reject) => {
                getCaptcha(username).then(res => {
                    if (res.data.code === "200") {
                        resolve("success")
                    } else {
                        resolve(res.data.data)
                    }
                }).catch(err => {
                    reject(err)
                    commit
                })
            })
        },
        handleAllInfo({ dispatch }) {
            return new Promise((resolve) => {
                dispatch('handleUserInfo')
                dispatch('handlePicure')
                resolve("success")
            })
        },
        handleUserInfo({ commit }) {
            return new Promise((resolve, reject) => {
                getUserInfo().then(res => {
                    if (res.data.code === '200') {
                        commit('setUserInfo', res.data.data)
                        resolve("success")
                    } else {
                        resolve(res)
                    }
                }).catch(err => {
                    reject(err)
                })

            })
        },
        handlePicure({ commit }) {
            return new Promise((resolve, reject) => {
                getPicture().then(res => {
                    if (res.data.code === '200') {
                        commit('setUserPicture', '/imageApi' + res.data.data)
                        resolve("success")
                    } else {
                        resolve(res)
                    }
                }).catch(err => {
                    reject(err)
                })
            })
        }
    }
}