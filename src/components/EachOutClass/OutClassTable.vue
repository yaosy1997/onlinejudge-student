/*
 * File: OutClassTable.vue
 * Project: onlinejudge_student
 * File Created: Monday, 15th July 2019 7:21:16 pm
 * Author: syyao yao__sy@163.com
 * -----
 * Last Modified: Monday, 15th July 2019 7:21:29 pm
 * Modified By: syyao yao__sy@163.com
 * -----
 * Copyright 2019 - 2019 syyao, NJU_JLXY
 * HISTORY:
 * Date         	By  	Comments
 * -------------	-----	---------------------------------------------------------
 * 
 * 15th July 2019	syyao	初始化课外习题的表格
 */

<template>
    <div>
        <Table :loading="loading" :columns="columns" :data="data" border />
        <Page
            style="float:left;margin-top:1vw"
            :total="total"
            :current="pageNum"
            :page-size="pageSize"
            show-elevator
            @on-change="handlePage"
        />
    </div>
</template>

<script>

import {setFavorite} from '@/api/user.js'
import { mapActions } from "vuex";

export default {
  name: "outClassTable",
  data() {
    return {
      columns: [
        {
          title: "题号",
          key: "question_number"
          // width: 100
        },
        {
          title: "题目",
          key: "question_name",
          tooltip: true
        },
        {
          title: "ac率",
          key: "ac",
          // width: 100,
          render: (h, params) => {
            return h("div", parseInt(params.row.ac * 100) + "%");
          }
        },
        {
          title: "难度",
          key: "difficulty",
          // width: 130,
          render: (h, params) => {
            return h("div", [
              h("Rate", {
                props: {
                  count: 3,
                  value: parseInt(params.row.difficulty),
                  disabled: true
                },
                style: {
                  marginRight: "5px"
                }
              })
            ]);
          }
        },
        {
          title: " ",
          key: "action",
          width: 220,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.test(params.row.question_number);
                    }
                  }
                },
                "做题"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "warning",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.star(params.row.question_number);
                    }
                  }
                },
                "收藏"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.check(params.row.question_number);
                    }
                  }
                },
                "查看答案"
              )
            ]);
          }
        }
      ],
      data: [],
      allData: [],
      pageNum: 1,
      pageSize: 15
    };
  },
  props: {
    QuestionData: {
      type: Array,
      default: function() {
        return [];
      }
    },
    setPage: {
      type: String,
      default: "1"
    }
  },
  created() {
    this.setData();
  },
  computed: {
    loading() {
      return this.data == false;
    },
    total() {
      return this.allData.length;
    },
    linkName() {
      return this.$store.state.bank.bankList.outclass.find(arr => {
        return arr.aka === this.$route.params.bankName;
      }).name;
    }
  },
  watch: {
    setPage(val) {
      this.handlePage(parseInt(val));
    },
    QuestionData(val) {
      this.allData = val;
      this.setData();
      this.handlePage(parseInt(this.pageNum));
    }
  },
  methods: {

    handlePage(value) {
      let totalPage = Math.ceil(this.total / this.pageSize);
      if (totalPage < value) {
        this.$router.push({ name: "error" });
      }
      let _start = (value - 1) * this.pageSize;
      let _end = value * this.pageSize;
      this.data = this.allData.slice(_start, _end);
      this.pageNum = value;
      this.$router.push({
        query: {
          page: this.pageNum
        }
      });
    },
    setData() {
      let pagedata = this.allData;
      let dataCount = this.allData.length;
      if (dataCount < this.pageSize) {
        this.data = pagedata;
      } else {
        this.data = pagedata.slice(0, this.pageSize);
      }
    },
    test(index) {
      this.$router.push({
        name: "eachOutClassCode",
        params: { questionId: index }
      });
    },
    ...mapActions(["handleAnswer"]),
    check(index) {
        // this.answer.questionId = this.data6[index].question_number;
        // this.answer.questiontype = this.Qtype;
        this.handleAnswer({questionId:index,type:'question'})
    },
    star(index) {
        setFavorite(index).then(res=>{
          if (res.data.code === "200") {
            this.$Message.success("收藏成功");
          } else {
            this.$Message.error("收藏失败");
          }
        });

    }
  }
};
</script>
