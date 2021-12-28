<template>
  <div class="home">
    <div class="top">
      <!--       <div class="rule-btn" @click="showPopupRule">活动规则</div>-->
      <div class="title">{{ activityInfo.title }}</div>
      <div class="table-block" v-if="type == 1">
        <turn-table ref="turnTable" :winner="winner" :specified="specified" :loading="loading" :list="list"
          @start="start" @end="end"></turn-table>
      </div>
      <div class="sudoku-block" v-if="type == 2">
        <sudoku-table ref="sudokuTable" :list="list" :loading="loading" :winner="winner" :specified="specified"
          @start="start" @end="end"></sudoku-table>
      </div>
      <div class="egg-block" v-if="type == 3">
        <egg-table ref="eggTable" :list="list" :winner="winner" :specified="specified" :loading="loading"  @start="start"
          @end="end"></egg-table>
      </div>
    </div>
    <!-- 下半部分 -->
    <div class="bottom">
      <div class="prize-btn" @click="toPrize()">我的奖品</div>
      <!-- company-profile -->
      <div class="company-profile">
        <img src="../assets/image/company.png" alt="" class="company-title" />
        <div class="video-block">
          <video ref="video" :src="activityInfo.activityvideo" controls loop></video>
        </div>
        <div class="profile">
          {{ activityInfo.companyprofile }}
        </div>
      </div>
      <!-- 连线 -->
      <div v-if="activityInfo.activityimg && activityInfo.activityimg.length" class="connect-line">
        <div class="circle-left-top"></div>
        <div class="line-left"></div>
        <div class="circle-left-bottom"></div>
        <div class="circle-right-top"></div>
        <div class="line-right"></div>
        <div class="circle-right-bottom"></div>
      </div>
      <!-- company-profile-image -->
      <div v-if="activityInfo.activityimg && activityInfo.activityimg.length" class="company-profile-image">
        <img v-for="(item, index) in activityInfo.activityimg" :key="index" :src="item" alt="" class="image" />
      </div>
    </div>
    <popup-rule :show.sync="showRule"></popup-rule>
    <popup-result :show.sync="showResult" :result="result"></popup-result>
  </div>
</template>

<script>
  import GL from "@/utils/random.js";
  import turnTable from "@/components/turnTable.vue";
  import sudokuTable from "@/components/sudokuTable.vue";
  import eggTable from "@/components/eggTable.vue";
  import popupRule from "@/components/popupRule.vue";
  import popupResult from "@/components/popupResult.vue";
  // import newdata from "http://dspapi.appletcloud.net/turntable/userinfo.js"
  export default {
    components: {
      turnTable,
      popupRule,
      popupResult,
      sudokuTable,
      eggTable
    },
    data() {
      return {
        winner: 1, //指定获奖下标 specified为true时生效
        specified: false, //是否指定获奖结果，false时为随机
        loading: false, //抽奖执行状态，防止用户多次点击
        panziElement: null,
        list: [],
        showRule: false,
        showResult: false,
        result: {},
        activityInfo: {},
        token: '8e1408d3761b52526d18df2f36fb3533',
        query: {
          uid: "18a1aauc9",
          openid: "yKtsOt2SUCNX3RJ6SUQQfKlGUv2i7jZJMh7jcFg5TwvmczBTh6FKWV3yy+Q",
          activityid: "d5721049",
          username: "1231123",
        },
        isPlay: false,
        type: 2,
        isComplete: false
      };
    },
    mounted() {
      //    http://192.168.0.203:8080/table/?uid=xxx&openid=xxx&activityid=xxx
      console.log(this.$route.query)
      this.token = this.$route.query.token
      this.datanew()
    },
    methods: {
      async getDetails() {
        let res = await this.$api.getDetails({
          uid: this.query.uid,
          activityid: this.query.activityid,
        });
        this.list = res.data.activity;
        this.activityInfo = res.data;
        this.type = res.data.type;
        console.log(res.data, "ddd");
      },
      async datanew() {
        let res = await this.$api.getUserInfo({
          token: this.token,
        });
        if (res.code == 0) {
          // var newdata = JSON.parse(res.data)
          this.query.activityid = res.data.activityid
          this.query.openid = res.data.openid
          this.query.uid = res.data.uid
          this.query.username = res.data.username
          this.getDetails();
        }
      },
      showPopupRule() {
        this.showRule = true;
      },
      toPrize() {
        this.$router.push({
          path: "/prize",
          query: this.query,
        });
      },
      // 开始抽奖
      async start() {
        // 验证抽奖次数
        let res = await this.$api.checkPrizeCount({
          openid: this.query.openid,
          // username: this.activityInfo.username,
          activityid: this.query.activityid,
        });
        let ranArr = [];
        ranArr = [];
        this.list.map((item, index) => {
          return index % 2 == 0 ? ranArr.push([1, 0.99]) : ranArr.push([1, 0.01])
        })
        console.log(res);
        if (res.code == 200) {
          let gl = new GL({
            min: 1,
            max: this.list.length + 1,
            fenpei: new Map(ranArr),
          });
          this.loading = true;
          this.winner = gl.random();
          if (this.type === 1) {
            this.$refs.turnTable.winCallback();
          } else if (this.type === 2) {
            this.$refs.sudokuTable.move();
          }
        } else {
          this.loading = false;
          this.$toast({
            message: res.msg,
          });
        }
      },
      async end() {
        this.result = this.list[this.winner - 1];
        // 展示结果弹窗
        this.showResult = true;
        console.log(this.result, "result");
        // 发送中奖结果 result.status==1 代表中奖
        let res = await this.$api.sendResult({
          uid: this.query.uid,
          openid: this.query.openid,
          username: this.query.username,
          activityid: this.query.activityid,
          lottery: this.result.info,
        });
        // if (this.result.status) {
        //     let res = await this.$api.sendResult({
        //         uid: this.query.uid,
        //         openid: this.query.openid,
        //         username: this.query.username,
        //         activityid: this.query.activityid,
        //         lottery: this.result.info,
        //     });
        // }
      },
    },
  };
</script>
<style lang="less" scoped>
  .home {
    width: 100%;
    background-image: url("../assets/image/long_bg.png");
    background-repeat: no-repeat;
    background-size: cover;
  }

  .top {
    position: relative;
    width: 100%;
    height: 1100px;

    .title {
      position: absolute;
      left: 50%;
      top: 200px;
      transform: translate(-50%, 0);
      color: #fdecbe;
      font-size: 80px;
      white-space: nowrap;
      font-weight: bold;
      text-shadow: -5px 5px #f38711; //左下角阴影
    }

    .rule-btn {
      position: absolute;
      right: -10px;
      top: 84px;
      transform: scale(0.85);
      width: 144px;
      height: 50px;
      line-height: 50px;
      color: #e10f39;
      font-size: 12px;
      font-weight: bold;
      padding: 0 10px 0 20px;
      box-sizing: border-box;
      text-align: center;
      border-top-left-radius: 40px;
      border-bottom-left-radius: 40px;
      background: linear-gradient(to bottom, #ecd692, #fbc24e);
    }

    .table-block {
      position: absolute;
      top: 488px;
      left: 50%;
      transform: translate(-50%, 0);
      width: 528px;
      height: 528px;
      background-image: url("../assets/image/turn_table.png");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }

    .sudoku-block {
      position: absolute;
      top: 488px;
      left: 50%;
      transform: translate(-50%, 0);
      width: 528px;
      height: 528px;
      background-image: url("../assets/image/sudoku_bg.png");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }

    .egg-block {
      position: absolute;
      top: 488px;
      left: 50%;
      transform: translate(-50%, 0);
      width: 650px;
      height: 360px;
      background-image: url("../assets/image/back.png");
      background-repeat: no-repeat;
      background-size: 100%;
      background-position: bottom;
    }
  }

  .bottom {
    position: relative;
    width: 100%;
    padding: 150px 50px 60px 50px;
    box-sizing: border-box;

    .prize-btn {
      position: absolute;
      top: 0px;
      left: 50%;
      transform: translate(-50%, 0);
      width: 248px;
      height: 57px;
      line-height: 57px;
      text-align: center;
      border-radius: 28px;
      color: #a46a0e;
      font-size: 30px;
      font-weight: bold;
      background: linear-gradient(to bottom, #f9eeb7, #ebb76a);
    }

    .company-profile {
      position: relative;
      width: 100%;
      padding: 50px 56px 70px 56px;
      box-sizing: border-box;
      background-color: #feeadf;
      border-radius: 16px;
      border: 10px solid #ffa267;

      .company-title {
        position: absolute;
        left: 50%;
        top: -32px;
        transform: translate(-50%, 0);
        width: 400px;
      }

      .video-block {
        position: relative;
        width: 100%;
        height: 294px;

        video {
          width: 100%;
          height: 100%;
        }
      }

      .profile {
        color: #862705;
        font-size: 24px;
        font-weight: bold;
        line-height: 36px;
        margin-top: 26px;
      }
    }

    .connect-line {
      position: relative;
      width: 100%;
      height: 40px;

      .circle-left-top {
        position: absolute;
        left: 36px;
        top: -50px;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 8px solid #ffa267;
      }

      .circle-right-top {
        position: absolute;
        right: 36px;
        top: -50px;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 8px solid #ffa267;
      }

      .line-left {
        position: absolute;
        left: 43px;
        top: -42px;
        z-index: 2;
        width: 16px;
        height: 124px;
        border-radius: 8px;
        background-color: #fe5431;
      }

      .line-right {
        position: absolute;
        right: 43px;
        top: -42px;
        z-index: 2;
        width: 16px;
        height: 124px;
        border-radius: 8px;
        background-color: #fe5431;
      }

      .circle-left-bottom {
        position: absolute;
        left: 36px;
        bottom: -50px;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 8px solid #ffa267;
      }

      .circle-right-bottom {
        position: absolute;
        right: 36px;
        bottom: -50px;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 8px solid #ffa267;
      }
    }

    .company-profile-image {
      width: 100%;
      padding: 80px 56px 0 56px;
      box-sizing: border-box;
      background-color: #feeadf;
      border-radius: 16px;
      border: 10px solid #ffa267;

      .image {
        width: 100%;
        height: 294px;
        background-color: #ccc;
        margin-bottom: 76px;
      }
    }
  }
</style>
