// subPages/kaipiaoxinxi/index.js
import { MemberInfo } from '../../http/api';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    make_company: '',
    make_duty: '',
    make_address: '',
    make_phone: '',
    make_bank: '',
    make_number: '',
    make_title: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var statusbarH = wx.getSystemInfoSync().statusBarHeight;
    let jiaonang = wx.getMenuButtonBoundingClientRect()
    this.setData({
      statusbarH: statusbarH,
      jiaonang: jiaonang.width + 12,
    });
  },
  naviBack() {
    wx.navigateBack({
      delta: 0,
    })
  },
  xiugai() {
    wx.navigateTo({
      url: '/subPages/kaipiaoxinxixiugai/index',
    })
  },
  // 获取用户详情
  async getUserInfo() {
    let res = await MemberInfo();
    if (res.code == 0) {
      this.setData({
        make_company: res.data.make_company,
        make_duty: res.data.make_duty,
        make_address: res.data.make_address,
        make_phone: res.data.make_phone,
        make_bank: res.data.make_bank,
        make_number: res.data.make_number,
        make_title: res.data.make_title
      });
    }
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
    this.getUserInfo()
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