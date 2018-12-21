// pages/musicplay/musicplay.js
const innerAudioContext = wx.createInnerAudioContext()
Page({
  play(){
    innerAudioContext.play();
  },
  Playmusic(){
    console.log(this);
    if(this.data.isPlay==false){
      this.setData({
      isPlay:true
      })
    }else{
      this.setData({
        isPlay: false
      })
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    songid:"",
    isPlay:"false"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    // innerAudioContext.src ="http://127.0.0.1:4000/mp3/bg.mp3";
  
    // play();
    // var songid = options.id;
    // this.setData({
    //   songid: songid
    // })
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
    innerAudioContext.src = "http://127.0.0.1:4000/mp3/bg.mp3"
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