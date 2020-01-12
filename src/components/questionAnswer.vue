<template>
    <div>
        <Layout style="margin-right: auto; margin-left: auto;width: 1000px">
            <Content :style="{padding: '0 50px'}">
                <Breadcrumb :style="{margin: '20px 0'}">
                    <BreadcrumbItem>题库</BreadcrumbItem>
                </Breadcrumb>

                <Card>
                    <div style="min-height: 200px;">
                        <div style="margin-left:30px;margin-top:10px;">
                            <h2
                                style="font-weight:400;color: #2E8FFF"
                            >{{ AnswerInfo.question.question_name}}</h2>
                            <!--<textarea  class="text-area" ></textarea>-->
                            <Row>
                                <Col span="12">
                                    <h3 style="margin-top:7px">题目说明</h3>
                                </Col>
                                <Col span="12">
                                    <div style="float: right;margin-right: 50px">
                                        题目难度：
                                        <Rate :count="3" v-model="valueDisabled" disabled />
                                    </div>
                                </Col>
                            </Row>
                            <Input
                                :autosize="true"
                                :value="AnswerInfo.question.question_text"
                                class="text-area1"
                                readonly
                                type="textarea"
                            ></Input>
                        </div>

                        <div
                            style="width: 800px;border-bottom: #707070 1px solid;margin-left: 35px;font-size: 22px;margin-top: 30px"
                        >解决方案</div>

                        <Tabs
                            :value="AnswerInfo.myanswer[0].language"
                            style="width: 180px;margin-left: 35px"
                        >
                            <TabPane label="c/c++" name="c" />
                            <TabPane label="java" name="java" />
                        </Tabs>

                        <div style="height: 400px">
                            <codemirror
                                :options="cmOptions"
                                :value="AnswerInfo.myanswer[0].answer"
                                class="codetext"
                                style="width:800px;height:392px; float: left;margin-top:10px;margin-left:40px;
                            border: #C2C2C2 solid 1px;border-radius: 1px"
                            />
                        </div>
                    </div>
                </Card>
            </Content>
        </Layout>
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
  name: "questionAnswer",
  components: {
    codemirror
  },
  data() {
    return {
      type: "1",
      question_number: "1",
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
        readOnly: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
      },
      model3: "Java"
    };
  },
  computed: {
    /**
     * @return {string}
     */
    AnswerInfo: function() {
      return this.$store.state.bank.Answer.info
    },
    valueDisabled: function() {
      return parseInt(this.AnswerInfo.question.lev);
    }
  },
  created() {}
};
</script>

<style scoped>
.codetext /deep/ .CodeMirror {
  /* Set height, width, borders, and global font properties here */
  font-family: monospace;
  height: 100%;
  color: black;
  direction: ltr;
}

.font-in-codeMirror /deep/ .CodeMirror-code {
  font-family: Consolas, Menlo, Courier, monospace;
}
</style>
