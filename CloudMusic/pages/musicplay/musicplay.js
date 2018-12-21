// pages/musicplay/musicplay.js
Page({
  play(){
    innerAudioContext.play();
  },
  playmusic(){
    if(!this.data.isPlay){
      this.setData({
        isPlay: true
      })
      // console.log(this.animation);
      this.data.timer = setInterval(() => {
        var rotate = this.data.rotate + 10;
        // console.log(rotate)
        this.animation.rotate(rotate).step();

        this.setData({
          animation: this.animation.export(),
          rotate: rotate
        })

      }, 400);
    }else{
      
      this.setData({
        isPlay: false
      })
      clearInterval(this.data.timer);
    }
  }, 
  /**
   * 页面的初始数据
   */
  data: {
    songid:"",
    isPlay:false,
    rotate:0,
    timer:"",
    mp3:"http://127.0.0.1:4000/mp3/test.mp3"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var songid = options.id;
    this.setData({
      songid: songid
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.animation = wx.createAnimation(
      {
        duration: 500,
        timingFunction: "linear"
      }
    );
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