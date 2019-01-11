// pages/musicplay/musicplay.js
const music = wx.getBackgroundAudioManager();
const app=getApp();
Page({
  playmusic(){
    if(!this.data.isPlay){
      this.setData({
        isPlay: true
      })
      this.data.timer = setInterval(() => {
        var rotate = this.data.rotate + 10;
        this.animation.rotate(rotate).step();

        this.setData({
          animation: this.animation.export(),
          rotate: rotate
        })

      }, 400);
     music.play();//播放
  
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
  getlength(length){
    
    //音乐时间长度
    var second = length % 60;
    var min = (length - second) / 60;
    min = min >= 10 ? min : "0" + min;
    second = second >= 10 ? second : "0" + second;
    var time = min + ":" + second;
    return time;

  },
  showlyric(){
    //歌词
    if (this.data.showlist=="active") {
      this.setData({
        showlist: ""
      })
      return
    }
    if(this.data.show){
      this.setData({
        show: false
      })
    }else{
      this.setData({
        show: true
      })
    }
  },
  showlist(){
    //播放列表
    console.log(1);
    if (this.data.showlist=="active") {
      this.setData({
        showlist:""
      })
    } else {
      this.setData({
        showlist:"active"
      })
    }
  },
  next(){
    //下一首
    // if (this.data.number == app.globalData.songlistdata.length-1){
    //   return
    // }
    // var index= this.data.number+1;
    // var id = app.globalData.songlistdata[index].id
    // app.globalData.playering++;
    // this.setData({
    //   number:index
    // })
    // wx.navigateTo({
    //   url: '/pages/musicplay/musicplay?id=' + id,
    //   success: function (res) { },
    //   fail: function (res) { },
    //   complete: function (res) { },
    // })
  },
  prev(){},
  
  /**
   * 页面的初始数据
   */
  data: {
    // songid:"",
    number:0,
    isPlay:false,
    rotate:0,
    timer:"",
    // mp3:"http://127.0.0.1:4000/mp3/test.mp3",
    title:"",
    length:225,
    // sliderlength:225,
    time:"1:00",
    value:0,
    show:true,
    lyric:[],
    playlist:[],
    showlist:"",
    details:"",
    nolrc:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 
    this.setData({
      number: app.globalData.playing
      //控制歌单播放按钮样式
    })  
    console.log(app.globalData.playing)
    wx.showLoading({
      title: '加载中',
    })
    var songid = options.id;
    this.setData({
      songid: songid
    })
    wx.request({
      url: 'https://api.bzqll.com/music/netease/song?key=579621905&id='+songid,
      complete:(res)=>{
        console.log(res.data.data);
        this.setData({
          details: res.data.data
        })


        //加载音乐
        console.log(this.data.details.url)
        music.src = this.data.details.url;
        music.title = this.data.details.name;

        //音频长度(xx:xx形式)
        var songtime = this.data.details.time
        var time = this.getlength(songtime);
        console.log(time)
        this.setData({
          length: time
        })

        //载入图片转动
        this.playmusic();






        //监听播放自然结束 循环播放
        music.onEnded(() => {
          console.log(this.data.isPlay);
          // this.playmusic();
          music.src = this.data.details.url;
          music.title = this.data.details.name;
        });

        //歌词
        wx.request({
          url: this.data.details.lrc,
          complete: (res) => {
            if(res.data==[]){
              //无歌词
              this.setData({
                nolrc:true
              })

            }
            var arr = res.data.split("\n")
            arr.pop();
            console.log(arr);

            var arr2 = [];

            for (var i = 0; i < arr.length; i++) {
              var obj = {};
              var newarr = arr[i].split("]");
              obj.time = newarr[0].split(".")[0].split("[")[1];
              obj.lyr = newarr[1];
              arr2.push(obj);
            }
            console.log(arr2);

            //监听播放更新
            music.onTimeUpdate(() => {
              // console.log(music.currentTime)
              var nowtime = parseInt(music.currentTime)
              this.setData({
                value: nowtime
              });
              // console.log(this.data.value)
              var update = this.getlength(nowtime);
              this.setData({
                time: update
              })

              for (var i = 0; i < arr2.length; i++) {
                if (arr2[i].time == update) {
                  if (arr2[i + 4]) {
                    var lyrarr = [arr2[i].lyr,
                    arr2[i + 1].lyr,
                    arr2[i + 2].lyr,
                    arr2[i + 3].lyr,
                    arr2[i + 4].lyr]
                  } else {
                    var arr3 = arr2.slice(i)
                    var lyrarr = [];
                    for (var item of arr3) {
                      lyrarr.push(item.lyr)
                    }
                    // arr2[i + 1].lyr

                  }
                  this.setData({
                    lyric: lyrarr



                  })
                }
              }

            })


          }

        })
        wx.hideLoading();
      }
   
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
    
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      playlist: app.globalData.songlistdata
    })
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