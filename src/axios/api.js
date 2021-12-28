import axios from './index.js'

export default {
    async post(data) {
        return await axios({
            url: ``,
            method: 'post',
            data,
        })
    },
    // 获取活动详情
    // uid [用户id-必传] activityid[活动id-必传] uid:18a1aauc9  activityid:d5721049
    async getDetails(params) {
        return await axios({
            url: `/Activity/activityList`,
            method: 'get',
            params
        })
    },
    // 发送中奖记录
    //  sendResult username [用户名称-必传] activityid[活动id-必传] lottery[中奖信息-必传]
    async sendResult(data) {
        return await axios({
            url: `/Activity/lottery`,
            method: 'post',
            data
        })
    },
    // 获取抽奖列表
    // username [用户名称-必传]
    async getPrizeList(data) {
        return await axios({
            url: `/Activity/lotteryList`,
            method: 'post',
            data
        })
    },
    // 验证是否能继续抽奖
    // username [用户名称-必传] activityid [活动id-必传]
    async checkPrizeCount(data) {
        return await axios({
            url: `/Activity/verify`,
            method: 'post',
            data
        })
    },
    // 修改优惠券状态
    async changeCouponStatus(data) {
        return await axios({
            url: `/Activity/UseACoupon`,
            method: 'post',
            data
        })
    },
    
    // 获取用户信息
    async getUserInfo(data) {
        return await axios({
            url: `/Activity/getUserInfo`,
            method: 'post',
            data
        })
    },
}