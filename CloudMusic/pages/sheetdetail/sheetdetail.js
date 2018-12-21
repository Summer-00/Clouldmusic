// pages/sheetdetail/sheetdetail.js
Page({
  ToMusicplayer(event){
    var id = event.currentTarget.dataset.id;
    // console.log(event)
    wx.navigateTo({
      url: '/pages/musicplay/musicplay?id=' + id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    detalis:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   var id=options.id;
   this.setData({
     id:id
   })

   wx.request({
     url: 'https://api.bzqll.com/music/netease/songList?key=579621905&id='+id+'&limit=10&offset=0',
     data: '',
     header: {},
     method: 'GET',
     dataType: 'json',
     responseType: 'text',
     success:(res)=>{},
     fail: function(res) {},
     complete:(res)=>{
       console.log(res.data.data);
       this.setData({
         details:res.data.data,
       })
     },
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})