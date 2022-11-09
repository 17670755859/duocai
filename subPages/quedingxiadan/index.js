// subPages/quedingxiadan/index.js
const app = getApp();
import { CompanyGetinfo, OrderOrderPayDetail, OrderOrderPay } from '../../http/api';
import { BASE_URL } from '../../http/const';
import { getFormData } from '../../utils/util';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: BASE_URL,
    radio: '1', // 采购方式
    paymode: '', //支付方式
    activeNames: '', //开票方式
    isIPhoneX: app.globalData.isIPhoneX,
    order_id: '',
    userInfo: {},
    remark: '',
    result: {},
    order_goods: [],
    allMoney: 0, // 总费用
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let images = options.images ? JSON.parse(options.images) : [];
    let id = options.id || '';
    let _imgs = []
    for(let i = 0; i < images.length; i++) {
      if (i<4) {
        _imgs.push(images[i])
      }
    }
    this.setData({
      images: _imgs,
      order_id: id,
      totalNum: images.length,
      totalMoney: options.totalMoney
    });
    this.getOrderInfo();
    this.getUserInfo()
  },
  inputBlur: function (t) {
    this.setData({
      [t.currentTarget.dataset.name]: t.detail.value.replace(/\s*/g,"")
    });
  },
  onRadioChange(event) {
    this.setData({
      radio: event.detail
    });
    this.getOrderInfo();
  },
  // 得到企业部门信息
  async getUserInfo() {
    let res = await CompanyGetinfo({
      company_id: app.globalData.userInfo.company_id
    });
    if (res.code == 0) {
      this.setData({
        userInfo: res.data
      })
    }
  },
  async getOrderInfo() {
    let res = await OrderOrderPayDetail({
      order_id: this.data.order_id,
      type: this.data.radio
    });
    if (res.code == 0) {
      res.data.time = getFormData(res.data.create_time)
      this.setData({
        result: res.data,
        allMoney: parseFloat(res.data.order_money),
        order_goods: res.data.order_goods
      })
    }
  },
  // 支付方式选择
  onPayModeChange(event) {
    this.setData({
      paymode: event.detail,
    });
  },
  // 开票方式
  onBillingChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },
  //支付
  async toPay() {
    if (!this.data.radio) {
      wx.showToast({
        title: '请选择配送方式',
        icon: 'none'
      })
      return;
    }
    if (!this.data.paymode) {
      wx.showToast({
        title: '请选择支付方式',
        icon: 'none'
      })
      return;
    }
    let res = await OrderOrderPay({
      order_id: this.data.order_id,
      type: this.data.radio,
      pay_type: this.data.paymode,
      cai_remark: this.data.cai_remark,
      you_remark: this.data.you_remark,
      jd_remark: this.data.jd_remark
    })
    if(res.code == 0) {
      if (this.data.paymode == 1) {
        wx.reLaunch({
          url: `/subPages/weixinzhifu/index?money=${this.data.allMoney}&id=${this.data.order_id}`,
        })
      } else {
        wx.reLaunch({
          url: `/subPages/xianxiazhifu/index?id=${this.data.order_id}`,
        })
      }
    } else {
      wx.showToast({
        title: res.data,
        icon: 'none'
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

  }
})