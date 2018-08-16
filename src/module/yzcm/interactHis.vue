<template>
  <div class="vx-commentlist " id="vx-commentlist" style="background-color: white;">
    <div class="iner" style="padding: 25px;">
      <div v-if="!hisnews.length" class="nonedata">
         {{nonedata}}
      </div>
      <dl>
        <dt v-for="news in hisnews" :key="news.ID" v-on:click="OpenNewsreport(news.ID)" style="font-size: 17px;">{{formateDate(news.pubDate,'yyyy-MM-dd')}} 点评 </dt>
      </dl>
    </div>
  </div>
</template>
<script>
import server from '../../assets/js/server'
export default {
  name: 'interacthis',
  data () {
    return {
      nonedata: '',
      hisnews: []
    }
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {
      let _this = this
      // 互动最新消息
      server.GetWxDianPingNewsList().then((res) => {
        _this.hisnews = res
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
    OpenNewsreport (newsid) {
      location.href = 'http://emhgnews.emoney.cn/WXOpen/NewsReport.aspx?weixinid=3&id=242?weixinid=3&id=' + newsid
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
  .vx-commentlist{
    background-color: #fff;
  }
  .vx-commentlist .iner{
        padding: 25px;
  }
  .vx-commentlist dl dt{height:4rem;line-height:2;background-color:#fafafa;border:1px solid #eee;
      padding-left:1rem;color:#007AFF;text-decoration:underline;
      }
  .vx-commentlist dl dd{background-color:#fafafa;overflow:hidden;overflow-y:auto;display:none;
      font-size:1.3rem;}
  .vx-commentlist dl dd>div{padding:1rem 1.5rem 1rem 1rem;}
  .vx-commentlist dl dd>div em{font-style:normal;padding:0 2rem 0 0;}
  .vx-commentlist dl dt.active{text-decoration:none;color:#666;background-color:#fff}
  .vx-commentlist dl dt.active+dd{display:block;}
</style>
