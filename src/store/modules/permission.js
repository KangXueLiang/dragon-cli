// 权限控制相关js
import { asyncRouterMap, constantRouterMap } from '@/router'
import { menuLists } from '../../utils/contrast' // ID与route的对照表
import { Message } from 'element-ui'
/* 菜单数据组织思路
 根据后端的权限id数组如
 ['menu-customer-management-index', 'menu-product-management-index', 'menu-channel-management-index']
 转换为如下结构：
 {
  '/customerManagement': true,
  '/customerManagement/index': true,
  '/productManagement': true,
  '/productManagement/index': true
 }，
 然后根据hash生成真实路由
*/

// 通用深拷贝函数
function deepcopy(source) {
  if (!source) {
    return source
  }
  const sourceCopy = source instanceof Array ? [] : {}
  for (const item in source) {
    sourceCopy[item] = typeof source[item] === 'object' ? deepcopy(source[item]) : source[item]
  }
  return sourceCopy
}

// 生成routehash { "/route1": true, "/route2": true, ... }
function getRoutes(userPermissions) {
  const routeHash = {}
  const setMenu2Hash = function(array, base) {
    array.map(key => {
      if (key.route) {
        const hashKey = ((base ? base + '/' : '') + key.route).replace(/^\//, '')
        routeHash['/' + hashKey] = true
        if (Array.isArray(key.children)) {
          setMenu2Hash(key.children, key.route)
        }
      }
    })
  }
  if (Array.isArray(userPermissions)) {
    const arrayMenus = buildMenu(userPermissions)
    setMenu2Hash(arrayMenus)
  }
  // Get hash structure
  return routeHash
}

// 生成hash
function buildMenu(array, ckey) {
  const array2 = []
  // 把菜单id找出来，然后把id按对照表扩展
  array.forEach((e) => {
    if (e.indexOf('menu') === 0) {
      array2.push(menuLists[e])
    }
  })
  array = array2
  const menuData = []
  // const indexKeys = Array.isArray(array) ? array.map((e) => { return e.id }) : []
  ckey = ckey || 'parent_id'
  array.forEach(function(e) {
    // 先找到二级菜单
    // if (!e[ckey] || (e[ckey]===e.id)) {
    //   delete e[ckey]
    //   menuData.push(deepcopy(e)) //深拷贝
    // }else if(Array.isArray(indexKeys)){
    //   //检测ckey有效性
    //   let parentIndex = indexKeys.findIndex(function(id){
    //     return id == e[ckey]
    //   })
    //   if(parentIndex===-1){
    //     menuData.push(e)
    //   }
    // }
    if (e[ckey]) {
      menuData.push(deepcopy(e))
    }
  })
  // 把IdLists转成数组
  const routers = []
  for (const item in menuLists) {
    routers.push(menuLists[item])
  }
  // 根据二级菜单找一级菜单
  const findParent = function(childArr) {
    if (Array.isArray(childArr) && childArr.length) {
      var result = {}
      childArr.forEach(childNode => {
        routers.forEach(node => {
          if (node.id === childNode[ckey]) {
            if (!result[node.id]) {
              result[node.id] = node
              result[node.id].children = []
              result[node.id].children.push(childNode)
            } else {
              if (result[node.id].children) {
                result[node.id].children.push(childNode)
              } else {
                result[node.id].children = [childNode]
              }
            }
          }
        })
        if (childNode[ckey]) {
          findParent([childNode[ckey]])
        }
      })
      // 再把result转为数组
      const tmp = []
      for (const item2 in result) {
        tmp.push(result[item2])
      }
      return tmp
    }
  }
  // const findChildren = function(parentArr) {
  //   if (Array.isArray(parentArr) && parentArr.length) {
  //     parentArr.forEach(function(parentNode) {
  //       array.forEach(function(node) {
  //         if (parentNode.id === node[ckey]) {
  //           if (parentNode.children) {
  //             parentNode.children.push(node)
  //           } else {
  //             parentNode.children = [node]
  //           }
  //         }
  //       })
  //       if (parentNode.children) {
  //         findChildren(parentNode.children)
  //       }
  //     })
  //   }
  // }
  return findParent(menuData)
}

function extendRoutes(routePermission) {
  // 过滤本地路由，生成最终的实际路由
  let actualRouter = []
  const findLocalRoute = function(array, base) {
    const replyResult = []
    array.forEach(route => {
      const pathKey = (base ? base + '/' : '') + route.path
      if (routePermission[pathKey]) {
        if (Array.isArray(route.children)) {
          route.children = findLocalRoute(route.children, route.path)
        }
        replyResult.push(route)
      }
    })
    if (base) {
      return replyResult
    } else {
      actualRouter = actualRouter.concat(replyResult)
    }
  }
  findLocalRoute(asyncRouterMap)

  // If the user does not have any routing authority

  if (!actualRouter || !actualRouter.length) {
    // 这里表示没有路由权限，直接提示
    Message({
      message: '无访问权限，请联系企业管理员',
      type: 'error'
    })
  }
  // Add actual routing to application

  // Save information for rendering menu.(This step is optional.)

  // this.$root.menuData = actualRouter
  return actualRouter
}

// 导出鉴权对象
const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        // 这里开始生成动态的菜单
        /*
        * Get routePermission form user permissions
        * Like this:
        * { "/route1": true, "/route2": true, ... }
        */
       console.log('data', data) // 后期把data在这里进行处理
        const datademo = ['menu-customer-management-index', 'menu-product-management-index', 'menu-channel-management-index', 'menu-event-management-index', 'menu-data-analysis-index']
        const userPermissions = datademo
        const routePermission = getRoutes(userPermissions)
        /*
        * 导出路由
        * 这里注意要把404拼进去
        */
        const a = { path: '*', redirect: '/404', hidden: true }
        const accessedRouters = extendRoutes(routePermission).concat(a)
        console.log('constantRouterMap', accessedRouters)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
