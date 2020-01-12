/*
 * File: router.js
 * Project: onlinejudge_student
 * File Created: Tuesday, 25th June 2019 5:12:43 pm
 * Author: syyao yao__sy@163.com
 * -----
 * Last Modified: Saturday, 29th June 2019 3:37:33 pm
 * Modified By: syyao yao__sy@163.com
 * -----
 * Copyright 2019 - 2019 syyao, NJU_JLXY
 * HISTORY:
 * Date      	By	Comments
 * ----------	---	---------------------------------------------------------
 * 
 * 17th July 2019	syyao	增加做题页面
 * 
 * 9th July 2019	syyao	重定向bank页面
 */

import store from '@/store'

export default [{
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/bank',
    name: 'bank',
    redirect: '/bank/class',
    component: () => import('@/views/Bank/Bank.vue'),
    children: [{
      path: 'class',
      name: 'class',
      component: () => import('@/views/Bank/Class/Class.vue'),
      children: [{
        path: ':bankName',
        name: 'eachClassBank',
        component: () => import('@/views/Bank/Class/EachClass.vue'),
      }]
    }, {
      path: 'outclass',
      name: 'outclass',
      redirect: '/bank/outclass/' + store.state.bank.bankList.outclass[0].aka,
      component: () => import('@/views/Bank/OutClass/OutClass.vue'),
      children: [{
        path: ':bankName',
        name: 'eachOutClassBank',
        component: () => import('@/views/Bank/OutClass/EachOutClass.vue'),
      }]
    }]
  },
  {
    path: '/coding',
    name: 'coding',
    redirect: '/error',
    component: () => import('@/views/Code/Code.vue'),
    children: [{
      path: 'class',
      name: 'codeclass',
      redirect: '/error',
      component: () => import('@/views/Code/Class/ClassCode.vue'),
      children: [{
        path: ':questionId',
        name: 'eachClassCode',
        component: () => import('@/views/Code/Class/EachClassCode.vue'),
      }]
    }, {
      path: 'outclass',
      name: 'codeoutclass',
      redirect: '/error',
      component: () => import('@/views/Code/OutClass/OutClassCode.vue'),
      children: [{
        path: ':questionId',
        name: 'eachOutClassCode',
        component: () => import('@/views/Code/OutClass/EachOutClassCode.vue'),
      }]
    }]
  },
  {
    path: '/result',
    name: 'result',
    component: () => import('@/views/Result/Result.vue')
  },
  {
    path: '/person',
    name: 'person',
    component: () => import('@/views/Person/Person.vue'),
    redirect: '/person/main',
    children: [{
      path: 'main',
      name: 'main',
      component: () => import('@/views/Person/Main.vue'),
    },{
      path: 'change',
      name: 'change',
      component: () => import('@/views/Person/Change.vue')
    }, {
      path: 'collect',
      name: 'collect',
      component: () => import('@/views/Person/Collect.vue')
    }]
  },
  {
    path: '/error',
    name: 'error',
    component: () => import('@/views/Error/Error.vue')
  },{
    path: "*",
    redirect:'/error',
}
]