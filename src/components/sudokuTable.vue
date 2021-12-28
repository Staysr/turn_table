<template>
  <div class="gameBox">
    <div class="bg1"></div>
    <div class="bg2" v-show="lampShow"></div>
    <div class="start" @click="start"></div>
    <ul>
      <li v-for="(item,i) in list" :key="i" :class="['item' + (i+1), {'active': index == i}]">
        <div class="img1" v-if="item.img">
          <img :src="item.img" alt="">
        </div>
        <p v-if="!item.img">{{item.info}}</p>
      </li>

<!--      <div-->
<!--        v-for="(i, index) in list"-->
<!--        :key="index"-->
<!--        class="jiang"-->
<!--        :style="`transform: rotate(${-->
<!--          (-index * 360) / list.length-->
<!--        }deg) translateY(-50px);`"-->
<!--      >-->
<!--        <span v-if="!i.img" class="title">{{ i.info }}</span>-->
<!--        <img v-if="i.img" :src="i.img" alt="" class="img" />-->
<!--      </div>-->
    </ul>
  </div>
</template>
<script>
  export default {
      props: {
          winner: {
              default: 2,
          },
          specified: {
              default: false,
          },
          list: {
              default: () => [],
          },
          loading:{
              default: false,
          }
      },
      computed:{

      },
      data() {
          return {
              // list: [
                  // {
                  //     "id":1,
                  //     "number":15,
                  //     "prize_name":"乐豆"
                  // },
              // ],
              panziElement: null,
              index: 0, // 当前转动到哪个位置，第一次起点位置0,对应页面item1位置
              count: 8, // 总共有多少个位置
              times: 0, // 转动跑格子次数,
              cycle: 30, // 转动基本次数：即至少需要转动多少次再进入抽奖环节
              speed: 200, // 初始转动速度
              lampShow:false,//开始抽奖，灯光闪烁
              timer: 0, // 转动定时器
              lamp:0, // 灯光定时器
              // prize: 0, // 中奖位置，接口返回
              number_of_draws:1,//限制每天抽奖次数，接口返回
              prize_data: {//中奖信息
                  id:Number,//奖品ID
                  name:'',//奖品名称
                  number:Number,//奖品数量
                  image:'',//奖品图片
                  type:Number,// 奖品类型
              },
          }
      },
      mounted() {

      },
      computed:{

      },
      methods: {
          //点击开始抽奖
          start() {
              if(this.times != 0){
                  this.$toast('正在抽奖中，请勿重复点击')
              } else{
                  this.$emit("start");
                  if (this.loading){
                      this.number_of_draws--;//抽奖开始，次数-1
                      this.speed = 200;//每次抽奖速度初始化为200
                      this.prize_data = "获得抽奖结果";//已经拿到中奖信息，页面展示，等抽奖结束后，将弹窗弹出
                      this.prize = this.winner - 1;//中奖位置赋值，跑马灯最终停留位置，这里实际位置需要-1
                      this.startRoll();//执行抽奖
                      this.lamp = setInterval(()=>{//灯光闪烁开启
                          this.lampShow = !this.lampShow;
                      },500)
                  }
              }
          },
          // 开始转动
          startRoll() {
              this.times += 1; // 转动次数
              this.oneRoll(); // 转动过程调用的每一次转动方法，这里是第一次调用初始化
              this.usePrize();
          },

          // 每一次转动
          oneRoll() {
              let index = this.index; // 当前转动到哪个位置
              const count = this.list.length; // 总共有多少个位置
              index += 1;
              if (index > count - 1) {
                  index = 0;
              }
              this.index = index;
          },

          usePrize() {
              // 如果当前转动次数达到要求 && 目前转到的位置是中奖位置
              if (this.times > this.cycle + 10 && this.prize === this.index) {
                  clearTimeout(this.timer); // 清除转动定时器
                  clearTimeout(this.lamp); // 清除灯光定时器
                  this.lampShow = false; // 白色灯隐藏
                  this.times = 0; // 转动跑格子次数初始化为0，可以开始下次抽奖
                  this.loading = false;
                  this.$emit("end");
              } else {
                  if(this.times < this.cycle - 10){
                      this.speed -= 4; // 加快转动速度
                  }else{
                      this.speed += 20; // 抽奖即将结束，放慢转动速度
                  }
                  this.timer = setTimeout(this.startRoll, this.speed);//开始转动
              }
          },
      },
  }

</script>
<style lang="less" scoped>
  .gameBox {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 468px;
    height: 468px;
    margin: 30px auto;
    border-radius: 8px;
    /*background: url(../../common/images/home/game1.png)no-repeat left top;*/
    background-size: 326px 326px;
    position: relative;
    .bg1 {
      position: absolute;
      left: 4.5px;
      top: 4px;
      width: 317px;
      height: 317px;
      /*background: url(../../common/images/home/game3.png)no-repeat center;*/
      background-size: 317px 317px;
    }
    .bg2 {
      position: absolute;
      left: 4.5px;
      top: 4px;
      width: 317px;
      height: 317px;
      /*background: url(../../common/images/home/game2.png)no-repeat center;*/
      background-size: 317px 317px;
    }
    .start {
      position: relative;
      /*padding-top: 70px;*/
      width: 130px;
      height: 130px;
      background: url(../assets/image/sudoku_s_bg.png) no-repeat center;
      background-size: 130px 130px;
      p {
        text-align: center;
        font-size: 12px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
    }
    ul {
      li {
        position: absolute;
        width: 130px;
        height: 130px;
        background-image: url("../assets/image/sudoku_w_bg.png");
        background-size: 130px 130px;
        @gift_size:65px;
        .img1 {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            display: block;
            width: @gift_size;
            height: @gift_size;
            vertical-align: middle;
            align-items: center;
          }
        }
        p {
          text-align: center;
          font-size: 13px;
          font-weight: 500;
          color: rgba(153, 153, 153, 1);
        }
      }
      .item1 {left: 20px;top: 20px;}
      .item2 {left: 170px;top: 20px;}
      .item3 {left: 320px;top: 20px;}
      .item4 {left: 320px;top: 170px;}
      .item5 {left: 320px;top: 320px;}
      .item6 {left: 170px;top: 320px;}
      .item7 {left: 20px;top: 320px;}
      .item8 {left: 20px;top: 170px;}
      .active {
        background-image: url("../assets/image/sudoku_h_bg.png");
        background-size: cover;
      }
    }
  }
</style>
