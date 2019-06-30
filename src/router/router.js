/*
 * File: router.js
 * Project: onlinejudge_student
 * File Created: Tuesday, 25th June 2019 5:12:43 pm
 * Author: syyao yao__sy@163.com
 * -----
 * Last Modified: Saturday, 29th June 2019 3:37:33 pm
 * Modified By: syyao yao__sy@163.com
 * -----
 * Copyright 2019 - 2019 syyao, MJU_JLXY
 * HISTORY:
 * Date      	By	Comments
 * ----------	---	---------------------------------------------------------
 */


export default [{
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/bank',
    name: 'bank',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Bank.vue')
  }
]