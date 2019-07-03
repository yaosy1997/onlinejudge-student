/*
 * File: Sign.vue
 * Project: onlinejudge_student
 * File Created: Sunday, 30th June 2019 9:37:49 pm
 * Author: syyao (yao__sy@163.com)
 * -----
 * Last Modified: Sunday, 30th June 2019 10:26:41 pm
 * Modified By: syyao (yao__sy@163.com>)
 * -----
 * Copyright 2019 - 2019 syyao, NJU_JLXY
 * -----
 * HISTORY:
 * Date      	By	Comments
 * ----------	---	---------------------------------------------------------
 * 
 * 30 06 2019	syyao	初始化登录
 */

<template>
    <div>
        <Modal
            v-model="isShow"
            :footer-hide="isHide"
            :mask-closable="mask_closable"
            class="border"
            width="800"
            height="500px"
        >
            <Row v-if="isShow"><!--使每次弹出登录框时状态初始化 -->
                <i-col span="12" style="background-color:#86a1bc;border-top-left-radius: 6px;border-bottom-left-radius: 6px;">
                    <div style="width:100%;height:500px;text-align: center;">
                        <img
                            src="@/assets/school.jpg"
                            style="width:90%;margin-top:50px;border-radius: 50%;border:10px solid lightblue"
                        />
                    </div>
                </i-col>
                <i-col span="12" style="height: 500px;padding-top:20px">
                    <Row style="width:240px;;margin:0 auto;margin-top:20px;">
                        <i-col span="12">
                            <a @click="isSign_in=true" style="font-size:15px;">登录</a>
                            <div
                                v-if="isSign_in"
                                style="width:29px;height:5px;background:#33c7ff;margin-top: 3px;"
                            ></div>
                        </i-col>
                        <i-col span="12">
                            <div style="float:right">
                                   <a @click="isSign_in=false" style="font-size:15px;">注册</a>
                            <div
                                v-if="!isSign_in"
                                style="width:29px;height:5px;background:#33c7ff;margin-top: 3px;"
                            ></div>
                            </div>
                         
                        </i-col>
                    </Row>

                    <div v-if="isSign_in">
                        <div style="text-align: center;height: 80px;margin-top: 10px;">
                           <sign_in v-bind:isShow.sync="isShow"></sign_in>
                        </div>
                        
                    </div>
                    <div v-else>
                        <div style="text-align: center;height: 90px;">
                          <sign_up></sign_up>
                        </div>
                       
                    </div>
                </i-col>
            </Row>
        </Modal>
    </div>
</template>

<script>
const sign_in=() => import('./Sign_in')  
const sign_up=() => import('./Sign_up')
export default {
  name: "sign",
  components:{
      sign_in,sign_up
  },
  created() {
    this.isShow = this.$store.state.user.loginFilter;
  },
  data() {
    return {
      isShow: false,
      isHide: true,
      mask_closable: false,
      isSign_in:true
    };
  },
  watch: {
    "$store.state.user.loginFilter": function(newVal) {
      //拦截登录
      if (newVal === true) {
        console.log(1);
        this.isShow = newVal;
      }
    }
  }
};
</script>

<style lang="scss">
.border /deep/ .ivu-modal-body{
    padding: 0px;
}
</style>
