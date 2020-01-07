<template>
    <div style="width: 635px">
        <div>
            <Table
                    :loading="loading"
                    :columns="columns7"
                    :data="data6"
                    border/>
        </div>
        <div style="margin-top: 20px">
            <Page
                    :total="total"
                    :current="pageNum"
                    :page-size="pageSize"
                    show-elevator
                    @on-change="handlePage"/>
        </div>
    </div>
</template>

<script>


    export default {
        props: {
            allData: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            type: {
                type: String,
                default: '1'
            }
        },
        data() {
            return {
                pageNum: 1,
                total: 0,
                loading: true,
                columns7: [
                    {
                        title: '题号',
                        key: 'question_id',
                        width: 100,
                    },
                    {
                        title: '题目',
                        key: 'question_name',
                        tooltip: true
                    },
                    {
                        title: ' ',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.test(params.index);
                                        }
                                    }
                                }, '做题'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.unstar(params.index);
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                data6: [],
                pageData: [],
                pageSize: 15,
            };

        },
        created() {
            this.$store.commit('setSTitle', 'star');
            let _this = this;
            this.ajax.post(_this.postIp + '/get_favorites').then(function (msg) {
                _this.getQMessages(msg.data.data);
                _this.total = msg.data.data.length;
            });


        },

        methods: {
            test(index) {
                this.$router.push({
                    name: 'test',
                    params: {
                        questionNumber: this.data6[index].question_id
                    }
                })
            },


            unstar(index) {

                let _this = this;
                let Param = new URLSearchParams;
                Param.append('question_id', this.data6[index].question_id);
                this.ajax.post(_this.postIp + '/delete_question', Param).then(function (msg) {
                    if (msg.data.message === "成功") {
                        _this.$Message.success("删除成功");
                        _this.data6.splice(index, 1);
                    } else {
                        _this.$Message.error("删除失败");
                    }
                })


            },
            handlePage(value) {
                let _start = (value - 1) * this.pageSize;
                let _end = value * this.pageSize;
                this.data6 = this.allData.slice(_start, _end);
            },
            getQMessages(allData) {
                this.pagedata = allData;
                let dataCount = allData.length;
                if (dataCount < this.pageSize) {
                    this.data6 = this.pagedata;
                } else {
                    this.data6 = this.pagedata.slice(0, this.pageSize);
                }
                this.loading = false;
            }
        },
    };
</script>

<style scoped>

</style>
