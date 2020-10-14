import { UserLayout, TabLayout, BlankLayout } from '@/components/layouts'

/**
 * 走菜单，走权限控制
 * @type {[null,null]}
 */
export const asyncRouterMap = [
  
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
	{
	  path: '/',
	  name: 'homepage',
	  component: TabLayout,
	  meta: { title: '首页' },
	  redirect: '/homepage',
	  children: [
			{
			  path: 'homepage',
			  name: 'homepage',
			  component: () => import(/* webpackChunkName: "user" */ '@/views/homepage')
			}
		]
	},
	{//移动端注册页
	  path: '/register',
	  name:'register',
	  params:{
	
	  },
	  component: () => import(/* webpackChunkName: "fail" */ '@/views/user/register')
	},
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
    ]
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/404')
  },
]

