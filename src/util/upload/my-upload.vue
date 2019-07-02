<template>
    <div>
        <Button type="primary" @click="modal6 = true">修改头像</Button>
        <Modal
                v-model="modal6"
                title="修改头像"
                width="700"
                :footer-hide="hide"
        >
        <div class="cropper-content">
            <div class="cropper">
                <vueCropper ref="cropper" :img="option.img" :outputSize="option.size" :outputType="option.outputType"
                            :info="true" :full="option.full" :canMove="option.canMove" :canMoveBox="option.canMoveBox"
                            :original="option.original" :autoCrop="option.autoCrop"
                            :autoCropWidth="option.autoCropWidth" :autoCropHeight="option.autoCropHeight"
                            :fixedBox="option.fixedBox" @realTime="realTime" @imgLoad="imgLoad"></vueCropper>
            </div>
            <div class="show-preview"
                 :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden', 'margin': '5px'}">
                <div :style="previews.div" class="preview">
                    <img :src="previews.url" :style="previews.img">
                </div>
            </div>
        </div>

        <div class="footer-btn">
            <div class="scope-btn">
                <label class="btn" for="uploads">选择图片</label>
                <input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);"
                       accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event, 1)">
                <Button  @click="changeScale(1)" icon="md-add"></Button>
                <Button  @click="changeScale(-1)" icon="md-remove"></Button>
                <Button  @click="rotateLeft"><span style="font-weight: 600;">↺</span></Button>
                <Button  @click="rotateRight"><span style="font-weight: 600;">↻</span></Button>
                <Button  @click="down('blob')" icon="md-download"></Button>
            </div>
            <div class="upload-btn">
                <Button type="primary" style="margin-left: 46px;" @click="finish('blob')">上传头像</Button>
            </div>
        </div>
        </Modal>
    </div>
</template>

<script>
    import {VueCropper} from 'vue-cropper'
    import GetUserInfo from '../../js/GetUserInfo'

    export default {
        name:'my-upload',
        data() {
            return {
                modal6:false,
                hide:true,
                crap: false,
                previews: {},
                option: {
                    img:'',
                    size: 1,
                    full: false, // 输出原图比例截图 props名full
                    outputType: 'png',
                    canMove: true,
                    original: false,
                    canMoveBox: true,
                    autoCrop: true,
                    autoCropWidth: 200,
                    autoCropHeight: 200,
                    fixedBox: true
                },
                downImg: '#'
            }
        },
        components: {VueCropper},
        methods: {
            changeScale(num) {
                num = num || 1
                this.$refs.cropper.changeScale(num)
            },
            rotateLeft() {
                this.$refs.cropper.rotateLeft()
            },
            rotateRight() {
                this.$refs.cropper.rotateRight()
            },
            finish(type) {
                console.log('finish');
                let _this = this;
                let formData = new FormData();
                // 输出
                if (type === 'blob') {
                    this.$refs.cropper.getCropBlob((data) => {
                        let img = window.URL.createObjectURL(data);
                        formData.append("file", data,'file');
                        this.http.post(this,"/ChangeImg", formData).then(function (msg) {
                            if(msg.data.code==='200') {
                                _this.$Message.success("上传成功");
                                _this.modal6=false;
                                setTimeout(()=>{GetUserInfo.getUserInfo(_this)},1000);
                            }else {
                                _this.$Message.error("上传失败");
                            }
                        })

                    })
                } else {
                    this.$refs.cropper.getCropData((data) => {
                        this.model = true;
                        this.modelSrc = data;
                    })
                }
            },
            // 实时预览函数
            realTime(data) {
                this.previews = data
            },
            down(type) {
                // event.preventDefault()

                var aLink = document.createElement('a');
                aLink.download = 'author-img';
                // 输出
                if (type === 'blob') {
                    this.$refs.cropper.getCropBlob(data => {
                        console.log(data);
                        this.downImg = window.URL.createObjectURL(data);
                        //            aLink.download = this.downImg;
                        console.log(this.downImg);
                        aLink.href = window.URL.createObjectURL(data);
                        aLink.click()
                    })
                } else {
                    this.$refs.cropper.getCropData(data => {
                        this.downImg = data;
                        console.log(data)
                        // aLink.href = data
                        // aLink.click()
                        // 将头像图片数据发送给后台
                    })
                }
            },
            uploadImg(e, num) {
                //上传图片
                // this.option.img
                var file = e.target.files[0]
                if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
                    alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
                    return false
                }
                var reader = new FileReader()
                reader.onload = e => {
                    let data
                    if (typeof e.target.result === 'object') {
                        // 把Array Buffer转化为blob 如果是base64不需要
                        data = window.URL.createObjectURL(new Blob([e.target.result]))
                    } else {
                        data = e.target.result
                    }
                    if (num === 1) {
                        this.option.img = data
                    } else if (num === 2) {
                        this.example2.img = data
                    }
                };
                // 转化为base64
                //reader.readAsDataURL(file)
                // 转化为blob
                 reader.readAsArrayBuffer(file)
            },
            imgLoad(msg) {
                console.log(msg)
            }
        }
    }
</script>

<style lang="less">

    .cropper-content {
        display: flex;
        display: -webkit-flex;
        justify-content: flex-end;
        -webkit-justify-content: flex-end;

        .cropper {
            width: 350px;
            height: 300px;
        }

        .show-preview {
            flex: 1;
            -webkit-flex: 1;
            display: flex;
            display: -webkit-flex;
            justify-content: center;
            -webkit-justify-content: center;

            .preview {
                overflow: hidden;
                border-radius: 50%;
                border: 1px solid #cccccc;
                background: #cccccc;
                margin-left: 40px;
            }
        }
    }

    .footer-btn {
        margin-top: 30px;
        display: flex;
        display: -webkit-flex;
        justify-content: flex-end;
        -webkit-justify-content: flex-end;

        .scope-btn {
            width: 350px;
            display: flex;
            display: -webkit-flex;
            justify-content: space-between;
            -webkit-justify-content: space-between;
        }

        .upload-btn {
            flex: 1;
            -webkit-flex: 1;
            display: flex;
            display: -webkit-flex;
            justify-content: center;
            -webkit-justify-content: center;
        }

        .btn {
            outline: none;
            display: inline-block;
            line-height: 1;
            white-space: nowrap;
            cursor: pointer;
            -webkit-appearance: none;
            text-align: center;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            outline: 0;
            margin: 0;
            -webkit-transition: 0.1s;
            transition: 0.1s;
            font-weight: 500;
            padding: 10px 15px;
            font-size: 12px;
            border-radius: 3px;
            color: #fff;
            background-color: #67c23a;
            border-color: #67c23a;
        }
    }
</style>
