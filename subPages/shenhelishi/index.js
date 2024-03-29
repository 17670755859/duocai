const app = getApp();
import {
  OrderLists
} from '../../http/api';
Page({

  /**
   * 页面的初始数据
   */
  data: {

    height: 200,
    hasMore: true,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSystemInfo();
    this.getDataList();
  },
  getSystemInfo() {
    wx.getSystemInfo({
      success: res => {
        console.log(res.windowHeight)
        let height = res.windowHeight - 50;
        this.setData({
          height: height,
        });
        console.log(height);

      }
    })
  },
  // 获取待审核列表
  async getDataList() {
    if (!this.data.hasMore) return;
    let res = await OrderLists({
      order_status: '7,8',
      month: '',
      page: this.data.pageIndex,
      page_size: this.data.pageSize
    });
    if (res.code == 0) {
      let list = this.data.list;
      let result = res.data.list.map(v => Object.assign(v, {
        time: getFormData(v.create_time)
      }))
      list.push(...result)
      this.setData({
        list: list,
        hasMore: list.length < res.data.count
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