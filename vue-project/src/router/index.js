import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home/home'
import music_player from '@/components/music_player/music_player'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: home
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/music_player',
      name: 'music_player',
      component: music_player,
      children: [
        {
          path: '',
          component: resolve => require(['../components/music_player_paging/mine.vue'], resolve)
        },
        {
          path: 'mine',
          component: resolve => require(['../components/music_player_paging/mine.vue'], resolve)
        },
        {
          path: 'music_hall',
          component: resolve => require(['../components/music_player_paging/music_hall.vue'], resolve)
        },
        {
          path: 'discover',
          component: resolve => require(['../components/music_player_paging/discover.vue'], resolve)
        }
      ]
    }
  ]
})
