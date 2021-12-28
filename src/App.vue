<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="less">
html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
// van-dialog
.van-dialog {
  display: flex;
  flex-direction: column;
  width: 280px;
  height: 300px;
  .van-dialog__content {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    .van-dialog__message {
      font-size: 28px;
      padding: 20px 20px;
      box-sizing: border-box;
    }
  }
  .van-dialog__footer {
    height: 80px;
    .van-button {
      height: 100%;
    }
  }
}
</style>
