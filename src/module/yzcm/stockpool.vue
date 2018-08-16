<template>
<div>
  <nav class="swiper-nav">
    <ul class="course-nav flex-container flex-pack-justify-around">
      <li :class="{'active':swiperActive===0}"  v-on:click="switchSwiper(0)">近期提示</li><li :class="{'active':swiperActive===1}" v-on:click="switchSwiper(1)">英雄榜</li>
    </ul>
  </nav>
  <section>
    <div class="swipe course-cnt swiper-container">
      <div class="swiper-wrapper swipe-wrap">
          <div class="swiper-slide">
            <div class="bscroll" ref="wrapper">
              <div class="content bscroll-container">
                <dl class="lesson-item" v-for="item in stocknews" :key="item.SelectLDate">
                   <dt>{{formateDate(item[0].SelectLDate,'MM-dd')}}</dt>
                   <dd class="lesson-item-i" v-for="childitem in item" :key="childitem.SelectLDateTime">
                      <h3>{{childitem.SelectLDateTime}}</h3>
                      <div class="clamp2">{{childitem.OperateRemark}}</div>
                      <div class="flex-container flex-pack-justify stratage">
                        <div><span v-for="(stock,index) in childitem.StockList" :key="index"><span class="stocks">{{stock.SecuCode}} {{stock.SecuAbbr}}</span>{{removeChaper(stock.SecuCategory)}}</span></div>
                      </div>
                   </dd>
                </dl>
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="pl10">
              <table border="0" class="stock-tab">
                <thead>
                  <tr>
                    <th>股票</th>
                    <th>时间</th>
                    <th>战法</th>
                    <th>最大涨幅</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="!stocklist.length" class="nonedata">
                    <td colspan="4">{{nonedata}}</td>
                  </tr>
                  <tr v-for="(stock,index) in stocklist" :key="index">
                    <td>{{stock.SecuAbbr}}<br>{{stock.SecuCode}}</td>
                    <td>{{formateDate(stock.SelectLDate,'yyyy-MM-dd')}}</td>
                    <td>{{stock.SecuCategory}}</td>
                    <td :class="{'f-red':stock.MaxRatio>0,'f-green': stock.MaxRatio<0,'f-gray': stock.MaxRatio == 0}">{{stock.MaxRatio}}%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
      </div>
    </div>
  </section>
</div>
</template>
<script>
import Swiper from 'swiper'
// import BScroll from 'better-scroll'
import server from '../../assets/js/server'
// let pageSize = 10
export default {
  name: 'stockpool',
  data () {
    return {
      nonedata: '',
      stocknews: [],
      stocklist: [],
      swiperActive: 0,
      swiper: null,
      pageIndex: 0,
      pageSize: 10,
      end: false
    }
  },
  created () {
  },
  mounted () {
    let _this = this
    _this.initSwiper()
    _this.getStockList()
    server.GetStockPool().then((res) => {
      _this.stocknews = _this.stocknews.concat(res)
    })
    // let scroll = new BScroll(_this.$refs.wrapper, {
    //   probeType: 3,
    //   click: true
    // })
    // scroll.on('scroll', (pos) => {
    //   if (_this.end) {
    //     return
    //   }
    //   _this.pageIndex++
    //   server.GetStockPool(_this.pageIndex, _this.pageSize).then((res) => {
    //     if (res.length) {
    //       _this.stocknews = _this.stocknews.concat(res)
    //     } else {
    //       _this.end = true
    //     }
    //   })
    // })
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
    removeChaper (SecuCategory) {
      return SecuCategory.split(' ')[1]
    },
    switchSwiper (index) {
      this.swiperActive = index
      this.swiper.slideTo(index, 400, false)
    },
    getStockList () {
      let _this = this
      server.GetYiXiongBang().then((res) => {
        _this.stocklist = res
      })
    },
    formateDate (str, format) {
      str = new Date(parseInt(str.replace('/Date(', '').replace(')/', ''), 10))
      var o = {
        'M+': str.getMonth() + 1, // month
        'd+': str.getDate(), // day
        'h+': str.getHours(), // hour
        'm+': str.getMinutes(), // minute
        's+': str.getSeconds(), // second
        'q+': Math.floor((str.getMonth() + 3) / 3), // quarter
        'S': str.getMilliseconds() // millisecond
      }
      if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (str.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
          format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
        }
      }
      return format
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
.bscroll{
    width: 100%;
    /* height: 100vh;
    overflow: hidden; */
}
.lesson-item .lesson-item-i{display: block;}
  .iner {
        padding: 0rem 1rem;
    }
  .pl10{padding-left: 1rem;}
  .stratage{
    padding-top: .625rem;
    color: #AEAEAE;
  }
  .stratage .stocks{
    background-color: #6284DE;
    color: #fff;
    border-radius: .625rem;
    padding: .3125rem .625rem;
    margin-right: .625rem;
    display: inline-block;
    margin-bottom: .27rem;
  }
  .stratage a{
    color: #6E81DA;
  }
  .stock-tab{
    width: 100%;
    border-collapse: collapse;
  }
  .stock-tab>thead tr th{
    font-weight: normal;
    padding: .9375rem 0;
    border-bottom: 1px solid #EEEEEE;
    color: #A1A1A1;
  }
  .stock-tab>tbody tr td{
    border: 0;
    padding: .9375rem 0;
    text-align: center;
    width: 25%;
  }
  .stock-tab>thead tr th:first-child,.stock-tab>tbody tr td:first-child{
    text-align: left;
    padding-left: .625rem;
  }
  .f-red{
    color: #D98D92;
  }
  .f-green{
    color: green;
  }
  .f-gray{
    color: lightgray;
  }
</style>
