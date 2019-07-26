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
      <div class="layout">
    <Layout style="margin-right: auto; margin-left: auto;width: 80vw">
      <Layout :style="{padding: '0 50px'}">
        <!-- <Breadcrumb :style="{margin: '16px 0'}">
          <BreadcrumbItem>题库</BreadcrumbItem>
        </Breadcrumb>-->
              <router-view />
      </Layout>
      <Footer class="layout-footer-center" style="height:80px;"></Footer>
    </Layout>        
  </div>
 </template>

 <script>
 export default {
     name:'coding'
 }
 </script>
 
 <style lang="scss" scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  padding-top: 5vw;
  min-height: 100vh;
}

 </style>
 