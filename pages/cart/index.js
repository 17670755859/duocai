// pages/cart/index.js
const app = getApp();
import {
  CartCount,
  CartGoodslists,
  CartEdit,
  CartDelete
} from '../../http/api';
import {
  BASE_URL
} from '../../http/const';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    url: BASE_URL,
    page: 1,
    isonPostReachBootom: false,
    result: [], // 选中的值
    isSelectAll: false,
    isIPhoneX: app.globalData.isIPhoneX,
    hide_good_box: true,
    carNum: 0,
    dataList: [], // 购物车列表
    showBottom: false, // 加入购物车显示
    totalMoney: 0, // 合计金额
    economize: 0, // 总共节省
    buyNum: 0 // 采购总数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({ //  获取页面的有关信息
      success: function (res) {
        var hh = res.windowHeight;
        var width = res.windowWidth;
        that.busPos = {};
        that.busPos['x'] = width / 5 * 3 - 48; //购物车的位置
        that.busPos['y'] = hh - 56;
      }
    });

    this.setData({
      isIPhoneX: app.globalData.isIPhoneX,
      bottom: app.globalData.isIPhoneX ? '166rpx' : '98rpx',
      paddingBottom: app.globalData.isIPhoneX ? '68rpx' : 0
    });
    this.getCartNum()
  },
  // 删除购物车
  async cartDelete(id) {
    let res = await CartDelete({
      cart_id: id
    });
    if (res.code == 0) {
      this.getDataList()
    }
  },
  // 修改购物车
  async cartEdit(id, num) {
    this.requestStadus = true;
    let res = await CartEdit({
      cart_id: id,
      num: num
    });
    if (res.code == 0) {
      this.requestStadus = false;
      this.getDataList()
    }
  },
  // 获取购物车列表
  async getDataList() {
    let res = await CartGoodslists();
    if (res.code == 0) {
      let result = res.data.map((v) => Object.assign(v, {
        isTouchMove: false
      }));
      this.setData({
        dataList: result,
        result: [],
        isSelectAll: false,
        showBottom: result.length > 0
      })
      this.getCartNum()
    }
  },
  // 获取购物车数量
  async getCartNum() {
    let res = await CartCount();
    if (res.code == 0) {
      app.globalData.carNum = res.data
      this.setData({
        carNum: res.data
      })
    }
  },
  onStepperChange(event) {
    console.log(event);
  },
  bindInput(e) {
    let index = e.currentTarget.dataset.index;
    this.data.dataList[index].num = e.detail.value > 0 ? e.detail.value : 1;
    this.setData({
      dataList: this.data.dataList
    })
  },
  // 失去焦点
  blurInpit(e) {
    let index = e.currentTarget.dataset.index;
    let num = '';
    if (e.detail.value) {
      num = e.detail.value
    } else {
      num = 0;
      this.data.dataList[index].num = 0;
      this.setData({
        dataList: this.data.dataList
      })
    }
    this.cartEdit(this.data.dataList[index].cart_id, num)
  },
  reduceCart(e) {
    let that = this;
    let index = e.currentTarget.dataset.index;
    if (this.data.dataList[index].num == 1) {
      wx.showModal({
        title: '提示',
        content: '是否从购物车中删除该商品？',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            that.cartDelete(that.data.dataList[index].cart_id)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      this.data.dataList[index].num--;
      this.cartEdit(this.data.dataList[index].cart_id, this.data.dataList[index].num)
    }
  },
  touchOnGoods(e) {
    console.log(e)
    this.finger = {};
    var topPoint = {};
    this.finger['x'] = e.touches["0"].clientX; //点击的位置
    this.finger['y'] = e.touches["0"].clientY;

    if (this.finger['y'] < this.busPos['y']) {
      topPoint['y'] = this.finger['y'] - 150;
    } else {
      topPoint['y'] = this.busPos['y'] - 150;
    }
    topPoint['x'] = Math.abs(this.finger['x'] - this.busPos['x']) / 2;

    if (this.finger['x'] > this.busPos['x']) {
      topPoint['x'] = (this.finger['x'] - this.busPos['x']) / 2 + this.busPos['x'];
    } else { //
      topPoint['x'] = (this.busPos['x'] - this.finger['x']) / 2 + this.finger['x'];
    }

    this.linePos = app.bezier([this.busPos, topPoint, this.finger], 200);
    this.startAnimation(e);
  },
  startAnimation: function (e) {
    var index = 0,
      that = this,
      bezier_points = that.linePos['bezier_points'];

    this.setData({
      hide_good_box: false,
      bus_x: that.finger['x'],
      bus_y: that.finger['y']
    })
    var len = bezier_points.length;
    index = len
    this.timer = setInterval(function () {
      for (let i = index - 1; i > -1; i--) {
        that.setData({
          bus_x: bezier_points[i]['x'],
          bus_y: bezier_points[i]['y']
        })

        if (i < 1) {
          clearInterval(that.timer);
          that.addGoodToCartFn(e);
          that.setData({
            hide_good_box: true
          })
        }
      }
    }, 25);
  },
  toConfirmOrder() {
    let carts = this.data.dataList;
    let result = this.data.result
    let cart_Ids = []
    for (let i = 0; i < result.length; i++) {
      cart_Ids.push(carts[result[i]].cart_id)
    }
    if (cart_Ids.length) {
      let ids = cart_Ids.toString()
      wx.navigateTo({
        url: `/subPages/caigoushenqing/index?ids=${ids}`,
      })
    } else {
      wx.showToast({
        title: '请选择需要提交的购物车商品',
        icon: 'none'
      })
    }
  },
  // 添加数量
  async addGoodToCartFn(e) {
    let index = e.currentTarget.dataset.index;
    let list = this.data.dataList;
    let num = parseInt(list[index].num) + 1
    this.cartEdit(list[index].cart_id, num)
  },
  onChange(event) {
    let totalMoney = 0;
    let originalPrice = 0;
    let buyNum = 0;
    let carts = this.data.dataList;
    for (let i = 0; i < event.detail.length; i++) {
      totalMoney += parseInt(carts[event.detail[i]].price) * carts[event.detail[i]].num;
      originalPrice += parseInt(carts[event.detail[i]].market_price) * carts[event.detail[i]].num;
      buyNum += carts[event.detail[i]].num
    }
    this.setData({
      result: event.detail,
      isSelectAll: carts.length == event.detail.length,
      totalMoney: totalMoney,
      economize: originalPrice - totalMoney,
      buyNum: buyNum
    });
  },

  // 全选
  onSelectAll() {
    let buyNum = 0;
    let radios = [];
    let totalMoney = 0;
    let originalPrice = 0;
    let carts = this.data.dataList;
    let isSelectAll = !this.data.isSelectAll
    if (isSelectAll) {
      for (let i = 0; i < carts.length; i++) {
        radios.push(i.toString())
        totalMoney += parseFloat(carts[i].price) * carts[i].num;
        originalPrice += parseFloat(carts[i].market_price) * carts[i].num;
        buyNum += carts[i].num
      }
    }
    this.setData({
      isSelectAll: isSelectAll,
      result: isSelectAll ? radios : [],
      totalMoney: totalMoney,
      economize: originalPrice - totalMoney,
      buyNum: buyNum
    })
  },

  // 删除
  delItem(e) {
    let id = e.currentTarget.dataset.id;
    this.cartDelete(id)
  },
  // 移除
  deleteAll(e) {
    let carts = this.data.dataList;
    let result = this.data.result
    let cart_Ids = []
    for (let i = 0; i < result.length; i++) {
      cart_Ids.push(carts[result[i]].cart_id)
    }
    if (!cart_Ids.length) {
      wx.showToast({
        title: '请选中需要移除的商品',
        icon: 'none'
      })
      return;
    }
    this.cartDelete(cart_Ids.toString())
  },
  // 开始滑动
  touchStart(e) {
    let dataList = [...this.data.dataList]
    dataList.forEach(item => {
      // 让原先滑动的块隐藏
      if (item.isTouchMove) {
        item.isTouchMove = !item.isTouchMove;
      }
    });
    // 初始化开始位置
    this.setData({
      dataList: dataList,
      startX: e.touches[0].clientX,
      startY: e.touches[0].clientY
    })
  },
  // 滑动~
  touchMove(e) {
    let moveX = e.changedTouches[0].clientX;
    let moveY = e.changedTouches[0].clientY;
    let indexs = e.currentTarget.dataset.index;
    let dataList = [...this.data.dataList]
    // 拿到滑动的角度，判断是否大于 30°，若大于，则不滑动
    let angle = this.angle({
      X: this.data.startX,
      Y: this.data.startY
    }, {
      X: moveX,
      Y: moveY
    });

    dataList.forEach((item, index) => {
      item.isTouchMove = false;
      // 如果滑动的角度大于30° 则直接return；
      if (angle > 30) {
        return
      }

      // 判断是否是当前滑动的块，然后对应修改 isTouchMove 的值，实现滑动效果
      if (indexs === index) {
        if (moveX > this.data.startX) { // 右滑
          item.isTouchMove = false;
        } else { // 左滑
          item.isTouchMove = true;
        }
      }
    })

    this.setData({
      dataList
    })
  },
  /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
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
      this.getDataList();
    }
    if (app.globalData.carNum > 0) {
      this.setData({
        carNum: app.globalData.carNum
      })
    }
    this.setData({
      isRefresh: Math.random() * 50,
      isSelectAll: false,
      result: [],
      totalMoney: 0,
      economize: 0
    })
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