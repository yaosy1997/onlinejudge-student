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
 * Date         	By  	Comments
 * -------------	-----	---------------------------------------------------------
 * 
 * 8th July 2019	syyao	各个课程习题页面
 */

<template>
  <div>
    <Row>
      <i-col span="18">
        <div name="situation" class="box" style="height:20vw">
          <Breadcrumb separator=">" style="text-align:left">
            <BreadcrumbItem :to="{name:'class'}">课堂训练</BreadcrumbItem>
            <BreadcrumbItem>{{linkName}}</BreadcrumbItem>
          </Breadcrumb>
          <p>完成情况</p>
        </div>
      </i-col>
      <i-col span="6">
        <div name="percent" class="box" style="height:11vw">
          <i-circle :percent="80" dashboard>
            <span class="demo-circle-inner" style="font-size:24px">80%</span>
          </i-circle>
          <p>已完成</p>
        </div>
        <div name="continue" class="box" style="margin-top:1vw;height:8vw">
          <p>上次进度 产值计算</p>
          <p style="margin-top:0.5vw">提交截至于 2019-03-18 23:15:55.0</p>
          <Button type="primary" shape="circle" icon="md-code-working" style="margin-top:0.5vw">继续做题</Button>
        </div>
      </i-col>
    </Row>
    <Box v-for="(question,index) in classQuestion" :key="index" :unit="question"></Box>
  </div>
</template>

<script>
import { initClass } from "@/api/api.js";
import Box from "@/components/EachClass/QuestionBox.vue";
export default {
  name: "eachClassBank",
  components: { Box },
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
