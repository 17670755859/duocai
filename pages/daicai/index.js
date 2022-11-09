// pages/daicai/index.js
const app = getApp();
import {
  BASE_URL
} from '../../http/const';
import {
  categoryGetTree,
  GoodsskuPage,
  CartEdit,
  CartAdd,
  CartCount,
  CartDelete,
  GoodsDefaultSearchWords
} from '../../http/api';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: BASE_URL,
    keyword: '', // 搜索关键字
    type1List: [], // 商品分类树形结构
    activeIndex: 0,

    typeIndex: 0,
    goodsTypeIndex: 0,

    list: [], // 商品列表
    carNum: 0,
    hide_good_box: true,

    tabs: ['零差价代采', '优选', '京东直采'], // 站点类型 1 - 2 - 3
    activeTabsIndex: 0,

    selectShopId: '', //  当前选中分类id
    selectLevel: '', // 当前选中分类等级

    pageIndex: 1,
    pageSize: 10,
    noData: false // 没有更多？
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.lock = false; // 接口锁
    this.getSystemInfo();
    this.getShopThree();
    this.getKeyWord();
    if (app.globalData.hasPhone) {
      this.getCartNum()
    }
  },
  // 获取商品分类
  async getShopThree() {
    let site_id = this.data.activeTabsIndex + 1;
    let res = await categoryGetTree({
      site_id: 1,
      goods_type: site_id
    });
    if (res.code == 0) {
      this.setData({
        type1List: res.data
      })
      if(res.data.length) {
        this.changeBranch(res.data[0])
      } else {
        this.setData({
          list: []
        })
      }
    }
  },

  // 获取商品列表
  async goodsskuPage() {
    if(this.data.noData) return;
    this.lock = true;
    let { selectShopId, selectLevel } = this.data;
    let res = await GoodsskuPage({
      category_id: selectShopId,
      category_level: selectLevel,
      max_price: '',
      min_price: '',
      order: 'sale_num',
      sort: 'asc',
      page: this.data.pageIndex,
      page_size: this.data.pageSize,
      goods_type: this.data.activeTabsIndex + 1,
      brand: '',
      product: '',
      texture: '',
      keyword: ''
    });
    if (res.code == 0) {
      this.lock = false;
      let result = [];
      this.data.pageIndex++;
      if(this.data.pageIndex == 2) {
        result = res.data.list
      } else {
        result = this.data.list;
        result.push(...res.data.list)
      }
      this.setData({
        list: result,
        pageIndex: this.data.pageIndex,
        noData: result.length >= res.data.count
      })
    }
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
  goSearch() {
    wx.navigateTo({
      url: '/subPages/search/index',
    })
  },
  // 搜索关键字
  changeSearch(e) {
    wx.navigateTo({
      url: `/subPages/searchResult/index?title=${e.detail}`,
    })
  },
  changeTabs(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      activeTabsIndex: index,
      activeIndex: 0,
      typeIndex: 0,
      goodsTypeIndex: 0,

    })
    this.getShopThree();
  },
  getSystemInfo() {
    var statusbarH = wx.getSystemInfoSync().statusBarHeight;
    let jiaonang = wx.getMenuButtonBoundingClientRect()
    wx.getSystemInfo({
      success: res => {
        console.log(res.windowHeight, 444)
        this.setData({
          statusbarH: statusbarH,
          jiaonang: jiaonang.width + 12,
          height: app.globalData.isIPhoneX ? res.windowHeight - 350 : res.windowHeight - 265,
        });
        var hh = res.windowHeight;
        var width = res.windowWidth;
        this.busPos = {};
        this.busPos['x'] = width / 5 * 3 - 48; //购物车的位置
        this.busPos['y'] = hh - 56;
      }
    })
  },
  // 切换大分类
  changeType(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      activeIndex: index,
      typeIndex: 0,
      goodsTypeIndex: 0
    })
    this.changeBranch(this.data.type1List[index])
  },
  // 切换商品分类
  changeTypeGoods(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      typeIndex: index,
      goodsTypeIndex: 0
    })
    this.changeBranch(this.data.type1List[this.data.activeIndex].child_list[index])
  },
  //切换某个商品的分类
  changeGoodsItemType(e) {
    console.log(e)
    let {
      id,
      level,
      index
    } = e.currentTarget.dataset
    this.setData({
      goodsTypeIndex: index,
      selectShopId: id,
      selectLevel: level,
      pageIndex: 1,
      noData: false
    })
    this.goodsskuPage()
  },

  // 切换分支，-递归
  changeBranch(data) {
    if(this.data.selectShopId == data.category_id) return;
    if (data.child_list) {
      this.changeBranch(data.child_list[0])
    } else {
      this.setData({
        selectShopId: data.category_id,
        selectLevel: data.level,
        pageIndex: 1,
        noData: false
      })
      this.goodsskuPage()
    }
  },

  // 加入购物车
  async cartAdd(id, num, index) {
    this.requestStadus = true;
    let res = await CartAdd({
      sku_id: id,
      num: num
    });
    if (res.code == 0) {
      this.requestStadus = false;
      let list = this.data.list;
      list[index].cart_id = res.data;
      this.setData({
        list: list
      })
      this.getCartNum()
    }
  },

  // 修改购物车
  async cartEdit(id, num, sku_id, index) {
    if (id !== '') {
      this.requestStadus = true;
      let res = await CartEdit({
        cart_id: id,
        num: num
      });
      if (res.code == 0) {
        this.requestStadus = false;
        if (num <= 0) {
          this.data.list[index].cart_id = '';
          this.setData({
            list: this.data.list
          })
        }
        this.getCartNum()
      }
    } else {
      this.cartAdd(sku_id, num, index)
    }
  },

  // 删除购物车
  async deleteCart(id) {
    this.requestStadus = true;
    let res = await CartDelete({
      cart_id: id
    })
    if (res.code == 0) {
      this.requestStadus = false;
      this.getCartNum()
    }
  },
  bindInput(e) {
    let index = e.currentTarget.dataset.index;
    this.data.list[index].cart_num = e.detail.value;
    this.setData({
      list: this.data.list
    })
  },
  // 失去焦点
  blurInpit(e) {
    let index = e.currentTarget.dataset.index;
    let num = '';
    if (e.detail.value) {
      num = e.detail.value
    } else {
      num = 0;
      this.data.list[index].cart_num = 0;
      this.setData({
        list: this.data.list
      })
    }
    this.cartEdit(this.data.list[index].cart_id, num, this.data.list[index].sku_id, index)
  },
  // 减少购买数量
  reduceCart(e) {
    let index = e.currentTarget.dataset.index;
    if (!this.data.list[index].cart_num && this.data.list[index].cart_num <= 0) {
      return;
    }
    this.data.list[index].cart_num--;
    this.setData({
      list: this.data.list
    })
    if (this.data.list[index].cart_num <= 0) {
      this.deleteCart(this.data.list[index].cart_id)
    } else {
      this.cartEdit(this.data.list[index].cart_id, this.data.list[index].cart_num, this.data.list[index].sku_id, index)
    }
  },
  // 添加购买数量
  touchOnGoods(e) {
    let index = e.currentTarget.dataset.index;
    if(this.data.list[index].cart_num >= this.data.list[index].stock) {
      wx.showToast({
        title: '库存不足!',
        icon: 'none'
      });
      return;
    }
    this.finger = {};
    var topPoint = {};
    this.finger['x'] = e.touches["0"].clientX; //点击的位置
    this.finger['y'] = e.touches["0"].clientY;

    if (this.finger['y'] < this.busPos['y']) {
      topPoint['y'] = this.finger['y'] - 150;
    } else {
      topPoint['y'] = this.busPos['y'] - 150;
    }
    topPoint['x'] = Math.abs(this.finger['x'] - this.busPos['x']) / 2;

    if (this.finger['x'] > this.busPos['x']) {
      topPoint['x'] = (this.finger['x'] - this.busPos['x']) / 2 + this.busPos['x'];
    } else { //
      topPoint['x'] = (this.busPos['x'] - this.finger['x']) / 2 + this.finger['x'];
    }

    this.linePos = app.bezier([this.busPos, topPoint, this.finger], 200);
    this.startAnimation(e);
  },
  startAnimation: function (e) {
    var index = 0,
      that = this,
      bezier_points = that.linePos['bezier_points'];

    this.setData({
      hide_good_box: false,
      bus_x: that.finger['x'],
      bus_y: that.finger['y']
    })
    var len = bezier_points.length;
    index = len
    this.timer = setInterval(function () {
      for (let i = index - 1; i > -1; i--) {
        that.setData({
          bus_x: bezier_points[i]['x'],
          bus_y: bezier_points[i]['y']
        })

        if (i < 1) {
          clearInterval(that.timer);
          that.addGoodToCartFn(e);
          that.setData({
            hide_good_box: true
          })
        }
      }
    }, 25);
  },
  addGoodToCartFn(e) {
    let index = e.currentTarget.dataset.index;
    this.data.list[index].cart_num++;
    this.setData({
      list: this.data.list
    })
    this.cartEdit(this.data.list[index].cart_id, this.data.list[index].cart_num, this.data.list[index].sku_id, index)
  },

  // 商品详情
  toGoodsDetail(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/subPages/goodsDetail/index?id=${id}`,
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
    this.setData({
      activeTabsIndex: app.globalData.dcActive || 0
    })
    if (app.globalData.hasPhone) {
      this.getCartNum();
    }
    if (app.globalData.carNum > 0) {
      this.setData({
        carNum: app.globalData.carNum
      })
    }
  },
  // 加载更多
  loadMoreHandler() {
    if(this.lock) return;
    this.goodsskuPage()
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