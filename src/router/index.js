/*
 * File: index.js
 * Project: onlinejudge_student
 * File Created: Friday, 28th June 2019 9:48:12 pm
 * Author: syyao yao__sy@163.com
 * -----
 * Last Modified: Saturday, 29th June 2019 3:37:13 pm
 * Modified By: syyao yao__sy@163.com
 * -----
 * Copyright 2019 - 2019 syyao, MJU_JLXY
 * HISTORY:
 * Date      	By	Comments
 * ----------	---	---------------------------------------------------------
 */
import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'
import iView from 'iview'
import store from '@/store'

Vue.use(Router)

const router = new Router({
    routes,
    mode: 'history'
})

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start()
    let isLogin = store.state.user.isLogin
    if (isLogin === false) {
        store.dispatch('getUserInfo').then(info => {
            console.log(1)
            next()
        })
    } else {
        next()
    }
})

router.afterEach(to => {
    iView.LoadingBar.finish()
    window.scrollTo(0, 0)
})

export default router