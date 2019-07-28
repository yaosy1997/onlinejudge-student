/*
* File: EachClass.vue
* Project: onlinejudge_student
* File Created: Monday, 8th July 2019 4:11:59 pm
* Author: syyao yao__sy@163.com
* -----
* Last Modified: Monday, 8th July 2019 4:12:03 pm
* Modified By: syyao yao__sy@163.com
* -----
* Copyright 2019 - 2019 syyao, NJU_JLXY
* HISTORY:
* Date By Comments
* ------------- ----- ---------------------------------------------------------
*
* 8th July 2019 syyao 各个课程习题页面
*/

<template>
  <div>
    <Row>
      <i-col span="17">
        <div name="situation" class="box" style="height:275px">
          <Breadcrumb separator=">" style="text-align:left">
            <BreadcrumbItem :to="{name:'class'}">课堂训练</BreadcrumbItem>
            <BreadcrumbItem>{{linkName}}</BreadcrumbItem>
          </Breadcrumb>
          <!-- 数据统计 -->
          <Row style="margin-top:1.5vw;">
            <!-- <i-col span="8">
              <i-circle :percent="80" dashboard>
                <span class="demo-circle-inner" style="font-size:24px">80%</span>
              </i-circle>
              <p>已完成</p>
            </i-col> -->
            <i-col span="24">
              <div style="text-align:left;">
                <p style="font-size:15px;font-weight:600;font-family:'SimHei';">概览</p>
                <Row style="margin-top:1.3vw">
                  <i-col span="10">
                    <p style="font-size:13px;"><Icon type="md-ionic" size="18" color="red"/> 累计完成实验</p>
                    <div style="margin-top:0.4vw">
                    <span style="margin-left:19px;font-size:16px;font-weight:600;">1</span><span style="margin-left:3px;font-size:12px;color：#e5e5e5">项</span>
                    </div>
                  </i-col>
                  <i-col span="14">
                    <p style="font-size:13px;"><Icon type="md-apps" size="18" color="orange"/> 累计完成题目</p>
                  <div style="margin-top:0.4vw">
                    <span style="margin-left:19px;font-size:16px;font-weight:600;">1</span><span style="margin-left:3px;font-size:12px;color：#e5e5e5">项</span>
                    </div>
                  </i-col>
                </Row>

                <Row style="margin-top:1.5vw">
                  <i-col span="10">
                    <p style="font-size:13px;"><Icon type="md-checkmark-circle" size="18" color="#00CC66" /> 累计通过题目</p>
                  <div style="margin-top:0.4vw">
                    <span style="margin-left:19px;font-size:16px;font-weight:600;">1</span><span style="margin-left:3px;font-size:12px;color：#e5e5e5">项</span>
                    </div>
                  </i-col>
                  <i-col span="14">
                    <p style="font-size:13px;"><Icon type="md-time" size="18" color="#9966FF"/> 实验截止日期</p>
                  <div style="margin-top:0.4vw">
                    <span style="margin-left:19px;font-size:16px;font-weight:600;">2019-03-18 23:15:55</span><span style="margin-left:3px;font-size:12px;color：#e5e5e5"></span>
                    </div>
                  </i-col>
                </Row>
              </div>
            </i-col>
          </Row>
        </div>
      </i-col>
      <i-col span="7">
        <div name="percent" class="box" style="height:150px">
          <p style="font-size:15px;font-weight:600;font-family:'SimHei';text-align:left;margin-top:-6px;">已完成题目</p>
          <i-circle :percent="80" dashboard size="100" style="margin-top:10px">
            <span class="demo-circle-inner" style="font-size:24px">80%</span>
          </i-circle>
          <p></p>
        </div>
        <div name="continue" class="box" style="margin-top:1vw;height:110px">
           <p style="font-size:15px;font-weight:600;font-family:'SimHei';text-align:left;margin-top:-6px;">上次进度</p>
          <p style="margin-left:5px;font-size:14px;margin-top:5px;">实验一 产值计算</p>
          <!-- <p style="margin-top:0.5vw">提交截至于 2019-03-18 23:15:55.0</p> -->
          <Button type="primary" shape="circle" icon="md-code-working" style="margin-top:0.5vw">继续做题</Button>
        </div>
      </i-col>
    </Row>
    <Box v-for="(question,index) in classQuestion" :key="index" :unit="question"></Box>
  </div>
</template>

<script>
  import {
    initClass
  } from "@/api/api.js";
  import Box from "@/components/EachClass/QuestionBox.vue";
  export default {
    name: "eachClassBank",
    components: {
      Box
    },
    data() {
      return {
        bankname: this.$route.params.bankName,
        classQuestion: []
      };
    },
    created() {
      initClass("c").then(msg => {
        if (msg.data.code === "200") {
          this.classQuestion = msg.data.data;
        }
      });
    },
    computed: {
      linkName() {
        return this.$store.state.bank.bankList.class.find(arr => {
          return arr.aka === this.$route.params.bankName;
        }).name;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .box {
    padding: 1vw 1vw;
    margin: auto;
    border-radius: 6px;
    box-shadow: 0 2px 7px rgba(0, 0, 0, 0.15);
    border-color: transparent;
    width: 95%;
  }
</style>