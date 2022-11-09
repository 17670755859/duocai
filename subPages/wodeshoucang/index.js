// subPages/wodeshoucang/index.js
import {
  GoodscollectPage,
  GoodscollectDelete
} from '../../http/api';
import {
  BASE_URL
} from '../../http/const';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: BASE_URL,
    // 设置开始的位置
    startX: 0,
    startY: 0,
    dataList: [],
    pageIndex: 1,
    pageSize: 10,
    noData: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.lock = false;
    this.getDataList()
  },
  // 获取收藏列表
  async getDataList() {
    if(this.data.noData) return;
    this.lock = true;
    let res = await GoodscollectPage({
      page: this.data.pageIndex,
      page_size: this.data.pageSize
    });
    if (res.code == 0) {
      this.data.pageIndex++;
      this.lock = false;
      let result = [];
      let arr = res.data.list.map(v => Object.assign(v, {
        isTouchMove: false
      }))
      if(this.data.pageIndex == 2) {
        result = arr;
      } else {
        result = this.data.dataList;
        result.push(...arr);
      }
      this.setData({
        dataList: result,
        noData: result.length >= res.data.count
      })
    }
  },
  async deleteHandler(id) {
    let res = await GoodscollectDelete({
      goods_id: id
    })
    if (res.code == 0) {
      this.setData({
        pageIndex: 1
      })
      this.getDataList()
    }
  },
  // 开始滑动
  touchStart(e) {
    let dataList = [...this.data.dataList]
    dataList.forEach(item => {
      // 让原先滑动的块隐藏
      if (item.isTouchMove) {
        item.isTouchMove = !item.isTouchMove;
      }
    });
    // 初始化开始位置
    this.setData({
      dataList: dataList,
      startX: e.touches[0].clientX,
      startY: e.touches[0].clientY
    })
  },

  // 滑动~
  touchMove(e) {
    let moveX = e.changedTouches[0].clientX;
    let moveY = e.changedTouches[0].clientY;
    let indexs = e.currentTarget.dataset.index;
    let dataList = [...this.data.dataList]
    // 拿到滑动的角度，判断是否大于 30°，若大于，则不滑动
    let angle = this.angle({
      X: this.data.startX,
      Y: this.data.startY
    }, {
      X: moveX,
      Y: moveY
    });

    dataList.forEach((item, index) => {
      item.isTouchMove = false;
      // 如果滑动的角度大于30° 则直接return；
      if (angle > 30) {
        return
      }

      // 判断是否是当前滑动的块，然后对应修改 isTouchMove 的值，实现滑动效果
      if (indexs === index) {
        if (moveX > this.data.startX) { // 右滑
          item.isTouchMove = false;
        } else { // 左滑
          item.isTouchMove = true;
        }
      }
    })

    this.setData({
      dataList
    })
  },

  /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },

  // 删除
  delItem(e) {
    let id = e.currentTarget.dataset.id;
    this.deleteHandler(id)
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
    this.getDataList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})