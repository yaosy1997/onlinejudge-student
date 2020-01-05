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
    getPicture,
    getLeftInfo,
    getSummrize,
    getSummary,
    getQuestionProcess,
    getLeastFiveQuestion
} from '@/api/user'
import { setToken, getToken } from '@/lib/util'

export default {
    state: {
        token: getToken(),
        info: {},
        leftInfo:{},
        summrize:{},
        summary:{},
        questionProcess:{},
        leastFiveQuestion:{},
        picture: '',
        isLogin: false,
        loginFilter: false,
    },
    mutations: {
        setLogin(state) {
            state.isLogin = true
        },
        setToken (state, token) {
            state.token = token
            setToken(token)
        },
        setUserInfo(state, info) {
            state.info = info
            state.isLogin = true
        },
        setLeftInfo(state,info){
            state.leftInfo=info
        },
        setSummrize(state,info){
            state.summrize=info
        },
        setSummary(state,info){
            state.summary=info
        },
        setQuestionProcess(state,info){
            state.questionProcess=info
        },
        setLeastFiveQuestion(state,info){
            state.leastFiveQuestion=info
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
            state.leftInfo={},
            state.summrize={},
            state.questionProcess={},
            state.picture='',
            state.isLogin=false,
            state.loginFilter=false
        }
    },
    actions: {
        handleLogin({ dispatch,commit }, { username, password }) {
            return new Promise((resolve, reject) => {
                login(username, password).then(res => {
                    if (res.data.code === "200") {
                        dispatch('handleAllInfo')
                        const data = res.data.data
                        commit('setToken', data.token)
                        resolve("success")
                    } else {
                        resolve(res.data.data)
                    }
                }).catch(err => {
                    reject(err)
                })
            })
        },
        handleLogon({ dispatch,commit }, { username, password, captcha }) {
            return new Promise((resolve, reject) => {
                logon(username, password, captcha).then(res => {
                    if (res.data.code === "200") {
                        dispatch('handleAllInfo')
                        const data = res.data.data
                        commit('setToken', data.token)
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
                        commit('setToken', '')
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
        //一次性获取所有请求
        handleAllInfo({ dispatch }) {
            return new Promise((resolve) => {
                dispatch('handleUserInfo')
                dispatch('handlePicure')
                dispatch('handleLeftInfo')
                dispatch('handleSummrize')
                dispatch('handleSummary')
                //dispatch('handleQuestionProcess')
                dispatch('handleLeastFiveQuestion')
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
        },
        handleLeftInfo({commit}){
            return new Promise((resolve,reject)=>{
                getLeftInfo().then(res=>{
                    if(res.data.code==='200'){
                        commit('setLeftInfo',res.data.data)
                        resolve('success')
                    }else{
                        resolve(res)
                    }
                }).catch(err=>{
                    reject(err)
                })
            })
        },
        handleSummrize({commit}){
            return new Promise((resolve,reject)=>{
                getSummrize().then(res=>{
                    if(res.data.code==='200'){
                        commit('setSummrize',res.data.data)
                        resolve('success')
                    }else{
                        resolve(res)
                    }
                }).catch(err=>{
                    reject(err)
                })
            })
        },
        handleSummary({commit}){
            return new Promise((resolve,reject)=>{
                getSummary('c').then(res=>{
                    if(res.data.code==='200'){
                        commit('setSummary',res.data.data)
                        resolve('success')
                    }else{
                        resolve(res)
                    }
                }).catch(err=>{
                    reject(err)
                })
            })
        },
        handleQuestionProcess({commit}){
            return new Promise((resolve,reject)=>{
                getQuestionProcess().then(res=>{
                    if(res.data.code==='200'){
                        commit('setQuestionProcess',res.data.data)
                        resolve('success')
                    }else{
                        resolve(res)
                    }
                }).catch(err=>{
                    reject(err)
                })
            })
        },
        handleLeastFiveQuestion({commit}){
            return new Promise((resolve,reject)=>{
                getLeastFiveQuestion().then(res=>{
                    if(res.data.code==='200'){
                        commit('setLeastFiveQuestion',res.data.data)
                        resolve('success')
                    }else{
                        resolve(res)
                    }
                }).catch(err=>{
                    reject(err)
                })
            })
        }
    }
}