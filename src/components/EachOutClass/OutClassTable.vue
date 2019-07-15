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
export default {
  name: "outClassTable",
  data() {
    return {
      columns: [
        {
          title: "题号",
          key: "question_number",
          width: 100
        },
        {
          title: "题目",
          key: "question_name",
          tooltip: true
        },
        {
          title: "ac率",
          key: "ac",
          width: 100,
          render: (h, params) => {
            return h("div", parseInt(params.row.ac * 100) + "%");
          }
        },
        {
          title: "难度",
          key: "difficulty",
          width: 130,
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
                      this.test(params.index);
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
                      this.star(params.index);
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
                      this.check(params.index);
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
      allData: this.QuestionData,
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
    setPage:{
        type:String,
        default:'1'
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
    }
  },
  watch:{
      setPage(val){
          this.handlePage(parseInt(val))
      }
  },
  methods: {
    handlePage(value) {
      let _start = (value - 1) * this.pageSize;
      let _end = value * this.pageSize;
      this.data = this.allData.slice(_start, _end);
      this.pageNum = value;
      
    },
    setData() {
      let pagedata = this.allData;
      let dataCount = this.allData.length;
      if (dataCount < this.pageSize) {
        this.data = pagedata;
      } else {
        this.data = pagedata.slice(0, this.pageSize);
      }
    }
  }
};
</script>
