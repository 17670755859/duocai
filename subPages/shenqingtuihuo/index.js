// subPages/shenqingtuihuo/index.js
import { BASE_URL } from '../../http/const';
import { getFormData } from '../../utils/util';
import { OrderrefundRefund } from '../../http/api';
const { uploadFile } = require('../../http/uploadFile');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    url: BASE_URL,
    goods: {},
    type: '', // 退款类型 1仅退款 2退货退款 4换货
    number: 0, // 退货数量
    refund_reason: '', // 退货原因
    refund_remark: '', // 退货备注
    imgFile: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.time = null;
    let goods = JSON.parse(options.goods);
    goods.time = getFormData(goods.create_time)
    let type = options.type
    this.setData({
      goods: goods,
      type: type,
      number: goods.num
    });
  },
  // 上传图片
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
          let arr = that.data.imgFile;
          arr.push(BASE_URL+result.data.pic_path)
          that.setData({
            imgFile: arr
          })
        }
      }
    })
  },
  setNumber(e) {
    this.setData({
      number: e.detail
    })
  },
  onChange(e) {
    this.setData({
      refund_reason: e.detail
    })
  },
  inputBlur: function (t) {
    this.setData({
      [t.currentTarget.dataset.name]: t.detail.value.replace(/\s*/g,"")
    });
  },
  // 提交
  async submitHandler() {
    if (!this.data.number) {
      wx.showToast({
        title: '退货数量错误',
        icon: 'none'
      });
      return;
    }
    if(!this.data.refund_reason) {
      wx.showToast({
        title: '请选择退货原因',
        icon: 'none'
      });
      return;
    }
    if(!this.data.refund_remark) {
      wx.showToast({
        title: '请填写退货说明',
        icon: 'none'
      });
      return;
    }
    if(!this.data.imgFile.length) {
      wx.showToast({
        title: '请上传凭证',
        icon: 'none'
      });
      return;
    }
    let res = await OrderrefundRefund({
      refund_reason: this.data.refund_reason,
      refund_remark: this.data.refund_remark,
      refund_type: this.data.type,
      order_goods_ids: this.data.goods.order_goods_id,
      refund_num: this.data.number,
      images: this.data.imgFile.toString()
    });
    if(res.code == 0) {
      wx.showToast({
        title: '提交成功',
        icon: 'none'
      });
      this.time = setTimeout(() => {
        wx.reLaunch({
          url: '/pages/wode/index'
        })
      }, 800);
    }
  },
  // 删除图片
  deleteLandImage(e) {
    let index = e.currentTarget.dataset.index;
    let images = this.data.imgFile;
    images.splice(index, 1);
    this.setData({
      imgFile: images
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