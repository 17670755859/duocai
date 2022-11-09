import { BASE_URL } from "../../../../http/const";
import { OrderSetAuditBack } from '../../../../http/api';
const app = new getApp();
// pages/caigoushenqing/modules/list/index.js
Component({
  options: {
		addGlobalClass: true
	},
	/**
	 * 组件的属性列表
	 */
	properties: {
    height: { // 属性名  滚动高度
      show_cx: false,
			type: Number, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
			value: '', // 属性初始值（可选），如果未指定则会根据类型选择一个
			observer: function(newVal, oldVal) {}
    },
    list: {
      type: Array,
      value: () => []
    }
  },
  
  observers: {
    list(val) {
      if (val == null) return;
      this.setData({
        result: val
      })
    }
  },

	/**
	 * 组件的初始数据
	 */
	data: {
    isIPhoneX: app.globalData.isIPhoneX,
    url: BASE_URL,
    result: [],
    goods: [],
    editOrderId: '',
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		toDetail(e) {
			let id = e.currentTarget.dataset.id
			wx.navigateTo({
				url: `/subPages/caigouxiangqing/index?id=${id}`,
			});
		},
		// 修改操作
		toXiugai(e) {
			wx.navigateTo({
				url: `/subPages/xiugai/index?id=${e.currentTarget.dataset.id}`,
			})
		},
		// 撤销操作
		chexiao(e) {
      let list = [];
      for(let i = 0; i < this.data.result.length; i++) {
        if(e.currentTarget.dataset.orderid == this.data.result[i].order_id) {
          list = this.data.result[i];
          break;
        }
      }
			this.setData({
        show_cx: true,
        goods: list,
        editOrderId: e.currentTarget.dataset.orderid
      })
    },
    async revokeHandler(e) {
      let res = await OrderSetAuditBack({
        order_id: this.data.editOrderId
      });
      if(res.code == 0) {
        this.setData({
          show_cx: false
        })
        this.triggerEvent('onChange')
      }
    },
    bindScrollToLower() {
      this.triggerEvent('scrollBottom')
    },
		onRefresh() {

		},
	}
})
