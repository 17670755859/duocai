// subPages/caigoushenqing/index.js
const app = getApp();
import { OrderDetail, OrderSetAuditBack } from '../../http/api';
import { BASE_URL } from '../../http/const';
import { getFormData, orderStatusStr } from '../../utils/util';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: BASE_URL,
    show_cx: false,
    order_id: '',
    statusbarH: '',
    jiaonang: '',
    isIPhoneX: app.globalData.isIPhoneX,
    show: false, //查看原由弹窗
    goods: {},
    list: []
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
      titleWidth: wx.getSystemInfoSync().windowWidth - jiaonang.width - 12
    });
    this.getData()
  },
  // 撤销
  async revokeHandler(e) {
    let res = await OrderSetAuditBack({
      order_id: this.data.order_id
    });
    if(res.code == 0) {
      this.setData({
        show_cx: false
      })
      this.getData();
    }
  },
  async getData() {
    let res = await OrderDetail({
      order_id: this.data.order_id
    });
    if(res.code == 0) {
      let result = res.data;
      result.create_time = getFormData(res.data.create_time);
      result.goods_status_text = orderStatusStr(res.data.order_status)
      this.setData({
        goods: result,
        list: res.data.order_goods
      })
    }
  },
  naviBack() {
    wx.navigateBack({
      delta: 1,
    })
  },
  //撤销操作
  toChexiao() {
    this.setData({
      show_cx: true
    })
  },
  //修改
  toXiugai() {
    wx.navigateTo({
      url: `/subPages/xiugai/index?id=${this.data.order_id}`,
    })
  },
  // 打开查看原由弹窗
  showCKYY() {
    this.setData({
      show: true
    })
  },
  // 关闭查看原由弹窗
  onClose() {
    this.setData({
      show: false
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