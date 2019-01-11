// pages/component/songlist/songlist.js
const app=getApp()
const music = wx.getBackgroundAudioManager();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    Songlist:Array,
    number:Number
  },

  /**
   * 组件的初始数据
   */
  data: {
  
  },

  /**
   * 组件的方法列表
   */
  methods: {
    ToMusicplayer(event) {
      var id = event.currentTarget.dataset.id;
      // console.log(event)
      //获取歌单信息
      var index = event.currentTarget.dataset.index;
      // var song = this.data.details.songs
      //不存在就push
      // if (app.globalData.songlistdata.indexOf(song[index]) == -1) {
       // app.globalData.songlistdata.push(song[index]);
      getApp().globalData.playing =index
      // }

      wx.navigateTo({
        url: '/pages/musicplay/musicplay?id=' + id,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    },
  }
})
