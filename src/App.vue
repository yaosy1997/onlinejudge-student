<template>
  <div id="app">
    <div id="nav">
      <span>Online-Judge</span>
      <div class="routerBar">
        <router-link to="/">主页</router-link>|
        <router-link to="/bank">题库</router-link>|
        <router-link to="/result">测试结果</router-link>|
        <router-link to="/person">个人中心</router-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>


<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  text-align: left;
  padding: 30px;
  .routerBar {
    float: right;
    a {
      text-align: center;
      display: inline-block;
      font-weight: bold;
      width: 7vw;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #42b983;
      }
      span {
        width: 10vw;
      }
    }
  }
}
</style>
