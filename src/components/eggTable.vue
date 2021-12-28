<template>
  <div>
    <div class="chouJiang one">
      <div class="egg" @click="clickOne(index)" v-for="(i,index) in chouJiang.list" :key="index" >
        <!-- 锤子图片 -->
        <img
          class="chuizi"
          :class="{'qiao':chouJiang.qiao && chouJiang.egg == index}"
          src="../assets/image/chuizi.png"
          alt
        />
        <!-- 鸡蛋图片 -->
        <img
          class="eg"
          v-show="!i.qiao"
          :class="{'qiao':chouJiang.qiao && chouJiang.egg == index}"
          src="../assets/image/egg1.png"
          alt/>
        <!--鸡蛋碎片图-->
        <img
          class="egsp"
          v-show="i.qiao"
          :class="{'qiao':!chouJiang.qiao && chouJiang.egg == index}"
          src="../assets/image/egg2.png"
          alt/>
      </div>
    </div>
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
            list: [],
        },
        data() {
            return {
                chouJiang: {
                    num: 3, //默认蛋数量
                    egg: null, //敲击的哪个鸡蛋
                    qiao: false, //是否敲击
                    result: '谢谢参与', //默认结果
                    time: 1000, //多少秒后弹出结果 ms
                    list: [],
                    qiaoNum: 0,
                    times: 0
                },
                flag: false
            }
        },
        computed:{
            cjList:function(){
                let curEggArr = this.list.slice(this.chouJiang.num * this.chouJiang.times,this.chouJiang.num * (this.chouJiang.times + 1));
                if(this.chouJiang.qiaoNum != this.chouJiang.num ){
                    curEggArr.map((item,index)=>{
                        item['qiao'] = false;
                    })
                }
                this.chouJiang.list = curEggArr;
                return curEggArr;
            },
        },

        mounted: function () {
          console.log(this.chouJiang)
        },
        methods: {
            //敲击鸡蛋的方法
            clickOne(index) {
                let _this = this;
                _this.chouJiang.qiaoNum +=1;
                console.log(_this.cjList)
                _this.cjList[index].qiao = true;
                debugger;
                if(_this.chouJiang.qiaoNum == _this.chouJiang.num ){
                    _this.chouJiang.qiaoNum = 0;
                    _this.chouJiang.times += 1;
                    // _this.cjList = _this.list.slice(_this.chouJiang.num * _this.chouJiang.times,_this.chouJiang.num * (_this.chouJiang.times + 1));
                    console.log(_this.cjList)
                }

                //敲击过一次就不能再敲击
                // if (!this.chouJiang.qiao) {
                //     this.chouJiang.egg = index
                //     setTimeout(() => {
                //         this.$emit("end");
                //     }, this.chouJiang.time)
                // } else {
                //     this.$emit("start");
                // }
                this.chouJiang.egg = index
                setTimeout(() => {
                    this.$emit("end");
                }, this.chouJiang.time)
            }
        }
    }
</script>

<style lang="less" scoped>
  .chouJiang {
    margin: 50px 0;
  }

  /* 砸金蛋 */
  .chouJiang.one {
    display: flex;
    justify-content: center;
    transform: scale(0.9);

    .egg {
      width: 100px;
      cursor: pointer;
      margin: 0 20px;
      position: relative;

      &:nth-child(2) {
        width: 200px;
      }

      &:hover .chuizi {
        opacity: 1;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: scale-down;
        user-select: none;
        pointer-events: none;
      }

      .eg {
        height: 100%;
        transform: scale(1.3);

        &.qiao {
          animation: clickOne_eg 0.5s steps(1) 0.4s both 1;
        }
      }

      .chuizi {
        width: 65%;
        transform-origin: 100% 100%;
        opacity: 0;
        position: absolute;
        right: 0;
        bottom: 45%;
        z-index: 9;

        &.qiao {
          animation: clickOne_chuizi 0.7s ease-in both 1;
        }
      }

      .egsp {
        height: 100%;
        transform: scale(1.1);

        &.qiao {
          /*animation: clickOne_eg 0.5s steps(1) 0.4s both 1;*/
        }
      }
    }

    /* 敲鸡蛋后的锤子动画 */
    @keyframes clickOne_chuizi {
      50% {
        transform: rotate(30deg);
      }
      99% {
        opacity: 1;
        transform: rotate(0);
      }
      100% {
        opacity: 0;
        transform: rotate(0);
      }
    }
    /* 敲鸡蛋后的鸡蛋动画 */
    @keyframes clickOne_eg {
      100% {
        opacity: 0;
      }
    }
  }
</style>
