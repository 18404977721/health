import {
  UserLayout,
  TabLayout,
  RouteView,
  BlankLayout,
  PageView
} from '@/components/layouts'

/**
 * 走菜单，走权限控制
 * @type {[null,null]}
 */
export const asyncRouterMap = [

  {
    path: '/',
    name: 'dashboard',
    component: TabLayout,
    meta: {
      title: '首页'
    },
    redirect: '/dashboard/analysis',
    children: [


    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [{
    path: '/',
    name: 'dashboard-analysis',
    component: TabLayout,
    meta: {
      title: '首页'
    },
    redirect: '/dashboard/analysis',
    children: [{
        path: '/dashboard/analysis',
        name: 'dashboard-analysis',
        component: () => import( /* webpackChunkName: "user" */ '@/views/dashboard/Analysis')
      },
      {
        path: '/dashboard/HealthInfoCircleList',
        name: 'HealthInfoCircleList',
        component: () => import( /* webpackChunkName: "user" */ '@/views/dashboard/HealthInfoCircleList')
      },
      {
        path: '/dashboard/HealthNoticList',
        name: 'HealthNoticList',
        component: () => import( /* webpackChunkName: "user" */ '@/views/dashboard/HealthNoticList')
      },
      {
        path: '/dashboard/us',
        name: 'us',
        component: () => import( /* webpackChunkName: "user" */ '@/views/dashboard/us')
      },
      {
        path: '/dashboard/HealthQuestionList',
        name: 'HealthQuestionList',
        component: () => import( /* webpackChunkName: "user" */ '@/views/dashboard/HealthQuestionList')
      },
    ]
  },
  {
    path: '/dashboard',
    component: TabLayout,
    hidden: true,
    children: [{
        path: '/dashboard/HealthActiveList/:activeType',
        name: 'HealthActiveList',
        component: () => import( /* webpackChunkName: "user" */ '@/views/dashboard/HealthActiveList')
      },
      {
        path: '/dashboard/HealthPubSourceList/:type',
        name: 'HealthPubSourceList',
        component: () => import( /* webpackChunkName: "user" */ '@/views/dashboard/HealthPubSourceList')
      },
      {
        path: '/dashboard/search/:keyWord',
        name: 'search',
        component: () => import( /* webpackChunkName: "user" */ '@/views/dashboard/search')
      },
      {
        path: '/dashboard/HealthModal/:id/:type',
        name: 'HealthModal',
        component: () => import( /* webpackChunkName: "user" */ '@/views/dashboard/HealthModal')
      },
    ]
  },
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [{
        path: 'login',
        name: 'login',
        component: () => import( /* webpackChunkName: "user" */ '@/views/user/Login')
      },
      // {
      //   path: 'register',
      //   name: 'register',
      //   component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      // },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import( /* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
    ]
  },
  { //pc端注册页
    path: '/user',
    component: TabLayout,
    redirect: '/register',
    children: [{
        path: 'register',
        name: 'register',
        component: () => import( /* webpackChunkName: "user" */ '@/views/user/register')
      },
      {
        path: 'alteration',
        name: 'alteration',
        component: () => import( /* webpackChunkName: "user" */ '@/views/user/Alteration')
      },
    ]
  },
  { //移动端注册页
    path: '/mobileRegister',
    name: 'mobileRegister',
    params: {

    },
    component: () => import( /* webpackChunkName: "fail" */ '@/views/user/mobileRegister')
  },
  // {
  //   path: '/',
  //   name: 'index',
  //   component: TabLayout,
  //   meta: {title: '首页'},
  //   redirect: '/dashboard/workplace',
  //   children: [
  //     {
  //       path: '/online',
  //       name: 'online',
  //       redirect: '/online',
  //       component: RouteView,
  //       meta: {title: '在线开发', icon: 'dashboard', permission: ['dashboard']},
  //       children: [
  //         {
  //           path: '/online/auto/:code',
  //           name: 'report',
  //           component: () => import('@/views/modules/online/cgreport/OnlCgreportAutoList')
  //         },
  //       ]
  //     },
  //   ]
  // },


  {
    path: '/404',
    component: () => import( /* webpackChunkName: "fail" */ '@/views/exception/404')
  },

]
