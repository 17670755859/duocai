// subPages/selectbumen/index.js
const app = new getApp();
import { DepartmentGetDepartmentTree } from '../../http/api';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mainActiveIndex: 0,
    activeId: null,
    id: '',
    name: '',
    items: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
  },
  async getDataList() {
    let res = await DepartmentGetDepartmentTree({
      company_id: app.globalData.userInfo.company_id
    });
    if (res.code == 0) {
      this.setData({
        items: res.data
      })
    }
  },
  goAddBumen() {
    wx.navigateTo({
      url: '/subPages/bumenshezhi/index',
    })
  },
  onClickNav({ detail = {} }) {
    this.setData({
      mainActiveIndex: detail.index || 0,
      id: this.data.items[detail.index].id,
      name: this.data.items[detail.index].name
    });
  },

  onClickItem({ detail = {} }) {
    const activeId = this.data.activeId === detail.id ? null : detail.id;

    this.setData({ 
      activeId: activeId,
      id: detail.id,
      name: detail.name
     });
  },
  toConfirm() {
    if (!this.data.id) {
      wx.showToast({
        title: '请选择上级部门',
        icon: 'none'
      })
      return;
    }
    wx.setStorageSync('department_pid', {id: this.data.id, name: this.data.name})
    wx.navigateBack({
      delta: 0,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getDataList()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})