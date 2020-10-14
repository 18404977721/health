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
	// {//移动端注册页
	//   path: '/mobile',
	//   name: 'MobileRegister',
	//   meta: { title: '首页' },
	//   redirect: '/MobileRegister',
	//   children: [
	// 		{
	// 		  path: 'MobileRegister',
	// 		  name: 'MobileRegister',
	// 		  component: () => import(/* webpackChunkName: "user" */ '@/views/mobile/register')
	// 		}
	// 	]
	// },
	{//移动端注册页
	  path: '/MobileRegister',
	  name:'MobileRegister',
	  params:{
	
	  },
	  component: () => import(/* webpackChunkName: "fail" */ '@/views/mobile/register')
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
			// {//移动端注册页
   //      path: 'register',
   //      name: 'register',
   //      component: () => import(/* webpackChunkName: "user" */ '@/views/user/register')
   //    }
    ]
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/404')
  },
]

