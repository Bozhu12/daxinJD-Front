export default {
    namespaced: true,
    state: () => ({
        cookie: uni.getStorageSync('cookie') || '',
        // 用户基本信息
        userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
        // 收藏商品
        collection: uni.getStorageSync('collection') || []
    }),
    mutations: {
        // 更新用户基本信息
        updateUserInfo(state, userinfo) {
            state.userinfo = userinfo
            this.commit('m_user/saveUserInfoToStorage')
        },
        saveUserInfoToStorage(state) {
            uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
        },
        // 用户收藏
        deleteCollection(state, index) {
            state.collection.splice(index, 1);
            this.commit('m_user/saveCollectionGoods')
        },
        addCollectionGoods(state, goodsSku) {
            // 防止重复
            const findObj = state.collection.find((e) => goodsSku === e)
            if (findObj) return;
            state.collection.push(goodsSku)
            this.commit('m_user/saveCollectionGoods')
        },
        saveCollectionGoods(state) {
            uni.setStorageSync('collection', state.collection);
        },
        // cookie 更新 
        updateCookie(state, cookie) {
            state.cookie = cookie
            this.commit('m_user/saveCookie')
        },
        saveCookie(state) {
            uni.setStorageSync('cookie', state.cookie)
        },
    },
    getters: {}
}
