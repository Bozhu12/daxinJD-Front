import Vue from 'vue'
import Vuex from 'vuex'

// 外部引入 购物车模块
import moduleCart from './cart.js'
import moduleUser from './user.js'

Vue.use(Vuex);

const store = new Vuex.Store({
    // 挂载后访问路径为 : m_cart.cart
    modules:{
         m_cart: moduleCart,
         m_user: moduleUser,
    }
});
export default store;