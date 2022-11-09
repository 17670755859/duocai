// subPages/login/index.js
const app = getApp();
import {
  Login
} from '../../http/api';
import {
  TOKEN
} from '../../http/const';
import {
  validPhone
} from '../../utils/validate';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputType: 'password',
    statusbarH: '',
    username: '', // 手机号
    password: '' // 密码
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
  //返回上一页
  navigateBack() {
    wx.navigateBack({
      delta: 1
    })
  },
  showPasType() {
    this.setData({
      inputType: this.data.inputType == 'password' ? 'text' : 'password'
    })
  },
  async toConfirm() {
    if (!this.data.username) {
      wx.showToast({
        title: '请输入手机号！',
        icon: 'none'
      })
      return;
    }
    if (!validPhone(this.data.username)) {
      wx.showToast({
        title: '手机格式错误！',
        icon: 'none'
      })
      return;
    }
    if (!this.data.password) {
      wx.showToast({
        title: '请输入密码！',
        icon: 'none'
      })
      return;
    }
    let res = await Login({
      username: this.data.username,
      password: this.data.password
    })
    if (res.code == 0) {
      wx.setStorageSync(TOKEN, res.data.token);
      wx.reLaunch({
        url: '/pages/index/index',
      })
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

  },
  inputBlur: function (t) {
    this.setData({
      [t.currentTarget.dataset.name]: t.detail.value.replace(/\s*/g, "")
    });
  }
})