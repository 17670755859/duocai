import { BASE_URL } from "../../../../http/const";

// components/chexiao/index.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean
    },
    goods: {
      type: Object,
      value: {

      }
    }
  },
  observers: {
    show(newVal) {
      this.setData({
        showBox: newVal
      })
    },
    goods(newVal) {
      this.setData({
        goodsInfo: newVal
      })
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    showBox: false,
    url: BASE_URL,
    isIPhoneX: app.globalData.isIPhoneX,
    goodsInfo: {
      sku_name: '',
      introduction: '',
      sku_image: '',
      price: 0,
      num: 0,
      goods_money: 0,
      market_price: 0,
      discount_price: 0
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    confirm() {
      this.triggerEvent('confirm', this.data.goodsInfo)
    },
    toClose() {
      this.setData({
        show: false
      })
    },
    showDialog() {
      this.setData({
        show: true
      })
    },
    onSteperChange(event) {
      let goodsInfo = this.data.goodsInfo;
      goodsInfo.num = event.detail
      this.setData({
        goodsInfo: goodsInfo
      })
    }
  }
})