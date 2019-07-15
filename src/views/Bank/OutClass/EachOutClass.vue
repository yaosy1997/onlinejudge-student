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
       <outClassTable :QuestionData="data" :setPage="page" />
    </div>
</template>

<script>
import outClassTable from '@/components/EachOutClass/OutClassTable.vue'
export default {
  name: "eachOutClassBank",
  components:{outClassTable},
  data() {
    return {
      bankname: this.$route.params.bankName,
      data:[],
      page:'1',
    }
  },
  watch: {
    "$route.params.bankName": function() {
      this.bankname = this.$route.params.bankName;
    }
  }
};
</script>