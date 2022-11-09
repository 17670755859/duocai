// subPages/bumenshezhi/index.js
const app = new getApp();
import { DepartmentGetDepartmentTree, CompanyDelteDepartment } from '../../http/api';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    company_id: '',
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      company_id: app.globalData.userInfo.company_id
    })
  },
  // 删除部门
  async deleteHandler(e) {
    let id = e.currentTarget.dataset.id;
    let res = await CompanyDelteDepartment({
      department_id: id
    });
    if (res.code == 0) {
      this.getDataList()
    }
  },
  // 修改部门
  modifyHandler(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/subPages/xiugaibumen/index?id=${id}`,
    })
  },
  // 获取所有部门 
  async getDataList() {
    let res = await DepartmentGetDepartmentTree({
      company_id: this.data.company_id
    });
    if (res.code == 0) {
      this.setData({
        list: res.data
      })
    }
  },

  //新增部门
  toAdddept() {
    wx.navigateTo({
      url: '/subPages/xinzengbumen/index',
    })
  },

  // 查看子部门
  toZibumen(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/subPages/zibumenshezhi/index?id=${id}`
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
    this.getDataList()
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