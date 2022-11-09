// index.js
// 获取应用实例
const app = getApp()
import { CartCount, OrderLists, StatistaticsIndex, SiteGetBanners, GoodsDefaultSearchWords, MemberInfo } from '../../http/api';
import { BASE_URL,PHONE,USERINFO } from '../../http/const';
import { getFormData, orderStatusStr } from '../../utils/util';
Page({
  data: {
    url: BASE_URL,
    statusbarH: '',
    userInfo: {},
    keyword:'', //关键词
    isIphoneX:false,
    carNum: 0,
    banners: [], // 轮播
    list: [], // 采购需求列表

    mounth: null, // 当前月份
    reserved_money: 0,
    sum_money: 0,
    cai_money: 0,
    year_sum_jian: 0,
    shengyu_money: 0,

    permissions: []
  },

  toGoodsDetail(){
    wx.navigateTo({
      url: '/subPages/goodsDetail/index',
    })
  },

  // 得到搜索关键字
  async getKeyWord() {
    let res = await GoodsDefaultSearchWords();
    if(res.code == 0) {
      this.setData({
        keyword: res.data.words
      })
    }
  },
  // 获取购物车数量
  async getCartNum() {
    let res = await CartCount();
    if(res.code == 0) {
      this.setData({
        carNum: res.data
      })
    }
  },

  //搜索
  toSearch(){
    wx.navigateTo({
      url: '/subPages/search/index',
    })
  },

  // 采购申请
  toCaigoushenqing(e){
    console.log(e.currentTarget.dataset.id)
      wx.navigateTo({
        url: `/subPages/dingdanxiangqing/index?id=${e.currentTarget.dataset.id}`,
      })
  },
  
  // 对账单
  toDuizhangdan(){
    wx.navigateTo({
      url: '/subPages/duizhangdan/index',
    })
  },

  // 采购月报
  toCaigouyuebao(){
    wx.navigateTo({
      url: '/thirdPages/caigouyuebao/index',
    })
  },
  // 获取轮播图
  async getBanners() {
    let res = await SiteGetBanners();
    if (res.code == 0) {
      this.setData({
        banners: res.data.value
      })
    }
  },
  // 获取订单
  async getDataList() {
    let res = await OrderLists({
      order_status: 5,
      page: 1,
      page_size: 5,
      month: ''
    });
    if (res.code == 0) {
      let result = res.data.list;
      for(let i = 0; i < result.length; i++) {
        result[i].status_text = orderStatusStr(result[i].order_status);
        result[i].time = getFormData(result[i].create_time)
      }
      this.setData({
        list: result
      })
    }
  },
   // 获取用户信息
   async memberInfo() {
    let res = await MemberInfo();
    if (res.code == 0 && res.data.mobile) {
      wx.setStorageSync(PHONE, res.data.mobile);
      wx.setStorageSync(USERINFO, res.data);
      app.globalData.hasPhone = true;
      app.globalData.checkLogin = true;
      app.globalData.userInfo = res.data;
      let permission = [];
      for(let i = 0; i < res.data.user_permission.length; i++) {
        for(let j = 0; j < res.data.user_permission[i].permission.length; j++) {
          permission.push(res.data.user_permission[i].permission[j].permission)
        }
      }
      let _permission = [...new Set(permission)]
      app.globalData.permissions = _permission
      this.setData({
        userInfo: res.data,
        permissions: _permission
      })
      this.getCartNum();
      this.getDataList();
      this.getHome();
    }
  },
  // 获取首页数据
  async getHome() {
    let res = await StatistaticsIndex();
    if (res.code == 0) {
      this.setData({
        reserved_money: res.data.reserved_money,
        sum_money: res.data.sum_money,
        cai_money: res.data.cai_money,
        year_sum_jian: res.data.year_sum_jian,
        shengyu_money: res.data.shengyu_money
      })
    }
  },
  onReady() {
    var statusbarH = wx.getSystemInfoSync().statusBarHeight;
    let jiaonang = wx.getMenuButtonBoundingClientRect()
    this.setData({
      statusbarH: statusbarH,
      jiaonang: jiaonang.width + 12
    });
  },
  onShareAppMessage(e) {

  },
  onShow() {
    if(app.globalData.hasPhone) {
      this.getDataList();
      this.getCartNum();
    }
  },
  // 
  toDaiCai(e) {
    let type = e.currentTarget.dataset.type;
    app.globalData.dcActive = type;
    wx.switchTab({
      url: `/pages/daicai/index`,
    })
  },
  onLoad() {
    var statusbarH = wx.getSystemInfoSync().statusBarHeight;
    let jiaonang = wx.getMenuButtonBoundingClientRect();
    let ct = new Date()
    this.setData({
      mounth: ct.getMonth()+1,
      statusbarH: statusbarH,
      jiaonang: jiaonang.width + 12,
      titleWidth:wx.getSystemInfoSync().windowWidth-jiaonang.width-12,
      isIphoneX:app.globalData.isIPhoneX,
      carNum: app.globalData.carNum
    });
    this.memberInfo(); // 获取用户信息
    this.getBanners();
    this.getKeyWord();
  }
})