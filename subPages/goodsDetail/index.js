const app=getApp();
import { GoodsskuDetail, GoodscollectAdd, GoodscollectDelete, CartCount, CartAdd, CartEdit } from '../../http/api';
import { BASE_URL } from '../../http/const';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: BASE_URL,
    statusbarH:"",
    jiaonang:'',
    active:'',
    sku_id: '', //商品id
    isIPhoneX:false,
    goodNum: 1, // 采购数量
    carNum: 0, //购物车数量
    goodInfo: {} // 商品详情
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.time = null
    var statusbarH = wx.getSystemInfoSync().statusBarHeight;
    let jiaonang = wx.getMenuButtonBoundingClientRect()
    this.setData({
      sku_id: options.id,
      statusbarH: statusbarH,
      jiaonang:jiaonang.width + 12,
      isIPhoneX:app.globalData.isIPhoneX
     
    });
    this.goodsskuDetail(options.id);
  },
  navigateBack(){
    wx.navigateBack({
      delta: 1
    })
  },
  onChange(event) {
    this.setData({
      goodNum: event.detail
    })
  },
  // 获取商品详情
  async goodsskuDetail(id) {
    let res = await GoodsskuDetail({
      sku_id: id
    });
    if(res.code == 0) {
      let result = Object.assign(res.data.goods_sku_detail, {goods_content: this.dealRichText(res.data.goods_sku_detail.goods_content), banner: res.data.goods_sku_detail.goods_image ? res.data.goods_sku_detail.goods_image.split(',') : []});
      this.setData({
        goodInfo: result
      })
      console.log(result)
    }
  },

  // 立即采购
  async submitHandler(e) {
    let res = await CartAdd({
      sku_id: this.data.sku_id,
      num: this.data.goodNum
    });
    if(res.code == 0) {
      this.getCartNum()
      if (e.currentTarget.dataset.type == 1) {
        
      } else {
        wx.navigateTo({
          url: `/subPages/caigoushenqing/index?ids=${res.data}`,
        })
      }
    }
  },
  // 处理图片自适应
  dealRichText(richtext) {
    let content = '';
    content = richtext.replace(/<img/gi, '<img style="max-width:100%;height:auto"')
        .replace(/<br\/>/g, '');
    return content
  },
  async collectionHandler(e) {
    let { status, skuid, goodid } = e.currentTarget.dataset;
    if(status == 1) {// 取消
      let res = await GoodscollectDelete({
        goods_id: goodid
      })
      if(res.code == 0) {
        this.goodsskuDetail(this.data.sku_id)
      }
    } else {// 收藏
      let res = await GoodscollectAdd({
        goods_id: goodid,
        sku_id: skuid
      })
      if(res.code == 0) {
        this.goodsskuDetail(this.data.sku_id)
      }
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
  goCart() {
    wx.reLaunch({
      url: '/pages/cart/index',
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
    app.globalData.hasPhone && this.getCartNum()
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
    this.time = null
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