// subPages/tianjiarenyuan/index.js
const app = getApp();
import {
  RegisterUsername,
  JobGetJobLists,
  MemberInfo,
  MemberGetInfo,
  MemberSetMember
} from '../../http/api';
import {
  APPTYPE
} from '../../http/const';
import {
  validZh,
  validPhone
} from '../../utils/validate';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIPhoneX: app.globalData.isIPhoneX,
    show: false,
    jobs: [],
    id: '', // 用户id
    company_id: app.globalData.userInfo.company_id,
    username: '', // 用户名
    mobile: '', // 用户手机号
    job_id: '', // 职务id
    job_name: '', // 职务名称
    password: '', // 密码
    department_id: '', // 部门id
    department_name: '', // 部门名称
    realname: '', // 真实姓名
    roles: [], // 角色
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id || '';
    this.setData({
      id: id
    })
    this.getJobs();
    this.memberInfo();
  },
  showToast(msg) {
    wx.showToast({
      title: msg,
      icon: 'none'
    })
  },
  // 获取用户详情
  async memberGetInfo() {
    let res = await MemberGetInfo({
      member_id: this.data.id
    });
    if (res.code == 0) {
      let roles = this.data.roles;
      for(let i = 0; i < roles.length; i++) {
        for(let j = 0; j < res.data.roles.length; j++) {
          if(roles[i].role_name == res.data.roles[j].role_name) {
            roles[i].active = true
          }
        }
      }
      this.setData({
        username: res.data.nickname,
        mobile: res.data.mobile,
        job_name: res.data.jobName,
        job_id: res.data.job_id,
        password: 123,
        department_id: res.data.department_id,
        department_name: res.data.departmentName,
        realname: res.data.realname,
        roles: roles
      })
    }
  },
  // 添加人员
  async submitHandler() {
    if (!this.data.username) {
      this.showToast('请输入用户名')
      return;
    }
    if (!validZh(this.data.realname)) {
      this.showToast('用户姓名格式错误！')
       return;
     }
     if(!validPhone(this.data.mobile)) {
      this.showToast('用户手机格式错误！')
      return;
    }
    if (!this.data.job_id) {
      this.showToast('请选择职务!')
      return;
    }
    if (!this.data.department_id) {
      this.showToast('请选择部门!')
      return;
    }
    if(!this.data.password) {
      this.showToast('请输入密码!')
      return;
    }
    let role = [];
    for(let i = 0; i < this.data.roles.length; i++) {
      if(this.data.roles[i].active) {
        role.push(this.data.roles[i].role_id)
      }
    }
    if(!role.length) {
      this.showToast('请选择角色!')
      return;
    }
    if (!this.data.id) { // 修改
      let res = await RegisterUsername({
        app_type_name: APPTYPE,
        username: this.data.username,
        password: this.data.password,
        role: role.toString(),
        job_id: this.data.job_id,
        department_id: this.data.department_id,
        company_id: this.data.company_id,
        realname: this.data.realname,
        mobile: this.data.mobile
      });
      if(res.code == 0) {
        wx.navigateBack({
          delta: 0,
        })
      }
    } else {
      let res = await MemberSetMember({
        member_id: this.data.id,
        job_id: this.data.job_id,
        department_id: this.data.department_id,
        nickname: this.data.username,
        realname: this.data.realname,
        mobile: this.data.mobile,
        roles: role.toString()
      })
      if(res.code == 0) {
        wx.navigateBack({
          delta: 0,
        })
      }
    }
  },
  // 获取所有职务
  async getJobs() {
    let res = await JobGetJobLists({
      company_id: this.data.company_id
    });
    if (res.code == 0) {
      this.setData({
        jobs: res.data
      })
    }
  },
  toChoosePost() {
    if(!this.data.jobs.length) {
      wx.showToast({
        title: '请前往"我的->设置->职务设置"添加职务',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    this.setData({
      show: true
    })
  },
  toChooseBumen() {
    wx.navigateTo({
      url: '/subPages/selectbumen/index'
    })
  },
  onClose() {
    this.setData({
      show: false
    })
  },
  onSelect(e) {
    this.setData({
      show: false,
      job_id: e.detail.job_id,
      job_name: e.detail.name
    })
  },
  selectRole(e) {
    let index = e.currentTarget.dataset.index;
    let roles = this.data.roles;
    if (roles[index].role_name != '需求者') {
      
      roles[index].active = !roles[index].active
    }
    this.setData({
      roles: roles
    })
  },
  inputBlur: function (t) {
    this.setData({
      [t.currentTarget.dataset.name]: t.detail.value.replace(/\s*/g, "")
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
        department_id: res.id,
        department_name: res.name
      })
    }
  },
  // 获取用户信息
  async memberInfo() {
    let res = await MemberInfo();
    if (res.code == 0) {
      let _res = res.data.user_permission.map(v => Object.assign(v, {active: v.role_name == '需求者'}))
      this.setData({
        roles: _res
      })
      if (this.data.id) {
        this.memberGetInfo();
      }
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