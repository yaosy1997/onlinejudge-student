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
    <Layout style="margin-right: auto; margin-left: auto;width: 80vw">
      <Layout>
        <!-- <Breadcrumb :style="{margin: '16px 0'}">
          <BreadcrumbItem>题库</BreadcrumbItem>
        </Breadcrumb>-->
        <Content :style="{padding: '24px 0' ,minHeight: '280px', background: '#fff'}">
          <Layout>
            <Sider :style="{ background: '#fff'}" ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
              
              <Icon @click.native="collapsedSider" :class="rotateIcon" style="text-align:left" type="ios-arrow-back" size="24"></Icon>
              
              <Menu :open-names="['1','2']" :active-name="page" :class="menuitemClasses" theme="light" width="auto">
                <Submenu name="1" v-if="this.$store.state.user.isLogin">
                  <template slot="title">
                    <Icon type="ios-keypad" />
                    <span>课堂训练</span>
                  </template>
                  <MenuItem
                    v-for="(classList,index) in bankList.class"
                    :key="index"
                    :name="classList.aka"
                    :to="{name:'eachClassBank',params: { bankName: classList.aka }}"
                  ><span>{{classList.name}}</span></MenuItem>
                </Submenu>
                <Submenu name="1" v-else>
                  <template slot="title">
                    <Icon type="ios-keypad" />
                    <span>课堂训练</span>
                  </template>
                  <MenuItem name="none" v-on:click.native="$store.commit('setLoginFilter')"><span>登录查看课内习题</span></MenuItem>
                </Submenu>
                <Submenu name="2">
                  <template slot="title">
                    <Icon type="ios-list-box" /><span>算法测试</span>
                  </template>
                  <MenuItem
                    v-for="(classList,index) in bankList.outclass"
                    :key="index"
                    :name="classList.aka"
                    :to="{name:'eachOutClassBank',params: { bankName: classList.aka }}"
                  ><span>{{classList.name}}</span></MenuItem>
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
      bankList: this.$store.state.bank.bankList,
      isCollapsed: false
    };
  },
  created() {},
  computed: {
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    },
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    }
  },
  watch: {
    "$route.params.bankName": function() {
      this.page = this.$route.params.bankName;
    }
  },
  methods: {
    collapsedSider() {
      this.$refs.side1.toggleCollapse();
    }
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
  min-height: 100vh;
}

.layout-header-bar {
  background: #fff;
  text-align: left;
}

.menu-icon {
  transition: all 0.3s;
}
.rotate-icon {
  transform: rotate(-180deg);
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}

.layout-footer-center {
  text-align: center;
}
</style>
