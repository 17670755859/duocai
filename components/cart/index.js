const app = getApp();
const API = require("../../http/api")
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
Component({

  /**
   * 组件的属性列表
   * 用于组件自定义设置
   */
  properties: {

    recommend: {
      type: Array, //商品列表
      observer: function (newVal, oldVal) {

      }
    },
    isRefresh: {
      type: Number,
      observer: function (newVal, oldVal) {
        this.setData({
          express: [], //快递
          self_pick: [], //自提
          totalPrice: 0, //合计价格
          totalList: [], //自提和快递所有列表
          checkedList: [], //选中的list
          noTotal: false
        })
        this.getCartGoodsList();
      }
    }

  },

  /**
   * 私有数据,组件的初始数据
   * 可用于模版渲染
   */
  data: {
    show: false,
    imgFile: [],
    uploadIndex: 0,
    result: [],
    checked: false,
    isIPhoneX: false,
    bottom: 0,
    express: [], //快递
    self_pick: [], //自提
    totalPrice: 0, //合计价格
    totalList: [], //自提和快递所有列表
    checkedList: [], //选中的list
    noTotal: false
  },

  /**
   * 组件的方法列表
   * 更新属性和数据的方法与更新页面数据的方法类似
   */
  methods: {
    getCartGoodsList() {
      API.cartGoodsList().then(res => {
        if (res.data) {
          let totalList = [];
          for (let i in res.data.self_pick) {
            for (let j in res.data.self_pick[i].activityGoods) {
              let item = res.data.self_pick[i].activityGoods[j];
              item.subtotal = (Number(item.price) * Number(item.buy_num)).toFixed(2);
              totalList.push(item);
            }
          }
          for (let i in res.data.express) {
            for (let j in res.data.express[i].activityGoods) {
              let item = res.data.express[i].activityGoods[j];
              item.subtotal = (Number(item.price) * Number(item.buy_num)).toFixed(2);
              totalList.push(item)
            }
          }
          console.log(res.data.self_pick)
          this.setData({
            express: res.data.express,
            self_pick: res.data.self_pick,
            totalList: totalList
          })
        } else {
          this.setData({
            noTotal: true
          })
        }
      })
    },
    toConfirmOrder() {
      console.log('31231321')
      if (this.data.result.length == 0) {
        wx.showToast({
          title: '请选择商品',
          icon: 'none',
          duration: 3000
        });
        return;
      }
      this.judgeOrderType();

    },
    //判断选择商品是自提还是快递，如果是混合 提示用户不可以下单
    judgeOrderType() {
      // if(this.data.checked){
      //   if(this.data.self_pick.length>0&&this.data.express.length>0){
      //     wx.showToast({
      //       title: '只能选择自提或者快递商品中的一类',
      //       icon:'none',
      //       duration:3000
      //     });
      //     return;
      //   }
      //   this.toNavigateConfirmOrder('ziti');
      //   this.toNavigateConfirmOrder('kuaidi');


      // }else{

      let boolean = [];
      for (let i in this.data.result) {
        if (this.isZiti(this.data.result[i])) {
          boolean.push(1)
        }
        if (this.isKuaiDi(this.data.result[i])) {
          boolean.push(0)
        }
      }
      let str = boolean.join(",")
      if (str.indexOf('1') > -1 && str.indexOf('0') > -1) {
        wx.showToast({
          title: '只能选择自提或者快递商品中的一类',
          icon: 'none',
          duration: 3000
        });
        return;
      }

      if (str.indexOf('1') > -1) {
        this.toNavigateConfirmOrder('ziti')

      } else {
        this.toNavigateConfirmOrder('kuaidi')

      }



      // }

    },
    toNavigateConfirmOrder(type) {
      let checkedList = [];
      if (type == 'ziti') {
        for (let i in this.data.self_pick) {
          for (let j in this.data.self_pick[i].activityGoods) {
            let item = this.data.self_pick[i].activityGoods[j];
            for (let m in this.data.result) {
              if (this.data.result[m] == item.id && item.buy_num > 0) {
                checkedList.push({
                  community_id: item.community_id,
                  activity_goods_id: item.activity_goods_id,
                  buy_num: item.buy_num
                })
              }
            }
          }
        }
        console.log(checkedList);
        if (checkedList.length > 0) {
          wx.navigateTo({
            url: '/subPages/confirm/ziti/index?checkedList=' + JSON.stringify(checkedList),
          });
        } else {

          Toast('请选择需要自提购买的商品~');
        }

      } else if (type == "kuaidi") {
        for (let i in this.data.express) {
          for (let j in this.data.express[i].activityGoods) {
            let item = this.data.express[i].activityGoods[j];
            for (let m in this.data.result) {
              if (this.data.result[m] == item.id && item.buy_num > 0) {
                checkedList.push({
                  community_id: item.community_id,
                  activity_goods_id: item.activity_goods_id,
                  buy_num: item.buy_num
                })
              }
            }
          }
        }
        if (checkedList.length > 0) {
          wx.navigateTo({
            url: '/subPages/confirm/kuaidi/index?checkedList=' + JSON.stringify(checkedList),
          });
        } else {
          Toast(
            '请选择需要购买的商品'
          )
        }
      }
    },
    isZiti(key) {
      for (let i in this.data.self_pick) {
        for (let j in this.data.self_pick[i].activityGoods) {
          let item = this.data.self_pick[i].activityGoods[j]
          if (item.id == key) {
            return true;
          }
        }
      }
      return false;
    },
    isKuaiDi(key) {
      for (let i in this.data.express) {
        for (let j in this.data.express[i].activityGoods) {
          let item = this.data.express[i].activityGoods[j]
          if (item.id == key) {
            return true;
          }
        }
      }
      return false;
    },
    // 全选
    onSelectAll(e) {
      console.log(e.detail)
      if (e.detail) {
        let result = [];
        for (let i in this.data.self_pick) {
          for (let j in this.data.self_pick[i].activityGoods) {
            let item = this.data.self_pick[i].activityGoods[j];
            result.push(item.id + '')
          }
        }
        for (let i in this.data.express) {
          for (let j in this.data.express[i].activityGoods) {
            let item = this.data.express[i].activityGoods[j];
            result.push(item.id + '')
          }
        }
        console.log(result)
        this.setData({
          result: result
        })
      } else {
        this.setData({
          result: []
        })
      }
      this.recalculate();
      this.setData({
        checked: e.detail,
      });
    },
    // 联系团长
    caocatHead(e) {
      let user = e.currentTarget.dataset.user;
      let data = {
        avatar: user.avatar,
        nickname: user.nickname,
        wechat_qr_img: user.head.wechat_qr_img
      }
      const sonCompObj = this.selectComponent("#concat-head");
      sonCompObj.show(data);
    },
    onChange(e) {
      console.log('checkbox')
      console.log(e)
      this.setData({
        result: e.detail,
      });
      let totalPrice = 0;
      let checkedList = [];
      for (let i in this.data.totalList) {
        for (let j in e.detail) {
          if (this.data.totalList[i].id == e.detail[j]) {
            totalPrice += Number(this.data.totalList[i].subtotal);
            checkedList.push(this.data.totalList[i]);
          }
        }
      }
      console.log(this.data.result)
      this.setData({
        totalPrice: totalPrice.toFixed(2),
        checkedList: checkedList
      })
    },

    onStepperOver(event) {
      console.log(event)
    },
    onStepperChange(event) {
      console.log(event);
      let data = event.currentTarget.dataset;
      let bigIndex = data.bigindex; //最外层循环index
      let index = data.index; //内层循环index
      let price = data.price;
      let type = data.type
      // console.log(this.data.self_pick[bigIndex].activityGoods[index]);
      API.addCart({
        community_id: data.communityid,
        activity_goods_id: data.id,
        buy_num: event.detail
      }).then(res => {

        if (type == 'ziti') {
          this.data.self_pick[bigIndex].activityGoods[index].subtotal = (Number(price) * event.detail).toFixed(2);
          this.data.self_pick[bigIndex].activityGoods[index].buy_num = event.detail;
          if(event.detail==0){
            this.data.self_pick[bigIndex].activityGoods.splice(index,1)
            if(this.data.self_pick[bigIndex].activityGoods.length==0){
              this.data.self_pick.splice(bigIndex,1)
            }
          }
          this.setData({
            self_pick: this.data.self_pick
          });
        } else {
          this.data.express[bigIndex].activityGoods[index].subtotal = (Number(price) * event.detail).toFixed(2);
          this.data.express[bigIndex].activityGoods[index].buy_num = event.detail;
          if(event.detail==0){
            this.data.express[bigIndex].activityGoods.splice(index,1)
            if(this.data.express[bigIndex].activityGoods.length==0){
              this.data.express.splice(bigIndex,1)
            }
          }
          this.setData({
            express: this.data.express
          });
        }

        this.recalculate();
      })
    },

    //重新计算totalprice
    recalculate() {
      let totalPrice = 0;
      for (let i in this.data.self_pick) {
        for (let j in this.data.self_pick[i].activityGoods) {
          let item = this.data.self_pick[i].activityGoods[j];
          for (let m in this.data.result) {
            if (this.data.result[m] == item.id) {
              totalPrice += Number(item.price) * Number(item.buy_num)
            }
          }
        }
      }

      for (let i in this.data.express) {
        for (let j in this.data.express[i].activityGoods) {
          let item = this.data.express[i].activityGoods[j]
          for (let m in this.data.result) {
            if (this.data.result[m] == item.id) {
              totalPrice += Number(item.price) * Number(item.buy_num)
            }
          }
        }
      }
      this.setData({
        totalPrice: totalPrice.toFixed(2)
      })

    },
    show() {
      this.setData({
        show: true
      })
    },
    onClose() {
      this.setData({
        show: false
      })
    },
    addCar(e) {
      let data = e.currentTarget.dataset;
      API.addCart({
        community_id: data.communityid,
        activity_goods_id: data.id,
        buy_num: 1
      }).then(res => {
        if (res.code == 200) {
          wx.showToast({
            title: '添加成功',
            icon: 'none',
            duration: 3000
          });
          this.getCartGoodsList()
        }

      })
    },

    // 标记地址
    toSignAddress(e) {
      let data = e.currentTarget.dataset;
      wx.navigateTo({
        url: '/thirdPages/signAddress/index?type=zitidian&latitude=' + data.latitude + '&longitude=' + data.longitude,
      })
    },
    // 团长主页
    toHeadHomePage(e) {
      console.log(e);
      let user_id = e.currentTarget.dataset.user_id;
      wx.navigateTo({
        url: '/subPages/headHomePage/index?user_id=' + user_id,
      })
    },
    // 活动详情
    toActivityDetail(e) {
      let data = e.currentTarget.dataset;
      wx.navigateTo({
        url: '/subPages/activityDetail/index?id=' + data.id + '&community_id=' + data.community_id,
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
    var pages = getCurrentPages() //获取加载的页面

    var currentPage = pages[pages.length - 1] //获取当前页面的对象

    var url = currentPage.route //当前页面url


    this.setData({
      isIPhoneX: app.globalData.isIPhoneX,
      bottom: url.indexOf("pages/cart/index") > -1 ? (app.globalData.isIPhoneX ? '166rpx' : '98rpx') : 0,
      paddingBottom: url.indexOf("pages/cart/index") == -1 && app.globalData.isIPhoneX ? '68rpx' : 0
    });
    this.getCartGoodsList();
  },
  ready: function () {

  },

});