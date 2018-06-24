import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Exhibition from '@/components/Exhibition'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/exhibitions/:uid',
      name: 'Exhibition',
      component: Exhibition,
      props: true
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
