const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: ''
    },
    showBack: {
      type: Boolean,
      value: false,
     
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusbarH:app.globalData.statusbarH
  },

  /**
   * 组件的方法列表
   */
  methods: {
    naviBack(){
      wx.navigateBack({
        delta: 1,
      })
    }
  },
  ready() {


  },
  pageLifetimes: {
   
  }
})