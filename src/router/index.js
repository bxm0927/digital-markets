import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Detail from '@/components/detail'
import Analysis from '@/components/detail/analysis'
import Count from '@/components/detail/count'
import Forecast from '@/components/detail/forecast'
import Publish from '@/components/detail/publish'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'Index',
    component: Index
  }, {
    path: '/detail',
    name: 'Detail',
    component: Detail,
    // 不允许用户访问到 detail 这个页面，所以重定向
    redirect: '/detail/analysis',
    children: [{
      path: 'analysis',
      name: 'Analysis',
      component: Analysis
    }, {
      path: 'count',
      name: 'Count',
      component: Count
    }, {
      path: 'forecast',
      name: 'Forecast',
      component: Forecast
    }, {
      path: 'publish',
      name: 'Publish',
      component: Publish
    }]
  }]
})
