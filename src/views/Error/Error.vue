/*
 * File: Error.vue
 * Project: onlinejudge_student
 * File Created: Thursday, 25th July 2019 6:51:07 pm
 * Author: syyao yao__sy@163.com
 * -----
 * Last Modified: Thursday, 25th July 2019 6:51:18 pm
 * Modified By: syyao yao__sy@163.com
 * -----
 * Copyright 2019 - 2019 syyao, NJU_JLXY
 * HISTORY:
 * Date         	By  	Comments
 * -------------	-----	---------------------------------------------------------
 * 
 * 25th July 2019	syyao	404界面
 */

<template>
<div>
    <div class="img index">
        <!-- <div style="margin-top:10px;">
            <img src="../images/404-back.png" width="125px" style="margin-right:50px;"/>
            <img src="../images/404-f5.png" width="125px"/>
        </div> -->
    </div>
    <div style="margin-top:10px;text-align:center;margin-bottom:80px;">
            <router-link to="/"><img src="../../assets/404-back.png" width="125px" style="margin-right:50px;"/></router-link>
            <img v-on:click="back" src="../../assets/404-f5.png" width="125px"/>
    </div>
</div>
</template>

<script>
    export default {
        name:'error',
        data() {
            return {
            }
        },
        methods:{
            back(){
                this.$router.go(-1);//返回上一个页面
        }
        }
    }
</script>

<style lang="scss" scoped>
/* .index {
    width: 100%;
    position: absolute;
    top: 40px;
    bottom: 0;
    left: 0;
    text-align: center;    
} */

.index{
    width: 100%;
    height: 795px;
}

.img{
    background: url('../../assets/bj1-404.png') center center no-repeat;
    background-size:cover;
}
</style>