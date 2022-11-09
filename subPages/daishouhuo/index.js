const app = getApp();
import {
  OrderLists,
  OrderTakeDelivery
} from '../../http/api';
import {
  getFormData
} from '../../utils/util';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    height: 200,
    active: '66',
    list: [],
    pageIndex: 1,
    pageSize: 10,
    noData: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      active: options.status
    })
    this.getSystemInfo();
  },
  getSystemInfo() {
    wx.getSystemInfo({
      success: res => {
        console.log(res.windowHeight)
        let height = res.windowHeight - 50;
        this.setData({
          height: height,
        });
      }
    })
  },

  // 获取数据列表
  async getDataList() {
    if(this.data.noData) return;
    this.lock = true
    let res = await OrderLists({
      order_status: this.data.active,
      page: this.data.pageIndex,
      page_size: this.data.pageSize,
      month: ''
    });
    if (res.code == 0) {
      this.lock = false;
      this.data.pageIndex++;
      let result = [];
      let arr = res.data.list.map(v => Object.assign(v, {
        time: getFormData(v.create_time)
      }))
      if(this.data.pageIndex == 2) {
        result = arr;
      } else {
        result = this.data.list;
        result.push(...arr)
      }
      this.setData({
        list: result,
        noData: result.length >= res.data.count
      })
    }
  },

  // 切换导航栏
  onChange(e) {
    this.setData({
      active: e.detail.name,
      pageIndex: 1,
      noData: false
    });
    this.getDataList()
  },

  // 确定收货
  confirmReceiving(e) {
    let that = this;
    wx.showModal({
      title: '提示',
      content: '是否确定收货？',
      success(res) {
        if (res.confirm) {
          that.orderTakeDelivery(e.detail)
        } else if (res.cancel) {}
      }
    })
  },
  // 加载更多
  loadMoreHandler() {
    if(this.lock) return;
    this.getDataList();
  },
  // 确定收货请求接口
  async orderTakeDelivery(id) {
    let res = await OrderTakeDelivery({
      order_id: id
    });
    if (res.code == 0) {
      this.setData({
        pageIndex: 1,
        noData: false
      })
      this.getDataList();
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