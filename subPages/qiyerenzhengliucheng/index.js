// subPages/qiyerenzhengliucheng/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var statusbarH = wx.getSystemInfoSync().statusBarHeight;
        let jiaonang = wx.getMenuButtonBoundingClientRect()
        this.setData({
            statusbarH: statusbarH,
            jiaonang: jiaonang.width + 12,


        });
    },
    //返回上一页
    navigateBack() {
        wx.navigateBack({
            delta: 1
        })
    },
    //立即认证
    toRenzheng() {
        wx.navigateTo({
          url:'/subPages/lijirenzheng/step1/index'

        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})