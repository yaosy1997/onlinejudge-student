/*
 * File: Bank.vue
 * Project: onlinejudge_student
 * File Created: Wednesday, 3rd July 2019 3:42:39 pm
 * Author: syyao yao__sy@163.com
 * -----
 * Last Modified: Sunday, 7th July 2019 4:04:52 pm
 * Modified By: syyao yao__sy@163.com
 * -----
 * Copyright 2019 - 2019 syyao, NJU_JLXY
 * HISTORY:
 * Date         	By  	Comments
 * -------------	-----	---------------------------------------------------------
 * 
 * 9th July 2019	syyao	使题库可以根据后台动态变化
 * 
 * 7th July 2019	syyao	题库页面初始化
 */

<template>
  <div class="layout">
    <Layout style="margin-right: auto; margin-left: auto;width: 90vw">
      <Layout :style="{padding: '0 50px'}">
        <!-- <Breadcrumb :style="{margin: '16px 0'}">
          <BreadcrumbItem>题库</BreadcrumbItem>
        </Breadcrumb>-->
        <Content :style="{padding: '24px 0' ,minHeight: '280px', background: '#fff'}">
          <Layout>
            <Sider :style="{background: '#fff'}" hide-trigger>
              <Menu
                :open-names="['1','2']"
                :active-name="page"
                theme="light"
                width="auto"
              >
                <Submenu name="1">
                  <template slot="title">
                    <Icon type="ios-keypad" />课堂训练
                  </template>
                  <MenuItem v-for="(classList,index) in bankList.class" :key="index" :name="classList.aka" :to="{name:'eachClassBank',params: { bankName: classList.aka }}">{{classList.name}}</MenuItem>
                </Submenu>
                <Submenu name="2">
                  <template slot="title">
                    <Icon type="ios-list-box" />算法测试
                  </template>
                  <MenuItem v-for="(classList,index) in bankList.outclass" :key="index" :name="classList.aka" :to="{name:'eachOutClassBank',params: { bankName: classList.aka }}">{{classList.name}}</MenuItem>
                </Submenu>
              </Menu>
            </Sider>
            <Content :style="{padding: '24px', minHeight:' 800px ', background: '#fff'}">
              <router-view />
            </Content>
          </Layout>
        </Content>
      </Layout>
      <Footer class="layout-footer-center" style="height:80px;"></Footer>
    </Layout>
  </div>
</template>

<script>
export default {
  name: "bank",
  components: {},
  data() {
    return {
      page: this.$route.params.bankName,
      bankList:this.$store.state.bank.bankList
    };
  },
  created() {},
  methods: {
  }
};
</script>

<style lang="scss" scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  padding-top: 5vw;
}

.layout-footer-center {
  text-align: center;
}
</style>
