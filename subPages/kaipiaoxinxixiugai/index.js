// subPages/kaipiaoxinxi/index.js
const app = new getApp();
import { CompanyEdit, MemberInfo } from '../../http/api';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    make_company: '', // 单位名称 发票用的
    make_duty: '', // 公司税号
    make_address: '', //开票地址
    make_phone: '', //开票 -电话
    make_bank: '', //开户行
    make_number: '', //开票-账号 银行卡
    make_title: '', // 抬头
    rule: {
      make_company: '',
      make_duty: '',
      make_address: '',
      make_phone: '',
      make_bank: '',
      make_number: '',
      make_title: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.time = null;
    var statusbarH = wx.getSystemInfoSync().statusBarHeight;
    let jiaonang = wx.getMenuButtonBoundingClientRect()
    this.setData({
      statusbarH: statusbarH,
      jiaonang: jiaonang.width + 12,
    });
    this.getUserInfo();
  },
  naviBack() {
    wx.navigateBack({
      delta: 0,
    })
  },
  showToast(msg) {
    wx.showToast({
      title: msg,
      icon: 'none'
    })
  },
  inputBlur: function (t) {
    this.setData({
      [t.currentTarget.dataset.name]: t.detail.replace(/\s*/g,"")
    });
  },
  // 获取用户详情
  async getUserInfo() {
    let res = await MemberInfo();
    if (res.code == 0) {
      let _r = {
        make_company: res.data.make_company,
        make_duty: res.data.make_duty,
        make_address: res.data.make_address,
        make_phone: res.data.make_phone,
        make_bank: res.data.make_bank,
        make_number: res.data.make_number,
        make_title: res.data.make_title
      }
      this.setData({
        ..._r,
        rule: _r
      });
    }
  },
  async submitHandler() {
    if(!this.data.make_company) {
      this.showToast('请输入单位名称')
      return;
    }
    if(!this.data.make_duty) {
      this.showToast('请输入公司税号')
      return;
    }
    if(!this.data.make_address) {
      this.showToast('请输入地址')
      return;
    }
    if(!this.data.make_phone) {
      this.showToast('请输入电话')
      return;
    }
    if(!this.data.make_bank) {
      this.showToast('请输入开户行')
      return;
    }
    if(!this.data.make_number) {
      this.showToast('请输入账号')
      return;
    }
    if(!this.data.make_title) {
      this.showToast('请输入发票抬头')
      return;
    }
    
    let index = -1;
    for(let i in this.data.rule) {
      if(this.data[i] !== this.data.rule[i]) {
        index = 1
        break;
      }
    }
    if (index == -1) {
      wx.navigateBack({
        delta: 0,
      })
      return;
    }
    let res = await CompanyEdit({
      company_id: app.globalData.userInfo.company_id,
      make_company: this.data.make_company,
      make_duty: this.data.make_duty,
      make_address: this.data.make_address,
      make_phone: this.data.make_phone,
      make_bank: this.data.make_bank,
      make_number: this.data.make_number,
      make_title: this.data.make_title
    });
    if (res.code == 0) {
      wx.showToast({
        title: '提交成功',
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
    this.time = null;
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