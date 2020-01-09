<template>
    <tabs>
        <tab-pane
                label="个人信息"
                icon="ios-people"
                style="font-size: 16px">

            <div style="text-align: left;">
                <divider orientation="left">基本信息</divider>
                <div
                        class="row"
                        style="width: 80%">
                    <div class="col-md-7" style="margin-bottom:24px;"><label>姓名：</label>
                        <Input v-model="info.student_name"  style="width: 300px"/>
                    </div>
                    <div class="col-md-7" style="margin-bottom:24px;"><label>昵称：</label>
                        <Input v-model="info.nickname" clearable style="width: 300px"/>
                    </div>

                    <div class="col-md-5" style="margin-bottom:24px;"><label>性别：</label>
                        <Radio-group v-model="info.sex">
                            <Radio label="male">男</Radio>
                            <Radio label="female">女</Radio>
                        </Radio-group>
                    </div>
                </div>
            </div>

            <div style="text-align: left;">
                <divider orientation="left">学生信息</divider>
                <div
                        class="row"
                        style="width: 80%">
                    <div class="col-md-5" style="margin-bottom:24px;"><label>学号：</label>
                        <Input v-model="info.schoolid" clearable style="width: 300px"/>
                    </div>
                    <div class="col-md-5" style="margin-bottom:24px;"><label>学校：</label>
                        <Input v-model="info.school" clearable style="width: 300px"/>

                    </div>
                    <div class="col-md-7" style="margin-bottom:24px;"><label>院系：</label>
                        <Input v-model="info.grade" clearable style="width: 300px"/>
                    </div>
                    <div class="col-md-7" style="margin-bottom:24px;"><label>专业：</label>
                        <Input v-model="info.major" clearable style="width: 300px"/>
                    </div>
                </div>

            </div>

            <div style="text-align: left;margin-top: 20px;">
                <i-button
                        type="primary"
                        v-on:click="change">确认修改
                </i-button>
            </div>

            <div style="margin-top: 10px">
                <divider orientation="left">修改头像</divider>
                <img :src="picture" style="margin-bottom: 10px"/>
                <my-upload @finish='finish'></my-upload>
            </div>

        </tab-pane>

        <tab-pane
                label="修改密码"
                icon="ios-paper">
<!--            <div style="text-align: left;">-->
<!--                <divider orientation="left">修改手机号</divider>-->
<!--                <label>手机号：</label>-->
<!--                <i-input-->
<!--                        placeholder="请输入手机号"-->
<!--                        style="width: 300px;"/>-->
<!--                <div style="margin-top: 20px;">-->
<!--                    <label>验证码：</label>-->
<!--                    <i-input-->
<!--                            placeholder="请输入验证码"-->
<!--                            style="width: 200px;"/>-->
<!--                    <i-button-->
<!--                            type="primary"-->
<!--                            style="width: 98px">获取验证码-->
<!--                    </i-button>-->
<!--                </div>-->
<!--                <div style="margin-top: 20px;">-->
<!--                    <i-button-->
<!--                            type="primary"-->
<!--                            style="width: 80px">确认修改-->
<!--                    </i-button>-->
<!--                </div>-->
<!--            </div>-->

            <div style="text-align: left;">
                <divider orientation="left">修改密码</divider>
                <div style="width: 70%">
                    <i-form
                            ref="formCustom"
                            :model="formCustom"
                            :rules="ruleCustom"
                            :label-width="80">
<!--                        <form-item-->
<!--                                label="当前密码"-->
<!--                                prop="oldpasswd">-->
<!--                            <i-input-->
<!--                                    v-model="formCustom.oldpasswd"-->
<!--                                    type="password"/>-->
<!--                        </form-item>-->
                        <form-item
                                label="新密码"
                                prop="passwd">
                            <i-input
                                    v-model="formCustom.passwd"
                                    type="password"/>
                        </form-item>
                        <form-item
                                label="确认密码"
                                prop="passwdCheck">
                            <i-input
                                    v-model="formCustom.passwdCheck"
                                    type="password"/>
                        </form-item>

                        <form-item>
                            <i-button
                                    type="primary"
                                    @click="handleSubmit(formCustom)">确认修改
                            </i-button>
                            <i-button
                                    style="margin-left: 8px"
                                    @click="handleReset('formCustom')">清除重写
                            </i-button>
                        </form-item>
                    </i-form>
                </div>
            </div>
        </tab-pane>

    </tabs>
</template>

<script>

import {uploadImage} from '@/api/user.js'
import { mapActions } from "vuex";

    export default {
        name: 'Change',
        data() {
            const validateoldPass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入你的旧密码！'));
                } else {
                    if (this.formCustom.passwdCheck !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.formCustom.validateField('passwdCheck');
                    }
                    callback();
                }
            };
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入你的新密码！'));
                } else {
                    if (this.formCustom.passwdCheck !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.formCustom.validateField('passwdCheck');
                    }
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入您的新密码！'));
                } else if (value !== this.formCustom.passwd) {
                    callback(new Error('两次密码不一样'));
                } else {
                    callback();
                }
            };


            return {
                formCustom: {
                    passwd: '',
                    passwdCheck: '',
                },
                ruleCustom: {
                    oldpasswd: [{
                        validator: validateoldPass,
                        trigger: 'blur'
                    }],
                    passwd: [{
                        validator: validatePass,
                        trigger: 'blur'
                    }],
                    passwdCheck: [{
                        validator: validatePassCheck,
                        trigger: 'blur'
                    }]

                },
                postip:this.postIp+"/set_picture",
                close:true,
            };
        },
        created() {
            // setTimeout(()=>{
            // if (this.$store.state.user.info.student_name == 'unknow') {
            //     this.close=false;
            // }},1000);
        },
        methods: {
            handleSubmit(name) {
                if (name.passwd !== '') {
                    if (name.passwd === name.passwdCheck) {
                        let _this = this;
                        let Param = new URLSearchParams();
                        Param.append("password", cover.Encrypt(name.passwd));
                        this.ajax.post(this.postIp + '/change_password', Param).then(function (response) {
                            if (response.data.message === '成功') {
                                _this.$Message.success("修改成功");
                            }
                        }).catch(function (response) {
                            console.log(response);
                        });
                    } else {
                        this.$Message.error('两次密码不一样！');
                    }
                }else {
                    this.$Message.error('请输入密码');
                }


            },
            handleReset(name) {
                this.$refs[name].resetFields();
            },
            change() {
                let _this = this;
                let Param = new URLSearchParams();
                Param.append("realname", this.info.student_name);
                Param.append("nickname", this.info.nickname);
                Param.append("sex", this.info.sex);
                Param.append("school", this.info.school);
                Param.append("grade", this.info.grade);
                Param.append("major", this.info.major);
                Param.append("schoolid", this.info.schoolid);
                this.ajax.post(_this.postIp+'/change_student_Information', Param).then(function (msg) {
                    if ("成功" === msg.data.message) {
                        _this.close =true;
                        _this.$store.commit('setuserinfo', _this.info);
                        _this.$Message.success("修改成功");
                    } else {
                        _this.$Message.error("修改失败");
                    }
                })
            },
            handleError(){
                this.$Message.error("上传失败");
            },
            handleMaxSize(file){
                this.$Notice.warning({
                    title: 'Exceeding file size limit',
                    desc: 'File  ' + file.name + ' is too large, no more than 2M.'
                });
            },
            ...mapActions(["handlePicure"]),
            finish(image){
                uploadImage(image).then(res=>{
                    if (res.data.code === "200") {
                        this.$Message.success("修改成功");
                        this.handlePicure()
                    }else{
                        this.$Message.error("修改失败");
                    }
                })
            }
        },
        computed: {
            picture: function () {
                return this.$store.state.user.picture;
            },
            info:function () {

                return this.$store.state.user.info;
            }
        }
    };

</script>

<style scoped>

</style>
