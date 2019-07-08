/*
 * File: EachClass.vue
 * Project: onlinejudge_student
 * File Created: Monday, 8th July 2019 4:11:59 pm
 * Author: syyao yao__sy@163.com
 * -----
 * Last Modified: Monday, 8th July 2019 4:12:03 pm
 * Modified By: syyao yao__sy@163.com
 * -----
 * Copyright 2019 - 2019 syyao, NJU_JLXY
 * HISTORY:
 * Date         	By  	Comments
 * -------------	-----	---------------------------------------------------------
 * 
 * 8th July 2019	syyao	各个课程习题页面
 */

<template>
  <div>this is {{bankname}}</div>
</template>

<script>
export default {
  name: "eachClassBank",
  data() {
    return {
      bankname: this.$route.params.bankName
    };
  },
  
};
</script>

