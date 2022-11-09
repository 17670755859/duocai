// let BASE_URL = "https://www.xunmidao.com/api/"
// let BASE_URL = "https://adapt.ewangnet.com/api/"
const app = getApp();
import { BASE_URL, TOKEN, APPTYPE, PHONE, NAME, USERINFO } from './const';
export default function request({
  url,
  method,
  data,
  headers,
  hideLoading
}) {
  let token = wx.getStorageSync(TOKEN) || '';
  data = data || {};
  data.token = token;
  data.app_type = data.app_type || APPTYPE;
  return new Promise((resolve, reject) => {
    request();
    function request() {
      !hideLoading && wx.showLoading({
        title: '加载中',
        mask:true
      })
      wx.request({
        url: BASE_URL + url,
        method,
        data,
        timeout: 10000,
        header: {
          token: token,
          ...headers
        },
        dataType: "json",
        success: function (res) {
          wx.hideLoading();
          if (res.data.code == 0) { 
            resolve(res.data);
          } else {
            wx.showToast({
              title: res.data.data || res.data.message,
              icon: 'none',
              duration: 3000
            })
            if (res.data.code == -10) {
              wx.setStorageSync(TOKEN, '');
              wx.setStorageSync(PHONE, '');
              wx.setStorageSync(NAME, '');
              wx.setStorageSync(USERINFO, {});
              app.globalData.checkLogin = false;
              app.globalData.hasPhone = false;
              app.globalData.userInfo = {};
              wx.reLaunch({
                url: '/pages/login/index',
              })
            }
          }
        },
        fail: function (e) {
          wx.hideLoading();
          console.log('返回报错')
          let msg = ''
          if (e.error === 12 || e.error === 14) {
            msg = '请求网络出错~，请检查网络';
          } else if (e.error == 13) {
            msg = "请求超时~，请检查网络"
          } else {
            msg = "请求网络出错~，请检查网络"
          }

          wx.showToast({
            title: msg,
          });
          reject(e);
        },
        complete() {
          // wx.hideLoading();
        }
      })
    }

  })
}