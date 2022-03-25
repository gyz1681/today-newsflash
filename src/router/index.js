import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/login.vue'
import Layout from '@/views/layout/index.vue'
import Article from '@/views/article/index.vue'
import Search from '@/views/search/index.vue'
Vue.use(VueRouter)

const routes = [{
  path: '/login',
  name: 'login',
  component: Login
},
{
  path: '/',
  name: 'layout',
  component: Layout,
  children: [{
    path: '',
    name: 'home',
    component: () =>
      import('@/views/home')
  }, {
    path: '/qa',
    name: 'qa',
    component: () =>
      import('@/views/qa')
  },
  {
    path: '/video',
    name: 'video',
    component: () =>
      import('@/views/video')
  }, {
    path: '/mine',
    name: 'mine',
    component: () =>
      import('@/views/mine')
  }
  ]
}, {
  path: '/search',
  name: 'search',
  component: Search
},
{
  path: '/article/:articleId',
  name: 'article',
  component: Article,
  props: true
},
{
  path: '/user/profile',
  name: 'user-profile',
  component: () =>
    import('@/views/user-profile')

}
]

const router = new VueRouter({
  routes
})

export default router
