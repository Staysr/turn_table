<template>
  <div class="circle">
    <ul>
      <li>1</li>
      <li>11</li>
      <li>111</li>
      <li>1111</li>
      <li>11111</li>
      <li>111111</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: 6,
    };
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.circle {
  width: 100%;
  height: 100%;
  background-color: #f7f7f7;
}

ul {
  position: relative;
  width: 200px;
  height: 200px;
  padding: 200px 100px;
  box-sizing: border-box;
  transform-style: preserve-3d;
}
ul li {
  position: absolute;
  list-style: none;
  width: 200px;
  height: 200px;
  text-align: center;
  line-height: 200px;
}

ul li:nth-child(1) {
  background: red;
  transform: rotateX(60deg) translateZ(200px);
}
ul li:nth-child(2) {
  background-color: purple;
  transform: rotateX(120deg) translateZ(200px);
}
ul li:nth-child(3) {
  background-color: blue;
  transform: rotateX(180deg) translateZ(200px);
}
ul li:nth-child(4) {
  background-color: orangered;
  transform: rotateX(240deg) translateZ(200px);
}
ul li:nth-child(5) {
  background-color: yellow;
  transform: rotateX(300deg) translateZ(200px);
}
ul li:nth-child(6) {
  background-color: cyan;
  transform: rotateX(360deg) translateZ(200px);
}
</style>