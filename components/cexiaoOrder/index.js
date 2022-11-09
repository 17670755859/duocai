import { BASE_URL } from "../../http/const"

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
    list: {
      type: Object,
      value: {
        order_no: '',
        goods_num: 0,
        order_money: 0,
        order_goods: []
      }
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
    confirm() {
      this.triggerEvent('confirm')
    },
    showDialog(){
      this.setData({
        show:true
      })
    }
  }
})
