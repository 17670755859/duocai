const app = getApp();
import {
  OrderrefundLists,
  OrderrefundDelivery
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
    active: 'all',
    noData: false,
    pageIndex: 1,
    pageSize: 10,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.lock = false;
    this.setData({
      active: options.status
    })
    this.getSystemInfo();
  },
  // 获取列表
  async getDataList() {
    if(this.data.noData) return;
    this.lock = true;
    let res = await OrderrefundLists({
      refund_status: this.data.active,
      page: this.data.pageIndex,
      page_size: this.data.pageSize
    })
    if (res.code == 0) {
      this.lock = false;
      let result = [];
      this.data.pageIndex++;
      let arr = res.data.list.map(v => Object.assign(v, {
        time: getFormData(v.create_time),
        imgs: v.images ? v.images.split(',') : []
      }))
      if (this.data.pageIndex >= 2) {
        result = arr
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
  // Cexiao
  async confirmReceiving(e) {
    let res = await OrderrefundDelivery({
      order_goods_id: e.detail.order_goods_id
    })
    if (res.code == 0) {
      this.setData({
        noData: false,
        pageIndex: 1
      })
      this.getDataList()
    }
  },
  getSystemInfo() {
    wx.getSystemInfo({
      success: res => {
        let height = res.windowHeight - 50;
        this.setData({
          height: height,
        });

      }
    })
  },
  // 加载更多
  loadMoreHandler() {
    if(this.lock) return;
    this.getDataList();
  },
  // 切换导航栏
  onChange(e) {
    this.pageIndex = 1
    this.setData({
      active: e.detail.name,
      noData: false,
      pageIndex: 1
    });
    this.getDataList()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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