/*
 * File: Code.vue
 * Project: onlinejudge_student
 * File Created: Wednesday, 17th July 2019 9:46:32 pm
 * Author: syyao yao__sy@163.com
 * -----
 * Last Modified: Wednesday, 17th July 2019 9:46:41 pm
 * Modified By: syyao yao__sy@163.com
 * -----
 * Copyright 2019 - 2019 syyao, NJU_JLXY
 * HISTORY:
 * Date         	By  	Comments
 * -------------	-----	---------------------------------------------------------
 * 
 * 17th July 2019	syyao	做题页面初始化
 */

 <template>
     <div class="layout">this is coding
         <router-view/>
     </div>
 </template>

 <script>
 export default {
     name:'coding'
 }
 </script>
 
 <style lang="scss" scoped>
 .layout{
     padding-top: 5vw;
 }
 </style>
 