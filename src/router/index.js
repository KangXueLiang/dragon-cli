import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 如果上百个页面逐个import太jb多了, 封装个批量设置loadComponent方法加载所有页面组件, 此方式实现路由懒加载
function loadComponent(component) {
  // '@' is aliased to src
  return (resolve) => {
    import(`@/${component}.vue`).then((module) => {
      resolve(module)
    })
  }
}

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  {
    path: '/login',
    component: loadComponent('views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: loadComponent('views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: '/home',
      name: '工作台',
      meta: { title: '工作台', icon: 'iconfont icon-workbench' },
      component: loadComponent('views/home/index')
    }]
  }
  // 跳转第三方网站
  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'http://sls.saleslead.cn/',
  //       meta: { title: '跳转', icon: 'link' }
  //     }
  //   ]
  // },

  // 内嵌第三方网站
  // {
  //   path: '/myiframe',
  //   component: Layout,
  //   redirect: '/myiframe',
  //   children: [{
  //     path: ':routerPath',
  //     name: 'myiframe',
  //     component: loadComponent('components/iframe/index'),
  //     meta: { title: 'thirdPartyWebsite', icon: 'link' }
  //   }]
  // },

]

// 异步路由
export const asyncRouterMap = [{
  // 客户管理
  path: '/customerManagement',
  component: Layout,
  // 这里留着，以后有二级菜单就开启
  // redirect: '/customerManagement/index',
  // name: '客户概览',
  // meta: { title: '客户概览', icon: 'example' },
  children: [
    {
      path: 'index',
      name: '用户管理',
      component: loadComponent('views/customerManagement/index'),
      meta: { title: '客户管理', icon: 'iconfont icon-customer' }
    }
  ]
}, {
  // 产品管理
  path: '/productManagement',
  component: Layout,
  children: [
    {
      path: 'index',
      name: '产品管理',
      component: loadComponent('views/productManagement/index'),
      meta: { title: '产品管理', icon: 'iconfont icon-product' }
    }
  ]
}, {
  // 渠道管理
  path: '/channelManagement',
  component: Layout,
  children: [
    {
      path: 'index',
      name: '渠道管理',
      component: loadComponent('views/channelManagement/index'),
      meta: { title: '渠道管理', icon: 'iconfont icon-channel' }
    }
  ]
}, {
  // 事件管理
  path: '/eventManagement',
  component: Layout,
  children: [
    {
      path: 'index',
      name: '事件管理',
      component: loadComponent('views/eventManagement/index'),
      meta: { title: '事件管理', icon: 'iconfont icon-event' }
    }
  ]
}, {
  // 数据分析
  path: '/dataAnalysis',
  component: Layout,
  children: [
    {
      path: 'index',
      name: '数据分析',
      component: loadComponent('views/dataAnalysis/index'),
      meta: { title: '数据分析', icon: 'iconfont icon-analyze' }
    }
  ]
}]

export default new Router({
  mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
