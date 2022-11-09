// thirdPages/detailedFinancialReport/index.js
import * as echarts from '../ec-canvas/echarts';
const timeFormat = require("../../utils/timeFormat")
const app = getApp();
import { StatistaticsMonthMessage } from '../../http/api';


Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentDate: new Date().getTime(),
    maxDate: new Date().getTime(),
    show: false,
    sumMoney: '', // 总采购金额
    num: '', // 数量
    sumYouMoney: '', // 优选费用
    sumDaiMoney: '', // 代采费用
    sumJdMoney: '', // 京东费用
    sumServerMoney: '',
    sumStoreMoney: '',
    sumSortingMoney: '',
    sumCMoney: '',
    cateSum: '',
    peopleSum: '',
    jd_huanbi_add: '',
    cai_huanbi_add: '',
    you_huanbi_add: '',
    sumJian: '',
    ec: {
      lazyLoad: true // 延迟加载
    },


  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let date = new Date().getTime();
    this.setData({
      date: timeFormat.formatTime(date, 'YY-MM'),
    });

    let dates = timeFormat.formatTime(date, 'YY-MM').split('-')
    // 获取信息
    this.getInfo(dates)
    //饼状图
    this.echartsComponnet = this.selectComponent('#assetsCancvas');
    // this.init_echarts();

    //折线图
    this.echartsComponnet1 = this.selectComponent('#mychart-line');
    // this.init_echarts1()


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
  //初始化饼状图图表
  init_echarts(dataList) {
    var dpr = this.getPixelRatio();
    this.echartsComponnet.init((canvas, width, height) => {
      // 初始化图表
      const Chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr
      });

      Chart.setOption(this.getOption(dataList));
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return Chart;
    });
  },
  getOption: function (dataList) {
    var option = {
      series: [{
        name: 'Access From',
        type: 'pie',
        // radius: ['40%', '60%'],
        // center: ['50%', '35%'],

        itemStyle: {

          borderWidth: 2, //设置border的宽度有多大
          borderColor: '#fff',
        },

        label: {
          normal: {
            textStyle: {
              color: '#ffffff'
            }
          }
        },
        data: [{
          value: dataList[0],
          name: '代采',
          itemStyle: {
            color: '#2362ED'
          },
          label: {
            show: true,
            position: 'inside',
            formatter: '{d}%',

          }
        },
        {
          value: dataList[1],
          name: '优选',
          itemStyle: {
            color: '#7aa0f4'
          },
          label: {
            show: true,
            position: 'inside',
            formatter: '{d}%',

          }
        },
        {
          value: dataList[2],
          name: '京东',
          itemStyle: {
            color: '#bbcff9'
          },
          label: {
            show: true,
            position: 'inside',
            formatter: '{d}%',

          }
        },



        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    };
    return option;
  },
  init_echarts1(datalist) {
    var dpr = this.getPixelRatio();
    this.echartsComponnet1.init((canvas, width, height) => {
      // 初始化图表
      const Chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr
      });

      Chart.setOption(this.getOption1(datalist));
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return Chart;
    });
  },
  getOption1(datalist) {
    var option = {


      grid: {
        containLabel: true
      },
      tooltip: {
        show: true,
        trigger: 'axis',

      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
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
          width: 2,
        },
        itemStyle: {
          color: "#2362ED",
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
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
      },]
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
    console.log(event);
    this.setData({
      currentDate: timeFormat.formatTime(event.detail, 'YY-MM'),
      date: timeFormat.formatTime(event.detail, 'YY-MM'),
      show: false
    });
    let dates = timeFormat.formatTime(event.detail, 'YY-MM').split('-')
    this.getInfo(dates)

  },
  onCancel() {
    this.setData({
      show: false,
      typeShow: false
    })
  },
  getUserInfo() {
    API.getUserInfo().then(res => {
      this.setData({
        name: res.data.nickname
      })
    })
  },
  // 获取月度采购信息
  async getInfo(data) {
    let res = await StatistaticsMonthMessage({
      year: data[0],
      month: data[1]
    });
    let sumYouMoney,sumDaiMoney,sumJdMoney
    sumYouMoney = res.data.youMoney ? res.data.youMoney : 0
    sumDaiMoney = res.data.caiMoney ? res.data.caiMoney : 0
    sumJdMoney = res.data.jdMoney ? res.data.jdMoney : 0
    let dataList = [sumYouMoney,sumDaiMoney,sumJdMoney]
    let datalist = []
    res.data.yearMessage.forEach(item=>{
        datalist.push(item.money)
    })
    console.log(res.data)
    if (res.code == 0) {
      this.setData({
        sumMoney: res.data.sumMoney,
        num: res.data.num,
        sumDaiMoney,
        sumYouMoney,
        sumJdMoney,
        sumServerMoney: res.data.sumServerMoney,
        sumStoreMoney: res.data.sumStoreMoney,
        sumSortingMoney: res.data.sumSortingMoney,
        sumCMoney: res.data.sumCMoney,
        cateSum: res.data.cateSum,
        peopleSum: res.data.peopleSum,
        cai_huanbi_add: res.data.cai_huanbi_add,
        jd_huanbi_add: res.data.jd_huanbi_add,
        you_huanbi_add: res.data.you_huanbi_add,
        sumJian: res.data.sumJian
      })
      this.init_echarts(dataList);
      this.init_echarts1(datalist)
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
    return {
      path: '/thirdPages/detailedFinancialReport/index?isShare=1&type=' + this.data.type
    }
  },
  onShareTimeline: function () {
    return {
      query: 'isShare=1&type=' + this.data.type

    }
  },
})