<template>
  <div class="prize">
    <van-tabs v-model="activeTab" swipeable animated>
      <van-tab v-for="(cate, i) in category" :key="i" :title="cate.title">
        <div v-for="(item, index) in cate.list" :key="index" class="list-item">
          <div class="left">
            <div class="left-img">
              <img
                src="../assets/image/prize.png"
                alt=""
                style="width：100%;height:100%;"
              />
            </div>
            <div class="left-rows">
              <div class="row-tip">限活动页使用</div>
              <!-- <div class="row-date">
            <span>有效日期：</span>
            <span>2020-10-11</span>
          </div> -->
            </div>
          </div>
          <div
            class="right"
            :class="checkEffective(item) ? 'effective' : 'invalid'"
            @click="checkEffective(item) ? use(item) : '' "
          >
            <div class="price">
              <span class="icon">￥</span>
              <span class="number">{{ item.lotteryinfo }}</span>
            </div>
            <div class="text">
              {{ checkEffective(item) ? "点击使用" : "已失效" }}
            </div>
            <div></div>
          </div>
          <!-- 半圆 -->
          <div class="circle-bottom"></div>
          <div class="circle-top"></div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  data() {
    return {
      activeTab: "effective",
      list: [],
      category: [
        { key: "effective", title: "有效", list: [] },
        { key: "invalid", title: "失效", list: [] },
      ],
    };
  },
  mounted() {
    this.getPrizeList();
  },
  methods: {
    async getPrizeList() {
      let res = await this.$api.getPrizeList(this.$route.query);
      let effective = res.data.filter((v) => this.checkEffective(v));
      let invalid = res.data.filter((v) => !this.checkEffective(v));
      this.category[0].list = effective;
      this.category[1].list = invalid;
      console.log(res, "中奖记录");
    },
    async use(item) {
      this.$dialog
        .confirm({
          message: "确认使用此优惠券？",
          width: "280",
        })
        .then(async (msg) => {
          console.log(item, "item");
          let res = await this.$api.changeCouponStatus({
            couponid: item.id,
          });
        })
        .catch(() => {});
    },
    // 未使用 未过期 = 有效，其余都属于失效
    // expired_time: "2021-10-28" 失效时间
    // status: 1 是否使用  1 使用  0未使用
    checkEffective(item) {
      let time =
        dayjs(item.expired_time).valueOf() + 24 * 60 * 60 * 1000 - 1000;
      time = dayjs(time).format("YYYY-MM-DD HH:mm:ss");
      return dayjs().isBefore(time) && !item.status ? true : false;
    },
  },
};
</script>
<style lang="less" scoped>
.prize {
  width: 100%;
  height: 100%;
  padding: 0px 40px;
  box-sizing: border-box;
  background-color: #f7f7f7;
}
/deep/ .van-tabs__wrap {
  width: 100%;
  height: 6vh;
  .van-tab {
    font-size: 28px;
    background-color: #f7f7f7;
    .van-tab__text {
      height: 40px;
      font-weight: bold;
      line-height: 40px;
    }
  }
}
/deep/ .van-tabs__content {
  .van-tab__pane {
    height: 94vh;
    padding: 20px 0;
    box-sizing: border-box;
    overflow-y: scroll;
  }
}
.list-item {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 176px;
  margin-bottom: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 14px 0px rgba(129, 126, 122, 0.21);
  .left {
    display: flex;
    align-items: center;
    width: 472px;
    height: 100%;
    background-color: #f7f2ec;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    .left-img {
      width: 120px;
      height: 120px;
      margin-left: 34px;
    }
    .left-rows {
      height: 130px;
      color: #d49f6f;
      font-weight: bold;
      padding: 18px 0 0 34px;
      box-sizing: border-box;
      .row-tip {
        font-size: 28px;
        margin-bottom: 24px;
      }
      .row-date {
        font-size: 24px;
      }
    }
  }
  .circle-top {
    position: absolute;
    top: 0px;
    left: 457px;
    width: 30px;
    height: 15px;
    border-radius: 0px 0px 15px 15px;
    background-color: #f7f7f7;
    box-shadow: inset 0px 0px 10px 4px rgba(226, 224, 222, 0.21);
  }
  .circle-bottom {
    position: absolute;
    bottom: 0px;
    left: 457px;
    width: 30px;
    height: 15px;
    border-radius: 15px 15px 0px 0px;
    background-color: #f7f7f7;
    box-shadow: inset 0px 0px 10px 4px rgba(226, 224, 222, 0.21);
  }
  .right {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100%;

    font-weight: bold;
    text-shadow: 0px 2px 4px rgba(163, 111, 46, 0.49);
    padding: 46px 0 46px 0;
    box-sizing: border-box;

    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    .price {
      margin-bottom: 20px;
      .icon {
        font-size: 24px;
      }
      .number {
        font-size: 34px;
      }
    }
    .text {
      font-size: 24px;
    }
  }
}
.effective {
  color: #fff !important;
  background: linear-gradient(to bottom, #f1d187, #eab464) !important;
}
.invalid {
  color: #939393 !important;
  background-color: #e0e0e0 !important;
}
</style>
