/*
 * File: Main.vue
 * Project: onlinejudge_student
 * File Created: Sunday, 1st September 2019 3:32:00 pm
 * Author: syyao yao__sy@163.com
 * -----
 * Last Modified: Sunday, 1st September 2019 3:32:25 pm
 * Modified By: syyao yao__sy@163.com
 * -----
 * Copyright 2019 - 2019 syyao, NJU_JLXY
 * HISTORY:
 * Date         	By  	Comments
 * -------------	-----	---------------------------------------------------------
 * 
 * 1st September 2019	syyao	初始化个人主界面
 */

<template>
    <div>
        <div class="view">
            <div style="float: left;width: 100%">
                <span
                    style="float: left; font-size: 18px ;margin-bottom: 10px;font-weight:600"
                >实验完成情况</span>
            </div>
            <div style="height:62px ">
                <div class="finish">
                    <span style="font-size: 15px;float: left;">C语言程序设计</span>
                    <Progress :percent="percent" />
                </div>
                <div
                    style="width: 1px;background:#707070;height:45px;float:left; margin-top: 17px"
                />
                <div class="continue">
                    <Col span="12">
                        <div style="width: 200px;float: left;padding-top: px; margin-left: 15px">
                            <p style="margin-top: 5px">上次进度</p>
                            <p style="color: #2E8FFF;">{{summary.question_name}}</p>
                            <span>
                                截至于
                                <span style="color: rgb(255, 0, 0);">{{summary.end_Data}}</span>
                            </span>
                        </div>
                    </Col>
                    <Col span="12">
                        <div style="float: left;margin-left: 55px;margin-top:12px;">
                            <Button
                                shape="circle"
                                type="primary"
                                v-on:click="continueWork"
                                style="width: 97px;height: 25px; margin-top: 8px;padding: 0px"
                            >继续实验</Button>
                        </div>
                    </Col>
                </div>
            </div>
        </div>
        <div class="qView" style="margin-top: 20px">
            <span style="font-size: 18px;font-weight:600">题目完成情况</span>
            <div>
                <ScheduleBar
                    :total="summarize.basic"
                    :passed="summarize.basic_number_Finished"
                    :finished="summarize.basic_number"
                    type="基础练习"
                    color="#609DF8"
                />
                <ScheduleBar
                    :total="summarize.middle"
                    :passed="summarize.midlle_number_Finished"
                    :finished="summarize.middle_number"
                    type="算法入门"
                    color="#609DF8"
                />
                <ScheduleBar
                    :total="summarize.difficult"
                    :passed="summarize.difficult_number_Finished"
                    :finished="summarize.difficult_number"
                    type="算法提高"
                    color="#609DF8"
                />
                <ScheduleBar
                    :total="summarize.vdifficult"
                    :passed="summarize.vdifficult_number_Finished"
                    :finished="summarize.vdifficult_number"
                    type="算法挑战"
                    color="#609DF8"
                />
            </div>
        </div>

        <div class="qView" style="margin-top: 30px">
            <span style="font-size: 18px;font-weight:600">做题动态</span>
            <Timeline style="margin-top: 20px">
                <TimelineItem v-for="dState in dStates" :key="dState.id">
                    <TimeLinePart :date="dState.date" :states="dState.detail" />
                </TimelineItem>
            </Timeline>
        </div>
    </div>
</template>

<script>
import ScheduleBar from "@/components/Person/scheduleBar";
import TimeLinePart from "@/components/Person/timeLinePart";

export default {
  components: { TimeLinePart, ScheduleBar },
  data() {
    return {
      columns1: [],
      data1: []
      // dStates: [{
      //     date: '2018-10-12',
      //     detail: [{
      //         id:"1",
      //         time: '12:00',
      //         name: 'A+B',
      //         result: 'success'
      //     }, {
      //         id:"2",
      //         time: '12:10',
      //         name: 'C+D',
      //         result: 'unpassed'
      //     }]
      // }],
    };
  },
  mounted() {},
  created() {
    //this.$store.commit('setSTitle', 'basicinfor');
  },
  computed: {
    percent: function() {
      return parseInt(this.summary.jindu * 100);
    },
    summarize() {
      return this.$store.state.user.summrize;
    },
    summary() {
      return this.$store.state.user.summary;
    },
    dStates() {
      let tempd = [];
      let leastFiveQuestion = this.$store.state.user.leastFiveQuestion;
      let i = 0;
      for (i; i < leastFiveQuestion.length; i++) {
        let date = leastFiveQuestion[i].question_time.slice(0, 9);
        let time = leastFiveQuestion[i].question_time.slice(11, -2);
        let name = leastFiveQuestion[i].question_name;
        let id = leastFiveQuestion[i].question_id;
        let result = leastFiveQuestion[i].question_result;
        if (i === 0) {
          let detail = [{ id, time, name, result }];
          let temp = { date, detail };
          tempd.push(temp);
        } else {
          if (date ===tempd[tempd.length - 1].date) {
            let detail = { id, time, name, result };
            tempd[tempd.length - 1].detail.push(detail);
          } else {
            let detail = [{ id, time, name, result }];
            let temp = { date, detail };
            tempd.push(temp);
          }
        }
      }
      tempd.reverse();
      return tempd;
    }
  },
  methods: {
    continueWork: function() {
      this.$router.push({
        name: "eachClassCode",
        params: { questionId: this.$store.state.user.summary.question_id }
      });
    }
  }
};
</script>

<style scoped>
.view {
  width: 634px;
  height: 100px;
  float: left;
}

.finish {
  width: 310px;
  height: 41px;
  margin-top: 17px;
  float: left;
}

.continue {
  width: 320px;
  height: 41px;

  float: left;
}

.qView {
  width: 634px;
  height: auto;
  float: left;
}
</style>
