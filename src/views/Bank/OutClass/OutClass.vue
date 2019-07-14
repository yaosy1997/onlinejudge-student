/*
 * File: OutClass.vue
 * Project: onlinejudge_student
 * File Created: Monday, 8th July 2019 3:58:33 pm
 * Author: syyao yao__sy@163.com
 * -----
 * Last Modified: Monday, 8th July 2019 3:59:16 pm
 * Modified By: syyao yao__sy@163.com
 * -----
 * Copyright 2019 - 2019 syyao, NJU_JLXY
 * HISTORY:
 * Date         	By  	Comments
 * -------------	-----	---------------------------------------------------------
 * 
 * 8th July 2019	syyao	课外习题界面初始化
 */
 <template>
  <div >
    <Breadcrumb style="text-align:left" separator=">">
        <BreadcrumbItem :to="{name:'outclass'}">算法测试</BreadcrumbItem>
        <BreadcrumbItem>{{linkName}}</BreadcrumbItem>
    </Breadcrumb>
    <router-view />
  </div>
</template>

 <script>
export default {
  name: "outclass",
  computed:{
    linkName(){
      return this.$store.state.bank.bankList.outclass.find((arr)=>{
        return arr.aka === this.$route.params.bankName
      }).name
    }
  }
};
</script>
 