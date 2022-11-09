// subPages/daishenhe/index.js
const app = getApp();
import {
  OrderLists,
  OrderSetAuditError,
  OrderSetAuditSuccess
} from '../../http/api';
import {
  BASE_URL
} from '../../http/const';
import {
  getFormData
} from '../../utils/util';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    url: BASE_URL,
    result: [],
    list: [],
    height: 200,
    checked: false,
    noData: false,
    pageIndex: 1,
    pageSize: 10,
    isIPhoneX: app.globalData.isIPhoneX,

    show_bh: false, // 驳回原因弹框
    ids: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.lock = false; // 接口锁
    this.getSystemInfo();
  },
  getSystemInfo() {
    wx.getSystemInfo({
      success: res => {
        let height = res.windowHeight - 60;
        this.setData({
          height: app.globalData.isIPhoneX ? height - 40 : height,
        });
      }
    })
  },
  onCheckBoxChange(event) {
    let checked = event.detail.length == this.data.list.length;
    this.setData({
      result: event.detail,
      checked: checked
    });
  },
  // 获取待审核列表
  async getDataList() {
    if (this.data.noData) return;
    this.lock = true;
    let res = await OrderLists({
      order_status: '5',
      month: '',
      page: this.data.pageIndex,
      page_size: this.data.pageSize
    });
    if (res.code == 0) {
      this.lock = false;
      this.data.pageIndex++;
      let list = [];
      let result = res.data.list.map(v => Object.assign(v, {
        time: getFormData(v.create_time)
      }))
      if(this.data.pageIndex == 2) {
        list = result;
      } else {
        list = this.data.list;
        list.push(...result);
      }
      this.setData({
        list: list,
        result: [],
        checked: false,
        noData: list.length >= res.data.count
      })
    }
  },
  //审核历史
  toShenhenlishi() {
    app.globalData.tabActive = '6';
    wx.switchTab({
      url: `/pages/caigoushenqing/index`,
    })
  },
  //订单详情
  toOrderDetail(e) {
    let order_id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/subPages/dingdanxiangqing/index?id=${order_id}`,
    })
  },
  bindScrollToLower(e) {
    if(this.lock) return;
    this.getDataList();
  },
  // 全选
  selectAll(e) {
    let result = [];
    if (e.detail) {
      for (let i = 0; i < this.data.list.length; i++) {
        result.push(i.toString())
      }
    } else {
      result = []
    }
    this.setData({
      checked: e.detail,
      result: result
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
    this.setData({
      pageIndex: 1,
      result: [],
      checked: false,
      noData: false
    })
    this.getDataList()
  },
  // 提交
  confirm(e) {
    let radios = this.data.result;
    let list = this.data.list;
    if (!radios.length) {
      wx.showToast({
        title: '请选择审批订单',
        icon: 'none'
      })
      return;
    }
    let orderIds = [];
    for (let i = 0; i < radios.length; i++) {
      orderIds.push(list[radios[i]].order_id)
    }
    if (e.currentTarget.dataset.type == 1) { // 1驳回 2通过
      this.orderSetAuditError(orderIds.toString())
    } else {
      this.orderSetAuditSuccess(orderIds.toString())
    }
  },
  // 驳回 - 接口
  async orderSetAuditError(ids) {
    this.setData({
      show_bh: true,
      ids: ids
    })
  },
  // 驳回
  async overruleHandler(e) {
    if (!e.detail.remark) {
      wx.showToast({
        title: '请输入驳回理由',
        icon: 'none'
      })
      return;
    }
    let res = await OrderSetAuditError({
      order_id: this.data.ids,
      error_message: e.detail.remark
    });
    if (res.code == 0) {
      this.setData({
        show_bh: false,
        result: [],
        noData: false,
        checked: false,
        ids: ""
      })
      app.globalData.tabActive = '7';
      wx.reLaunch({
        url: '/pages/caigoushenqing/index'
      })
    }
  },
  // 通过
  async orderSetAuditSuccess(ids) {
    let res = await OrderSetAuditSuccess({
      order_id: ids
    });
    if (res) {
      wx.showToast({
        title: '操作成功',
        icon: 'none'
      })
      this.setData({
        refresh: true,
        pageIndex: 1,
        noData: false,
        result: [],
        checked: false
      })
      this.hasMore = true;
      this.getDataList();
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