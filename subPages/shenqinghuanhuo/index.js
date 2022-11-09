// subPages/shenqinghuanhuo/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgFile: [],
        uploadIndex: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  chooseImage(e) {
    if (this.data.imgFile.length > 20) {
        wx.showModal({
            title: '提示',
            content: '最多上传20张图片或者视频',
            showCancel: false,
        })
        return;
    }
    this.setData({
        uploadIndex: 0,
    });
    var count = (20 - this.data.imgFile.length) > 9 ? 9 : 20 - this.data.imgFile.length;
    wx.chooseMedia({
        count: count,
        mediaType: ['image'],
        maxDuration: 30,
        sourceType: ['album', 'camera'],
        success: (res) => {
            console.log(res);
            var tempFiles = res.tempFiles;
            console.log(tempFiles)
           
        },
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