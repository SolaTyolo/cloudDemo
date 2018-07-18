//index.js

const weatherMap = {
  'sunny': '晴天',
  'cloudy': '多云',
  'overcast': '阴',
  'lightrain': '小雨',
  'heavyrain': '大雨',
  'snow': '雪'
}

const weatherColorMap = {
  'sunny': '#cbeefd',
  'cloudy': '#deeef6',
  'overcast': '#c6ced2',
  'lightrain': '#bdd5e1',
  'heavyrain': '#c5ccd0',
  'snow': '#aae1fc'
}

Page({
  data:{
    nowTemp:'',
    nowWeather:'',
    nowWeatherBg:''
  },

  onPullDownRefresh(){
    this.getNow(()=>{
      wx.stopPullDownRefresh()
    });
  },
  onLoad(){
    this.getNow();
  },
  getNow(callback){
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now',
      data: {
        city: '上海市'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:(res)=>{
        console.log(res)
        let data = res.data
        let weather = data.result.now.weather
        let temp = data.result.now.temp
        console.log(temp,weather)
        this.setData({
          nowTemp:temp + '°',
          nowWeather:weatherMap[weather],
          nowWeatherBg:'/images/' + weather + '-bg.png'
        })
        wx.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: weatherColorMap[weather],
        })
      },
      complete:()=>{
        //wx.stopPullDownRefresh()
        callback && callback()
      }
    })
  }
})
