import { BASE_URL } from "../../../../http/const";

// components/chexiao/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    order: {
      type: String
    },
    totalNum: {
      type: String | Number
    },
    totalMoney: {
      type: String
    },
    list: {
      type: Array,
      value: () => []
    }
  },
  observers: {
    show(newVal) {
      this.setData({
        showBox: newVal
      })
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    url: BASE_URL,
    showBox: false
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
    },
    confirm() {
      this.triggerEvent('confirm')
    }
  }
})
