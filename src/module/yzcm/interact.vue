<template>
  <div class="vx-newsinf">
    <div class="vx-commentlist">
      <div class="iner">
        <div v-if="recentNews.updatetime === undefined " class="nonedata">
          {{nonedata}}
        </div>
        <dl>
            <dt class="active">{{formateDate(recentNews.updatetime,'yyyy年MM月dd日')}} 互动 </dt>
            <dd>
                <div>
                    <p v-html="recentNews.Content"></p>
                </div>
            </dd>
        </dl>
        <div class="hiswrapper">
          <router-link to="/interactHis" class="btn-link">历史互动</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import server from '../../assets/js/server'
export default {
  name: 'interact',
  data () {
    return {
      nonedata: '',
      recentNews: {}
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      let _this = this
      // 互动最新消息
      server.GetWxDianPingMostRecentNews().then((res) => {
        _this.recentNews = res
      })
    },
    formateDate (str, format) {
      if (!str) {
        return ''
      }
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
<style scoped>
.hiswrapper{
  padding: 10px; text-align: center;
}
.btn-link{
  color: #5D83E6; text-decoration: underline;
}
.vx-newsinf {
  border-top: 1px solid #eaeaea;
  background-color: #fff;
}
.vx-commentlist {
  background-color: #eee;
}
.iner {
  padding: 0rem 1rem;
}
.vx-commentlist dl dt.active{
  font-weight: bold;
  background-color: #f5f5f5;
  height: auto;
  text-decoration: none;
  color: #666;
  line-height: 2;
  border: 1px solid #eee;
  padding-left: 1rem;
}
.vx-commentlist dl dd{
  overflow: scroll; max-height: 500px;
}
</style>
