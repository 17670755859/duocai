import { GoodsDefaultSearchWords, GoodsHotSearchWords } from '../../http/api';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: '',
    placeholderText: '',
    hotWord: [],
    historyKey: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let word = wx.getStorageSync('key_word');
    if(word) {
      this.setData({
        historyKey: JSON.parse(word)
      })
    }
    this.getKeyWord();
    this.getHotWord();
  },

  // 得到搜索关键字
  async getKeyWord() {
    let res = await GoodsDefaultSearchWords();
    if(res.code == 0) {
      this.setData({
        keyword: res.data.words
      })
    }
  },
  async getHotWord() {
    let res = await GoodsHotSearchWords();
    if(res.code == 0) {
      let key = res.data.words ? res.data.words.split(',') : []
      this.setData({
        hotWord: key
      })
    }
  },
  inputBlur: function (t) {
    console.log(t)
    this.setData({
      [t.currentTarget.dataset.name]: t.detail.replace(/\s*/g,"")
    });
  },
  onClick() {
    wx.navigateTo({
      url: `/subPages/searchResult/index?title=${this.data.keyword}`,
    })
  },
  searchHandler(e) {
    wx.navigateTo({
      url: `/subPages/searchResult/index?title=${e.detail}`,
    })
  },
  toGoodsList(e) {
    wx.navigateTo({
      url: `/subPages/searchResult/index?title=${e.currentTarget.dataset.title}`,
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
    if (!this.data.noData) {
      this.data.page++;
      this.setData({
        page: this.data.page,
        isonPostReachBootom: true,
      });
      this.getList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})