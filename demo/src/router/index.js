import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: resolve => require(['../views/Login'], resolve)
  },
  {
    path: '/home',
    name: 'HomePage',
    component: resolve => require(['../views/Home'], resolve),
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: resolve => require(['../views/Welcome'], resolve)
      },
      {
        path: '/personalFile',
        component: resolve => require(['../views/PersonalFile'], resolve)
      },
      {
        path: '/groupFile',
        component: resolve => require(['../views/GroupFile'], resolve)
      },
      {
        path: '/history',
        component: resolve => require(['../views/History'], resolve)
      },
      {
        path: '/filePage',
        component: resolve => require(['../views/Page'], resolve)
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
