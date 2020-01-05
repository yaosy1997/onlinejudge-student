/*
 * File: Result.vue
 * Project: onlinejudge_student
 * File Created: Wednesday, 10th July 2019 5:05:51 pm
 * Author: syyao yao__sy@163.com
 * -----
 * Last Modified: Wednesday, 10th July 2019 5:05:54 pm
 * Modified By: syyao yao__sy@163.com
 * -----
 * Copyright 2019 - 2019 syyao, NJU_JLXY
 * HISTORY:
 * Date         	By  	Comments
 * -------------	-----	---------------------------------------------------------
 * 
 * 10th July 2019	syyao	测试结果界面初始化
 */

<style>
    .layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  padding-top: 5vw;
  min-height: 100vh;
    }

    .layout-footer-center {
        text-align: center;
    }

    .ivu-table .result-error td{
        color: #ff1e1e;
    }
    .ivu-table .result-warning td{
        color: #ffe162;
    }
    .ivu-table .result-success td{
        color: #52c41a;
    }
    .ivu-table td.default {
        color: #000000;
    }
</style>

<template>
    <div class="layout">
        <Layout style="margin-right: auto; margin-left: auto;width: 80vw">
            <!-- <Layout :style="{padding: '0 0px'}"> -->
                <Content :style="{padding: '24px 71px 20px 71px' ,minHeight: '600px', background: '#fff'}">
                    <Breadcrumb :style="{margin: '10px 0'}">
                        <BreadcrumbItem>测评记录</BreadcrumbItem>
                    </Breadcrumb>
                    <Table
                            :row-class-name="rowClassName"
                            :columns="columns1"
                            :data="data1"
                            border/>
                    <Page
                            :total="total"
                            :current="pageNum"
                            :page-size="pageSize"
                            show-elevator
                            style="margin-top: 10px"
                            @on-change="handlePage"/>
                </Content>
            <!-- </Layout> -->
            <Footer class="layout-footer-center" style="height:80px;"></Footer>
        </Layout>
    </div>
</template>

<script>

import {getResult} from '@/api/api.js'

    export default {
        name: 'result',
        data() {
            return {
                columns1: [
                    {
                        title: '用户名',
                        key: 'nickname',
                        className:'default',
                    },
                    {
                        title: '题目',
                        key: 'question_name',
                        className:'default',
                    }, {
                        title: '运行时间',
                        key: 'running_time',
                        className:'default',
                    }, {
                        title: '运行内存',
                        key: 'memory',
                        className:'default',
                    }, {
                        title: '执行结果',
                        key: 'question_result',
                        render: (h, params) => {
                            return h('div', this.questionResult(params.row.question_result))
                        },
                    }
                ],
                data1: [],
                alldata:[],
                pageData: [],
                pageSize: 15,
                pageNum: 1,
                total: 0,
            };
        },
        created() {
            let _this = this;
            // this.$store.commit("setIndexTitle", "result");
            getResult().then(msg => {
                _this.getQMessages(msg.data.data);
            })
        },
        methods: {
            handlePage(value) {
                let _start = (value - 1) * this.pageSize;
                let _end = value * this.pageSize;
                this.data1 = this.alldata.slice(_start, _end);
                this.pageNum = value;
            },
            getQMessages(data) {
                this.alldata=data;
                this.total = data.length;
                this.pagedata = data;
                let dataCount = this.pagedata.length;
                if (dataCount < this.pageSize) {
                    this.data1 = this.pagedata;
                } else {
                    this.data1 = this.pagedata.slice(0, this.pageSize);
                }
            },
            questionResult(data) {
                if (data === 'AC_RIGHT') {
                    return '运行通过'
                } else if (data === 'AC_WRONG') {
                    return '结果错误'
                } else if (data === 'AC_MEMORYOUT') {
                    return '栈溢出'
                } else if (data === 'AC_TIMEOUT') {
                    return '超时'
                } else if(data==='compilation fail'){
                    return '编译错误'
                }else {
                    return '失败';
                }

            },
            rowClassName(row,index) {
                let data=row.question_result;
                if (data === 'AC_RIGHT') {
                    return 'result-success'
                } else if (data === 'compilation fail' || data==='AC_WRONG' || data==='running') {
                    return 'result-error'
                } else {
                    return 'result-warning'
                }

            }
        },
        computed: {}
    }
</script>