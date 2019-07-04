/*
 * File: Sign_up.vue
 * Project: onlinejudge_student
 * File Created: Wednesday, 3rd July 2019 3:42:39 pm
 * Author: syyao yao__sy@163.com
 * -----
 * Last Modified: Thursday, 4th July 2019 4:10:43 pm
 * Modified By: syyao yao__sy@163.com
 * -----
 * Copyright 2019 - 2019 syyao, NJU_JLXY
 * HISTORY:
 * Date         	By  	Comments
 * -------------	-----	---------------------------------------------------------
 * 
 * 4th July 2019	syyao	注册逻辑部分完成
 * 
 * 4th July 2019	syyao	初始化注册
 */

<template>
  <div class="about">
    <!--        取消自动输入密码-->
    <input type="password" style="display:none" />
    <!--        -->
    <Input
      class="hui_input"
      size="large"
      v-model="logInfo.username"
      prefix="ios-contact"
      type="tel"
      placeholder="请输入手机号"
      @on-blur="checkTel"
      style="width: 240px;margin-top: 20px;"
    />
    <br />
    <Input
      class="hui_input"
      size="large"
      v-model="logInfo.password"
      prefix="ios-lock-outline"
      type="password"
      placeholder="请输入密码"
      autocomplete="on"
      style="width: 240px;margin-top: 20px;"
    />
    <br />
    <Input
      class="hui_input"
      size="large"
      v-model="logInfo.confirmPassword"
      prefix="ios-lock-outline"
      type="password"
      @on-blur="checkPassword"
      autocomplete="on"
      placeholder="请再次输入密码"
      style="width: 240px;margin-top: 20px;"
    />
    <br />
    <Input
      class="hui_input"
      size="large"
      v-model="logInfo.captcha"
      prefix="ios-send-outline"
      placeholder="请输入验证码"
      style="width: 140px;margin-top: 20px;"
    />
    <Button
      type="primary"
      v-if="send_captcha.isTimeout"
      style="width:90px;margin-left: 10px;margin-top: 20px;height: 35px;"
      @click="SendCaptcha"
    >发送验证码</Button>
    <Button
      type="primary"
      v-else
      style="width:90px;margin-left: 10px;margin-top: 20px;height: 35px;"
    >{{send_captcha.reSendTime}}s后再试</Button>
    <br />
    <Button
      type="primary"
      style="width:240px;margin-top: 20px;height: 35px;margin-bottom:20px;"
      @click="logon"
    >注 册</Button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Sign_up",
  data() {
    return {
      logInfo: {
        username: "",
        password: "",
        confirmPassword: "",
        captcha: ""
      },
      send_captcha: {
        reSendTime: 60,
        isSend: false,
        isTimeout: true,
        timer: null
      }
    };
  },
  methods: {
    ...mapActions(["handleLogon", "handleGetCaptcha"]),
    logon() {
      if (this.logInfo.username === "") {
        this.$Message.warning("请输入账号");
        return;
      }
      if (this.logInfo.password === "") {
        this.$Message.warning("请输入密码");
        return;
      }
      if (this.logInfo.confirmPassword === "") {
        this.$Message.warning("请确认密码");
        return;
      }
      if (this.logInfo.password !== this.logInfo.confirmPassword) {
        this.$Message.warning("两次密码不相同");
        return;
      }
      if (this.logInfo.captcha === "") {
        this.$Message.warning("请输入验证码");
        return;
      }

      let username = this.logInfo.username
      let password = this.logInfo.password
      let captcha = this.logInfo.captcha
      this.handleLogon({ username, password, captcha }).then(msg=> {
        if (msg === "success") {
          this.$Message.success("注册成功");
          this.$emit("update:isShow", false);
          this.getUserInfo();
        } else {
          this.$Message.error(msg);
        }
      });
    },
    checkPassword() {
      if (this.logInfo.password !== this.logInfo.confirmPassword) {
        this.$Message.warning("两次输入的密码不同");
      }
    },
    checkTel() {
      if (this.logInfo.username === "") {
        return;
      }
      if (!/^1(3|4|5|7|8)\d{9}$/.test(this.logInfo.username)) {
        this.$Message.warning("请输入正确的手机号");
      }
    },
    SendCaptcha() {
      if (this.logInfo.username === "") {
        this.$Message.warning("请先输入手机号");
        return;
      }
      if (!this.send_captcha.isSend) {
        this.send_captcha.isSend = true;
        let username=this.logInfo.username
        this.handleGetCaptcha({username}).then(msg => {
          if (msg === "success") {
            this.$Message.success("发送成功");
            this.send_captcha.isTimeout = false;
            this.send_captcha.timer = setInterval(() => {
              if (this.send_captcha.reSendTime > 0) {
                this.send_captcha.reSendTime--;
              } else {
                this.send_captcha.isTimeout = true;
                clearInterval(this.send_captcha.timer);
                this.send_captcha.timer = null;
                this.send_captcha.isSend = false;
              }
            }, 1000);
          } else {
            this.$Message.error(msg.data.message);
            this.send_captcha.isSend = false;
          }
        });
      }
    }
  }
};
</script>

<style lang="scss">
.hui_input /deep/ .ivu-input {
  border: 0px;
  border-radius: 0px;
  background-color: #f5f5f5 !important;
}
</style>


