<template>
  <div id="app">
    <div id="nav">
      <span>Online-Judge</span>
      <div class="routerBar">
        <router-link to="/">主页</router-link>|
        <router-link to="/bank">题库</router-link>|
        <router-link to="/result">测试结果</router-link>|
        <router-link to="/person" v-if="this.$store.state.user.isLogin">个人中心</router-link>
        <a v-on:click="$store.commit('setLoginFilter')" v-else>登录/注册</a>
      </div>
    </div>
    <sign></sign>
    <router-view/>
  </div>
</template>

<script>
import sign from './views/Sign/Sign'
export default {
  name: "App",
  components:{
    sign
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
  width: 100vw;
  height: 5vw;
  line-height: 3vw;
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
      &.router-link-exact-active {
        color: #42b983;
        padding-bottom: 5px solid lightblue;
      }
    }
  }
}
</style>
