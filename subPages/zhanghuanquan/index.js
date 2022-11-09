// subPages/zhanghuanquan/index.js
const app = new getApp();
import { uploadFile } from '../../http/uploadFile';
import { MemberInfo, MemberModifyheadimg } from '../../http/api';
import { BASE_URL, TOKEN, PHONE, USERINFO, NAME } from '../../http/const';
Page({
    /**
     * 页面的初始数据
     */
    data: {
      headImg: '',
      userInfo: {},
      role: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.getUserInfo();
    },
    async loginOutHandler() {
      wx.setStorageSync(TOKEN, '');
      wx.setStorageSync(NAME, '');
      wx.setStorageSync(PHONE, '');
      wx.setStorageSync(USERINFO, '');
      app.globalData.hasPhone = false;
      app.globalData.checkLogin = false;
      app.globalData.tabActive= '';
      app.globalData.dcActive= 0;
      app.globalData.carNum = 0;
      app.globalData.userInfo = {};
      app.globalData.permissions = [];
      wx.reLaunch({
        url: '/pages/login/index'
      })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    // 获取用户详情
    async getUserInfo() {
      let res = await MemberInfo();
      if (res.code == 0) {
        this.setData({
          userInfo: res.data,
          headimg: res.data.headimg,
          role: res.data.user_permission
        })
      }
    },
    // 修改头像
    async chooseImage(e){
      let that = this
      wx.chooseMedia({
        count: 1,
        mediaType: ['image'],
        sourceType: ['album', 'camera'],
        async success (res) {
          const tempFilePaths = res.tempFiles[0].tempFilePath
          let result = await uploadFile(tempFilePaths)
          if (result.code == 10067) {
            let img = BASE_URL + result.data.pic_path;
            that.setData({
              headImg: img
            });
            that.setAvatorImg(img)
          }
        }
      })
    },
    // 修改用户头像
    async setAvatorImg(url) {
      let res = await MemberModifyheadimg({headimg: url});
      if (res.code == 0) {
        wx.showToast({
          title: '修改成功',
          icon: 'none'
        })
      }
    },
    // 修改密码
    xiugaimima(){
      wx.navigateTo({
        url: '/subPages/xiugaimima/index',
      })
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