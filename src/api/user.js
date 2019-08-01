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
 * Date         	By  	Comments
 * -------------	-----	---------------------------------------------------------
 * 
 * 10th July 2019	syyao	增加获取学生信息
 * 
 * 4th July 2019	syyao	加入注册与短信接口
 * 
 * 3th July 2019	syyao	将要发送的数据构造成Form Data对象
 * 
 * 28th June 2019	syyao	初始化，并加入登录接口
 * 
 */

import axios from '@/lib/api.request'
import crypto from '@/util/crypto'

//将要发送的数据构造成Form Data对象
function paramsSerializer(params) {
  let param = new URLSearchParams()
  for (let i = 0; i < params.length; i++) {
    param.append(params[i].name, params[i].value)
  }
  return param
}

export const ifload = () => {
  return axios.request({
    url: '/ifload',
    method: 'post'
  })
}

export const login = (username, passowrd) => {
  const data = paramsSerializer([{
    name: "username",
    value: username
  }, {
    name: "password",
    value: crypto.Encrypt(passowrd)
  }])
  return axios.request({
    url: '/Weblogin',
    method: 'post',
    data
  })
}

export const logon = (username, passowrd, captcha) => {
  const data = paramsSerializer([{
    name: "username",
    value: username
  }, {
    name: "password",
    value: crypto.Encrypt(passowrd)
  }, {
    name: "captcha",
    value: captcha
  }])
  return axios.request({
    url: '/register',
    method: 'post',
    data
  })
}

export const logout = () => {
  return axios.request({
    url: '/logout',
    method: 'post'
  })
}

export const getCaptcha = (username) => {
  const data = paramsSerializer([{
    name: 'phone',
    value: username
  }])
  return axios.request({
    url: '/get_message',
    method: 'post',
    data
  })
}

export const getUserInfo = () => {
  return axios.request({
    url: '/get_Student_Information',
    method: 'post'
  })
}

export const getPicture = () => {
  return axios.request({
    url: '/get_picture',
    method: 'post'
  })
}

export const getLeftInfo = () => {
  return axios.request({
    url: '/left_Information',
    method: 'post'
  })
}

export const getSummrize = () => {
  return axios.request({
    url: '/summarize',
    method: 'post'
  })
}

export const getQuestionProcess = () => {
  return axios.request({
    url:'/question_difficult_num',
    method:'post'
  })
}

export const getLeastFiveQuestion = () => {
  return axios.request({
    url:'/five_student',
    method:'post'
  })
}

export const changePlan = (number) => {
  const data = paramsSerializer([{
    name:'newnumber',
    value:number
  }])
  return axios.request({
    url:'/change_plan',
    method:'post',
    data
  })
}