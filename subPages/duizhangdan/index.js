// subPages/duizhangdan/index.js
const timeFormat = require("../../utils/timeFormat")
import { BASE_URL,PHONE,USERINFO } from '../../http/const';
import { getReconciliation } from '../../http/api';


Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: BASE_URL,
    currentDate: new Date().getTime(),
    maxDate: new Date().getTime(),
    show: false,
    typeShow: false,
    date: '',
    month: '',
    spent_money: "", //已使用授信额度
    shengyu_money: 0,
    money: "", //总授信额度
    surplus_money: "", //剩余授信额度
    jd: [], // 京东订单
    cai: [], // 代采订单
    you: [], // 优选订单
    refund: [], // 退货订单
    actions: [{ name: '代采/优选/京东' }, { name: '代采' }, { name: '优选' }, { name: '京东' }],
    type: '代采/优选/京东',
    allTypeShow: false,
    allActions: [],
    allType: '全部'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let date = new Date().getTime();
    let dates = timeFormat.formatTime(date, 'YY-MM').split('-')
    this.setData({
      date: timeFormat.formatTime(date, 'YY-MM'),
      dateStr: timeFormat.formatTime(date, 'YY年MM月'),
      month: dates[1]
    });
    // 获取信息
    this.getInfo(dates,0)
  },
  //确定选择时间
  onConfirm(event) {
    let dates = timeFormat.formatTime(event.detail, 'YY-MM').split('-')
    this.setData({
      currentDate: timeFormat.formatTime(event.detail, 'YY-MM'),
      date: timeFormat.formatTime(event.detail, 'YY-MM'),
      show: false,
      month: dates[1]
    });
    this.getInfo(dates,0)
  },
  onCancel() {
    this.setData({
      show: false,
      typeShow: false,
      allTypeShow: false
    })
  },
  chooseTimer() {
    this.setData({
      show: true
    })
  },
  onTypeSelect(event) {
    console.log(event.detail);
    this.setData({ type: event.detail.name, typeShow: false })


  },
  onAllTypeSelect(event) {
    this.setData({ allType: event.detail.name, allTypeShow: false })
  },
  showTypeSelect() {
    this.setData({
      typeShow: true
    })
  },
  showAllTypeSelect() {
    this.setData({
      allTypeShow: true
    })
  },
  // 获取对账单信息
  async getInfo(dates,type) {
    console.log(dates)
    let res = await getReconciliation({
      month: dates[1],
      order_type: type
    });
    console.log(res)
    let caiList = res.data.cai.order_list.map(item=>{
      let time = timeFormat.formatTime(item.create_time,'YY-MM-DD') + ' ' + timeFormat.formatTime(item.create_time,'hh-mm').split('-')
      item.time = time
      return item
    })
    let cai = {
      ...res.data.cai,
      order_list: caiList
    }
    let jdList = res.data.jd.order_list.map(item=>{
      let time = timeFormat.formatTime(item.create_time,'YY-MM-DD') + ' ' + timeFormat.formatTime(item.create_time,'hh-mm').split('-')
      item.time = time
      return item
    })
    let jd = {
      ...res.data.jd,
      order_list: jdList
    }
    let youList = res.data.jd.order_list.map(item=>{
      let time = timeFormat.formatTime(item.create_time,'YY-MM-DD') + ' ' + timeFormat.formatTime(item.create_time,'hh-mm').split('-')
      item.time = time
      return item
    })
    let you = {
      ...res.data.you,
      order_list: youList
    }
    let allActions = [{ name: '全部' }]
    res.data.cates.forEach(item=>{
        allActions.push({name: item.category_name})
    })
    if (res.code == 0) {
      this.setData({
        spent_money: res.data.spent_money,
        money: res.data.money,
        surplus_money: res.data.money-res.data.spent_money,
        jd,
        cai,
        you,
        refund: res.data.refund_orders,
        allActions
      })
    }
    console.log(this.data.you)
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