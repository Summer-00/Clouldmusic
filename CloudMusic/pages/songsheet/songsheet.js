// pages/songsheet/songsheet.js
Page({

  /**
   * 页面的初始数据
   */
  getMore(url){
    
    //分页查询
    wx.request({
      url:url,
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        // console.log("success");
      },
      fail: function (res) {
        console.log("faild");
      },
      complete: (res) => {
        console.log(this.data.list);
        console.log(res.data.data);

        // var newdata = this.data.list.concat(res.data.data)
        if(this.data.list.length==res.data.data.length){
          this.setData({
            more:false
          })
        }
        console.log(this.data.more)
        this.setData({
          list: res.data.data
        })
        this.setData({
          page: this.data.page+12
        })


        
      },
    });
  },
  data: {
    list:[],
    page:12,
    url:'',
    more:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var url=this.options.url;
    var firstpage = 'https://api.bzqll.com/music/netease/' + url + '?key=579621905&cat=全部&limit=' + this.data.page +'&offset=0'
     
    this.getMore(firstpage)
    this.setData({
      url:url
    })

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
    console.log(111);
    if(this.data.more){
      var getTimestamp = new Date().getTime()
      var url = 'https://api.bzqll.com/music/netease/' + this.data.url + '?key=579621905&cat=全部&limit=' + this.data.page + '&offset=0'

      // + "&timestamp=" + getTimestamp
      this.getMore(url)
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})