const app=getApp();
import { OrderDetail } from '../../http/api';
import { BASE_URL } from '../../http/const';
import { getFormData } from '../../utils/util';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: BASE_URL,
    isIPhoneX:app.globalData.isIPhoneX,
    order_id: '', // 订单id
    list: [],
    result: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var statusbarH = wx.getSystemInfoSync().statusBarHeight;
    let jiaonang = wx.getMenuButtonBoundingClientRect()
    this.setData({
      order_id: options.id,
      statusbarH: statusbarH,
      jiaonang: jiaonang.width + 12,
      titleWidth: wx.getSystemInfoSync().windowWidth - jiaonang.width - 12,
      status:options.status
    });
    this.getOrderInfo()
  },
  // 获取订单详情
  async getOrderInfo() {
    let res = await OrderDetail({
      order_id: this.data.order_id
    });
    if (res.code == 0) {
      res.data.time = getFormData(res.data.create_time)
      this.setData({
        result: res.data,
        list: res.data.order_goods
      })
    }
  },
  // 申请退换货
  toTuihuo(e) {
    let index = e.currentTarget.dataset.index;
    let type = e.currentTarget.dataset.type;
    let goods = JSON.stringify(this.data.list[index]) || {}
    wx.navigateTo({
      url: `/subPages/shenqingtuihuo/index?goods=${goods}&type=${type}`
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  naviBack() {
    wx.navigateBack({
      delta: 0,
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    
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