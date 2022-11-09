const app = getApp();
import {
  CartCount,
  OrderLists
} from '../../http/api';
const {
  getFormData,
  orderStatusStr,
  orderStatusColor
} = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: 200,
    active: '',
    activeIndex: 0,
    carNum: '',
    list: [], // 订单列表
    pageIndex: 1,
    pageSize: 10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.lock = false;
    this.getSystemInfo();
  },
  // 获取购物车数量
  async getCartNum() {
    let res = await CartCount();
    if (res.code == 0) {
      this.setData({
        carNum: res.data
      })
    }
  },
  // 获取采购申请单
  async getDataList() {
    if(this.data.noData) return;
    this.lock = true;
    let res = await OrderLists({
      order_status: this.data.active == 0 ? '' : this.data.active,
      page: this.data.pageIndex,
      page_size: this.data.pageSize,
      month: ''
    });
    if (res.code == 0) {
      this.lock = false;
      this.data.pageIndex++;
      let result = [];
      let _result = res.data.list.map(v => Object.assign(v, {
        create_time: getFormData(v.create_time),
        statu_text: orderStatusStr(v.order_status),
        statu_color: orderStatusColor(v.order_status)
      }))
      if (this.data.pageIndex == 2) {
        result = _result;
      } else {
        result = this.data.list;
        result.push(..._result)
      }
      
      this.setData({
        list: result,
        noData: result.length>=res.data.count
      })
    }
  },
  onChange(e) {
    this.setData({
      active: e.detail.name,
      pageIndex: 1,
      noData: false,
      activeIndex: e.detail.index
    })
    app.globalData.tabActive = e.detail.name;
    this.getDataList()
  },
  confirm() {
    this.setData({
      pageIndex: 1,
      noData: false
    })
    this.getDataList()
  },
  getSystemInfo() {
    wx.getSystemInfo({
      success: res => {
        let height = res.windowHeight - 70;
        this.setData({
          height: app.globalData.isIPhoneX ? height - 60 : height,
        });
        console.log(height);
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
    this.getCartNum();
    if (app.globalData.carNum > 0) {
      this.setData({
        carNum: app.globalData.carNum
      })
    }
    this.setData({
      active: app.globalData.tabActive,
      pageIndex: 1,
      noData: false
    })
    this.getDataList()
  },
  // 加载更多
  loadMoreHandler() {
    if(this.lock) return;
    this.getDataList()
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

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
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})