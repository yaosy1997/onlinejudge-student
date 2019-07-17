/*
 * File: api.js
 * Project: onlinejudge_student
 * File Created: Sunday, 30th June 2019 2:06:25 pm
 * Author: syyao yao__sy@163.com
 * -----
 * Last Modified: Wednesday, 17th July 2019 7:59:33 pm
 * Modified By: syyao yao__sy@163.com
 * -----
 * Copyright 2019 - 2019 syyao, NJU_JLXY
 * HISTORY:
 * Date         	By  	Comments
 * -------------	-----	---------------------------------------------------------
 * 
 * 17th July 2019	syyao	初始化接口
 */

import axios from '@/lib/api.request'

//将要发送的数据构造成Form Data对象
function paramsSerializer(params) {
  let param = new URLSearchParams()
  for (let i = 0; i < params.length; i++) {
    param.append(params[i].name, params[i].value)
  }
  return param
}

export const initOutClass =(type)=>{
    const data = paramsSerializer([{
        name: "difficult",
        value: type
      }])
    return axios.request({
        url:'/init_bank',
        method:'post',
        data
    })
}