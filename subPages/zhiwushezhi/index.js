// subPages/zhiwushezhi/index.js
import { JobGetJobLists, CompanyDeleteJob, CompanyAddJob } from '../../http/api';
const app = new getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
      list: [],
      jobName: '',
      company_id: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
      this.setData({
        company_id: app.globalData.userInfo.company_id
      })
      this.getJobs()
    },
    // 删除
    async deleteHandler(e) {
      let id = e.currentTarget.dataset.id;
      let res = await CompanyDeleteJob({
        job_id: id
      })
      if (res.code == 0) {
        this.getJobs()
      }
    },
    inputBlur: function (t) {
      this.setData({
        [t.currentTarget.dataset.name]: t.detail.value.replace(/\s*/g,"")
      });
    },
    // 获取所有职务
    async getJobs() {
      let res = await JobGetJobLists({
        company_id: this.data.company_id
      });
      if (res.code == 0) {
        this.setData({
          list: res.data
        })
      }
    },
    // 新增职务
    async addHandler() {
      if (!this.data.jobName) {
        wx.showToast({
          title: '请输入职务名称',
          icon: 'none'
        })
        return;
      }
      let res = await CompanyAddJob({
        name: this.data.jobName
      });
      if (res.code == 0) {
        this.setData({
          jobName: ''
        })
        this.getJobs()
      }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})