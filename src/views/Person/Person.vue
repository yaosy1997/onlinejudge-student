/*
 * File: Person.vue
 * Project: onlinejudge_student
 * File Created: Wednesday, 10th July 2019 5:03:03 pm
 * Author: syyao yao__sy@163.com
 * -----
 * Last Modified: Wednesday, 10th July 2019 5:03:17 pm
 * Modified By: syyao yao__sy@163.com
 * -----
 * Copyright 2019 - 2019 syyao, NJU_JLXY
 * HISTORY:
 * Date         	By  	Comments
 * -------------	-----	---------------------------------------------------------
 * 
 * 10th July 2019	syyao	个人中心初始化
 */

 <template>
  <div class="layout">
    <div class="hui_layout" style="margin: auto auto;">
      <Row>
        <i-col span="6">
          <div class="left-contect">
            <div class="left-message">
              <Row>
                <i-col span="8">
                  <div style="text-align: left;padding-top: 10px;margin-left:0;">
                    <img
                      id="up"
                      :src="pic"
                      alt="修改头像"
                      style="width:5vw;height:5vw;border-radius: 50%;margin-top:20px;"
                    />
                  </div>
                </i-col>
                <i-col span="16">
                  <div style="text-align: left;padding-top: 20px;margin-left: 0;">
                    <router-link to="change">
                      <img
                        src="@/assets/redact.png"
                        alt="编辑"
                        width="15px"
                        style="position: absolute;margin-left: 145px;margin-top:-10px "
                      />
                    </router-link>
                    <h1
                      id="username"
                      style="font-size: 1.2vw;font-weight: 700;margin-left: 20px;margin-top: 10px;"
                    >
                      <router-link to="/person">{{nickname}}</router-link>
                    </h1>
                    <p
                      id="school"
                      style="font-size: 0.5vw;margin-top: 10px;margin-left: 20px;"
                    >{{school}}</p>
                    <p
                      id="major"
                      style="font-size: 0.5vw;margin-top: 6px;margin-left: 20px;"
                    >{{major}}</p>
                  </div>
                </i-col>
              </Row>

              <div style="margin-left: 30px;width: 73%;margin-top: 15px;">
                <i-col span="12">
                  <div>
                    <i-col span="12" style="text-align:right;">
                      <span
                        style="width: 34px;height: 28px;font-size: 30px;color: #2E8FFF;margin-right:5px;"
                      >{{ question.pass_number }}</span>
                    </i-col>
                    <i-col span="12">
                      <p
                        style="width: 45px;height: 17px;font-size: 13px;color: #696B69;margin-top: 17px"
                      >&nbsp;道通过</p>
                    </i-col>
                  </div>
                </i-col>
                <i-col span="12">
                  <div>
                    <i-col span="12" style="text-align:right;">
                      <span
                        style=" width: 34px;height: 28px;font-size: 30px;color: #2E8FFF;margin-right:5px;"
                      >{{ question.post_number }}</span>
                    </i-col>
                    <i-col span="12">
                      <p
                        style="width: 45px;height: 17px;font-size: 13px;color: #696B69;margin-top: 17px"
                      >&nbsp;道完成</p>
                    </i-col>
                  </div>
                </i-col>
              </div>
            </div>

            <!--导航栏-->

            <div style="float:right;color:rgba(112, 112, 112, 1)">
              <div
                class="border"
                style="width: 274px ;height: 316px ; margin-right: 68px;margin-top:10px;"
              >
                <p class="today-title">
                  <img
                    src="@/assets/plan.png"
                    style="display:inline-block;vertical-align:middle;margin-right:8px;width:20px;"
                  />今日计划
                </p>
                <div class="plan-text" style="margin-top: 24px">
                  <span style="float: left;">
                    <img
                      src="@/assets/aim.png"
                      style="display:inline-block;vertical-align:middle;margin-right:8px;width:20px;"
                    />目标做题：
                  </span>
                  <div v-if="changePlaneNumber===false">
                    <span style="float: right;">{{question.plan_number }}</span>
                  </div>
                  <div v-else>
                    <InputNumber :max="100" :min="1" v-model="setPlan" />
                  </div>
                </div>
                <div class="plan-text">
                  <span style="float: left;">
                    <img
                      src="@/assets/finish3.png"
                      style="display:inline-block;vertical-align:middle;margin-right:8px;width:20px;"
                    />已完成：
                  </span>
                  <span style="float: right;">{{ question.finished_number }}</span>
                </div>
                <div class="plan-text">
                  <span style="float: left;">
                    <img
                      src="@/assets/now.png"
                      style="display:inline-block;vertical-align:middle;margin-right:8px;width:20px;"
                    />目前题目：
                  </span>
                </div>
                <div class="plan-text" style="margin-top: 18px ;text-align:right;">
                  <span
                    style="width: 100%;color: #2E8FFF;font-size:16px;"
                  >{{ question.last_address }}</span>
                </div>
                <div class="plan-text" style="margin-top: 30px">
                  <div v-if="changePlaneNumber===false">
                    <Button
                      type="default"
                      style="width: 102px;height: 35px; font-size: 15px;"
                      v-on:click="continueWork"
                    >继续做题</Button>
                    <Button
                      v-on:click="changePlane"
                      type="primary"
                      style="margin-left: 19px; width: 102px;height: 35px; font-size: 15px;"
                    >编辑计划</Button>
                  </div>
                  <div v-else>
                    <Button
                      v-on:click="cannel"
                      type="default"
                      style="width: 102px;height: 35px; font-size: 15px;"
                    >取消</Button>
                    <Button
                      v-on:click="confirm"
                      type="primary"
                      style="margin-left: 19px; width: 102px;height: 35px; font-size: 15px;"
                    >确定</Button>
                  </div>
                </div>
              </div>
            </div>

            <div style="float:right;color:rgba(112, 112, 112, 1)">
              <div class="border" style="margin-top:2vw">收藏夹</div>
            </div>
          </div>
        </i-col>
        <i-col span="18">
          <div class="right-contect">
            <div style="width: 90%;margin: auto;">
              <router-view />
            </div>
          </div>
        </i-col>
      </Row>
    </div>
  </div>
</template>
 
 <script>
import { changePlan } from "@/api/user.js";

export default {
  name: "person",
  data() {
    return {
      buttonSize: "large",
      changePlaneNumber: false,
      setPlan: 0
    };
  },
  created() {},
  computed: {
    page: function() {
      return this.$router.name;
    },
    pic: function() {
      return this.$store.state.user.picture;
    },
    nickname: function() {
      return this.$store.state.user.info.nickname;
    },
    school: function() {
      return this.$store.state.user.info.school;
    },
    major: function() {
      return this.$store.state.user.info.major;
    },
    question() {
      return this.$store.state.user.leftInfo;
    }
  },

  mounted: function() {},
  methods: {
    changePanel(name) {
      this.$router.push(name);
    },
    changePlane() {
      this.changePlaneNumber = true;
      this.setPlan = this.question.plan_number;
    },
    confirm() {
      changePlan(this.setPlan)
        .then(msg => {
          if (msg.data.code === "200") {
            this.$Message.success("修改成功");
            this.question.plan_number = this.setPlan;
          }
          this.changePlaneNumber = false;
        })
        .catch(function(msg) {
          console.log(msg);
          this.changePlaneNumber = false;
        });
    },
    cannel: function() {
      this.changePlaneNumber = false;
    },
    continueWork: function() {
      this.$router.push("/question");
    }
  }
};
</script>
 
<style lang="scss" scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #ffffff;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  padding-top: 5vw;
  min-height: 100vh;
}

.hui_layout {
  background-color: rgba(174, 174, 174, 0);
  width: 80vw;

}

.left-contect {
  width: 100%;
  height: 10vw;
}

.right-contect {
  width: 100%;
  height: auto;
  margin-bottom: 40px;
}

.left-message {
  width: 100%;
  height: 190px;
  padding: 0vw 0vw 0vw 2vw;
}

.border {
  border: 1px solid rgba(192, 192, 192, 0.2);
  width: 274px;
  min-height: 100px;
  margin-right: 68px;
  box-shadow: 4px 5px 7px rgba(121, 121, 121, 0.2);
  border-radius: 5px;
  font-family: "Hiragino Sans GB";
}

.plan-text {
  font-size: 18px;
  float: left;
  text-align: left;
  width: 230px;
  height: 24px;
  margin: 16px 18px auto;
}

.today-title {
  width: 94px;
  height: 28px;
  font-size: 16px;
  float: left;
  margin-left: 18px;
  margin-top: 16px;
  font-weight: 700;
  font-family: YouYuan, KaiTi, "Microsoft YaHei", SimHei, "Times New Roman",
    Georgia, Serif;
}
</style>
