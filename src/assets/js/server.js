import gConfig from './config'
import axios from 'axios'
let request = {
  // 获取产品信息（无数据提醒）
  noneData (productid = 'cxjj') {
    return new Promise((resolve, reject) => {
      axios.get(gConfig.apiURL + 'Apipublic/GetProductInfo', { params: { productid: productid } }).then(function (res) {
        let data = res.data
        if (data.RetCode === '1' && data.RetMsg === 'success') {
          resolve(data.Message)
        } else {
          reject(data.RetMsg)
        }
      })
    })
  },
  // 取好股 股票消息 通知之类的
  GetWxProductNews (productid = 'gzmx') {
    return new Promise((resolve, reject) => {
      axios.get(gConfig.apiURL + 'Apipublic/GetWxProductNews', { params: { productid: productid } }).then(function (res) {
        let data = res.data
        if (data.RetCode === '1' && data.RetMsg === 'success') {
          resolve(data.Message)
        } else {
          reject(data.RetMsg)
        }
      })
    })
  },
  // 4．课程目录
  GetCourseCataLog (productid = 'gzmx') {
    return new Promise((resolve, reject) => {
      axios.get(gConfig.apiURL + 'Apipublic/GetCourseCataLog', { params: { productid: productid } }).then(function (res) {
        let data = res.data
        if (data.RetCode === '1' && data.RetMsg === 'success') {
          resolve(data.Message)
        } else {
          reject(data.RetMsg)
        }
      })
    })
  },
  // 课程目录下的播放列表
  GetPlayListByCataLog (productid = 'cxjj', codeid = '328') {
    return new Promise((resolve, reject) => {
      axios.get(gConfig.apiURL + 'Apipublic/GetPlayListByCataLog', { params: { productid: productid, codeid: codeid } }).then(function (res) {
        let data = res.data
        if (data.RetCode === '1' && data.RetMsg === 'success') {
          resolve(data.Message)
        } else {
          reject(data.RetMsg)
        }
      })
    })
  },
  // 股池消息
  GetStockPool (pageIndex = 1, pageSize = 10) {
    return new Promise((resolve, reject) => {
      axios.get(gConfig.apiURL + 'Apigzmx/GetStockPool', {pageIndex: pageIndex, pageSize: pageSize}).then(function (res) {
        let data = res.data
        if (data.RetCode === '1' && data.RetMsg === 'success') {
          resolve(data.Message)
        } else {
          reject(data.RetMsg)
        }
      })
    })
  },
  // 英雄榜
  GetYiXiongBang () {
    return new Promise((resolve, reject) => {
      axios.get(gConfig.apiURL + 'Apigzmx/GetYiXiongBang').then(function (res) {
        let data = res.data
        if (data.RetCode === '1' && data.RetMsg === 'success') {
          resolve(data.Message)
        } else {
          reject(data.RetMsg)
        }
      })
    })
  },
  // 最新互动最新
  GetWxDianPingMostRecentNews () {
    return new Promise((resolve, reject) => {
      axios.get(gConfig.apiURL + 'Apigzmx/GetWxDianPingMostRecentNews').then(function (res) {
        let data = res.data
        if (data.RetCode === '1' && data.RetMsg === 'success') {
          resolve(data.Message)
        } else {
          reject(data.RetMsg)
        }
      })
    })
  },
  // 互动历史
  GetWxDianPingNewsList () {
    return new Promise((resolve, reject) => {
      axios.get(gConfig.apiURL + 'Apigzmx/GetWxDianPingNewsList').then(function (res) {
        let data = res.data
        if (data.RetCode === '1' && data.RetMsg === 'success') {
          resolve(data.Message)
        } else {
          reject(data.RetMsg)
        }
      })
    })
  }
}
export default request
