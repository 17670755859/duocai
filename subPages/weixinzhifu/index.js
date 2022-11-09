// subPages/weixinzhifu/index.js
import {
  StatistaticsIndex
} from '../../http/api';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_id: '',
    allMoney: 0,
    reserved_money: 0,
    shengyu_money: 0,
    sum_money: 0,
    cai_money: 0,
    year_sum_jian: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let ct = new Date();
    this.setData({
      order_id: options.id,
      mounth: ct.getMonth()+1,
      allMoney: options.money
    })
    this.getHome()
  },
  // 获取首页数据
  async getHome() {
    let res = await StatistaticsIndex();
    if (res.code == 0) {
      this.setData({
        reserved_money: res.data.reserved_money,
        sum_money: res.data.sum_money,
        cai_money: res.data.cai_money,
        shengyu_money: res.data.shengyu_money,
        year_sum_jian: res.data.year_sum_jian
      })
    }
  },
  seeOrder() {
    wx.navigateTo({
      url: '/subPages/shouhuoxiangqing/index?id=' + this.data.order_id,
    });
  },
  continueOrder() {
    wx.switchTab({
      url: '/pages/daicai/index'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})