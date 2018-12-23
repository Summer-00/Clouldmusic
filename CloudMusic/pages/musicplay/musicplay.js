// pages/musicplay/musicplay.js
const music = wx.getBackgroundAudioManager();
Page({
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
     music.play();//播放
      // console.log(parseInt(music.duration));
    }else{
      
      this.setData({
        isPlay: false
      })

      clearInterval(this.data.timer);
      music.pause();//暂停
    }
  }, 
  end(){
    this.setData({
      isPlay:false
    });
    this.playmusic();

  },
  //滑动滑块加载音乐位置
  sliderchange(e){
    console.log(e);
    music.seek(e.detail.value);

  },
  
  /**
   * 页面的初始数据
   */
  data: {
    songid:"",
    isPlay:false,
    rotate:0,
    timer:"",
    mp3:"http://127.0.0.1:4000/mp3/test.mp3",
    title:"",
    length:225,
    value:0
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
    //图片转动
    this.animation = wx.createAnimation(
      {
        duration: 500,
        timingFunction: "linear"
      }
    );
    //加载音乐
    music.src ="http://127.0.0.1:4000/mp3/test.mp3";
    music.title="test";
    setTimeout(()=>{
      console.log(music.duration);
    })
    
    this.playmusic();
    //监听播放自然结束
    music.onEnded(()=>{
      console.log(this.data.isPlay);
      this.playmusic();
    });
    //监听播放更新
    music.onTimeUpdate(()=>{
      // console.log(music.currentTime)
      this.setData({
        value: music.currentTime
      })

    })
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