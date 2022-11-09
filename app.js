
import { PHONE } from './http/const';
App({
  onLaunch() {
    this.checkIsIPhoneX();
    let phone = wx.getStorageSync(PHONE);
    this.globalData.hasPhone = phone;
  },
  onShow(e){
  
  },

  // 判断设备是否为 iPhone X
  checkIsIPhoneX: function () {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        var safeBottom = res.screenHeight - res.safeArea.bottom
        that.kBottomSafeHeight = safeBottom
        //根据安全高度判断
        if (safeBottom === 34) {
          that.globalData.isIPhoneX = true
          that.isIPhoneX = true
        }

      }
    })
  },
  bezier: function (pots, amount) {
    var pot;
    var lines;
    var ret = [];
    var points;
    for (var i = 0; i <= amount; i++) {
      points = pots.slice(0);
      lines = [];
      while (pot = points.shift()) {
        if (points.length) {
          lines.push(pointLine([pot, points[0]], i / amount));
        } else if (lines.length > 1) {
          points = lines;
          lines = [];
        } else {
          break;
        }
      }
      ret.push(lines[0]);
    }
    function pointLine(points, rate) {
      var pointA, pointB, pointDistance, xDistance, yDistance, tan, radian, tmpPointDistance;
      var ret = [];
      pointA = points[0];//点击
      pointB = points[1];//中间
      xDistance = pointB.x - pointA.x;
      yDistance = pointB.y - pointA.y;
      pointDistance = Math.pow(Math.pow(xDistance, 2) + Math.pow(yDistance, 2), 1 / 2);
      tan = yDistance / xDistance;
      radian = Math.atan(tan);
      tmpPointDistance = pointDistance * rate;
      ret = {
        x: pointA.x + tmpPointDistance * Math.cos(radian),
        y: pointA.y + tmpPointDistance * Math.sin(radian)
      };
      return ret;
    }
    return {
      'bezier_points': ret
    };
  },
  globalData: {
    userInfo: {}, // 用户详情
    checkLogin: false,
    isIPhoneX: false,
    hasPhone: false,
    carNum: 0, // 购物车数量
    tabActive: '', // 采购申请列表状态
    permissions: [], // 用户权限
    dcActive: 0, // 代采导航 1 - 2 - 3
  }
})