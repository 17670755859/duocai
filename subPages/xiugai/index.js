// subPages/xiugai/index.js
const app = getApp();
import { OrderDetail, CartEditNumbs, OrdercreateEditnums } from '../../http/api';
import { BASE_URL } from '../../http/const';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    url: BASE_URL,
    isIPhoneX: app.globalData.isIPhoneX,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDataList(options.id)
  },
  async getDataList(id) {
    let res = await OrderDetail({
      order_id: id
    });
    if(res.code == 0) {
      this.setData({
        list: res.data.order_goods
      })
    }
  },
  // 提交
  async confirm() {
    let arr = []
    for(let i = 0; i < this.data.list.length; i++) {
      arr.push({id: this.data.list[i].order_goods_id, num: this.data.list[i].num})
    }
    let res = await OrdercreateEditnums({
      order_goods: arr
    });
    if(res.code == 0) {
      wx.navigateBack({
        delta: 1,
      })
    }
  },
  onChange(e) {
    let list = this.data.list;
    list[e.currentTarget.dataset.index].num = e.detail
    list = JSON.parse(JSON.stringify(list));
    this.setData({
      list: list
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