// components/chexiao/index.js
const app=getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    show:false,
    isIPhoneX:app.globalData.isIPhoneX
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toClose(){
      this.setData({
        show:false
      })
    },
    showDialog(){
      this.setData({
        show:true
      })
    }
  }
})
