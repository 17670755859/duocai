// subPages/xiugaimima/index.js
const app = new getApp();
import {
  MemberModifypassword
} from '../../http/api';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    inputType: 'password',
    old_password: '',
    new_password: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      phone: app.globalData.userInfo.mobile
    })
    this.time = null
  },
  showPasType() {
    this.setData({
      inputType: this.data.inputType == 'password' ? 'text' : 'password'
    })
  },
  inputBlur: function (t) {
    this.setData({
      [t.currentTarget.dataset.name]: t.detail.value.replace(/\s*/g,"")
    });
  },
  cancel() {
    wx.navigateBack({
      delta: 1
    })
  },
  async submitHandler() {
    if (!this.data.old_password) {
      wx.showToast({
        title: '请输入旧密码',
        icon: 'none'
      })
      return;
    }
    if (!this.data.new_password) {
      wx.showToast({
        title: '请输入新密码',
        icon: 'none'
      })
      return;
    }
    let res = await MemberModifypassword({
      old_password: this.data.old_password,
      new_password: this.data.new_password
    });
    if (res.code == 0) {
      wx.showToast({
        title: '修改成功',
        icon: 'none'
      })
      this.time = setTimeout(() => {
        wx.navigateBack({
          delta: 0,
        })
      }, 800);
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
    clearTimeout(this.time);
    this.time = null
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