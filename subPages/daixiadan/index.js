// subPages/daishenhe/index.js
const app = getApp();
import {
  OrderLists,
  OrderPreview
} from '../../http/api';
import { BASE_URL } from '../../http/const';
import { getFormData } from '../../utils/util';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: BASE_URL,
    result: [],
    height: 200,
    isIPhoneX: app.globalData.isIPhoneX,
    pageIndex: 1,
    pageSize: 10,
    list: [],
    refresh: false,
    checked: false,
    totalMoney: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSystemInfo();
    this.getListWidth();
  },
  getListWidth() {
    var obj = wx.createSelectorQuery();
    obj.selectAll('.order-item').boundingClientRect(rect => {
      console.log(rect)
      console.log(rect[0].width)
      this.setData({
        listWidth: rect[0].width - 40
      })
    })
    obj.exec();
  },
  getSystemInfo() {
    wx.getSystemInfo({
      success: res => {
        console.log(res.windowHeight)
        let height = res.windowHeight - 60;
        this.setData({
          height: app.globalData.isIPhoneX ? height - 40 : height,
        });
      }
    })
  },
  onChangeAll(e) {
    let data = [];
    if (e.detail) {
      for(let i = 0; i < this.data.list.length; i++) {
        data.push(i.toString())
      }
    }
    this.countMoney(data)
    this.setData({
      checked: e.detail,
      result: data
    })
  },
  onCheckBoxChange(event) {
    let checked = false;
    if(event.detail.length == this.data.list.length) {
      checked = true
    }
    this.countMoney(event.detail)
    this.setData({
      result: event.detail,
      checked: checked
    });
  },
  // 获取待下单列表
  async getDataList() {
    if(!this.hasMore) return;
    this.hasMore = false
    let res = await OrderLists({
      order_status: '77',
      month: '',
      page: this.data.pageIndex,
      page_size: this.data.pageSize
    });
    if (res.code == 0) {
      let list = this.data.list;
      let result = res.data.list.map(v => Object.assign(v, { time: getFormData(v.create_time) }))
      if (this.data.refresh) {
        this.setData({
          list: result,
          refresh: false
        })
      } else {
        list.push(...result);
        this.data.pageIndex++;
        this.hasMore = list.length < res.data.count
        this.setData({
          pageIndex: this.data.pageIndex,
          list: list
        })
      }
    }
  },
  // 生成预支付订单
  async prepareOrder(ids) {
    let res = await OrderPreview({
      order_ids: ids,
      type: '1'
    });
    if (res.code == 0) {
      wx.navigateTo({
        url: `/subPages/quedingxiadan/index?id=${res.data}`,
      })
    } else {
      wx.showModal({
        title: '提示',
        cancelColor: "#cccccc",
        confirmText: "前往设置",
        confirmColor: "#5487F9",
        content: '公司发票信息未设置咋不能下单请设置发票信息继续下单',
        success (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/subPages/kaipiaoxinxixiugai/index'
            })
          } else if (res.cancel) {}
        }
      })
    }
  },
  // 确定下单
  toConfirmOrder() {
    let result = this.data.result;
    if (!result.length) {
      wx.showToast({
        title: '请选择需要下单的商品',
        icon: 'none'
      })
      return;
    }
    let ids = [];
    for(let i = 0; i < result.length; i++) {
      ids.push(this.data.list[result[i]].order_id);
    }
    this.prepareOrder(ids.toString())
  },
  //详情
  toDetail(e) {
    wx.navigateTo({
      url: `/subPages/dingdanxiangqing/index?id=${e.currentTarget.dataset.id}`,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // 计算总价
  countMoney(data) {
    let money = 0;
    for(let i = 0; i < data.length; i++) {
      money += parseFloat(this.data.list[data[i]].order_money)
    }
    this.setData({
      totalMoney: money.toFixed(2)
    })
  },
  bindScrollToLower(e) {
    this.getDataList();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.hasMore = true;
    this.setData({
      pageIndex: 1,
      refresh: true,
      result: [],
      checked: false,
      totalMoney: 0
    })
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