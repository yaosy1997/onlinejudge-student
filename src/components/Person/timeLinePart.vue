<template>
    <div style="width: 600px;">
        <p class="time">{{ date }}</p>
        <Drawer
                :closable="false"
                v-model="drawer"
                :scrollable="true"
                width="1000"
                placement="left"
                title="参考答案">
            <question-answer
                    :id="answer.questionId"
                    :qtype="answer.questiontype"
                    :info="answer.info"
            />
        </Drawer>
        <div v-for="state in states">
            <div class="content">
                <div style="font-size: 13px;width: 550px">
                    <span>{{ state.time }}</span>
                    <span style="margin-left: 10px">{{ state.name }}</span>
                    <Button
                            type="text"
                            style="float: right; margin-top: -5px"
                            v-on:click="test(state.id)"
                    >重做本题
                    </Button>
                </div>
                <div style="font-size: 13px;width: 550px">
                    <div style="margin-left: 40px;margin-top: 8px">
                        <span
                                v-if="state.result==='AC_RIGHT'"
                                style="color: #52c41a">运行通过</span>
                        <span
                                v-else-if="state.result==='AC_WRONG'"
                                style="color: #fa201a">结果错误</span>
                        <span
                                v-else-if="state.result==='AC_MEMORYOUT'"
                                style="color: #FADB14">栈溢出</span>
                        <span
                                v-else-if="state.result==='AC_TIMEOUT'"
                                style="color: #FADB14">超时</span>
                        <span
                                v-else
                                style="color: #fa201a">编译错误</span>


                        <Button
                                type="text"
                                style="float: right; margin-top: -5px"
                                @click="showAnswer(state.id)">查看答案
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import questionAnswer from './questionAnswer';
    export default {
        name: 'TimeLinePart',
        components: {questionAnswer},
        props: {
            states: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            date: {
                type: String
            },
        },
        data() {
            return {
                drawer: false,
                answer: {
                    questionId: '',
                    questiontype: '',
                    info: {
                        question: {
                            question_name: 'aa',
                            question_text: 'aaaa',
                            lev: 3,
                        },
                        myanswer: [{
                            answer: 'aaa',
                            language: 'c',
                            nickname: 1,
                        }]
                    }
                }
            };
        },
        methods: {
            test(id) {
                this.$router.push({
                    name: 'test',
                    params: {
                        questionNumber: id
                    }
                })
            },
            showAnswer(id){
                let _this = this;
                let Param = new URLSearchParams();
                Param.append("question_id",id);
                this.ajax.post(_this.postIp+'/questionanswer', Param).then(function (msg) {
                    _this.answer.info = msg.data.data;
                });
                this.drawer = true;
            }
        }
    };
</script>

<style scoped>
    .time {
        color: #4E4E4E;
        font-size: 14px;
    }

    .content {
        margin-top: 8px;
        margin-bottom: 9px;
        margin-left: 20px;
        width: 550px;
    }


</style>
