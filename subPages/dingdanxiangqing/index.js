const app=getApp();
import { OrderDetail, OrderSetAuditError, OrderSetAuditSuccess, OrdercreateEditNum } from '../../http/api';
import { BASE_URL } from '../../http/const';
import { getFormData, orderStatusStr } from '../../utils/util';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: BASE_URL,
    status:1,
    isIPhoneX:app.globalData.isIPhoneX,
    order_id: '', // 订单id
    order_no: '', // 订单号
    name: '', // 采购人
    job_name: '', // 职务名称
    department_name: '', // 职务部门
    num: '', // 购买数量
    orderMoney: '', // 总金额
    order_status: null, // 订单状态
    order_status_text: '',
    remark: '', // 订单备注
    list: [], // 商品列表
    error_message: '', // 驳回理由


    show_bh: false, // 全部驳回弹框
    show_tg: false, // 全部通过弹框
    show_xg: false, // 修改弹框

    modifyGoods: {} // 修改的商品
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var statusbarH = wx.getSystemInfoSync().statusBarHeight;
    let jiaonang = wx.getMenuButtonBoundingClientRect()
    this.setData({
      order_id: options.id,
      statusbarH: statusbarH,
      jiaonang: jiaonang.width + 12,
      titleWidth: wx.getSystemInfoSync().windowWidth - jiaonang.width - 12,
      status:options.status
    });
    this.getOrderInfo(options.id)
  },
  // 获取订单详情
  async getOrderInfo(id) {
    let res = await OrderDetail({
      order_id: id
    });
    if (res.code == 0) {
      this.setData({
        order_id: res.data.order_id,
        order_no: res.data.order_no,
        order_status: res.data.order_status,
        order_status_text: orderStatusStr(res.data.order_status),
        name: res.data.name,
        job_name: res.data.job_name,
        time: getFormData(res.data.create_time),
        department_name: res.data.department_name,
        num: res.data.goods_num,
        orderMoney: res.data.order_money,
        remark: res.data.remark,
        list: res.data.order_goods
      })
    }
  },
  // 驳回申请
  async overrule(remark) {
    return new Promise(async (resove, reject) => {
      let res = await OrderSetAuditError({
        order_id: this.data.order_id.toString(),
        error_message: remark
      });
      if (res.code == 0) {
        wx.showToast({
          title: '操作成功',
          icon: 'none'
        });
        this.getOrderInfo(this.data.order_id)
        resove(true)
      } else {
        reject(false)
      }
    })
  },
  // 全部驳回
  async overruleHandler(e) {
    if(!e.detail.remark) {
      wx.showToast({
        title: '请输入驳回理由',
        icon: 'none'
      })
      return;
    }
    let res = await this.overrule(e.detail.remark);
    if (res) {
      this.setData({
        show_bh: false
      })
    }
  },
  // 通过申请
  async adop() {
    return new Promise(async (resove, reject) => {
      let res = await OrderSetAuditSuccess({
        order_id: this.data.order_id
      });
      if (res.code == 0) {
        wx.showToast({
          title: '操作成功',
          icon: 'none'
        });
        this.getOrderInfo(this.data.order_id)
        resove(true)
      } else {
        reject(false)
      }
    })
  },
  // 全部通过
  async adoptHandler() {
    let res = await this.adop();
    if (res) {
      this.setData({
        show_tg: false
      })
    }
  },
  // 修改商品
  async modifyGoods() {
    let res = await OrdercreateEditNum({
      order_goods_id: this.data.modifyGoods.order_goods_id,
      num: this.data.modifyGoods.num,
      type: '1'
    });
    if (res.code == 0) {
      this.setData({
        show_xg: false
      })
      wx.showToast({
        title: '操作成功',
        icon: 'none'
      });
      this.getOrderInfo(this.data.order_id)
    }
  },
  // 修改数量确认
  modifyHandler(e) {
    this.setData({
      modifyGoods: e.detail
    })
    this.modifyGoods()
  },
  naviBack() {
    wx.navigateBack({
      delta: 1,
    })
  },
  //确认弹窗
  confirm(){
    const sonCompObj = this.selectComponent("#confirm");
    sonCompObj.showDialog();
  },
  //数量修改
  modify(e){
    let index = e.currentTarget.dataset.index;
    this.setData({
      show_xg: true,
      modifyGoods: this.data.list[index]
    })
  },
  // 全部通过
  toAllPass(){
    const sonCompObj = this.selectComponent("#allPass");
    sonCompObj.showDialog();
  },
  // 全部驳回
  toBohui(){
    this.setData({
      show_bh: true
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
  onShow: function (options) {
    
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