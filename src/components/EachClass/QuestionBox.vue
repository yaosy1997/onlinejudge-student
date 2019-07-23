<template>
  <div class="border">
    <div style="width: 100%;height: auto ">
      <div style="border-bottom:#707070 1px solid;width: 500px;padding-bottom: 10px ">
        <span
          style="width: 500px;height: 19px;font-size: 14px;color:#444444; display:inline-block; "
        >实验{{ id }} &nbsp; {{ name }}</span>
        <span style="width: 500px; margin-top: 9px; display:inline-block;">实验目的：{{ goal }}</span>
        <span style=" display:inline-block;">实验截至日期：{{ endDate }}(逾期提交不计算成绩）</span>
      </div>
      <div style="float: right">
        <div v-if="state==='success'">
          <img class="state" :src="success" />
        </div>
        <!--<div v-else-if="state==='debug'">-->
        <!--<img -->
        <!--class="state" -->
        <!--src="../../../images/debug.png">-->
        <!--</div>-->
        <div v-else />
      </div>
    </div>
    <div v-for="ques in question" :key="ques.id" style="width: 100%">
      <Qline :question="ques" />
    </div>
  </div>
</template>

<script>
import successPic from "@/assets/success.png";
import Qline from "./QuestionLine.vue";

var chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
var chnUnitChar = ["", "十", "百", "千"];

/**
 * @return {string}
 */
function SectionToChinese(section) {
  var strIns = "",
    chnStr = "";
  var unitPos = 0;
  var zero = true;
  while (section > 0) {
    var v = section % 10;
    if (v === 0) {
      if (!zero) {
        zero = true;
        chnStr = chnNumChar[v] + chnStr;
      }
    } else {
      zero = false;
      strIns = chnNumChar[v];
      strIns += chnUnitChar[unitPos];
      chnStr = strIns + chnStr;
    }
    unitPos++;
    section = Math.floor(section / 10);
  }
  return chnStr;
}

export default {
  name: "Box",
  components: {
    Qline
  },
  props: {
    unit: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      question: [{}, {}],
      name: "",
      id: "",
      goal: "",
      endDate: "",
      state: "",
      success: successPic
    };
  },
  created() {
    this.question = this.unit.question;
    this.name = this.unit.name;
    var k = SectionToChinese(this.unit.id);
    this.id = k;
    this.goal = this.unit.goal;
    this.endDate = this.unit.endDate;
    this.state = this.unit.state;
  }
};
</script>

<style scoped>
.border {
  padding: 1vw 1vw;
  border-radius: 6px;
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.15);
  border-color: transparent;
  width: auto;
  height: auto;
  margin: 30px auto auto 1vw;
  text-align: left;
}

.state {
  width: 80px;
  height: 80px;
}
</style>
