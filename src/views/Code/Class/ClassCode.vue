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
* Date By Comments
* ------------- ----- ---------------------------------------------------------
* 
* 31st July 2019	syyao	增加自动保存代码的功能
*
* 17th July 2019 syyao 课内习题做题界面
*/

<template>
    <div>
        <Card>
            <div style="min-height: 200px; text-align:left">
                <div style="margin-left:20px;margin-right:30px;margin-bottom:15px;">
                    <Row>
                        <i-col span="16">
                            <Breadcrumb>
                                <BreadcrumbItem to="/">
                                    <Icon type="ios-navigate" />C语言课程设计
                                </BreadcrumbItem>
                                <BreadcrumbItem to="/components/breadcrumb">
                                    <Icon type="logo-buffer"></Icon>实验一
                                </BreadcrumbItem>
                                <!-- <BreadcrumbItem>
                  <Icon type="ios-cafe"></Icon> Breadcrumb
                                </BreadcrumbItem>-->
                            </Breadcrumb>
                        </i-col>
                        <i-col span="8">
                            <div style="width:120px;float:right">
                                <Icon type="ios-arrow-back" color="#0066FF" />
                                <a style="font-size:12px;" v-on:click="Last">上一题</a>
                                <a style="font-size:12px;margin-left:1vw;" v-on:click="Next">下一题</a>
                                <Icon type="ios-arrow-forward" color="#0066FF" />
                            </div>
                        </i-col>
                    </Row>
                </div>

                <router-view />

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
                            <p style="width:55vw; height:34px; font-size: 13px;color: #ff0009">
                                Tips: 答案最后不要输出回车;
                                使用math库的同时要添加stdlib.h; 所有的输入必须在输出之前;
                            </p>
                            <Button
                                style="width:10vw;height:34px;"
                                icon="ios-cloud-upload-outline"
                                type="primary"
                                v-on:click="post"
                            >
                                提
                                交
                            </Button>
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

import { judgeCode } from "@/api/api.js";
import { constants } from "crypto";

let options = {
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
  extraKeys: {
    Ctrl: "autocomplete"
  }, //ctrl-space唤起智能提示
  gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
};

const cloumn = [
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
];

const situation = {
  AC_RIGHT: "通过",
  AC_WRONG: "结果错误",
  AC_MEMORYOUT: "栈溢出",
  AC_TIMEOUT: "超时"
};

export default {
  name: "classCode",
  components: {
    codemirror
  },
  data() {
    return {
      question_number: 1,
      cmOptions: options,
      model3: "Java",
      language: "c",
      answer: "",
      judgeState: "判题中",
      answer_result: {
        memory: 0,
        question_result: "true",
        running_time: 0
      },
      columns1: cloumn,
      data1: [],
      step: {
        current: 0,
        status: "process"
      },
      error: {
        statue: false,
        message: []
      },
      isPost: "正在进行判题",
      timeoutId: null
    };
  },
  updated: function() {
    this.$nextTick(function() {
      document.documentElement.scrollTop = this.$route.query.site;
    });
  },
  created() {
    this.answer = this.$route.query.code;
    setTimeout(() => {
      document.documentElement.scrollTop = this.$route.query.site;
    }, 500);
  },
  watch: {
    answer() {
      if (this.$route.query.isposted == true) {
        this.$router.replace({
          query: {
            code: this.answer,
            site: document.documentElement.scrollTop,
            isposted: false
          }
        });
      } else {
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
          this.$router.replace({
            query: {
              code: this.answer,
              site: document.documentElement.scrollTop,
              isposted: false
            }
          });
        }, 2000);
      }
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
      this.answer = "";
      this.step.current = 0;
      this.step.status = "process";
      this.error.statue=false;
      this.error.message=[]
      this.data1=[]
      this.$router.push({
        name: "eachClassCode",
        params: {
          questionId: parseInt(this.$route.params.questionId) - 1
        }
      });
    },
    Next() {
      this.answer = "";
      this.step.current = 0;
      this.step.status = "process";
      this.error.statue=false;
      this.error.message=[]
      this.data1=[]
      this.$router.push({
        name: "eachClassCode",
        params: {
          questionId: parseInt(this.$route.params.questionId) + 1
        }
      });
    },
    post: function() {
      this.step.current = 1;
      this.step.status = "process";
      this.$Message.success("提交成功");
      this.isPost = "正在进行判题";
      let _this = this;
      judgeCode(
        this.answer,
        this.language,
        this.$route.params.questionId,
        "in"
      ).then(msg => {
        this.step.current = 2;
        this.step.status = "finish";
        // this.$nextTick(() => {
        //   document.getElementById("abc").scrollIntoView({
        //     behavior: "smooth",
        //     block: "end",
        //     inline: "nearest"
        //   });
        // });

        this.$router.replace({
          query: {
            code: this.answer,
            site: document.documentElement.clientHeight,
            isposted: true
          }
        });

        this.isPost = "判题完成";
        if (msg.data.message !== "编译失败") {
          this.percent = 100;
          this.judgeState = "判题结果";
          let result = msg.data.data[0];

          let data = {
            name: "判题结果",
            data: situation.result.question_result,
            data1: result.running_time,
            data2: result.memory
          };

          this.data1.push(data);
        } else if (msg.data.message === "编译失败") {
          let data = {
            name: "判题结果",
            data: "编译未通过",
            data1: "0",
            data2: "0"
          };
          this.data1.push(data);
          this.error.statue = true;

          this.error.message = [];
          for (let i = 0; i < msg.data.data.length; i++) {
            let temp = msg.data.data[i];
            if (
              temp.match(/\/root\/Curse\/[0-9]+\/[0-9]+\/Main\.[a-z]+:/) !==
              null
            ) {
              let temp2 = temp.match(
                /\/root\/Curse\/[0-9]+\/[0-9]+\/Main\.[a-z]+:/
              )[0];
              temp = temp.slice(temp2.length);
              temp = temp.replace(/(^\s*)/g, "");
            }
            this.error.message.push(temp);
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
  font-family: Consolas, "Courier New", monospace;
  font-size: 14px;
  font-style: normal;
  font-variant: normal;
  height: 100%;
  color: black;
  direction: ltr;
}

.my-table /deep/ .ivu-table {
  max-width: 65vw;
}

.font-in-codeMirror /deep/ .CodeMirror-code {
  font-family: Consolas, "Courier New", monospace;
}
</style>