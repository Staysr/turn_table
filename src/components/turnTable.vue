<template>
  <div class="zp-box">
    <div class="panzi">
      <div
        class="bck-box"
        :style="` transform: rotate(${-90 + 180 / list.length}deg)`"
      >
        <div
          class="bck"
          v-for="(i, index) in list"
          :key="index"
          :style="`transform: rotate(${(-index * 360) / list.length}deg) skew(${
            -90 + 360 / list.length
          }deg);`"
        ></div>
      </div>
      <div
        v-for="(i, index) in list"
        :key="index"
        class="jiang"
        :style="`transform: rotate(${
          (-index * 360) / list.length
        }deg) translateY(-50px);`"
      >
        <span v-if="!i.img" class="title">{{ i.info }}</span>
        <img v-if="i.img" :src="i.img" alt="" class="img" />
      </div>
    </div>

    <div class="start-btn" @click="start()">
      <img src="../assets/image/start.png" alt="" class="circle" />
      <img src="../assets/image/arrow.png" alt="" class="arrow" />
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
    // loading: {
    //   default: false,
    // },
    list: {
      default: () => [],
    },
  },
  computed: {
    animationClass() {
      //对应css样式中定义的class属性值,如果有更多的话可以继续添加  case 8:   return 'wr8'
      switch (this.winner) {
        case 1:
          return "wr0";
        case 2:
          return "wr1";
        case 3:
          return "wr2";
        case 4:
          return "wr3";
        case 5:
          return "wr4";
        case 6:
          return "wr5";
        case 7:
          return "wr6";
        case 8:
          return "wr7";
      }
    },
  },
  data() {
    return {
      loading: false, //抽奖执行状态，防止用户多次点击
      panziElement: null,
    };
  },
  mounted() {
    // let root = document.querySelector(":root");
    // root.style.setProperty("--nums", this.list.length);
  },
  methods: {
    //开始抽奖
    start() {
      if (!this.loading) {
        this.panziElement = document.querySelector(".panzi");
        this.panziElement.classList.remove(this.animationClass);
        this.$emit("start");
        this.loading = true;
      }else{
        this.loading = false;
      }
    },
    //中奖返回方法
    winCallback() {
      setTimeout(() => {
        /* 此处是为了解决当下次抽中的奖励与这次相同，动画不重新执行的 */
        /* 添加一个定时器，是为了解决动画属性的替换效果，实现动画的重新执行 */
        this.panziElement.classList.add(this.animationClass);
      }, 0);
      // 因为动画时间为 3s ，所以这里3s后获取结果，其实结果早就定下了，只是何时显示，告诉用户
      setTimeout(() => {
        this.loading = false;
        this.$emit("end");
      }, 3000);
    },
  },
};
</script>
<style lang="less" scoped>
@zp_size: 460px; //转盘尺寸
@btn_size: 150px; //抽奖按钮尺寸
@time: 3s; //转动多少秒后停下的时间
.zp-box {
  --nums: 6; // 转盘分几份
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: @zp_size;
  height: @zp_size;
  user-select: none;
  overflow: hidden;
  /* 抽奖按钮 */
  .start-btn {
    position: relative;
    width: @btn_size;
    height: @btn_size;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    .circle {
      width: 100%;
      height: 100%;
    }
    .arrow {
      position: absolute;
      top: -53px;
      width: 30px;
    }
  }
  /* 盘子样式 */
  .panzi {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    overflow: hidden;
    /* 每个奖项的样式 */
    .jiang {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      height: 200px;
      padding-bottom: 120px;
      box-sizing: border-box;
      .title {
        color: #ff2b00;
        font-size: 14px;
        font-weight: bold;
      }
      .img {
        width: 50px;
        height: 50px;
      }
    }
  }
  .bck-box {
    overflow: hidden;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    border-radius: 50%;
    /* 转盘扇形背景 */
    .bck {
      box-sizing: border-box;
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 1;
      top: -50%;
      left: 50%;
      transform-origin: 0% 100%;
    }
    /* 转盘背景色 */
    .bck:nth-child(2n) {
      background: #fff;
    }
    .bck:nth-child(2n + 1) {
      background: #ffd7b0;
    }
  }

  /* 下面的css样式为每个奖品的旋转动画，这里写了对应8个奖品的动画，如果想要更多的话，可以添加 */
  /* 例如： .wr8  @keyframes play8 */
  .wr0,
  .wr1,
  .wr2,
  .wr3,
  .wr4,
  .wr5,
  .wr6,
  .wr7 {
    animation-duration: @time;
    animation-timing-function: ease;
    animation-fill-mode: both;
    animation-iteration-count: 1;
  }
  .wr0 {
    animation-name: play0;
  }
  .wr1 {
    animation-name: play1;
  }
  .wr2 {
    animation-name: play2;
  }
  .wr3 {
    animation-name: play3;
  }
  .wr4 {
    animation-name: play4;
  }
  .wr5 {
    animation-name: play5;
  }
  .wr6 {
    animation-name: play6;
  }
  .wr7 {
    animation-name: play7;
  }
  @keyframes play0 {
    to {
      transform: rotate(calc(4 * 360deg + 360deg / var(--nums) * 0));
    }
  }
  @keyframes play1 {
    to {
      transform: rotate(calc(4 * 360deg + 360deg / var(--nums) * 1));
    }
  }
  @keyframes play2 {
    to {
      transform: rotate(calc(4 * 360deg + 360deg / var(--nums) * 2));
    }
  }
  @keyframes play3 {
    to {
      transform: rotate(calc(4 * 360deg + 360deg / var(--nums) * 3));
    }
  }
  @keyframes play4 {
    to {
      transform: rotate(calc(4 * 360deg + 360deg / var(--nums) * 4));
    }
  }
  @keyframes play5 {
    to {
      transform: rotate(calc(4 * 360deg + 360deg / var(--nums) * 5));
    }
  }
  @keyframes play6 {
    to {
      transform: rotate(calc(4 * 360deg + 360deg / var(--nums) * 6));
    }
  }
  @keyframes play7 {
    to {
      transform: rotate(calc(4 * 360deg + 360deg / var(--nums) * 7));
    }
  }
}
</style>
