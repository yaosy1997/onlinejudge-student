/*
 * File: user.js
 * Project: onlinejudge_student
 * File Created: Friday, 28th June 2019 5:12:20 pm
 * Author: syyao yao__sy@163.com
 * -----
 * Last Modified: Friday, 28th June 2019 5:45:54 pm
 * Modified By: syyao yao__sy@163.com
 * -----
 * Copyright 2019 - 2019 syyao, MJU_JLXY
 * HISTORY:
 * Date      	By	Comments
 * ----------	---	---------------------------------------------------------
 */
import axios from '@/lib/api.request'

export const getBasicInfo =()=>{
    return axios.request({
        url: '/ifload',
        method: 'post'
      })
}

export const login =()=>{
    return axios.request({
        url: '/WebLogin',
        method: 'post'
      })
}