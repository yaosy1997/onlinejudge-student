/*
 * File: index.js
 * Project: onlinejudge_student
 * File Created: Friday, 28th June 2019 9:48:12 pm
 * Author: syyao yao__sy@163.com
 * -----
 * Last Modified: Saturday, 29th June 2019 3:37:13 pm
 * Modified By: syyao yao__sy@163.com
 * -----
 * Copyright 2019 - 2019 syyao, NJU_JLXY
 * HISTORY:
 * Date         	By  	Comments
 * -------------	-----	---------------------------------------------------------
 * 
 * 9th July 2019	syyao	增加对于未登录状态下访问题库页面的守卫
 * 
 * 9th July 2019	syyao	重定向bank的路由
 * 
 * 30th June 2019	syyao	初始化
 */


import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'
import iView from 'iview'
import store from '@/store'
import {ifload} from '@/api/user'

Vue.use(Router)

const router = new Router({
    routes,
    mode: 'history'
})

async function getAllInfo(next){
    await store.dispatch('handleAllInfo')
    next()
}

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start()
    let isLogin = store.state.user.isLogin
    if (isLogin === false) {
        ifload().then(info => {
            if (info.data.code === '201') {
               getAllInfo(next)
            } else {
                if (to.name === "eachOutClassCode") {
                    iView.Message.error('请先登录')
                    if(from.name===to.name || from.path==='/'){
                        next({name:'home'})
                    }
                    store.commit("setLoginFilter")
                    iView.LoadingBar.finish()
                    window.scrollTo(0, 0)
                } else {
                    next()
                }
            }
        })

    } else {
        next()
    }
})

router.afterEach(() => {
    iView.LoadingBar.finish()
    window.scrollTo(0, 0)
})

export default router