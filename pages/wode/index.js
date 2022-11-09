import {
  USERINFO
} from "../../http/const";
import {
  MemberInfo,
  CartCount,
  OrderNum,
  CompanyGetPeople
} from '../../http/api';

// pages/wode/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    mounth: '',
    hasPhone: false,
    isLogin: false,
    carNum: 0, // 购物车数量
    peopleNum: 0, // 我的小队人数
    orderNums: {
      '0': 0,
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0,
      '6': 0,
      '7': 0,
      '8': 0,
      '10': 0,
      '11': 0,
      '-1': 0
    },
    permissions: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let ct = new Date();
    this.setData({
      mounth: ct.getMonth()+1,
      hasPhone: app.globalData.hasPhone,
      isLogin: app.globalData.checkLogin
    })
  },
  // 获取我的小队
  async getMyPeopleNum() {
    let res = await CompanyGetPeople();
    if (res.code == 0) {
      this.setData({
        peopleNum: res.data.length
      })
    }
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
  // 获取订单数量
  async getOrderNum() {
    let res = await OrderNum({
      order_status: '0,1,2,3,4,5,77,7,8,10,11,-1'
    });
    if (res.code == 0) {
      let arrs = this.data.orderNums;
      for (let i in res.data) {
        arrs[i] = res.data[i]
      }
      this.setData({
        orderNums: arrs
      })
    }
  },
  // 获取用户详情
  async getUserInfo() {
    let res = await MemberInfo();
    if (res.code == 0 && res.data.mobile) {
      app.globalData.hasPhone = true;
      app.globalData.checkLogin = true;
      wx.setStorageSync(USERINFO, res.data)
      let permission = [];
      for(let i = 0; i < res.data.user_permission.length; i++) {
        for(let j = 0; j < res.data.user_permission[i].permission.length; j++) {
          permission.push(res.data.user_permission[i].permission[j].permission)
        }
      }
      let _permission = [...new Set(permission)]
      this.setData({
        hasPhone: app.globalData.hasPhone,
        isLogin: app.globalData.checkLogin,
        userInfo: res.data,
        permissions: _permission
      });
      app.globalData.permissions = _permission
      this.getCartNum();
      this.getOrderNum();
      this.getMyPeopleNum()
    }
  },
  //待审核
  toDaiShenPi() {
    wx.navigateTo({
      url: '/subPages/daishenpi/index',
    })
  },
  //待下单
  toDaixiadan() {
    wx.navigateTo({
      url: '/subPages/daixiadan/index',
    })
  },
  //待收货
  toDaishouhuo(e) {
    let status = e.currentTarget.dataset.status;
    wx.navigateTo({
      url: '/subPages/daishouhuo/index?status=' + status,
    })
  },
  //退换货
  toTuihuanhuo() {
    wx.navigateTo({
      url: '/subPages/lishijilu/index?status=1',
    })
  },

  // 登录
  toLogin() {
    wx.navigateTo({
      url: '/subPages/login/index',
    })
  },
  // 企业认证
  toQiyerenzheng() {
    wx.navigateTo({
      url: '/subPages/qiyerenzhengliucheng/index',
    })
  },

  // 申请体验
  toShenqingtiyan() {
    wx.navigateTo({
      url: '/subPages/shenqingtiyan/index',
    })
  },

  // 设置
  toSetting() {
    wx.navigateTo({
      url: '/subPages/shezhi/index',
    })
  },

  // 我的小队
  toMyTeam() {
    wx.navigateTo({
      url: '/subPages/wodexiaodui/index',
    })
  },

  // 我的收藏
  toShoucang() {
    wx.navigateTo({
      url: '/subPages/wodeshoucang/index',
    })
  },
  //帮我代采
  toDaicai() {
    wx.navigateTo({
      url: '/subPages/bangwodaicai/index',
    })
  },
  // 采购申请
  toCaigoushenqing(e) {
    app.globalData.tabActive = e.currentTarget.dataset.status;
    wx.switchTab({
      url: `/pages/caigoushenqing/index`,
    })
  },
  // 对账单
  toDZD() {
    wx.navigateTo({
      url: '/subPages/duizhangdan/index',
    })
  },
  //采购月报
  toCgyb() {
    wx.navigateTo({
      url: '/thirdPages/caigouyuebao/index',
    })
  },
  //采购统计
  toCaigoutongji() {
    wx.navigateTo({
      url: '/thirdPages/caigoutongji/index',
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
    if (app.globalData.hasPhone) {
      this.getUserInfo();
    } else {
      this.setData({
        checkLogin: false
      })
    }
    if (app.globalData.carNum > 0) {
      this.setData({
        carNum: app.globalData.carNum
      })
    }
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