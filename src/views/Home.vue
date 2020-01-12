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
 * HISTORY:
 * Date         	By  	Comments
 * -------------	-----	---------------------------------------------------------
 * 
 * 7th July 2019	syyao	首页初始化
 */



<template>
  <div class="index img1 index1" style="text-align:left;">
    <Row type="flex" justify="center" align="middle" style="margin-top:-40px">
      <i-col span="24">
        <div style="margin:0 auto;width:60%;">
          <!-- <span 
            style="font-weight:600;font-size:30px;background-image: linear-gradient(to top, #48c6ef 0%, #6f86d6 100%);z-index:1000;-webkit-background-clip: text;
          -webkit-text-fill-color: transparent;border-bottom:1px solid #01edc9;padding:0 0em 0.5em 0;">WELCOME TO</span>-->
          <span
            style="font-weight:700;font-size:30px;background-image:linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);z-index:1000;-webkit-background-clip: text;
            -webkit-text-fill-color: transparent;border-bottom:1px solid #01edc9;padding:0 0em 0.5em 0;font-family:'Raleway', sans-serif;"
          >WELCOME TO</span>
          <div>
            <!-- <h4 
          style="font-size:70px;background-image: linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);z-index:1000;-webkit-background-clip: text;
            -webkit-text-fill-color: transparent;margin-top:20px;">Online Judge</h4>-->
            <h4
              style="font-weight:700;font-family:'Raleway', sans-serif;font-size:70px;color:#fff;z-index:1000;-webkit-background-clip: text;margin-top:20px;text-transform:uppercase;"
            >Online Judge</h4>
            <br />
            <div
              data-text="Start"
              class="set_3_button"
              style="margin-top:-10px;"
              @click="handleStart"
            >
              <span>立即开始</span>
            </div>
          </div>
        </div>
      </i-col>

      <Footer
        class="layout-footer-center"
        style="font-size:10px;text-align:center;background-color:#fff0;margin-top:80px;position:absolute;bottom:0;"
      >
        <a href="http://www.miitbeian.gov.cn" style="margin-right:12px;">苏ICP备17069209号</a>
        <img
          src="../assets/beiantubiao.png"
          style="display:inline-block;vertical-align:middle;margin-right:2px"
        />
        <a
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=32011202000070"
        >公安备案号 32011202000070</a>
      </Footer>
    </Row>
  </div>
</template>

<script>

export default {
  name: "home",
  methods:{
    handleStart(){
      this.$router.push({name:'bank'})
    }
  }
};
</script>

<style lang="scss">
@import "../style/btn.css";

.index {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  text-align: center;
}

.index h1 {
  color: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);
  height: 100px;
}

.index h1 img {
  height: 100%;
}

.index h2 {
  color: #666;
  margin-bottom: 200px;
}

.index h2 p {
  margin: 0 0 50px;
}

.index .ivu-row-flex {
  height: 100%;
}
.img1 {
  /* background: url('../images/backgronud1.png') center center no-repeat; */
  background: url("../assets/bg1-4.jpg") center center no-repeat;
  background-size: cover;
}
.index /deep/ .ivu-menu-light {
  background: #fff0;
}
</style>

