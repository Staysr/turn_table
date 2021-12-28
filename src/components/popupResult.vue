<template>
  <van-popup :value="show" close-on-popstate :close-on-click-overlay="false">
    <!-- 中奖啦 图片-->
    <img
      v-if="result.status"
      src="../assets/image/popup_yes.png"
      alt=""
      class="image"
    />
    <img v-else src="../assets/image/popup_no.png" alt="" class="image" />
    <!-- 内容 -->
    <!-- 中奖啦 -->
    <div v-if="result.status" class="content">
      <div class="use-block">
        <div class="price">
          <span>￥</span>
          <span>{{ result.info }}</span>
        </div>
        <div class="circle-top"></div>
        <div class="circle-bottom"></div>
        <div class="desc">限活动页面使用</div>
      </div>
      <div class="use-tip">已放入我的奖品</div>
      <!-- <div class="use-btn">立即使用</div> -->
    </div>
    <!-- 未中奖 -->
    <div v-else class="content">
      <img src="../assets/image/no_prize.png" alt="" class="no-prize" />
      <div class="no-prize-text">很遗憾！您本次没有中奖</div>
    </div>
    <!-- 关闭按钮 -->
    <div class="close-icon-block" @click="closePopup">
      <van-icon name="cross" size="20" color="#fff" class="close-icon" />
    </div>
  </van-popup>
</template>

<script>
export default {
  props: {
    show: {
      default: false,
    },
    result: {
      default: () => {},
    },
  },
  methods: {
    closePopup() {
      this.$emit("update:show", false);
    },
  },
};
</script>
<style scoped lang="less">
.van-popup {
  width: 616px;
  height: 490px;
  padding: 18px;
  box-sizing: border-box;
  overflow-y: scroll;
  border-radius: 24px;
  background: linear-gradient(to bottom, #f6d299, #f0af5f);
  overflow: visible;
}
.close-icon-block {
  position: absolute;
  left: 50%;
  bottom: -110px;
  transform: translate(-50%, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  border: 4px solid #fff;
}
.image {
  position: absolute;
  top: -254px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 616px;
  height: 400px;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 96px 60px 64px 60px;
  box-sizing: border-box;
  border-radius: 24px;
  background-color: #f8ead4;
  .use-block {
    position: relative;
    display: flex;
    width: 464px;
    height: 128px;
    line-height: 128px;
    border-radius: 12px;
    color: #c3814c;
    font-weight: bold;
    background-color: #fcf8f4;
    box-shadow: 0px 4px 8px 0px rgba(163, 111, 46, 0.2);
    .price {
      width: 164px;
      height: 100%;
      padding-left: 40px;
      box-sizing: border-box;
      border-right: 4px dashed #c3804a;
      & :nth-child(1) {
        font-size: 26px;
      }
      & :nth-child(2) {
        font-size: 36px;
      }
    }
    .desc {
      flex-grow: 1;
      font-size: 28px;
      padding-left: 60px;
      box-sizing: border-box;
    }
    .circle-top {
      position: absolute;
      left: 152px;
      top: -12px;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background-color: #f8ead4;
    }
    .circle-bottom {
      position: absolute;
      left: 152px;
      bottom: -12px;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background-color: #f8ead4;
    }
  }
  .use-tip {
    color: #cf9056;
    font-size: 26px;
    font-weight: bold;
    margin-top: 36px;
    margin-bottom: 28px;
  }
  .use-btn {
    width: 394px;
    height: 62px;
    line-height: 62px;
    text-align: center;
    color: #fefefe;
    font-size: 26px;
    border-radius: 30px;
    box-shadow: 0 5px 5px 2px #cf9056;
    background: linear-gradient(to bottom, #eec762, #e7a951);
  }
  // no-prize
  .no-prize {
    width: 200px;
    height: 180px;
  }
  .no-prize-text {
    color: #cf9056;
    font-size: 26px;
    font-weight: bold;
    margin-top: 50px;
  }
}
</style>
