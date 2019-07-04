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
 * 4th July 2019	syyao	加入注册与短信
 */

import {
    login,
    logon,
    getBasicInfo,
    getCaptcha
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
        handleLogon({commit},{username,password,captcha}){
            return new Promise((resolve, reject) => {
                logon(username,password,captcha).then(res => {
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
        handleGetCaptcha({commit},{username}){
            return new Promise((resolve, reject) => {
                getCaptcha(username).then(res => {
                  if(res.data.code==="200"){
                      resolve("success")
                  }else{
                    resolve(res.data.data)
                  }
                }).catch(err => {
                  reject(err)
                  commit
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