/*
 * File: bank.js
 * Project: onlinejudge_student
 * File Created: Tuesday, 9th July 2019 4:38:44 pm
 * Author: syyao yao__sy@163.com
 * -----
 * Last Modified: Tuesday, 9th July 2019 4:39:23 pm
 * Modified By: syyao yao__sy@163.com
 * -----
 * Copyright 2019 - 2019 syyao, NJU_JLXY
 * HISTORY:
 * Date         	By  	Comments
 * -------------	-----	---------------------------------------------------------
 * 
 * 9th July 2019	syyao	初始化题库的存储信息
 */

import {
    getAnswer
} from '@/api/api.js'

export default {
    state: {
        bankList: {
            class: [{
                name: "C语言程序设计",
                aka: "c"
            }],
            outclass: [{
                name: "基础练习",
                aka: "basic"
            }, {
                name: "算法入门",
                aka: "middle"
            }, {
                name: "算法提高",
                aka: "difficult"
            }, {
                name: "算法挑战",
                aka: "charge"
            }]
        },
        currentOutClassType: 'basic',
        Answer: {
            isOpen: false,
            info: {
                question: {
                    lev: "1",
                    kind: "basic",
                    question_text: "↵问题描述↵　　Given two integers A and B, your task is to output their sum, A+B.↵输入格式↵　　The input contains of only one line, consisting of two integers A and B. (0 ≤ A,B ≤ 1 000)↵输出格式↵　　The output should contain only one number that is A+B.↵样例输入↵1 1↵样例输出↵2",
                    question_name: "A+B problem"
                },
                myanswer: [{
                    answer:'12',
                    nickname: "测试",
                    language: "C/C++"
                }]
            }
        }
    },
    mutations: {
        setOutClassType(state, type) {
            state.currentOutClassType = type
        },
        setAnswer(state, info) {
            state.Answer.isOpen = true
            state.Answer.info = info
        }
    },
    actions: {
        handleAnswer({commit}, {questionId,type}) {
            return new Promise((resolve, reject) => {
                getAnswer(questionId, type).then(res => {
                    if (res.data.code === "200") {
                        const data = res.data.data
                        commit('setAnswer', data)
                        resolve("success")
                    } else {
                        resolve(res.data.data)
                    }
                }).catch(err => {
                    reject(err)
                })
            })
        },
    }
}