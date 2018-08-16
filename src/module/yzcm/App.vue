<template>
  <div id="app">
    <router-view></router-view>
    <div class="placeholder"></div>
    <footer class="main-nav" id="mainNav">
      <router-link to="/stockpool" class="stockmarket icon">股池</router-link>
      <router-link to="/interact" class="market icon">互动</router-link>
      <router-link to="/course" class="icon course">课程</router-link>
      <router-link to="/notice" class="news icon">通知</router-link>
  </footer>
  <service></service>
  </div>
</template>
<script>
import service from '../../components/base/service'
export default {
  name: 'App',
  components: {
    service: service
  },
  mounted () {
    // document.getElementsByClassName('course')[0].click()
  }
}
</script>

<style scoped>
.main-nav {
    display: flex;
    justify-content: space-between;
    text-align: center;
    position: fixed;
    z-index: 1000000;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 5rem;
    background-color: #f8f8f8;
    border-top: 1px solid #ebebeb;
    font-size: 14px;
    box-sizing: content-box
}
.main-nav a.icon {
    text-align: center;
    width: 20%;
    height: 3rem;
    display: inline-block;
    background-image: url('assets/images/icon_course.png');
    overflow: visible;
    background-position: center top;
    margin-top: 0.8rem;
    background-repeat: no-repeat;
    background-size: 35% auto;
    padding-top: 2.2rem;
    vertical-align: bottom;
}
.main-nav a.icon.router-link-active {
    color: #6a81dc;
    background-image: url('assets/images/icon_course_over.png')
}
.main-nav a.icon.news {
    background-image: url('assets/images/icon_news.png')
}
.main-nav a.icon.news.router-link-active {
    background-image: url('assets/images/icon_news_over.png')
}
.main-nav a.icon.comment {
    background-image: url('assets/images/icon_comment.png')
}
.main-nav a.icon.comment.router-link-active {
    background-image: url('assets/images/icon_comment_over.png')
}
.main-nav a.icon.market {
    background-image: url('assets/images/icon_market1.png')
}
.main-nav a.icon.market.router-link-active {
    background-image: url('assets/images/icon_market_over1.png')
}
.main-nav a.icon.stockmarket {
    background-image: url('assets/images/icon_stockmarket.png')
}
.main-nav a.icon.stockmarket.router-link-active {
    background-image: url('assets/images/icon_stockmarket_over.png')
}
@media screen and (min-width:450px) {
    .main-container .main-nav-cnt.active {
        padding-bottom: 5.3rem
    }
    .main-nav {
        height: 5.5rem
    }
    .main-nav a.icon {
        margin-top: .5rem;
        padding-top: 3rem;
        background-size: 33% auto;
    }
}
@media screen and (min-width:600px) {
    .main-container .main-nav-cnt.active {
        padding-bottom: 5.3rem
    }
    .main-nav {
        height: 5.5rem
    }
    .main-nav a.icon {
        margin-top: .5rem;
        padding-top: 3rem;
        background-size: 25% auto;
    }
}
@media screen and (min-width:860px) {
    .main-container .main-nav-cnt.active {
        padding-bottom: 5.3rem
    }
    .main-nav {
        height: 5.5rem
    }
    .main-nav a.icon {
        margin-top: .5rem;
        padding-top: 3rem;
        background-size: 20% auto;
    }
}
</style>
