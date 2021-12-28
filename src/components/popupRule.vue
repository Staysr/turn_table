<template>
  <van-popup :value="show" round close-on-popstate>
    <!-- 中奖啦 图片-->
    <img src="../assets/image/popup_rule.png" alt="" class="image" />
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
  height: 810px;
  padding: 120px 74px;
  box-sizing: border-box;
  overflow-y: scroll;
  background-color: #fffdee;
  box-shadow: inset 0 0 50px 10px #ecc673;
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
  top: -44px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 396px;
  height: 108px;
}
</style>