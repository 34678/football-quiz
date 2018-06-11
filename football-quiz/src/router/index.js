import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from '@/components/index'
import Draw from '@/components/draw'
import luckyDraw from '@/components/luckyDraw'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/draw',
      name: 'draw',
      component: Draw
    },
    {
      path: '/luckyDraw',
      name: 'luckyDraw',
      component: luckyDraw 
    }
  ]
})
