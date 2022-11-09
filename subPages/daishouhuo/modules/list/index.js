import { BASE_URL } from "../../../../http/const";

// pages/caigoushenqing/modules/list/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    height: { // 属性名  滚动高度
      type: Number, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: '', // 属性初始值（可选），如果未指定则会根据类型选择一个
      observer: function (newVal, oldVal) {}
    },
    list: {
      type: Array,
      value: () => []
    }
  },
  observers: {
    list(newVal) {
      this.setData({
        result: newVal
      })
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    url: BASE_URL,
    result: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 采购详情
    toCgxq(e) {
      let id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: '/subPages/tuihuanhuoxiangqing/index?id='+id,
      })
    },
    toDetail(e) {
      let id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: '/subPages/shouhuoxiangqing/index?id=' + id,
      });
    },
    // 修改操作
    toXiugai() {
      wx.navigateTo({
        url: '/subPages/xiugai/index',
      })
    },
    // 确定收货
    confirmHandler(e) {
      this.triggerEvent('confirm', e.currentTarget.dataset.id)
    },
    bindScrollToLower() {
      this.triggerEvent('scrollBottom')
    },
    onRefresh() {

    },
  }
})