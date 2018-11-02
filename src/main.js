import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import '@/styles/index.scss' // global css
import { Loading, Message } from 'element-ui'

import '@/icons' // icon
import '@/permission' // permission control
Vue.config.productionTip = false

// 部署获取版本更新的jsonp回调函数
if (process.env.VUE_APP_ENV_CONFIG !== 'dev') {
  window.getVersion = version => {
    if ((localStorage.frontendVersion && version !== localStorage.frontendVersion) || (window.frontendVersion && version !== window.frontendVersion)) {
      // 刷新页面
      Loading.service({ fullscreen: true, text: '正在玩命下载新版本中...' })
      setTimeout(() => {
        Message({
          message: '新版本更新成功，欢迎体验。',
          type: 'success'
        })
      }, 7000)
      setTimeout(() => {
        location.reload()
      }, 8000)
      console.log('====版本强更成功了=====')
    }
    localStorage.frontendVersion = version // 保存 以便下次使用判断
    window.frontendVersion = version // 保存 以便下次使用判断
  }
  router.beforeEach((to, from, next) => {
    const versionScript = document.createElement('script')
    versionScript.src = location.origin + '/version.js?v=' + new Date().getTime()
    const s = document.getElementsByTagName('script')[0]
    s.parentNode.insertBefore(versionScript, s)
    next()
  })
}
// 部署获取版本更新的jsonp回调函数

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
