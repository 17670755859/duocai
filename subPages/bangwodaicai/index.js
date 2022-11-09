// subPages/bangwodaicai/index.js
import { GoodsFankui } from '../../http/api';
import { uploadFile } from '../../http/uploadFile';
import { BASE_URL } from '../../http/const';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    desc: '',
    need_num: '',
    estimate_money: '',
    remark: '',
    image: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.time = null
  },
  // 提交
  async submitHandler() {
    if (!this.data.desc) {
      wx.showToast({
        title: '请填写需求描述',
        icon: 'none'
      });
      return;
    }
    if(!this.data.need_num) {
      wx.showToast({
        title: '请填写需求量',
        icon: 'none'
      });
      return;
    }
    if(!this.data.estimate_money) {
      wx.showToast({
        title: '请填写预估金额',
        icon: 'none'
      });
      return;
    }
    if(!this.data.remark) {
      wx.showToast({
        title: '请填写补充信息',
        icon: 'none'
      });
      return;
    }
    if (!this.data.image) {
      wx.showToast({
        title: '请上传补充照片',
        icon: 'none'
      });
      return;
    }
    let res = await GoodsFankui({
      desc: this.data.desc,
      need_num: this.data.need_num,
      estimate_money: this.data.estimate_money,
      remark: this.data.remark,
      image: this.data.image
    });
    if (res.code == 0) {
      wx.showToast({
        title: '反馈成功',
      })
      this.time = setTimeout(() => {
        wx.navigateBack()
      }, 800);
    }
  },
  async chooseImage(e){
    let that = this
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      async success (res) {
        const tempFilePaths = res.tempFiles[0].tempFilePath
        let result = await uploadFile(tempFilePaths)
        if (result.code == 10067) {
          that.setData({
            image: BASE_URL + result.data.pic_path
          })
        }
      }
    })
  },
  //图片预览
  previewImage(e) {
      let url = e.currentTarget.dataset.url;
      let urls = e.currentTarget.dataset.urls;
      wx.previewImage({
          current: url, // 当前显示图片的http链接
          urls: urls // 需要预览的图片http链接列表
      })
  },
  inputBlur: function (t) {
    this.setData({
      [t.currentTarget.dataset.name]: t.detail.value.replace(/\s*/g,"")
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

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
    clearTimeout(this.time);
    this.time = null;
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