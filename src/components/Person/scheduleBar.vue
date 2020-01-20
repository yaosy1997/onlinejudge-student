<template>
  <div style="margin-top: 20px;width: 100%;height: 80px">
    <div style="float: left">
      <i-circle
        :percent="percent"
        :stroke-color="color"
        :size="78">
        <div>
          <p style="font-size:15px;margin: 10px 0 2px;">{{ percent }}%</p>
          <span
            style=" font-size:11px ;line-height: 20px;border-top: #707070 1px solid;color: #707070;
padding-top: 2px">正确率</span>
        </div>
      </i-circle>
    </div>

    <div style="float: left; margin-left: 28px; width: 75%">
      <div style="margin-top: 10px">
        <span>{{ type }}</span>
      </div>
      <div style="margin-top: 5px">
        <Progress
          :percent="passedpec"
          :hide-info="true"
          status="success"
          style="width: 76%"/>
        <span> &ensp;&ensp;已通过 </span>
        <span style="float: right">{{ passed }}/{{ total }}</span>
      </div>
      <div style="margin-top: 5px">
        <Progress
          :percent="finishpec"
          :hide-info="true"
          style="width: 76%"/>
        <span> &ensp;&ensp;已提交</span>
        <span style="float: right">{{ finished }}/{{ total }}</span>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "ScheduleBar",
        props: {
            total: {
                type: String
            },
            passed: {
                type: String
            },
            finished: {
                type: String
            },
            type: {
                type: String
            },
            color: {
                type: String
            }

        },
        data() {
            return {}
        },
        computed: {
            percent: function () {
                let percent;
                if(parseInt(this.finished)===0){
                    return 0;
                }else {
                    percent = this.passed / this.finished * 100;
                    return parseInt(percent);
                }
            },
            passedpec: function () {
                let passedpec;
                if(parseInt(this.total)===0){
                    return 0;
                }else {
                    passedpec = this.passed / this.total * 100;
                    return passedpec;
                }
            },
            finishpec: function () {
                let finish;
                if(parseInt(this.total)===0){
                    return 0;
                }else {
                    finish = this.finished / this.total * 100;
                    return finish;
                }
            }
        },
        created() {
        }
    }
</script>

<style scoped>

</style>
