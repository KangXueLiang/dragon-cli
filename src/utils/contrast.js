// 权限id对照表：分为菜单对照与权限对照
export const menuLists = {
  // 客户管理
  'menu-customer-management': {
    id: 'menu-customer-management',
    name: '客户管理',
    route: '/customerManagement',
    summary: '',
    flag: true
  },
  // 客户管理首页
  'menu-customer-management-index': {
    id: 'menu-customer-management-index',
    name: '客户管理',
    route: 'index',
    parent_id: 'menu-customer-management',
    summary: '客户管理的首页'
  },
  // 客户管理详情页
  'menu-customer-management-detail': {
    id: 'menu-customer-management-detail',
    name: '客户详情',
    route: 'detail',
    parent_id: 'menu-customer-management',
    summary: '客户详情页',
    flag: true
  },
  // 产品管理
  'menu-product-management': {
    id: 'menu-product-management',
    name: '产品管理',
    route: '/productManagement',
    summary: '',
    flag: true
  },
  // 产品管理首页
  'menu-product-management-index': {
    id: 'menu-product-management-index',
    name: '产品管理',
    route: 'index',
    parent_id: 'menu-product-management',
    summary: '客户管理的首页'
  },
  // 渠道管理
  'menu-channel-management': {
    id: 'menu-channel-management',
    name: '渠道管理',
    route: '/channelManagement',
    summary: '',
    flag: false
  },
  // 渠道管理首页
  'menu-channel-management-index': {
    id: 'menu-channel-management-index',
    name: '渠道管理',
    route: 'index',
    parent_id: 'menu-channel-management',
    summary: '客户管理的首页'
  },
  // 事件管理
  'menu-event-management': {
    id: 'menu-event-management',
    name: '事件管理',
    route: '/eventManagement',
    summary: ''
  },
  // 渠道管理首页
  'menu-event-management-index': {
    id: 'menu-event-management-index',
    name: '事件管理',
    route: 'index',
    parent_id: 'menu-event-management',
    summary: '事件管理的首页'
  },
  // 数据分析
  'menu-data-analysis': {
    id: 'menu-data-analysis',
    name: '事件管理',
    route: '/dataAnalysis',
    summary: ''
  },
  // 数据分析的首页
  'menu-data-analysis-index': {
    id: 'menu-data-analysis-index',
    name: '事件管理',
    route: 'index',
    parent_id: 'menu-data-analysis',
    summary: '数据分析的首页'
  }
}
export const permissionLists = {
  // 客户相关
  'action-customer-detail': {
    id: 'action-customer-detail',
    name: '查看客户详情'
  }, // 查看客户详情
  'action-customer-edit': {
    id: 'action-customer-edit',
    name: '编辑客户'
  }, // 编辑客户
  'action-customer-add': {
    id: 'action-customer-add',
    name: '添加客户'
  }, // 添加客户
  'action-customer-export': {
    id: 'action-customer-export',
    name: '导出客户'
  }, // 导出客户
  'action-customer-delete': {
    id: 'action-customer-delete',
    name: '删除客户'
  }, // 删除客户
  'action-customer-group': {
    id: 'action-customer-group',
    name: '客户分组管理'
  }, // 客户分组管理
  // 接下来是产品
  'action-product-detail': {
    id: 'action-product-detail',
    name: '查看产品详情'
  }, // 查看产品详情
  'action-product-edit': {
    id: 'action-product-edit',
    name: '编辑产品'
  }, // 编辑产品
  'action-product-add': {
    id: 'action-product-add',
    name: '添加产品'
  }, // 添加产品
  'action-product-export': {
    id: 'action-product-export',
    name: '导出产品'
  }, // 导出产品
  'action-product-delete': {
    id: 'action-product-delete',
    name: '删除产品'
  }, // 删除产品
  'action-product-group': {
    id: 'action-product-group',
    name: '产品分组管理'
  }, // 产品分组管理
  // 接下来是渠道
  'action-channel-detail': {
    id: 'action-channel-detail',
    name: '查看产品详情'
  }, // 查看产品详情
  'action-channel-edit': {
    id: 'action-channel-edit',
    name: '编辑产品'
  }, // 编辑产品
  'action-channel-add': {
    id: 'action-channel-add',
    name: '添加产品'
  }, // 添加产品
  'action-channel-export': {
    id: 'action-channel-export',
    name: '导出产品'
  }, // 导出产品
  'action-channel-delete': {
    id: 'action-channel-delete',
    name: '删除产品'
  }, // 删除产品
  'action-channel-group': {
    id: 'action-channel-group',
    name: '产品分组管理'
  }, // 产品分组管理
  // 接下来是设置权限
  'action-set-role': {
    id: 'action-set-role',
    name: '角色管理'
  }, // 角色管理
  'action-set-customer': {
    id: 'action-set-customer',
    name: '用户管理'
  }, // 用户管理
  'action-set-business': {
    id: 'action-set-business',
    name: '业务参数配置'
  } // 业务参数配置
}

