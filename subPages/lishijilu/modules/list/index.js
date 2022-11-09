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
      console.log(newVal)
      this.setData({
        result: newVal
      })
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    result: [],
    obj: {},
    show_cx: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toDetail(e) {
      let id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: '/subPages/caigouxiangqing/index?id=' + id,
      });
    },

    // 撤销操作
    chexiao(e) {
      let index = e.currentTarget.dataset.index;
      this.setData({
        obj: this.data.result[index],
        show_cx: true
      })
    },
    cexiaoHandler(e) {
      console.log(e, 55)
      this.setData({
        show_cx: false
      })
      this.triggerEvent('confirm', this.data.obj)
    },
    bindScrollToLower() {
      this.triggerEvent('scroll')
    },
    onRefresh() {

    },
  }
})