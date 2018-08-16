<template>
<div>
  <nav class="swiper-nav">
    <ul class="course-nav flex-container flex-pack-justify">
       <!-- 一级目录 -->
       <li v-for="(item,index) in courseMenu" :key="item.OneLevel.Code" :class="{'active':swiperActive===index}" v-on:click="switchSwiper(index)">{{item.OneLevel.Name}}</li>
    </ul>
  </nav>
  <section>
    <div class="swipe course-cnt swiper-container">
      <div class="swiper-wrapper swipe-wrap">
      <!-- 一级目录内容 -->
          <div class="swiper-slide" v-for="item in courseMenu" :key="item.OneLevel.Code">
            <div v-if="item.OneLevel.Name === '服务课'">
              <div v-if="!item.TwoLevel.length" class="nonedata">
                {{nonedata}}
              </div>
              <dl :class="{'lesson-item': true,'on': checkLesson === childItem.Code }" v-for="(childItem) in item.TwoLevel" :key="childItem.Code">
                  <dt v-on:click="loadCourse(childItem, $event)">{{childItem.Name}}</dt>
                  <dd v-for="course in playlist[childItem.Code]" :key="course.Id" class="lesson-item-i" v-on:click="redirectCourse(childItem.Code,course.Id,course.Mtitle)"><p><i class="play-icon"></i>{{course.Mtitle}}</p>
                    <!-- <a href="#" v-on:click.stop="redirectJob(course.MJob,course.Newsreportid)" class="alink pl30" v-if="course.Newsreportid==='1000'">去写作业></a>
                    <span class="f-gray pl30" v-if="course.Newsreportid==='0'">暂无作业></span>
                    <a href="#" v-on:click.stop="redirectJob(course.MJob,course.Newsreportid)" class="alink pl30" v-if="course.Newsreportid==='2000'">作业已完成></a> -->
                  </dd>
              </dl>
            </div>
            <div v-if="item.OneLevel.Name === '体系课'">
               <div class="iner">
                <div class="unlock-intro">
                  解锁玩法介绍：
                  <p>为了更好的帮助用户达到学习效果。前一章课程学习完成后（学习完成指答对所有作业题），才可解锁第二章课程，或等待一周后系统自动解锁下一章课程。</p>
                </div>
                <div class="flex-container flex-pack-justify flex-wrap chapterlist">
                  <div v-if="!item.TwoLevel.length" class="nonedata">
                    {{nonedata}}
                  </div>
                  <div :class="{'active':swiperActive===cindex,'chapter': true,'unlock': childItem.CtStatus=== 0 || childItem.CtStatus === 1000,'finished': childItem.CtStatus === 2000}" v-on:click="redirectCourse(childItem.Code)" v-for="(childItem,cindex) in item.TwoLevel" :key="childItem.Code"><div><span class="icon">✔</span>{{splitMenu(childItem.Name,0)}}<br/>{{splitMenu(childItem.Name,1)}}</div></div>
                </div>
              </div>
            </div>
            <!-- <dl class="lesson-item on">
              <dt>筹码-服务-2018-6</dt>
              <dd class="lesson-item-i" data-vid="413" data-lid="413" data-title="20180619-2" data-kejian="1000">
                  <p><i class="play-icon"></i>20180619-2</p>
                      <a href="#" data-url="https://ks.wjx.top/jq/25240123.aspx" data-jobid="413" class="alink f-yellow pl30">去写作业&gt;</a>
              </dd>
              <dd class="lesson-item-i" data-vid="410" data-lid="410" data-title="20180619-不需点评" data-kejian="-3000">
                  <p><i class="play-icon"></i>20180619-不需点评</p>
                      <a href="#" data-url="https://ks.wjx.top/jq/25242275.aspx" data-jobid="410" class="alink f-yellow pl30">去写作业&gt;</a>
              </dd>
              <dd class="lesson-item-i" data-vid="408" data-lid="408" data-title="测试服务课3" data-kejian="-3000">
                  <p><i class="play-icon"></i>测试服务课3</p>
                      <a href="#" data-url="https://ks.wjx.top/jq/25140410.aspx" data-jobid="408" class="alink f-yellow pl30">去写作业&gt;</a>
              </dd>
              <dd class="lesson-item-i" data-vid="406" data-lid="406" data-title="服务课2018-06-15" data-kejian="1000">
                  <p><i class="play-icon"></i>服务课2018-06-15</p>
                      <a href="#" data-url="https://ks.wjx.top/jq/25172762.aspx" data-jobid="406" class="alink f-yellow pl30">去写作业&gt;</a>
              </dd>
            </dl> -->
          </div>
          <!-- <div class="swiper-slide">
            <div class="iner">
              <div class="unlock-intro">
                解锁玩法介绍：
                <p>为了更好的帮助用户达到学习效果。前一章课程学习完成后（学习完成指答对所有作业题），才可解锁第二章课程，或等待一周后系统自动解锁下一章课程。</p>
              </div>
              <div class="flex-container flex-pack-justify flex-wrap">
                <div class="chapter unlock finished"><span class="icon">✔</span>第1章<br/>概述</div>
                <div class="chapter unlock"><span class="icon">✔</span>第2章<br/>超跌分型战法</div>
                <div class="chapter unlock"><span class="icon">✔</span>第3章<br/>强势股超跌战法</div>
                <div class="chapter unlock finished"><span class="icon">✔</span>第4章<br/>超跌后二买战法</div>
                <div class="chapter unlock"><span class="icon">✔</span>第5章<br/>强势股回调战法</div>
                <div class="chapter "><span class="icon">✔</span>第6章<br/>类三买战法</div>
                <div class="chapter"><span class="icon">✔</span>第7章<br/>缺口突破战法</div>
                <div class="chapter"><span class="icon">✔</span>第8章<br/>岛型反转战法</div>
                <div class="chapter"><span class="icon">✔</span>第9章<br/>筹码突破战法</div>
                <div class="chapter"><span class="icon">✔</span>第10章<br/>缺口突破战法</div>
                <div class="chapter"><span class="icon">✔</span>第11章<br/>巨量筹码</div>
                <div class="chapter"><span class="icon">✔</span>第12章<br/>总结</div>
              </div>
            </div>
          </div> -->
      </div>
    </div>
  </section>
</div>
</template>
<script>
import Swiper from 'swiper'
import server from '../../assets/js/server'
export default {
  name: 'course',
  data () {
    return {
      courseMenu: [],
      checkLesson: '',
      nonedata: '',
      swiperActive: 0,
      swiper: null,
      playlist: {}
    }
  },
  created () {
    console.log(1)
  },
  mounted () {
    let _this = this
    _this.getCourse().then(function () {
      _this.initSwiper()
      document.getElementsByClassName('lesson-item')[0].children[0].click()
    })
  },
  methods: {
    initSwiper () {
      let vue = this
      // slider
      this.swiper = new Swiper('.course-cnt', {
        initialSlide: 0,
        on: {
          slideChange: function () {
            var _this = this
            vue.swiperActive = _this.activeIndex
          },
          init: function () {
          }
        }
      })
    },
    splitMenu (menu, index) {
      let cmenu = menu.split(' ')[index]
      if (cmenu && cmenu.indexOf('—') > -1) {
        cmenu = cmenu.split('—')[1]
      }
      return cmenu
    },
    switchSwiper (index) {
      this.swiperActive = index
      this.swiper.slideTo(index, 400, false)
    },
    getCourse () {
      var _this = this
      return new Promise((resolve, reject) => {
        server.GetCourseCataLog('gzmx').then(function (data) {
          _this.courseMenu = data
          resolve()
        }).catch(function (error) {
          console.log('失败了:' + error)
          reject(error)
        })
      })
    },
    getCourseByChapter (chapterId) {
      this.$http.get('', {chapterId: chapterId}).then((res) => {
        console.log(res.data)
      })
    },
    loadCourse (item, event) {
      let _this = this
      _this.checkLesson = _this.checkLesson === item.Code ? '' : item.Code
      server.GetPlayListByCataLog('gzmx', item.Code).then((res) => {
        // 新增对象监听 $set
        _this.$set(_this.playlist, item.Code, res)
      })
    },
    redirectJob (url, id) {
      if (id > 0) {
        window.location.href = url
      }
    },
    redirectCourse (cid, vid = '', title = '') {
      window.location = 'course?cid=' + cid + '&pid=gzmx&vid=' + vid + '&mtitle=' + title
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .lesson-item{
    border-bottom: 0;
  }
  .lesson-item .lession-item-i .pl30 {
    padding-left: 1.67rem;
  }
  .lesson-item .lession-item-i .alink {
    display: inline-block;
    color: #6A81DC;
  }
  .lesson-item .lession-item-i .f-gray {
    color: #999999;
  }
  .lesson-item .lession-item-i .f-yellow {
    color: #F7A763;
  }
  .interact-item {
    padding: 0.83rem 0.83rem;
    border-bottom: 1px solid #E9E9E9;
  }
  .interact-item span:first-child {
    padding-right: 1.11rem;
  }
  .interact-item .path-icon {
    width: 0.89rem;
    height: 1.39rem;
    display: inline-block;
    background: url(../../assets/images/Path.png) center no-repeat;
    background-size: contain;
  }
  .interact-item.on a {
    color: #6B85D9;
  }
  .chapterlist{
    padding-bottom: 1rem;
  }
  .chapter{
    width: 32%;
    border-radius: 1.5625rem;
    background-color: #EEEEEE;
    text-align: center;
    color: #5B5E65;
    height: 5.9rem;
    font-size: 1.35rem;
    padding: 0 .7rem;
    box-sizing: border-box;
    margin-top: .9375rem;
    justify-content: center;
    align-items: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    flex-wrap: wrap;
  }
  .chapter .icon{
    margin-right: .625rem;
    display: none;
  }
  .chapter.unlock{
    color: #6A81DC;
    background-color: #F4F7FF;
  }
  .chapter.finished .icon{
    display: inline-block;
  }
  .unlock-intro{
    padding: .9375rem 0;
    font-size: 1.375rem;
    line-height: 1.6;
    border-bottom: 1px solid #F3F3F3;
    padding-left: .3125rem;
  }
  .chaptername{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap ;
  }
</style>
