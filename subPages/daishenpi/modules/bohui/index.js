// components/chexiao/index.js
const app=getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showBox: false,
    remark: '',
    isIPhoneX: app.globalData.isIPhoneX
  },
  observers: {
    show(newVal) {
      this.setData({
        showBox: newVal
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    toClose(){
      this.setData({
        showBox: false
      })
    },
    confirm() {
      this.triggerEvent('confirm', {remark: this.data.remark})
    },
    showDialog(){
      this.setData({
        showBox:true
      })
    },
    inputBlur: function (t) {
      this.setData({
        [t.currentTarget.dataset.name]: t.detail.value.replace(/\s*/g,"")
      });
    }
  }
})
