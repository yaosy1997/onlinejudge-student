/*
 * File: EachOutClass.vue
 * Project: onlinejudge_student
 * File Created: Monday, 8th July 2019 4:12:42 pm
 * Author: syyao yao__sy@163.com
 * -----
 * Last Modified: Monday, 8th July 2019 4:12:47 pm
 * Modified By: syyao yao__sy@163.com
 * -----
 * Copyright 2019 - 2019 syyao, NJU_JLXY
 * HISTORY:
 * Date         	By  	Comments
 * -------------	-----	---------------------------------------------------------
 * 
 * 14th July 2019	syyao	增加表格
 * 
 * 8th July 2019	syyao	各个课外习题页面
 */

<template>
    <div style="margin-top:1vw">
        <Table :loading="loading" :columns="columns" :data="data" border />
    </div>
</template>

<script>
export default {
  naem: "eachOutClassBank",
  data() {
    return {
      bankname: this.$route.params.bankName,
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
      data:[{"question_number":"1"}]
    };
  },
  computed:{
    loading(){
      return this.data==false
    }
  },
  watch: {
    "$route.params.bankName": function() {
      this.bankname = this.$route.params.bankName;
    }
  }
};
</script>