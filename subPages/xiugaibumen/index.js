// subPages/xinzengbumen/index.js
import { CompanyAddDepartment, DepartmentGetDetail } from '../../http/api';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    activeIndex: '',
    pid: '0', // 父级id
    parentName: '', // 父级名称
    name: '', // 部门名称
    department_id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.time = null;
    this.setData({
      department_id: options.id
    })
    this.getDepartment();
  },
  chooseDept(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      activeIndex: index
    })
  },
  //显示部门筛选
  toShowDept() {
    wx.navigateTo({
      url: '/subPages/selectbumen/index'
    })
  },
  // 获取部门详情
  async getDepartment() {
    let res = await DepartmentGetDetail({
      department_id: this.data.department_id
    })
    if (res.code == 0) {
      this.setData({
        name: res.data.name,
        pid: res.data.pid,
        parentName: res.data.pname
      })
    }
  },
  async toConfirm() {
    if (!this.data.name) {
      wx.showToast({
        title: '请输入部门名称',
        icon: 'none'
      })
      return;
    }
    let res = await CompanyAddDepartment({
      pid: this.data.pid,
      name: this.data.name
    })
    if(res.code == 0) {
      wx.showToast({
        title: '添加成功'
      })
      this.time = setTimeout(() => {
        wx.navigateBack({
          delta: 0,
        })
      }, 800);
    }
  },
  onClose() {
    this.setData({
      show: false
    })
  },
  inputBlur: function (t) {
    this.setData({
      [t.currentTarget.dataset.name]: t.detail.value.replace(/\s*/g,"")
    });
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
    let res = wx.getStorageSync('department_pid');
    if (res) {
      this.setData({
        pid: res.id,
        parentName: res.name
      })
    }
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
    wx.setStorageSync('department_pid', '')
    clearTimeout(this.time);
    this.time = null
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