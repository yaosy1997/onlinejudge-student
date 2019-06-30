/*
 * File: Home.vue
 * Project: onlinejudge_student
 * File Created: Tuesday, 25th June 2019 5:12:43 pm
 * Author: syyao yao__sy@163.com
 * -----
 * Last Modified: Tuesday, 25th June 2019 7:40:34 pm
 * Modified By: syyao yao__sy@163.com
 * -----
 * Copyright 2019 - 2019 syyao, MJU_JLXY
 */

<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
