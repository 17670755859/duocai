const API = require('../../http/api')
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
    // 弹窗显示控制
    show: false,
    list: [],
   
    step: 1,
    stepArr: ['请选择省', '请选择城市', '请选择区'],
   
 province:[],//省
 city:[],//市
 area:[],//区
 province_id:'',city_id:'',region_id:'',
provinceName:'',
cityName:'',
areaName:''
  },

  /**
   * 组件的方法列表
   * 更新属性和数据的方法与更新页面数据的方法类似
   */
  methods: {
    /*
     * 公有方法
     */


  show(){
    this.setData({
      show:true
    })
  },
    getArea(){
      API.areaList().then(res=>{
        res.data=res.data.map(item=>({
          ...item,type:1
        }))
        this.setData({
          province:res.data,
          list:res.data,
        
        })
      })

    },



    
    chooseItems(e) {
      let type = e.currentTarget.dataset.type;
      let index=e.currentTarget.dataset.index;
      let name = e.currentTarget.dataset.name;
      let id = e.currentTarget.dataset.id;
      console.log('type::::',type);
      switch (type) {
        case 1:
          this.data.list=this.data.list[index].sub.map(e=>({
            ...e,type:2,
          }));
        
          this.data.stepArr[0]=name;

          this.setData({
            step:2,
            city:this.data.list,
            list:this.data.list,
            stepArr:this.data.stepArr,
            provinceName:name,
            province_id:id
          })
          break;
        case 2:
          this.data.stepArr[1]=name;
          if(this.data.list[index].sub.length==0){
          
            this.setData({
              show: false,
              cityName:name,
              city_id:'',
            })
            // this.triggerEvent('getAddress', this.data);
          }else{
            this.data.list=this.data.list[index].sub.map(e=>({
              ...e,type:3,
            }));
            console.log(this.data.list[index].sub);
         
            this.setData({
              list:this.data.list,
              area:this.data.list,
              step:2,
              stepArr:this.data.stepArr,
              cityName:name,
              city_id:id
            })
        
          }
     

          break;
        case 3:
          this.data.stepArr[2] = name;
          this.setData({
            stepArr:this.data.stepArr,
            step: 3,
            areaName:name,
            region_id:id
          })
         
          // this.triggerEvent('getAddress', this.data);
          // this.setData({
          //   show: false
          // })
          break;
      }
      this.setData({
        stepArr:this.data.stepArr
      });
      console.log(this.data.province);
      console.log(this.data.city);
      console.log(this.data.area);
    },

    handleSubmit(){
      this.triggerEvent('getAddress', this.data);
      this.setData({
        show:false
      });
    },

    chooseHeaderItem(e){
      let index = e.currentTarget.dataset.index;
      switch (index){
        case 0:
          this.setData({
            step:1,
            stepArr: ['请选择省', '请选择城市', '请选择区'],
            list:this.data.province,
          });
          break;
          case 1:
          this.setData({
            step: 2,
            stepArr: [this.data.provinceName, '请选择城市', '请选择区'],
            list: this.data.city,
          });
          break;
        case 2:
          this.setData({
            step: 3,
            stepArr: [this.data.provinceName, this.data.cityName, '请选择区'],
            list: this.data.area,
          });
          break;
         
      }
    

      
    },


    confirm(){
      let data={
        buildingFullName: this.data.buildingFullName,
        buildingId:this.data.buildingId
      }
      this.triggerEvent('myevent', data);
      this.setData({
        isShow:false
      })
    },
    onClose(){
      this.setData({
        show:false
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
    }
  },
  attached: function () {

  },
  ready: function () {
   this.getArea();

  

  },

});