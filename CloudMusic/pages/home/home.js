// pages/home/home.js
Page({

  toDetail(e) {
    var id = e.target.dataset.id
    console.log(e)
    wx.navigateTo({
      url: '/pages/sheetdetail/sheetdetail?id=' + id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  tosongsheet(){
    var sheeturl ="hotSongList";
    wx.navigateTo({
        url:'/pages/songsheet/songsheet?url='+sheeturl,
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    slider:[],
    highquality:[],
    hot:[1,2,3]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //轮播图
    wx.request({
      url: 'https://api.bzqll.com/music/netease/hotSongList?key=579621905&cat=全部&limit=4&offset=0',
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        //  console.log("success");
      },
      fail: function(res) {
        console.log("faild");
      },
      complete: (res)=> {
        // console.log(res);
        var data=res.data.data
        this.setData({
          slider:data

        })
        
      },
    });
    //精品歌单
    wx.request({
      url: 'https://api.bzqll.com/music/netease/highQualitySongList?key=579621905&cat=全部&limit=6',
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
        // console.log(res);
        this.setData({
           
          highquality:res.data.data.playlists

        })

      },

    })
    //推荐歌单
    wx.request({
      url: "https://api.bzqll.com/music/netease/hotSongList?key=579621905&cat=全部&limit=6&offset=1",
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
        console.log(res);
        this.setData({
          hot: res.data.data
        })
      },
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