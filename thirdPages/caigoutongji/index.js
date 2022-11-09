// thirdPages/detailedFinancialReport/index.js
import * as echarts from '../ec-canvas/echarts';
const timeFormat = require("../../utils/timeFormat")
import { getOneStatics } from '../../http/api';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentDate: new Date().getTime(),
    maxDate: new Date().getTime(),
    show: false,
    month: '',
    order: [],
    sumMoney: '',
    numList: [],
    orders: [],
    ec: {
      lazyLoad: true // 延迟加载
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let date = new Date().getTime();
    let dates = timeFormat.formatTime(date, 'YY-MM').split('-')
    let month = dates[1].split('')[0]=='0'? dates[1].split('').pop() : dates[1]
    console.log(month)
    // 获取信息
    this.getInfo(dates[0],month)
    this.setData({
      date: timeFormat.formatTime(date, 'YY-MM'),
      month: month
    });
    //折线图
    this.echartsComponnet = this.selectComponent('#mychart-line');
    // this.init_echarts(this.data.numList)
  },
    //获取像素比
    getPixelRatio() {
      let pixelRatio = 0
      wx.getSystemInfo({
        success: function (res) {
          pixelRatio = res.pixelRatio
        },
        fail: function () {
          pixelRatio = 0
        }
      })
      return pixelRatio
    },
    init_echarts(datalist){
      var dpr = this.getPixelRatio();
      this.echartsComponnet.init((canvas, width, height) => {
        // 初始化图表
        const Chart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr
        });

        Chart.setOption(this.getOption(datalist));
        // 注意这里一定要返回 chart 实例，否则会影响事件处理等
        return Chart;
      });
    },
    getOption(datalist){
      var option = {
        grid: {
          containLabel: true
        },
        tooltip: {
          show: true,
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['1(月)', '2', '3', '4', '5', '6', '7','8','9','10','11','12'],
          // show: false
        },
        yAxis: {
          x: 'center',
          type: 'value',
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
        
        },
        series: [{
          name: 'A',
          type: "line",
            lineStyle: {
              width:2,
            },
            itemStyle: {
              color: "#2362ED",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(193, 214, 255, 1)",
                },
                {
                  offset: 1,
                  color: "rgba(193, 214, 255, 0.3)",
                },
              ]),
            },
          data: datalist
        }, ]
      };
      return option;
    },
  chooseTimer() {
    this.setData({
      show: true
    })
  },
  //确定选择时间
  onConfirm(event) {
    let dates = timeFormat.formatTime(event.detail, 'YY-MM').split('-')
    let month = dates[1].split('')[0]=='0'? dates[1].split('').pop() : dates[1]
    console.log(event);
    this.setData({
      currentDate: timeFormat.formatTime(event.detail, 'YY-MM'),
      date: timeFormat.formatTime(event.detail, 'YY-MM'),
      show: false,
      month: month
    });
    this.getInfo(dates[0],month)
  },
  onCancel() {
    this.setData({
      show: false,
      typeShow: false
    })
  },
  // 获取采购统计信息
  async getInfo(year,month) {
    let res = await getOneStatics({
        year: year,
        month: month
    });
    console.log(res)
    let datalist = []
    res.data.year.forEach(item=>{
        datalist.push(item.sumMoney)
    })
    let orders = JSON.parse(JSON.stringify(res.data.orders))
    // orders.push({
    //     "create_time": 1653704768,
    //     "order_money": "15950.00", //订单金额
    //     "goods_num": 15, //订单商品数量
    // })
    orders.forEach(item=>{
        item.time = timeFormat.formatTime(item.create_time, 'YY-MM-DD')
    })
    if (res.code == 0) {
      this.setData({
        sumMoney: res.data.sumMoney,
        numList: datalist,
        orders: orders
      })
      this.init_echarts(this.data.numList)
    }
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

  },
  onShareTimeline: function () {

  },
})