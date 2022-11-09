const app = getApp();
import { CompanyRegisterMember , GetCode } from '../../http/api';
import { validZh, validPhone } from '../../utils/validate';
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
   this.query = {
    company_name: '测试幼儿园',
    realname: '',
    mobile: '',
    captcha_code: '',
    captcha_id: '',
    user_pass: ''
   }
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

  // 请求参数合并
  this.query = Object.assign(this.query, {
    realname: this.data.user_realname,
    mobile: this.data.user_mobile,
    captcha_code: this.data.captcha_code,
    user_pass: this.data.user_pass
  })
  this.submitHandler()
  
},

// 提交请求
async submitHandler() {
  let res = await CompanyRegisterMember(this.query)
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