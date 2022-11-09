const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    activeIdx: {
      type: Number,
      value: 0
    },
    carNum:{
      type:Number,
      value:0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    active: 0,
    isIPhoneX:false,
    tabbarList: ["pages/index/index",
      "pages/cart/index",
      "pages/release/index",
      "pages/order/index",
      "pages/wode/index",
    ],
    tabbarList:[
      {
        pagePath:"pages/index/index",
        iconPath:'../images/menu/shouye.png',
        selectedIconPath:'../images/menu/shouye-a.png',
        text:'首页'
      },
      {
        pagePath:"pages/daicai/index",
        iconPath:'../images/menu/daicai.png',
        selectedIconPath:'../images/menu/daicai-a.png',
        text:'代采'
      },
      {
        pagePath:"pages/cart/index",
        iconPath:'../images/menu/gouwuche.png',
        selectedIconPath:'../images/menu/gouwuche-a.png',
        text:'购物车'
      },
      {
        pagePath:"pages/caigoushenqing/index",
        iconPath:'../images/menu/caigoushenqing.png',
        selectedIconPath:'../images/menu/caigoushenqing-a.png',
        text:'采购申请',
      },
      {
        pagePath:"pages/wode/index",
        iconPath:'../images/menu/wode.png',
        selectedIconPath:'../images/menu/wode-a.png',
        text:'我的',
      },
    ],
    hasPhone:false,

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(e){
      console.log(e);
      let index=e.detail;
     
        wx.switchTab({
          url: `/${this.data.tabbarList[index]}`,
        })
  
    },
    handleItemTap(e) {
      const {
        idx,
        path
      } = e.currentTarget.dataset

      if (idx === this.data.activeIdx) {
        this.trigger('refresh')
        return
      }
      wx.switchTab({
        url: `/${path}`,
      })
    },
    trigger(eventName, value = {}, info) {
      if (!eventName) {
        throw new TypeError('没有自定义事件名')
      }
      this.triggerEvent(eventName, value)
      console.log(`发送 ${eventName} 事件,携带的值为 ${typeof value === 'object' ? JSON.stringify(value) : value} ${info ? '   ---   ' + info : ''}`)
    }
 
  },
  ready() {
   

    this.setData({
      isIPhoneX:app.globalData.isIPhoneX,
    
    })

  },

})