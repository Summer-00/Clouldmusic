// pages/home/component/song sheet.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      list:{
        type: Array,
        value:[],
        observer:function(){
          // console.log(this)
        }
        
      }
  },

  /**
   * 组件的初始数据
   */
  data: {
    list:[],
    // url:""

  },
  ready(){
    // console.log(this.data.url)
  //   wx.request({
  //     url:this.data.url,
  //     data: '',
  //     header: {},
  //     method: 'GET',
  //     dataType: 'json',
  //     responseType: 'text',
  //     success: function (res) {
  //       console.log("success");
  //     },
  //     fail: function (res) {
  //       console.log("faild");
  //     },
  //     complete: (res) => {
  //       console.log(res);
  //       this.setData({
  //         list: res.data.data
  //       })
  //     },
  //   });
  // console.log(this.data.list)
   
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toDetail(e){
      var id=e.target.dataset.id
      // console.log(e)
      wx.navigateTo({
        url: '/pages/sheetdetail/sheetdetail?id='+id,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }
    
  }
})
