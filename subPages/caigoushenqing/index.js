// subPages/caigoushenqing/index.js
import { OrdercreatePayment, OrdercreateCreate } from '../../http/api';
const { APPTYPE, BASE_URL, USERINFO } = require('../../http/const');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: BASE_URL,
    cart_ids: '',
    address: {},
    member_account: {},
    goodList: [],
    shen_remark: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userinfo = wx.getStorageSync(USERINFO);
    var statusbarH = wx.getSystemInfoSync().statusBarHeight;
    let jiaonang = wx.getMenuButtonBoundingClientRect()
    this.setData({
      statusbarH: statusbarH,
      jiaonang: jiaonang.width + 12,
      titleWidth:wx.getSystemInfoSync().windowWidth-jiaonang.width-12,
      cart_ids: options.ids
    });
    this.getData();
  },
  // 获取采购订单详情
  async getData() {
    let res = await OrdercreatePayment({
      app_type_name: APPTYPE,
      cart_ids: this.data.cart_ids,
      type: ''
    });
    if (res.code == 0) {
      this.setData({
        address: res.data.address,
        member_account: res.data.member_account,
        goodList: res.data.shop_goods_list.goods_list,
        shop_goods_list: res.data.shop_goods_list,
        cart_ids: res.data.cart_ids
      })
    }
  },
  // 提交采购订单
  async toXiugai() {
    let res = await OrdercreateCreate({
      app_type_name: APPTYPE,
      shen_remark: this.data.shen_remark,
      cart_ids: this.data.cart_ids,
      cai_type: ''
    });
    if (res.code == 0) {
      wx.reLaunch({
        url: '/subPages/tijiaochenggong/index',
      })
    }
  },
  inputBlur: function (t) {
    this.setData({
      [t.currentTarget.dataset.name]: t.detail.value
    });
  },
  naviBack(){
    wx.navigateBack({
      delta: 1,
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