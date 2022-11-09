const app = getApp();
Component({

  /**
   * 组件的属性列表
   * 用于组件自定义设置
   */
  properties: {





  },

  /**
   * 私有数据,组件的初始数据
   * 可用于模版渲染
   */
  data: {
    show: false,
    user:{}
  },

  /**
   * 组件的方法列表
   * 更新属性和数据的方法与更新页面数据的方法类似
   */
  methods: {
    show(user) {
      this.setData({
        show: true,
        user:user
      })
    },
    // 拨打电话
    call() {
      wx.makePhoneCall({
        phoneNumber: this.data.mobile,
      })

    },
    onClose() {
      console.log(31231)
      this.setData({
        show: false
      })
    },



    /*
     * 内部私有方法建议以下划线开头
     * triggerEvent 用于触发事件
     */
    _cancel() {
      //触发取消回调
      this.hideDialog();
    },
    _confirm() {
      //触发成功回调
      var myEventDetail = {
        name: 'hello'
      } // detail对象，提供给事件监听函数
      this.triggerEvent('confirm', myEventDetail);
      this.hideDialog();
    },

  },
  attached: function () {

    console.log(this.data.user_id);
  },
  ready: function () {


  },

});