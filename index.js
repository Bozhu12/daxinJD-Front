export default {
    // 为当前模块开启命名空间
    namespaced: true,

    // 模块的 state 数据

    state: () => ({
        // 购物车 对象数组 (初始化数据)
        // 属性: { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
        cart: JSON.parse(uni.getStorageSync('cart') || '[]')
    }),

    // 模块的 mutations 方法
    mutations: {
        // 购物车 商品 添加/增加
        addToCart(state, goods) {
            // 根据提交的商品id并判断是否存在
            const findObj = state.cart.find((e) => e.goods_id === goods.goods_id)
            // 添加/增加
            if (findObj) {
                findObj.goods_count++
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
        // 更新 购物车商品 勾选状态 
        updateGoodsState(state, goods) {
            const findObj = state.cart.find(e => e.goods_id === goods.goods_id)

            if (findObj) {
                findObj.goods_state = goods.goods_state
                this.commit('m_cart/saveToStorage')
            }
        },
        // 更新 购物车 商品 选择量
        updateGoodsCount(state, goods) {
            const findObj = state.cart.find(e => e.goods_id === goods.goods_id)

            if (findObj) {
                findObj.goods_count = goods.goods_count
                this.commit('m_cart/saveToStorage')
            }
        },
        // 删除 购物车 商品
        removeGoodsById(state, goods_id) {
            // 过滤掉 非该id的商品
            state.cart = state.cart.filter(e => e.goods_id !== goods_id)
            this.commit('m_cart/saveToStorage')
        },
        // 全选/反选 购物车 商品
        updateAllGoodsState(state, newState) {
            state.cart.forEach(e => e.goods_state = newState)
            this.commit('m_cart/saveToStorage')
        }
    },

    // 模块的 getters 属性
    getters: {
        // 动态统计购物车总数
        total(state) {
            let c = 0
            state.cart.forEach(goods => c += goods.goods_count)
            return c
        },
        // 选中 总和数
        checkedCount(state) {
            // 1. 过滤选中的 使用 filter()方法 
            // 2. 将已选中量累加 使用 reduce()方法 
            return state.cart.filter(e => e.goods_state).reduce((total, item) => total += item.goods_count, 0)
        },
        // 选中 总额
        checkedGoodsAmount(state) {
            // 1. 过滤选中的 使用 filter()方法
            // 2. 将已选中进行累加价格 使用 reduce()方法 
            // 3. 保留两个位小数
            return state.cart.filter(e => e.goods_state)
                .reduce((sum, i) => sum += (i.goods_count * i.goods_price), 0)
                .toFixed(2)
        }
    },
}
