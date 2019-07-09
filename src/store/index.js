/*
 * File: index.js
 * Project: onlinejudge_student
 * File Created: Sunday, 30th June 2019 2:07:28 pm
 * Author: syyao (yao__sy@163.com)
 * -----
 * Last Modified: Sunday, 30th June 2019 7:42:12 pm
 * Modified By: syyao (yao__sy@163.com>)
 * -----
 * Copyright 2019 - 2019 syyao, NJU_JLXY
 * -----
 * HISTORY:
 * Date      	By	Comments
 * ----------	---	---------------------------------------------------------
 * 
 * 30 06 2019	syyao	初始化
 */

import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import bank from './module/bank'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
   
  },
  mutations: {

  },
  actions: {

  },
  modules: {
    user,
    bank
  }
})
