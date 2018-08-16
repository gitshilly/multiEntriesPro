import Vue from 'vue'
import Router from 'vue-router'
import course from '../course'
import stockpool from '../stockpool'
import interact from '../interact'
import notice from '../notice'
import interactHis from '../interactHis'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'course',
      component: course
    },
    {
      path: '/stockpool',
      name: 'stockpool',
      component: stockpool
    },
    {
      path: '/course',
      name: 'course',
      component: course
    },
    {
      path: '/interact',
      name: 'interact',
      component: interact
    },
    {
      path: '/notice',
      name: 'notice',
      component: notice
    },
    {
      path: '/interactHis',
      name: 'interactHis',
      component: interactHis
    }
  ]
})
