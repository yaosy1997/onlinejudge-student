/*
 * File: Class.vue
 * Project: onlinejudge_student
 * File Created: Monday, 8th July 2019 3:58:16 pm
 * Author: syyao yao__sy@163.com
 * -----
 * Last Modified: Monday, 8th July 2019 3:58:44 pm
 * Modified By: syyao yao__sy@163.com
 * -----
 * Copyright 2019 - 2019 syyao, NJU_JLXY
 * HISTORY:
 * Date         	By  	Comments
 * -------------	-----	---------------------------------------------------------
 * 
 * 23rd July 2019	syyao	添加登录判断
 * 
 * 8th July 2019	syyao	课程习题界面初始化
 */
 <template>
  <div>
    <div v-if="!this.$store.state.user.isLogin">
      <Icon type="md-lock" />请先
      <a v-on:click="$store.commit('setLoginFilter')">登录</a>
    </div>
    <div v-else>
      <router-view />
    </div>
  </div>
</template>

 <script>
export default {
  name: "class",
  created() {
    if (this.$store.state.user.isLogin) {
      this.$router.push({
        name: "eachClassBank",
        params: { bankName: this.$store.state.bank.bankList.class[0].aka }
      });
    }
  },
  watch: {
    "$store.state.user.isLogin": function() {
      if (this.$store.state.user.isLogin) {
        this.$router.push({
          name: "eachClassBank",
          params: { bankName: this.$store.state.bank.bankList.class[0].aka }
        });
      }
    }
  }
};
</script>
 
 
