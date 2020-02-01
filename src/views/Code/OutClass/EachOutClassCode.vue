/*
 * File: EachClassCode.vue
 * Project: onlinejudge_student
 * File Created: Wednesday, 17th July 2019 10:14:21 pm
 * Author: syyao yao__sy@163.com
 * -----
 * Last Modified: Wednesday, 17th July 2019 10:14:41 pm
 * Modified By: syyao yao__sy@163.com
 * -----
 * Copyright 2019 - 2019 syyao, NJU_JLXY
 * HISTORY:
 * Date         	By  	Comments
 * -------------	-----	---------------------------------------------------------
 * 
 * 17th July 2019	syyao	各个课外题目初始化
 */

 <template>
    <Row>
        <i-col span="24">
            <div style="margin-left:30px;margin-top:10px;">
                <h2 style="font-weight:400;color: #2E8FFF">{{ text1.questionName }}</h2>
                <!--<textarea  class="text-area" ></textarea>-->

                <Input
                    :autosize="true"
                    :value="text1.questionText"
                    class="text-area1"
                    readonly
                    type="textarea"
                />
            </div>
        </i-col>
        <!-- <i-col span="6">
            <div style="float: right;margin-right: 50px">
                题目难度：
                <Rate :count="3" v-model="lev" disabled />
            </div>
        </i-col> -->
    </Row>
</template>
 
<script>
import { initOutClassQuestion } from "@/api/api.js";
export default {
  name: "eachOutClassCode",
  data() {
    return {
      text1: {}
    };
  },
  created() {
    initOutClassQuestion(this.$route.params.questionId).then(msg => {
      if (msg.data.code === "200") {
        this.text1 = msg.data.data;
        console.log(1)
        this.$store.commit('setOutClassType',msg.data.data.kind)
        console.log(2)

      }
    }).catch(msg =>{
        this.$Message.error('题目不存在');
        this.$router.go(-1);
    })
    // this.ajax.post(_this.postIp + '/init_question', Param).then(function (msg) {
    //     _this.text1 = msg.data.data;
    // })
  },
  computed: {
    lev() {
      return parseInt(this.text1.lev);
    }
  },
  watch: {
    "$route.params.questionId": function() {
      initOutClassQuestion(this.$route.params.questionId).then(msg => {
        if (msg.data.code === "200") {
          this.text1 = msg.data.data;
          this.$store.commit('setOutClassType',msg.data.data.kind)
        }
      }).catch(msg=> {
        this.$Message.error('题目不存在');
        this.$router.go(-1);
    });
    }
  }
};
</script>

<style lang="scss" scoped>
.text-area1 /deep/ textarea {
  margin-top: 15px;
  width: 95%;
  color: #666666;
  line-height: 24px;
  letter-spacing: 1px;
  resize: none;
  font-size: 13px;
  border: 0px;
}
</style>