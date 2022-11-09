const app = getApp();
import { CompanyRegister, GetCode } from '../../../http/api';
import { validZh, validPhone } from '../../../utils/validate';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTime: 59,   // 59
    codeSending: false,
    inputType: 'password',
    user_realname: '', // 用户真实姓名
    user_mobile: '', // 手机号
    captcha_code: '', // 验证码
    user_pass: '', // 密码
    isSee: false, // 是否同意
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   console.log(options.query, 999)
   let query = options.query ? JSON.parse(options.query) : '';
   this.query = query
  },
  showPasType() {
    this.setData({
      inputType: this.data.inputType == 'password' ? 'text' : 'password'
    })
},
inputBlur: function (t) {
  this.setData({
    [t.currentTarget.dataset.name]: t.detail.value.replace(/\s*/g,"")
  });
},
async toNext(){
  if (!validZh(this.data.user_realname)) {
   this.showToast('用户姓名格式错误！')
    return;
  }
  if(!validPhone(this.data.user_mobile)) {
    this.showToast('用户手机格式错误！')
    return;
  }
  if(!this.data.captcha_code) {
    this.showToast('验证码为空！')
    return;
  }
  if(!this.data.user_pass) {
    this.showToast('请输入密码！')
    return;
  }

  if(!this.data.isSee) {
    this.showToast('请勾选用户注册协议·用户隐私协议')
    return;
  }

  // 请求参数合并
  let query = Object.assign(this.query, {
    user_realname: this.data.user_realname,
    user_mobile: this.data.user_mobile,
    captcha_code: this.data.captcha_code,
    user_pass: this.data.user_pass
  })

  console.log(query, '请求数据')
  this.userLocation(this.submitHandler)
  
},

// 提交请求
async submitHandler() {
  let res = await CompanyRegister(this.query)
  console.log(res)
  if(res.code == 0) {
    wx.navigateTo({
      url: '/subPages/lijirenzheng/step4/index',
    })
  } else {
    wx.showToast({
      title: res.data,
      icon: 'none'
    })
  }
},

// 发送验证码
getVerificationCode: function(){
  let that = this;
  if (this.data.codeSending) 
    return;
  if(!validPhone(this.data.user_mobile)) {
    this.showToast('用户手机格式错误！')
    return;
  }

  that.setData({
    codeSending: true,   
  }, function () {
    wx.setStorageSync("getCodeTime", Date.parse(new Date()))
  })

  this.getCode();

  let currentTime =  this.data.currentTime
  that.interval = setInterval(function () {
    currentTime--;
    if (currentTime < 0) {
      clearInterval(that.interval)
      that.setData({
        currentTime: 59,   // 59
        codeSending: false   
      })
    }
    else {
      that.setData({
        currentTime: currentTime
      })
    }
  }, 1000)
  
},

// 获取验证码
async getCode() {
  let res = await GetCode({mobile: this.data.user_mobile})
  if(res.code == 0) {
    this.query = Object.assign(this.query, { captcha_id: res.data.key })
    this.showToast('发送成功')
  }
},

showToast(msg) {
  wx.showToast({
    title: msg,
    icon: 'none'
  })
},

selectRadio() {
  this.setData({
    isSee: true
  })
},

// 获取用户权限
userLocation: function (callBackFun) {
  let that = this
  //******查询权限授权记录
  wx.getSetting({
    success(res) {
      if (res.authSetting["scope.userLocation"] === false) {// 有权限询问记录 但没有允许开启授权
        wx.showModal({
          title: '提示！',
          confirmText: '去设置',
          showCancel: true,
          content: "需要授权位置信息",
          success: function (res) {
            if (res.confirm) {//用户同意打开授权设置页面
              //******打开权限设置页面
              wx.openSetting({
                success(res) {
                  //进行地理位置授权完成后的逻辑操作(如果在权限设置页面没有打开权限 后续需要授权的操作会失败)
                  if (res.authSetting["scope.userLocation"] === true) {
                    // 允许授权
                    that.getLocation(callBackFun)
                  }
                }
              })
            } else if (res.cancel) {//用户拒绝打开授权设置页面
              wx.showToast({
                title: '授权失败',
                icon: 'none'
              })
            }
          }
        })
      }
      else if (res.authSetting["scope.userLocation"] === true) {// 有权限询问记录 且当前已开启授权
        //进行地理位置授权完成后的逻辑操作
        that.getLocation(callBackFun)
      }
      else {// 没有授权记录 需要第一次授权
        //******打开第一次授权弹窗询问
        wx.authorize({
          scope: 'scope.userLocation',
          success(res) {//用户同意开启授权
            //进行地理位置授权完成后的逻辑操作
            that.getLocation(callBackFun)
          },
          fail(res) {//用户拒绝开启授权
            wx.showToast({
              title: '授权失败',
              icon: 'none',
            })
          }
        })
      }
    }
  })
},

// 获取用户经纬度
getLocation: function (callBackFun) {
  let that = this
  wx.getLocation({
    type: 'gcj02', //返回可以用于wx.openLocation的经纬度
    success (res) {
      const latitude = res.latitude
      const longitude = res.longitude
      that.query = Object.assign(that.query, {
        lat: latitude,
        lng: longitude
      })
      if (callBackFun && typeof (callBackFun) == "function")
      callBackFun()
    }
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
  onShow: function () {},

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