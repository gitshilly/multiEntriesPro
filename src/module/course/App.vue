<template>
    <div id="app">
        <div class="mainpack" id="courseVideo">
            <div class="video-wrapper" id="vedioWrapper" style="position: relative;background-color: #fff;">
                <div id="divPlay" v-if="!isMobile" class="divPlay" @click="playVideo">
                    <i class="fa fa-play-circle-o playIcon" data-url="" id="userplay"></i>
                </div>
                <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" id="loadVideo" style="height: 7rem; width: 100%;" :src="course.url"></iframe>
                <div class="breadcumbs flex-container flex-pack-justify">
                    <span class="ellipsis">当前播放：{{course.mtitle}}</span>
                    <!-- <a href="#" v-on:click="redirectCourse(course.Newsreportid)" v-if="course.Newsreportid!=='0'">课件 ></a> -->
                </div>
            </div>
            <div v-if="!courselist.length" class="nonedata">
                {{nonedata}}
            </div>
            <div class="jobcontainer" v-if="courselist.length">
                <!-- <div class="chapters flex-container">
                    <div class="c-i" v-for="course in courselist" :key="course.Id">
                        <div class="flex-container flex-pack-justify" v-on:click="switchVideo(course.Id)">
                            <span>{{course.Mtitle}}</span><span class="playicon active"></span>
                        </div>
                    </div>
                    <div class="c-i">
                        <div class="flex-container flex-pack-justify">
                            <span>概述12</span><span class="playicon"></span>
                        </div>
                    </div>
                </div> -->
                <div class="courses">
                    <div :class="{'c-i':true,'active': checkedId === course.Id }" v-for="course in courselist" :key="course.Id" v-on:click="loadVideo(course.Id,course.Mtitle)">
                        <div class="flex-container flex-pack-justify">
                            <span>{{course.Mtitle}} <a href="#" v-on:click.stop="redirectJob(course.MJob,course.Newsreportid)" class="alink pl30" v-if="course.Newsreportid==='2000'">作业已完成></a>
                                <!-- <span class="f-gray pl30" v-if="course.Newsreportid=== '0'">暂无作业</span> -->
                                <a href="#" v-on:click.stop="redirectJob(course.MJob,course.Newsreportid)" class="alink pl30" v-if="course.Newsreportid==='1000'">去写作业></a>
                            </span>
                            <span class="video-more"></span>
                        </div>
                    </div>
                    <!-- <div class="flex-container c-i flex-pack-justify">
                        <span>概述1 作业待完成</span><a class="video-more" href="#"></a>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import gConfig from '../../assets/js/config'
import service from '../../components/base/service'
import server from '../../assets/js/server'
export default {
  name: 'course',
  components: {
    service: service
  },
  data () {
    return {
      course: {},
      checkedId: '',
      courselist: [],
      isMobile: true,
      nonedata: ''
    }
  },
  created () {
    this.isMobile = this.versions().mobile
    this.getData()
    if (this.course.vid === '') {
      this.initData()
    } else {
      this.loadVideo(this.course.vid, this.course.mtitle)
    }
  },
  methods: {
    versions: function () {
      var u = window.navigator.userAgent
      return {
        trident: u.indexOf('Trident') > -1, // IE内核
        presto: u.indexOf('Presto') > -1, // opera内核
        webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
        mobile: navigator.userAgent.toLowerCase().match(/(iphone|ipod|android|ios|ipad)/i) !== null && navigator.userAgent.toLowerCase().match(/(iphone|ipod|android|ios|ipad)/i).index > -1, // 是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或者uc浏览器
        iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, // 是否为iPhone或者安卓QQ浏览器
        iPad: u.indexOf('iPad') > -1, // 是否为iPad
        webApp: u.indexOf('Safari') === -1, // 是否为web应用程序，没有头部与底部
        weixin: u.indexOf('MicroMessenger') === -1 // 是否为微信浏览器
      }
    },
    /**
     * 获取当前课程详细
     * @Author   张叶
     * @DateTime 2018-07-05T13:05:07+0800
     * @param    {string}                 courseId 课程id
     * @return   {[type]}                          [description]
     */
    getData: function () {
      var _this = this
      _this.course = {
        Id: _this.querystring('id'),
        pid: _this.querystring('pid') || '',
        vid: _this.querystring('vid') || '',
        mtitle: decodeURIComponent(_this.querystring('mtitle')) || '',
        url: ''
      }
    },
    /**
     * [querystring 获取参数]
     * @Author   张叶
     * @DateTime 2018-07-05T11:48:57+0800
     * @param    {string}                 param [description]
     * @return   {string}                       [description]
     */
    querystring: function (param) {
      var _str = window.location.search && window.location.search.substr(1)
      var jsontemp = {}
      _str.toLowerCase().replace(/([^?&=]+)=([^?&=]*)/g, function (r, $1, $2) {
        jsontemp[$1] = $2
      })
      return jsontemp[param]
    },
    playVideo: function (event) {
      event.currentTarget.style.display = 'none'
    },
    initData: function () {
      let _this = this
      let code = _this.querystring('cid')
      server.GetPlayListByCataLog('gzmx', code).then((res) => {
        _this.courselist = res
        if (res.length) {
          _this.loadVideo(_this.courselist[0].Id, _this.courselist[0].Mtitle)
        }
      })
    },
    loadVideo (vid, title) {
      this.course.url = gConfig.videoURL + 'APIPublic/GenseeVideoPlay?productid=' + this.course.pid + '&vid=' + vid
      this.course.url = gConfig.videoURL + 'APIPublic/GenseeVideoPlay?productid=' + this.course.pid + '&vid=' + vid
      this.course.mtitle = title
      this.checkedId = vid
    },
    splitMenu (menu, index) {
      return menu.split(' ')[index]
    },
    redirectJob (url, id) {
      if (id > 0) {
        window.location.href = url
      }
    },
    noneData () {
      let _this = this
      server.noneData('gzmx').then((res) => {
        _this.nonedata = res.ProNoDataTip === '' ? '无数据显示' : res.ProNoDataTip
      })
    }
  }
}
</script>
<style scoped>
  html,body{
    height: 100%;
    background-color: #F8F8F8;
  }
  a{
      color: #6A81DC;
  }
  .chapters{
      background-color: #fff;
      padding: .33rem .4rem;
      overflow: hidden;
      overflow-x: auto;
      border-bottom: 1px solid #E5E5E5;
  }
  .chapters .c-i{
    width: 5.33rem;
    height: 1.87rem;
    background-color: #F8F8F8;
    border: 1px solid #E5E5E5;
    padding: .27rem;
    box-sizing: border-box;
    margin-right: .27rem;
  }
  .chapters .c-i h3{
      font-weight: normal;
      font-size: .48rem;
      color: #333;
  }
  .courses{
      background-color: #fff;
      margin-top: .13rem;
      border-top: 1px solid #E5E5E5;
      padding: 0 .4rem;
  }
  .courses .c-i{
      height: 1.2rem;
      line-height: 1.2rem;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #333;
      border-bottom: 1px solid #E5E5E5;
  }
  .courses .c-i.active{
      color: #999999;
  }
  .courses .c-i:last-child{
      border-bottom: 0;
  }
  .divPlay {
    text-align: center;
    background-color: black;
    position: absolute;
    height: 7rem;
    width: 100%;
    display: block;
    left: 0;
    top: 0;
    }
  .isMobile {
    display: block;
  }
  .playIcon {
    position: absolute;
    z-index: 2;
    top: 50%;
    font-size: 80px;
    left: 50%;
    color: white;
    cursor: pointer;
    transform: translate(-50%, -50%);
  }
  .fa{
      width: 1.33rem;
      height: 1.33rem;
      display: inline-block;
      background-size: contain;
      background: url(/Content/gzmx/img/faplay.png) center no-repeat;
  }
</style>
