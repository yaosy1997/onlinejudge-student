/*
 * File: ClassCoding.vue
 * Project: onlinejudge_student
 * File Created: Wednesday, 17th July 2019 9:48:44 pm
 * Author: syyao yao__sy@163.com
 * -----
 * Last Modified: Wednesday, 17th July 2019 9:48:50 pm
 * Modified By: syyao yao__sy@163.com
 * -----
 * Copyright 2019 - 2019 syyao, NJU_JLXY
 * HISTORY:
 * Date         	By  	Comments
 * -------------	-----	---------------------------------------------------------
 * 
 * 17th July 2019	syyao	课内习题做题界面
 */

<template>
  <div>
    <Card>
      <div style="min-height: 200px; text-align:left">
        <Row>
          <i-col span="12">
            <div style="margin-left:30px;margin-top:10px;">
              <h2 style="font-weight:400;color: #2E8FFF">{{ text1.question_name }}</h2>
              <!--<textarea  class="text-area" ></textarea>-->
              <router-view/>
              <Input
                :autosize="true"
                :value="text1.question_text"
                class="text-area1"
                readonly
                type="textarea"
              />
            </div>
          </i-col>
          <i-col span="12">
            <div style="margin-left:300px;width:120px;margin-top:-10px;">
              <Icon type="ios-arrow-back" color="#0066FF" />
              <a style="font-size:12px;" v-on:click="Last">上一题</a>
              <div style="float:right;">
                <a style="font-size:12px;" v-on:click="Next">下一题</a>
                <Icon type="ios-arrow-forward" color="#0066FF" />
              </div>
            </div>
            <div style="float: right;margin-right: 50px">
              题目难度：
              <Rate :count="3" v-model="lev" disabled />
            </div>
          </i-col>
        </Row>
        <Steps
          :current="step.current"
          :status="step.status"
          direction="vertical"
          style="margin-top: 10px"
        >
          <Step title="开始答题" content="正在将代码上传至判题系统">
            <Tabs
              :value="language"
              style="width: 230px;margin-left: 0px"
              @on-click="changeLanguage"
            >
              <TabPane label="C" name="c" />
              <TabPane label="C++" name="c++" />
              <TabPane label="JAVA" name="java" disabled />
            </Tabs>
            <div style="width:70vw; height:605px;">
              <codemirror
                :options="cmOptions"
                v-model="answer"
                class="codetext"
                style="font-size:15px;width:65vw; height:580px; float: left; margin-top:10px;margin-left:0px; border: #C2C2C2 solid 1px; border-radius: 1px;"
              />
            </div>
            <div style="width:65vw; height:40px;display:inline-flex">
              <p
                style="width:55vw; height:34px; font-size: 13px;color: #ff0009"
              >Tips: 答案最后不要输出回车; 使用math库的同时要添加stdlib.h; 所有的输入必须在输出之前;</p>
              <Button
                style="width:10vw;height:34px;"
                icon="ios-cloud-upload-outline"
                type="primary"
                v-on:click="post"
              >提 交</Button>
            </div>
          </Step>

          <Step title="代码测试" :content="isPost"></Step>

          <Step title="结果输出" content>
            <Table
              border
              :columns="columns1"
              :data="data1"
              class="my-table"
              style="margin-top:10px;margin-bottom: 20px;width:65vw;"
            ></Table>
            <Card v-if="error.statue" style="width:65vw;margin-bottom: 30px;">
              <p slot="title">
                <Icon type="md-warning" color="#ff1517" size="22"></Icon>
                <span style="color:#ff1517">&nbsp;&nbsp;Error Message</span>
              </p>
              <p
                v-for="message in error.message"
                :key="message.id"
                style="white-space: pre;font-size: 12px;font-family: Consolas"
              >{{message}}</p>
            </Card>
          </Step>
        </Steps>
      </div>
    </Card>
    <div id="abc" style="width:10px;height:80px;"></div>
  </div>
</template>

<script>
import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/lib/codemirror.js";
import "codemirror/mode/clike/clike";
import "codemirror/addon/hint/show-hint.js";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/anyword-hint.js";
import "codemirror/addon/scroll/simplescrollbars.css";
import "codemirror/addon/scroll/simplescrollbars";
import "codemirror/addon/selection/active-line";
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/foldgutter.js";
import "codemirror/addon/fold/brace-fold.js";
import "codemirror/addon/fold/comment-fold.js";
import "codemirror/addon/fold/foldcode.js";
import "codemirror/addon/edit/closebrackets.js";

export default {
  name: "classCode",
  components: {
    codemirror
  },
  data() {
    return {
      question_number: 1,
      cmOptions: {
        tabSize: 4,
        mode: "text/x-csrc",
        theme: "default",
        lineNumbers: true,
        line: true,
        indentWithTabs: true,
        smartIndent: true,
        scrollbarStyle: "overlay",
        lineWrapping: true,
        styleActiveLine: true,
        matchBrackets: true,
        autoCloseBrackets: true,
        foldGutter: true,
        extraKeys: { Ctrl: "autocomplete" }, //ctrl-space唤起智能提示
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
      },
      model3: "Java",
      text1: {},
      language: "c",
      answer: "",
      judgeState: "判题中",
      answer_result: {
        memory: 0,
        question_result: "true",
        running_time: 0
      },
      columns1: [
        {
          title: "测试项目",
          width: 200,
          key: "name"
        },
        {
          title: "判题成绩",
          key: "data"
        },
        {
          title: "运行时间 (ms)",
          key: "data1"
        },
        {
          title: "内存用量 (b)",
          key: "data2"
        }
      ],
      data1: [],
      step: {
        current: 0,
        status: "process"
      },
      error: {
        statue: false,
        message: []
      },
      isPost: "正在进行判题"
    };
  },

  mounted() {
    // let _this = this;
    // let Param = new URLSearchParams();
    // Param.append('id', _this.$route.params.questionNumber);
    // this.ajax.post(_this.postIp + '/init_question', Param).then(function (msg) {
    //     _this.text1 = msg.data.data;
    // }).catch(function () {
    //     _this.$Message.error('题目不存在');
    //     _this.$router.go(-1);
    // });
  },
  watch: {
    $route(to, from) {
      this.$router.go(0);
    }
  },
  methods: {
    changeLanguage(name) {
      this.language = name;
      if (name === "c") {
        this.cmOptions.mode = "text/x-csrc";
      } else {
        this.cmOptions.mode = "text/x-c++src";
      }
    },
    Last() {
      this.$router.push({
        name: "test",
        params: {
          questionNumber: parseInt(this.$route.params.questionNumber) - 1
        }
      });
      update();
    },
    Next() {
      this.$router.push({
        name: "test",
        params: {
          questionNumber: parseInt(this.$route.params.questionNumber) + 1
        }
      });
      update();
    },
    post: function() {
      this.step.current = 1;
      this.step.status = "process";
      this.$Message.success("提交成功");
      this.isPost = "正在进行判题";
      let _this = this;
      let Param = new URLSearchParams();
      Param.append("file", this.answer);
      Param.append("language", this.language);
      Param.append("question_id", this.$route.params.questionNumber);
      Param.append("status", "on");
      this.ajax.post(this.postIp + "/gogogo", Param).then(function(msg) {
        _this.step.current = 2;
        _this.step.status = "finish";
        _this.$nextTick(() => {
          document.getElementById("abc").scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest"
          });
        });
        _this.isPost = "判题完成";
        if (msg.data.message !== "编译失败") {
          _this.percent = 100;
          _this.judgeState = "判题结果";
          let result = msg.data.data[0];
          if (result.question_result === "AC_RIGHT") {
            let data = {
              name: "判题结果",
              data: "通过",
              data1: result.running_time,
              data2: result.memory
            };
            _this.data1.push(data);
          } else if (result.question_result === "AC_WRONG") {
            let data = {
              name: "判题结果",
              data: "结果错误",
              data1: result.running_time,
              data2: result.memory
            };
            _this.data1.push(data);
          } else if (result.question_result === "AC_MEMORYOUT") {
            let data = {
              name: "判题结果",
              data: "栈溢出",
              data1: result.running_time,
              data2: result.memory
            };
            _this.data1.push(data);
          } else if (result.question_result === "AC_TIMEOUT") {
            let data = {
              name: "判题结果",
              data: "通过",
              data1: result.running_time,
              data2: result.memory
            };
            _this.data1.push(data);
          } else {
            ApiError.error(_this, "判题系统出错");
          }
        } else if (msg.data.message === "编译失败") {
          let data = {
            name: "判题结果",
            data: "编译未通过",
            data1: "0",
            data2: "0"
          };
          _this.data1.push(data);
          _this.error.statue = true;

          for (let i = 0; i < msg.data.data.length; i++) {
            let temp = msg.data.data[i];
            if (
              temp.match(/\/root\/Test\/[0-9]+\/[0-9]+\/Main\.[a-z]+:/) !== null
            ) {
              let temp2 = temp.match(
                /\/root\/Test\/[0-9]+\/[0-9]+\/Main\.[a-z]+:/
              )[0];
              temp = temp.slice(temp2.length);
              temp = temp.replace(/(^\s*)/g, "");
            }
            _this.error.message.push(temp);
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.CodeMirror {
  border: 1px solid #eee;
  height: auto;
}

.CodeMirror-scroll {
  height: auto;
  overflow-y: hidden;
  overflow-x: auto;
}

.layout-footer-center {
  text-align: center;
}

.text-area {
  border: 1px solid rgb(199, 194, 194);
  margin-top: 15px;
  width: 80%;
  border-radius: 5px;
  height: 100px;
  color: #5b6270;
}

.text-area1 /deep/ textarea {
  margin-top: 15px;
  width: 80%;
  color: #666666;
  line-height: 24px;
  letter-spacing: 1px;
  resize: none;
  font-size: 13px;
  border: 0px;
}

.text-area2 /deep/ textarea {
  margin-top: 15px;
  width: 80%;
  border: 0px;
  color: #666666;
  line-height: 24px;
  letter-spacing: 1px;
  resize: none;
  font-size: 13px;
}

.codetext /deep/ .CodeMirror {
  /* Set height, width, borders, and global font properties here */
  font-family: monospace;
  height: 100%;
  color: black;
  direction: ltr;
}

.my-table /deep/ .ivu-table {
  max-width: 65vw;
}

.font-in-codeMirror /deep/ .CodeMirror-code {
  font-family: Console, Menlo, Courier, monospace;
}
</style>
