// pages/caigoushenqing/modules/list/index.js
const timeFormat = require("../../../../utils/timeFormat")
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        height: { // 属性名  滚动高度
            type: Number, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
            value: '', // 属性初始值（可选），如果未指定则会根据类型选择一个
            observer: function (newVal, oldVal) {}
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        currentDate: new Date().getTime(),
        maxDate: new Date().getTime(),
    },

    /**
     * 组件的方法列表
     */
    methods: {
        toDetail(e) {
            let status = e.currentTarget.dataset.status
            wx.navigateTo({
                url: '/subPages/caigouxiangqing/index?status=' + status,
            });
        },
        // 修改操作
        toXiugai() {
            wx.navigateTo({
                url: '/subPages/xiugai/index',
            })
        },
        // 撤销操作
        chexiao() {
            const sonCompObj = this.selectComponent("#chexiao");

            sonCompObj.showDialog();
        },
        showChooseDate(){
            this.setData({
                show:true
            })
        },
        //确定选择时间
        onConfirm(event){
            console.log(event);
            this.setData({
              currentDate:timeFormat.formatTime(event.detail, 'YY-MM') ,
              date:timeFormat.formatTime(event.detail, 'YY-MM'),
             
             
              show:false
            });
      
          },
          onCancel(){
            this.setData({
              show:false
            })
          },
        bindScrollToLower() {

        },
        onRefresh() {

        },
    },
    attached: function () {

        let date = new Date().getTime();
        this.setData({
          date: timeFormat.formatTime(date, 'YY-MM'),
          dateStr: timeFormat.formatTime(date, 'YY年MM月'),
        });


    
      },
})