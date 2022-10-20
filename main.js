import App from './App'
import { $http } from '@escook/request-miniprogram'
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
import store from './store/store.js'
Vue.prototype.$store = store
Vue.use(uView)
const app = new Vue({
    ...App,
    store
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
