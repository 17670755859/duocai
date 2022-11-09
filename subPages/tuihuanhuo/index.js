// subPages/tuihuanhuo/index.js
import {
  OrderrefundLists
} from '../../http/api';
import {
  BASE_URL
} from '../../http/const';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: 200,
    url: BASE_URL,
    pageIndex: 1,
    pageSize: 10,
    noData: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.lock = false;
    this.getSystemInfo();
    this.getDataList();
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
  async getDataList() {
    if(this.data.noData) return;
    this.lock = true;
    let res = await OrderrefundLists({
      page: this.data.pageIndex,
      page_size: this.data.pageSize
    });
    if (res.code == 0) {
      this.lock = false;
      this.data.pageIndex++;
      let list = [];
      if(this.data.pageIndex == 2) {
        list = res.data.list;
      } else {
        list = this.data.list;
        list.push(...res.data.list)
      }
      this.setData({
        list: list,
        noData: list.length >= res.data.count
      })
    }
  },
  toDetail(e) {
    wx.navigateTo({
      url: `/subPages/tuihuanhuoxiangqing/index?id=${e.currentTarget.dataset.id}`
    })
  },
  toLishijilu() {
    wx.navigateTo({
      url: '/subPages/lishijilu/index?status=1',
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
    if(this.lock) return;
    this.getDataList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})