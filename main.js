import App from './App'

import {
    $http
} from '@escook/request-miniprogram'

uni.$http = $http
// 配置请求根路径
$http.baseUrl = 'http://localhost:8080'

// 请求开始之前做一些事情
$http.beforeRequest = function(options) {
    uni.showLoading({
        title: '数据加载中...',
    })
}

// 封装信息提示
uni.$showMsg = function(title = '数据请求失败!', duration = 1500) {
    uni.showToast({
        title,
        duration,
        icon: 'none'
    })
}

// 请求完成之后做一些事情
$http.afterRequest = function() {
    uni.hideLoading()
}

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
// main.js
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
    createSSRApp
} from 'vue'
export function createApp() {
    const app = createSSRApp(App)
    return {
        app
    }
}
// #endif
