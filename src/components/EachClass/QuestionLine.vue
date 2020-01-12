<template>
    <div style="height: 20px;margin-top: 20px">
        <Drawer
            :closable="false"
            v-model="drawer"
            :scrollable="true"
            width="1000"
            placement="left"
            title="参考答案"
        >
            <!-- <Answer
                    :id="answer.questionId"
                    :qtype="answer.questiontype"
                    :info="answer.info"
            />-->
        </Drawer>
        <div style="float: left">
            <div v-if="state==='success'">
                <img class="state" src="../../assets/pass.png" />
            </div>
            <!--<div v-else-if="state==='debug'">-->
            <!--<img-->
            <!--class="state"-->
            <!--src="../../../images/wrongs.png">-->
            <!--</div>-->
            <div v-else>
                <img class="state" src="../../assets/nostate.png" />
            </div>
        </div>
        <div style="float: left">
            <img style="width: 17px;height: 17px;margin-left: 15px" src="../../assets/code.png" />
        </div>
        <div style="float: left">
            <a type="text" style="margin-left: 15px;margin-top: -7px" @click="test">{{ name }}</a>
        </div>
        <div style="float: right">
            <a
                v-if="state==='success'"
                type="text"
                style="margin-left: 15px;margin-top: -2px"
                v-on:click="showAnswer"
            >查看答案</a>

            <span style="margin-left:15px">提交时间：{{ time }}</span>
        </div>
    </div>
</template>

<script>
// import Answer from '../Answer';
import { mapActions } from "vuex";

export default {
  name: "Questionline",
  props: {
    question: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      state: "",
      name: "",
      time: "",
      id: "",
      drawer: false,
      answer: {
        questionId: "",
        questiontype: "",
        info: {
          question: {
            question_name: "aa",
            question_text: "aaaa",
            lev: 3
          },
          myanswer: [
            {
              answer: "aaa",
              language: "c",
              nickname: 1
            }
          ]
        }
      }
    };
  },
  created() {
    this.name = this.question.name;
    this.state = this.question.state;
    this.time = this.question.lastDate;
    this.id = this.question.id;
  },
  methods: {
    test() {
      this.$router.push({
        name: "eachClassCode",
        params: { questionId: this.id }
      });
    },
    ...mapActions(["handleAnswer"]),
    showAnswer() {
      this.handleAnswer({ questionId: this.id, type: "course" });
    }
  }
};
</script>

<style scoped>
.state {
  width: 15px;
  height: 15px;
}

a {
  color: black;
}

a:hover {
  color: #2c3e50;
}
</style>
