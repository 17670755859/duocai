// subPages/searchResult/index.js
import {
  GoodsskuPage,
  GoodsGetGoodsAttr
} from '../../http/api';
import { BASE_URL } from '../../http/const';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: BASE_URL,
    keyword: '', //关键词
    lowPrice: '', //最低价
    topPrice: '', //最高价

    sortArr: [
      { sort: 'asc', title: '全部', active: true, show: false, value: '' },
      { sort: 'asc', title: '销量', active: false, show: true, value: 'sale_num' },
      { sort: 'asc', title: '价格', active: false, show: true, value: 'discount_price' }
    ],
    pageIndex: 1,
    pageSize: 10,
    noData: false,

    brand: [], // 品牌
    brandIndex: 0,
    material: [], // 材质
    materialIndex: 0,
    place: [], // 产地
    placeIndex: 0,

    type: [{id: '0', title: '全部'}, {id: '1', title: '多采'}, {id: '2', title: '优选'}, {id: '3', title: '京东'}],
    typeIndex: 0,

    list: [] // 商品列表

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.lock = false;
    this.setData({
      keyword: options.title || ''
    })
    this.brand = '';
    this.material = '';
    this.place = '';
    this.getGoodAttr() // 得到赛选条件
    this.getDataList() // 获取商城列表
  },
  // 商品详情
  toGoodsDetail(e) {
    wx.navigateTo({
      url: `/subPages/goodsDetail/index?id=${e.currentTarget.dataset.id}`,
    })
  },
  async getGoodAttr() {
    let res = await GoodsGetGoodsAttr();
    if(res) {
      this.setData({
        brand: res.data[1],
        material: res.data[2],
        place: res.data[3]
      })
    }
  },
  // 搜索
  searchSubmit() {
    this.setData({
      pageIndex: 1,
      noData: false
    })
    this.getDataList()
  },
  inputSearch(e) {
    this.setData({
      keyword: e.detail
    })
  },
  inputBlur: function (t) {
    this.setData({
      [t.currentTarget.dataset.name]: t.detail.value
    });
  },
  // 切换销量价格 - 条件 
  selectSort(e) {
    let index = e.currentTarget.dataset.index;
    let sorts = this.data.sortArr;
    for(let i = 0; i < sorts.length; i++) {
      if (index == i && sorts[i].active) {
        sorts[i].sort = sorts[i].sort == 'asc' ? 'desc' : 'asc'
      } else {
        if (index == i) {
          sorts[i].active = true
        } else {
          sorts[i].active = false
        }
      }
    }
    this.setData({
      sortArr: sorts,
      pageIndex: 1,
      noData: false
    })
    this.getDataList()
  },
  // 切换品牌
  changeBrand(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      brandIndex: index
    })
  },
  // 切换材质
  changeMeterilal(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      materialIndex: index
    })
  },
  // 切换产地
  changePlace(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      placeIndex: index
    })
  },
  changeType(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      typeIndex: index,
      pageIndex: 1,
      noData: false
    })
    this.getDataList();
  },
  // 确定
  onConfirm() {
    this.brand = this.data.brand[this.data.brandIndex].value;
    this.material = this.data.material[this.data.materialIndex].value;
    this.place = this.data.place[this.data.placeIndex].value;
    this.selectComponent('#item').toggle();
    this.setData({
      pageIndex: 1,
      noData: false
    })
    this.getDataList();
  },
  // 重置
  onReset() {
    this.selectComponent('#item').toggle();
    this.brand = '';
    this.material = '';
    this.place = '';
    this.setData({
      topPrice: 0,
      lowPrice: 0,
      brandIndex: 0,
      materialIndex: 0,
      placeIndex: 0,
      pageIndex: 1,
      noData: false
    })
    this.getDataList()
  },

  // 查询商品
  async getDataList() {
    let sort, order;
    if(this.data.noData) return;
    this.lock = true;
    for (let i = 0; i < this.data.sortArr.length; i++) {
      if (this.data.sortArr[i].active) {
        sort = this.data.sortArr[i].sort;
        order = this.data.sortArr[i].value;
      }
    }
    let res = await GoodsskuPage({
      keyword: this.data.keyword,
      page: this.data.pageIndex,
      page_size: this.data.pageSize,
      sort: sort,
      order: order,
      brand: this.brand,
      product: this.material,
      texture: this.place,
      max_price: this.data.topPrice,
      min_price: this.data.lowPrice,
      goods_type: this.data.type[this.data.typeIndex].id
    });
    if (res.code == 0) {
      this.lock = false;
      this.data.pageIndex++;
      let arr = []
      if(this.data.pageIndex == 2) {
        arr = res.data.list
      } else {
        arr = this.data.list;
        arr.push(...res.data.list)
      }
      this.setData({
        list: arr,
        noData: arr.length >= res.data.count
      })
    }
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
    if(this.lock) return;
    this.getDataList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})