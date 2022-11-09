// subPages/wodexiaodui/index.js
import { CompanyGetPeople, MemberQiyong, MemberJinyong } from '../../http/api';
import { BASE_URL } from '../../http/const';
const app=getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
      url: BASE_URL,
      peopleNum: 0,
      list: [],
      isIPhoneX:app.globalData.isIPhoneX
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      
    },
    async getDataList() {
      let res = await CompanyGetPeople();
      if (res.code == 0) {
        this.setData({
          list: res.data,
          peopleNum: res.data.length
        })
      }
    },
    // 启用 禁止
    async setUser(e) {
      let status = e.currentTarget.dataset.status;
      let id = e.currentTarget.dataset.id;
      if (status == 0) {
        this.enable(id)
      } else {
        this.disable(id)
      }
    },
    // 启用
    async enable(id) {
      let  res = await MemberQiyong({
        member_id: id
      })
      if (res.code == 0) {
        this.getDataList()
      }
    },
    // 禁用
    async disable(id) {
      let  res = await MemberJinyong({
        member_id: id
      })
      if (res.code == 0) {
        this.getDataList()
      }
    },
    toAdd(){
      wx.navigateTo({
        url: '/subPages/tianjiarenyuan/index',
      })
    },
    toEdit(e){
      let id = e.currentTarget.dataset.id || '';
      wx.navigateTo({
        url: `/subPages/tianjiarenyuan/index?id=${id}`,
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
      this.getDataList();
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