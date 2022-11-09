// subPages/shezhi/index.js
const app = new getApp();
import {
  USERINFO
} from '../../http/const';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    company_name: '',
    address: '',
    permissions: app.globalData.permissions
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = wx.getStorageSync(USERINFO)
    console.log(userInfo)
    var statusbarH = wx.getSystemInfoSync().statusBarHeight;
    let jiaonang = wx.getMenuButtonBoundingClientRect()
    this.setData({
      statusbarH: statusbarH,
      jiaonang: jiaonang.width + 12,
      company_name: userInfo.company_name || '',
      address: userInfo.province + ' ' + userInfo.city + ' ' + userInfo.district + ' ' + userInfo.address
    });
  },
  naviBack() {
    wx.navigateBack({
      delta: 1,
    })
  },
  // 开票信息
  toKaipiao() {
    wx.navigateTo({
      url: '/subPages/kaipiaoxinxixiugai/index',
    })
  },

  // 账户安全
  toAccount() {
    wx.navigateTo({
      url: '/subPages/zhanghuanquan/index',
    })
  },

  // 职务设置
  toZhiwushezhi() {
    wx.navigateTo({
      url: '/subPages/zhiwushezhi/index',
    })
  },

  // 部门设置
  toBumen() {
    wx.navigateTo({
      url: '/subPages/bumenshezhi/index',
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