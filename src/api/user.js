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
import crypto from '@/util/crypto'

//将要发送的数据构造成Form Data对象
function paramsSerializer(params) {
  let param = new URLSearchParams()
  for (let i=0; i < params.length; i++) {
    param.append(params[i].name, params[i].value)
  }
  return param
}

export const getBasicInfo = () => {
  return axios.request({
    url: '/ifload',
    method: 'post'
  })
}

export const login = (username, passowrd) => {
  const data = paramsSerializer([{
    "name": "username",
    "value": username
  }, {
    "name": "password",
    "value": crypto.Encrypt(passowrd)
  }])
  return axios.request({
    url: '/Weblogin',
    method: 'post',
    data
   })
}