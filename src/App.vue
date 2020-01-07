/*
 * File: App.vue
 * Project: onlinejudge_student
 * File Created: Wednesday, 3rd July 2019 3:42:39 pm
 * Author: syyao yao__sy@163.com
 * -----
 * Last Modified: Wednesday, 10th July 2019 6:38:21 pm
 * Modified By: syyao yao__sy@163.com
 * -----
 * Copyright 2019 - 2019 syyao, NJU_JLXY
 * HISTORY:
 * Date         	By  	Comments
 * -------------	-----	---------------------------------------------------------
 * 
 * 10th July 2019	syyao	修改导航栏样式
 */

<template>
  <div id="app">
    <div id="nav">
      <div style="margin:0 auto;width:60%;">
        <Row style="width:40%;display: inline-block;">
          <i-col span="4">
            <img alt="online judge logo" src="./assets/logo.png" style="width:2.5vw;vertical-align: middle;" />
          </i-col>
          <i-col span="20">
            <p style="font-size:18px;font-weight:800;">Online Judge</p>
          </i-col>
        </Row>
      <div class="routerBar">
        <router-link to="/home">主页</router-link>|
        <router-link to="/bank">题库</router-link>|
        <router-link to="/result">测试结果</router-link>|
        <Dropdown v-if="this.$store.state.user.isLogin" @on-click="handleDownClick">
          <router-link to="/person">
            <Avatar :src="this.$store.state.user.picture" />
            <Icon type="ios-arrow-down"></Icon>
          </router-link>
          <DropdownMenu slot="list">
            <DropdownItem name='person'>个人中心</DropdownItem>
            <DropdownItem name='collect'>收藏夹</DropdownItem>
            <DropdownItem divided name='logout'>退出登录</DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <a v-on:click="$store.commit('setLoginFilter')" v-else>登录/注册</a>

        </div>
      </div>
    </div>
    <sign></sign>
    <router-view />
  </div>
</template>

<script>
import sign from "./views/Sign/Sign";
import { mapActions } from "vuex";
export default {
  name: "App",
  components: {
    sign
  },
  methods:{
    ...mapActions(["handleLogout"]),
    handleDownClick(name){
      console.log(name)
      if(name==='logout'){
        this.handleLogout().then(msg => {
            this.$router.push({name:'home'})
        })
        return
      }
      this.$router.push({name:name})
    }
  }
};
</script>


<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  border-top-left-radius: 6px;
}
#nav {
  text-align: left;
  padding: 1vw;
  width: 100%;
  height: 5vw;
  line-height: 3vw;
  z-index: 999;
  position: fixed;
  background-color: #f0f8ff4d;
  .routerBar {
    float: right;
    a {
      text-align: center;
      display: inline-block;
      font-weight: bold;
      width: 7vw;
      font-size: 0.8vw;
      color: #2c3e50;
      height: 3vw;
      &.router-link-active {
        color: #42b983;
        padding-bottom: 5px solid lightblue;
      }
    }
  }
}
</style>
