const app = getApp();
const API=require('../../http/api')
var upload = require('../../http/uploadFile.js')
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
    imgFile: [],
    uploadIndex: 0,
    form:{
      content:''
    },
    data:{}
  },

  /**
   * 组件的方法列表
   * 更新属性和数据的方法与更新页面数据的方法类似
   */
  methods: {
    handleSubmit(){
      if(!this.data.form.content){
        wx.showToast({
          title: '请输入投诉内容',
          icon:'none',
          duration:4000
        });
        return;
      }
      let imgFile=this.data.imgFile.map(e=>{
        return e.url
      })
      API.submitReport({content:this.data.form.content,imgs:imgFile,activity_id:this.data.data.activity_id,community_id:this.data.data.community_id}).then(res=>{
        wx.showToast({
          title: '投诉成功,平台审核中...',
          icon:'none',
          duration:4000
        });
        this.data.form.content=""
        this.setData({
          show:false,
          imgFile:[],
          form:this.data.form
        })
      })
    },
    bindInput(e){
      this.data.form.content=e.detail.value;
      this.setData({
        content:this.data.content
      })
    },
    chooseImage() {
      if (this.data.imgFile.length > 7) {
        wx.showModal({
          title: '提示',
          content: '最多上传8张图片',
          showCancel: false,
        })
        return;
      }
      this.setData({
        uploadIndex: 0,
      });
      var count = 8 - this.data.imgFile.length;
    
      wx.chooseMedia({
        count: count,
        mediaType: ['mix'],
        maxDuration: 30,
        sourceType: ['album', 'camera'],
        success: (res) => {
          this.upload(res.tempFiles);
        },
      })
    },
    upload(tempFilePaths) {
      wx.showLoading({
        title: '上传中...',
        icon: 'loading',
        mask: true
      })
      upload.uploadFile(tempFilePaths[this.data.uploadIndex].tempFilePath).then(res => {
        this.data.imgFile.push({
          url: res.url,
          video_cover_img: res.video_cover_img,
          type: res.url.indexOf(".mp4") > -1 ? 'video' : "image"
        })
        var index = this.data.uploadIndex + 1;
        this.setData({
          uploadIndex: index,
          imgFile: this.data.imgFile
        });

        if (this.data.uploadIndex < tempFilePaths.length) {

          setTimeout(() => {
            this.upload(tempFilePaths);
          }, 500)
        }
      })
    },
    //图片预览
    previewImage(e) {
      let url = e.currentTarget.dataset.url;
      let urls=[];
      for(let i in this.data.imgFile){
        if(this.data.imgFile[i].type=="image"){
          urls.push(this.data.imgFile[i].url)
        }
      }
  
      console.log(urls)
      wx.previewImage({
        current: url, // 当前显示图片的http链接
        urls: urls // 需要预览的图片http链接列表
      })
    },
    //删除图片
    deleteLandImage(e) {
      let index = e.currentTarget.dataset.index;
      this.data.imgFile.splice(index, 1);
      this.setData({
        imgFile: this.data.imgFile,

      })
    },
    show(data) {
      this.setData({
        show: true,
        data:data,
     
      })
    },
    onClose() {
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

  },
  ready: function () {

  },

});