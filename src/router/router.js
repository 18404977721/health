import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({ 
  routes: [
    {
      path: '/',      //根网址访问，显示home组件
      name: 'home',
      redirect: '/home',
      component: {
        render (c) {
          return c('router-view')
        }
      },
      children: [
        {
          path: 'home',
          name: 'home-index',
          component: () => import(/* webpackChunkName: "home" */ '@/views/home/index.vue'),
        },
      ]
    },
    
  ]
})

router.beforeEach((to, from, next) => {
   //我在这里模仿了一个获取用户信息的方法
  // let isLogin = window.sessionStorage.getItem('userInfo');
   // if (isLogin) {
   //      //如果用户信息存在则往下执行。
   //      next()
   //  } else {
   //      //如果用户token不存在处理方法
   //  }
   next();
})
export default router