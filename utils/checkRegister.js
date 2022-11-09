import { TOKEN, BASE_URL, APPTYPE } from '../http/const';
module.exports = function (callback, fresh = false) {

  var app = getApp()

  // 检查是否存在token和用户信息
    // 服务器获取的用户信息为空，那么直接去注册页面
    if  (!wx.getStorageSync(TOKEN) || fresh) {
      let data = {
        app_type: APPTYPE,
        token: wx.getStorageSync(TOKEN),
      }
      wx.showLoading({
          title: "加载中"
      }),app.request({
        url: BASE_URL + 'api/member/info',
        data: data,
        method: "POST",
        success: function (t) {
          wx.hideLoading();
          if (t.code == app.ConstObj.responseType.REQUESTSUCCESS) {
            wx.setStorageSync("token", t.data.username)
            wx.setStorageSync("phone", t.data.phonenumber)
            wx.setStorageSync("usertype", t.data.usertype)
            if (!t.data.phonenumber || t.data.phonenumber == "") {
              wx.setStorageSync('token', data.username)
              wx.reLaunch({
                url: '/pages/login/login',
              })
              return
            }
            if (callback && typeof (callback) == "function")
              callback()
          }
        },
        fail: function(t) {
          wx.hideLoading();
          console.log(t)
        },
        complete: function() {

        }
      });
    }
    else {
      if (callback && typeof (callback) == "function")
        callback()
    }
};