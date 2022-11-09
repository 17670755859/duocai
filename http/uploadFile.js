import { BASE_URL } from './const'
function uploadFile(data) {
  return new Promise((resolve, reject) => {
    let token = wx.getStorageSync(`token`)
    wx.uploadFile({
      url: BASE_URL + 'api/upload/headimg',
      filePath: data,
      name: 'file',
      formData: {
        app_type: 'wx'
      },
      header: {
        'content-type': 'multipart/form-data',
        Authorization: token,
      },
      success(res) {
        wx.hideLoading();
        let data = JSON.parse(res.data)
        resolve(data);
      },
      fail(err) {
        wx.showToast({
          title: "上传失败",
          icon: "none",
          duration: 2000
        })
      },
      complete(res) {
        console.log(res);
      },

    });
  })
}

module.exports = {
  uploadFile
}