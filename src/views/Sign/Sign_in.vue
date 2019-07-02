/*
 * File: Sign_in.vue
 * Project: onlinejudge_student
 * File Created: Sunday, 30th June 2019 9:36:40 pm
 * Author: syyao (yao__sy@163.com)
 * -----
 * Last Modified: Tuesday, 2nd July 2019 10:52:33 pm
 * Modified By: syyao (yao__sy@163.com>)
 * -----
 * Copyright 2019 - 2019 syyao, NJU_JLXY
 * -----
 * HISTORY:
 * Date      	By	Comments
 * ----------	---	---------------------------------------------------------
 * 
 * 02 07 2019	syyao	登录界面初始化
 */

<template>
    <div>
  <Input class="hui_input" v-model="formInline.user" size="large" prefix="ios-contact" placeholder="请输入账号"
               style="width: 240px;margin-top: 20px;"/>
        <br/>
        <Input class="hui_input" v-model="formInline.password" size="large" prefix="ios-lock-outline" type="password"
               placeholder="请输入密码" style="width: 240px;margin-top: 20px;"/>
        <br/>
        <verify
            v-if="hackReset"
            v-bind:VCode.sync="verify_check"
            style="width:240px;margin: 20px auto auto;"
        ></verify>
                <Button type="primary" style="width:240px;margin-top: 20px;height: 35px;margin-bottom:20px;" @click="login">登
            录
        </Button>
    </div>
</template>

<script>
export default {
  name: "Sign_up",
  data() {
    return {
      formInline: {
        user: "",
        password: ""
      },
      verify_check: false,
      hackReset: true
    };
  },
  methods: {
    login: function() {
      let _this = this;

      if (this.formInline.user === "") {
        _this.$Notice.warning({
          title: "请输入手机号"
        });
        return;
      }
      if (this.formInline.password === "") {
        _this.$Notice.warning({
          title: "请输入密码"
        });
        return;
      }
      if (this.verify_check === false) {
        this.$Message.warning("请完成验证");
        return;
      }

      this.http.post(this, "/WebLogin").then(function(msg) {
        if (msg.data.code === "200") {
          _this.$Message.success("登陆成功");
          _this.$emit("update:isShow", false);
          
        } else {
          _this.$Message.error(msg.data.message);
        }
      });
      _this.hackReset = false;
      _this.$nextTick(() => {
        _this.hackReset = true;
      });
      _this.vcode = false;
    }
  }
};
</script>
