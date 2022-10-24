export default {
    // 为当前模块开启命名空间
    namespaced: true,
    // 模块的 state 数据
    state: () => ({
        // 购物车 对象数组 (初始化数据)
        // 属性: { goodsId, goodsTitem, goodsName, goodsPrice, goodsCount, goodsSmallLogo }
        cart: JSON.parse(uni.getStorageSync('cart') || '[]'),
    }),
    // 模块的 mutations 方法
    mutations: {
        // 购物车 商品 添加/增加
        addToCart(state, goods) {
            // 根据提交的商品id并判断是否存在
            const findObj = state.cart.find((e) => e.goodsId === goods.goodsId)
            // 添加/增加
            if (findObj) {
                findObj.goodsCount++
            } else {
                state.cart.push(goods)
            }
            // 持久化数据
            // 通过 commit方法调用 , 用 m_cart命名空间下的 saveToStorage方法
            this.commit('m_cart/saveToStorage')
        },
        // 持久化储存购物车商品 (本地持久化)
        saveToStorage(state) {
            uni.setStorageSync('cart', JSON.stringify(state.cart))
        },
        // 更新 购物车 商品 选择量
        updateGoodsCount(state, goods) {
            const findObj = state.cart.find(e => e.goodsId === goods.goodsId)
            if (findObj) {
                findObj.goodsCount = goods.goodsCount
                this.commit('m_cart/saveToStorage')
            }
        },
        // 删除 购物车 商品
        removeGoodsById(state, goodsId) {
            // 过滤掉 非该id的商品
            state.cart = state.cart.filter(e => e.goodsId !== goodsId)
            this.commit('m_cart/saveToStorage')
        },
        // 更新 购物车 商品价格
        updateGoodsPrice(state, goods) {
            let findObj = state.cart.find(e => e.goodsId === goods.id);
            if (findObj) {
                findObj.goodsPrice = goods.price;
                this.commit('m_cart/saveToStorage')
            }
        }
    },
    // 模块的 getters 属性
    getters: {
        // 动态统计购物车总数
        total(state) {
            let c = 0
            state.cart.forEach(goods => c += goods.goodsCount)
            return c
        },
        // 总和数
        checkedCount(state) {
            // 将已选中量累加 使用 reduce()方法 
            return state.cart.reduce((total, item) => total += item.goodsCount, 0)
        },
        // 总额
        checkedGoodsAmount(state) {
            return state.cart.reduce((sum, i) => sum += (i.goodsCount * i.goodsPrice), 0).toFixed(2)
        }
    },
}
