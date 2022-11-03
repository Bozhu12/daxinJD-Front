export default {
    namespaced: true,
    state: () => ({
        // 用户登录成功有数据
        token: uni.getStorageSync('token') || '',
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
        // 更新 tocken
        updateToken(state, token) {
            state.token = token
            this.commit('m_user/saveTokenToStorage')
        },
        saveTokenToStorage(state) {
            uni.setStorageSync('token', state.token)
        }
    },
    getters: {}
}
