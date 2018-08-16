<template>
  <div>
    <div class="vx-refer-tit cblue" style="padding: 10px 0px">
        <i class="em-ico em-ico-daystk"></i>微信消息
    </div>
    <div class="em-content" id="divContent">
      <div v-if="!msgList.length" class="nonedata">
         {{nonedata}}
      </div>
      <ul class="msg_list">
        <li v-on:click="fn_cliOpenNewsreport(item.id)" v-for="item in msgList" :key="item.id">
          <div class="msg_title">{{formateDate(item.pubDate,'yyyy年MM月dd日 hh:mm')}}</div>
          <div class="msg_content">
              <h4>{{item.title}}</h4>
              <p :style="{color:childitem.color}" v-for="childitem in item.TempLateDataList" :key="childitem.code">{{childitem.value}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import server from '../../assets/js/server'
export default {
  name: 'notice',
  data () {
    return {
      nonedata: '',
      msgList: []
    }
  },
  mounted () {
    let _this = this
    server.GetWxProductNews('gzmx').then(function (res) {
      _this.msgList = res
    })
  },
  methods: {
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
    fn_cliOpenNewsreport (newsid) {
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
  .cblue{
    color: #5D83E6;
  }
  .em-ico {display:inline-block;
  width: 2rem;
  height: 2rem;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: 0 0;
  vertical-align: middle;
  margin-right:0.6rem;
  margin-top: -3px;
  background-repeat:no-repeat;
  background-size:100% 100%;
  background-position:0 0;
  }
  .em-ico-daystk { background-image:url(../../assets/images/ico-daystk.png); }
  .msg_list {
    font-size: 1.6rem;
  }
  .msg_list li {
    padding: 0;
    border-bottom: 1px solid #e6e6e6;
    background-color: #fff;
  }
  .msg_list li .msg_title {
    padding: 0 1rem;
    color: #333;
    background: #f6f6f6;
    height: 5.5rem;
    line-height: 5.5rem;
    font-size: 1.8rem;
  }
  .msg_list li .msg_content {
    padding: 0 1rem;
    color: #666;
    line-height: 1.5;
  }
  .msg_list li .msg_content h4 {
    padding: 10px 0 5px;
    font-weight: normal;
    color: #333;
  }
  .msg_list li .msg_content p {
    font-size: 14px;
    margin-top: 0;
    margin-bottom: 10px;
    color: #8f8f94;
    padding: 5px 0;
  }
  .msg_list li .msg_content p span {
    color: #5c83e5;
  }
</style>
