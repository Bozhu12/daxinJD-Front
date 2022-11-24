import {
    mapGetters
} from 'vuex';
// 直接暴露
export default {
    computed: {
        ...mapGetters('m_cart', ['total'])
    },
    onShow() {
        this.setBadge()
    },
    methods: {
        setBadge() {
            uni.setTabBarBadge({
                index: 1,
                text: this.total + ''
            })
        }
    },
    watch: {
        total() {
            // 判断 为 tabbar页 才执行 以下代码
            if (getCurrentPages().length === 1) this.setBadge()
        }
    }
}
