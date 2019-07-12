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
 * 8th July 2019	syyao	各个课外习题页面
 */

<template>
  <div>this is {{bankname}}</div>
</template>

<script>
export default {
  naem: "eachOutClassBank",
  data() {
    return {
      bankname: this.$route.params.bankName
    };
  },
  watch:{
    '$route.params.bankName':function(){
      this.bankname=this.$route.params.bankName
    }
  }
  
};
</script>