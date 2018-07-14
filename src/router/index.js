import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    name: 'home',
    hidden: true,
    children: [{
      path: 'home',
      component: () => import('@/views/home/index')
    }]
  },

  {
    path: '/msg',
    component: Layout,
    redirect: '/msg/msgtable',
    name: 'msg',
    meta: { title: '留言管理', icon: 'example' },
    children: [
      {
        path: 'msgtable',
        name: 'Msgtable',
        component: () => import('@/views/msgtable/index'),
        meta: { title: '留言列表', icon: 'table' }
      },
      {
        path: 'msgrecovery',
        name: 'Msgrecovery',
        component: () => import('@/views/msgrecovery/index'),
        meta: { title: '留言回收站', icon: 'del' }
      }
    ]
  },

  {
    path: '/users',
    component: Layout,
    redirect: '/users/userslist',
    name: 'users',
    meta: { title: '用户管理', icon: 'users' },
    children: [
      {
        path: 'userslist',
        name: 'Userslist',
        component: () => import('@/views/userslist/index'),
        meta: { title: '会员列表', icon: 'table' }
      },
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home/index'),
        meta: { title: '个人信息', icon: 'info' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

// 异步挂载的路由
// 动态需要根据权限加载的路由表

// export const asyncRouterMap = [
//   {
//     path: '/permission',
//     component: Layout,
//     name: '权限测试',
//     meta: { role: ['admin', 'super_editor'] },
//     children: [
//       {
//         path: 'index',
//         component: () => import('@/views/table/index'),
//         name: '权限测试页',
//         meta: { role: ['admin', 'super_editor'] }
//       }]
//   },
//   { path: '*', redirect: '/404', hidden: true }
// ]
