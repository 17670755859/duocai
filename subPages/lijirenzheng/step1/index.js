const app = getApp();
const { AddressLists } =  require('../../../http/api');
const { uploadFile } = require('../../../http/uploadFile');
import { BASE_URL } from '../../../http/const';
Page({

    /**
     * 页面的初始数据
     */
    data: {
      url: BASE_URL,

      company_name: '', // 幼儿园名称
      company_nickname: '', // 常用名
      province: '', // 省
      city: '', // 市
      district: '', // 区
      address: '', // 详细地址
      nature: '', // 1民办非普惠 2民办普惠 3公办普惠
      permission: '', // 办学许可证
      people_id_posi: '', // 法人身份证 正面
      people_id_nega: '', // 法人身份证 反面
      bus: '', // 营业执照
      user_realname: '', // 用户真实姓名
      user_mobile: '', // 用户手机号 唯一 不可更改
      user_pass: '', // 用户密码
      captcha_code: '', // 验证码
      captcha_key: '', // 验证码key
      province_id: '', // 省id
      city_id: '', // 市id
      district_id: '', // 区id
      lat: '', // 纬度
      lng: '', // 经度

      multiArray: [
        [{id:-1,name:"请选择省"}],
        [{id:-1,name:"市"}],
        [{id:-1,name:"区"}]
      ],
      multiIndex: [0,0,0]
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      this.getAddress('', 1)
    },
  
    onRadioChange(event) {
      this.setData({
        nature: event.detail,
      });
    },
    async chooseImage(e){
      let that = this
      let keyName = e.currentTarget.dataset.name
      wx.chooseMedia({
        count: 1,
        mediaType: ['image'],
        sourceType: ['album', 'camera'],
        async success (res) {
          const tempFilePaths = res.tempFiles[0].tempFilePath
          let result = await uploadFile(tempFilePaths)
          if (result.code == 10067) {
            that.setData({
              [keyName]: BASE_URL + result.data.pic_path
            })
          }
        }
      })
    },
    toNext(){
      let objKeysArr = ['company_name', 'company_nickname', 'province', 'city', 'district',
        'address', 'nature', 'bus', 'permission', 'people_id_posi', 'people_id_nega'
      ]
    let msgArr = ['请输入营业执照名称', '请输入常用名','请选择地址', '请选择地址', '请选择地址', '请输入详细地址','请选择办学性质',
      '请上传营业执照', '请上传办学许可证', '请上传法人身份证正面', '请上传法人身份证反面'
    ];
      let index = -1;
      for(let i = 0; i < objKeysArr.length; i++) {
        if(!this.data[objKeysArr[i]]) {
          console.log(this.data[objKeysArr[i]])
          index = i;
          break;
        }
      }
      if (index !== -1) {
        wx.showToast({
          title: msgArr[index],
          icon: 'none'
        })
        return;
      }
      let query = {
        company_name: this.data.company_name, // 幼儿园名称
        company_nickname: this.data.company_nickname, // 常用名
        province: this.data.province, // 省
        city: this.data.city, // 市
        district: this.data.district, // 区
        address: this.data.address, // 详细地址
        nature: this.data.nature, // 1民办非普惠 2民办普惠 3公办普惠
        permission: this.data.permission, // 办学许可证
        people_id_posi: this.data.people_id_posi, // 法人身份证 正面
        people_id_nega: this.data.people_id_nega, // 法人身份证 反面
        bus: this.data.bus, // 营业执照
        province_id: this.data.province_id, // 省id
        city_id: this.data.city_id, // 市id
        district_id: this.data.district_id, // 区id
      }
      wx.navigateTo({
        url: `/subPages/lijirenzheng/step2/index?query=${JSON.stringify(query)}`,
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
    onShow: function() {},

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

    },
    inputBlur: function (t) {
      this.setData({
        [t.currentTarget.dataset.name]: t.detail.value.replace(/\s*/g,"")
      });
    },
    // 获取省市区
    async getAddress(pid, level) {
      let res = await AddressLists({
        pid: pid
      })
      if (res.code == 0) {
        this.setData({
          multiArray: [level == 1 ? res.data : this.data.multiArray[0], level == 2 ? res.data : this.data.multiArray[1], level == 3 ? res.data : this.data.multiArray[2]]
        })
        if (level<3) {
          this.getAddress(res.data[0].id, level+1)
        }
      }
    },
    // 选择地区
    bindMultiPickerChange: function (e) {
      console.log(e.detail.value)
      let data = e.detail.value;
      this.setData({
        multiIndex: data,
        province: this.data.multiArray[0][data[0]].name,
        city: this.data.multiArray[1][data[1]].name,
        district: this.data.multiArray[2][data[2]].name,
        province_id: this.data.multiArray[0][data[0]].id,
        city_id: this.data.multiArray[1][data[1]].id,
        district_id: this.data.multiArray[2][data[2]].id
      })
    },
    // 滑动省市区
    bindMultiPickerColumnChange(e) {
      var data = {
        multiIndex: this.data.multiIndex
      }
      if (e.detail.column == 0) {
        data.multiIndex[e.detail.column] = e.detail.value;
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
      } else if (e.detail.column == 1){
        data.multiIndex[e.detail.column] = e.detail.value;
        data.multiIndex[2] = 0;
      } else if (e.detail.column == 2) {
        data.multiIndex[e.detail.column] = e.detail.value;
      }
      this.setData(data)
      if (e.detail.column<2) {
        this.getAddress(this.data.multiArray[e.detail.column][e.detail.value].id, this.data.multiArray[e.detail.column][e.detail.value].level+1)
      }
    }
})