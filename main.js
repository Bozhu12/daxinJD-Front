import App from './App'
import { $http } from '@escook/request-miniprogram'
import { getCurrentUser } from '@/util/api.js'
import {isEmpty} from '@/util/validate.js'

// 全局变量
// 解析二维码信息
uni.$parsingQrCode = function (url) {
    // 去除 前缀/后缀
    // https://item.jd.com/100005722048.html 
    return url.match(/\d+/);
}
// 封装
uni.$packQrCode = function (sku) {
    return `https://item.jd.com/${sku}.html`;
}
// 封装信息提示
uni.$showMsg = function (title = '成功', duration = 2000) {
    uni.showToast({
        title,
        duration,
        icon: 'none',
    })
}
// 跳转登录
uni.$verifyLogin = async function (title = '请进行登录') {
    let user = await getCurrentUser();
    if (isEmpty(user)) {
        uni.$store.commit('m_user/updateUserInfo', {})
        uni.$store.commit('m_user/updateCookie', '')
        uni.showToast({
            title,
            duration: 2000,
            icon: 'none',
        })
        setTimeout(() => {
            uni.switchTab({
                url: '/pages/my/my'
            })
        }, 2000);
    }
}
// 请求完成之后做一些事情
$http.afterRequest = function () {
    uni.hideLoading()
}
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
// main.js
import uView from '@/uni_modules/uview-ui'
import store from '@/store/store.js'
Vue.prototype.$store = store
uni.$store = store
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
