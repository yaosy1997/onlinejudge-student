/*
 * File: axios.js
 * Project: onlinejudge_student
 * File Created: Friday, 28th June 2019 5:15:25 pm
 * Author: syyao yao__sy@163.com
 * -----
 * Last Modified: Friday, 28th June 2019 6:41:35 pm
 * Modified By: syyao yao__sy@163.com
 * -----
 * Copyright 2019 - 2019 syyao, MJU_JLXY
 * HISTORY:
 * Date      	By	Comments
 * ----------	---	---------------------------------------------------------
 * 
 *  28th June 2019	syyao	初始化
 */


import axios from 'axios'

import store from '@/store'
import router from '@/router'
//每次传过去的cookie不变
axios.defaults.withCredentials = true;

class HttpRequest {
    constructor(baseUrl = baseURL) {
        this.baseUrl = baseUrl
        this.queue = {}
    }
    getInsideConfig () {
        const config = {
          baseURL: this.baseUrl,
          headers: {
            //
          }
        }
        return config
      }
      interceptors(instance, url) {
        //对未登录的请求进行拦截
        axios.interceptors.response.use(
            response => {
                if (response.data.code === '600') {
                    //如果已经拦截过就不拦截
                    if (store.state.loginFilter === true) {
                        return response;
                    }
                    router.push({
                        name: 'home'
                    })
                    store.commit('setLoginFilter');

                } else {
                    return response;
                }

            },
            error => {
                return Promise.reject(error)
            }
        )
    }
    request (options) {
        const instance = axios.create()
        options = Object.assign(this.getInsideConfig(), options)
        this.interceptors(instance, options.url)
        return instance(options)
      }
}
export default HttpRequest