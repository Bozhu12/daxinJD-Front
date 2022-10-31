<template>
    <view class="my-search-container" :style="{'background-color': bgcolor}" @click="searchBoxHandler">
        <!-- 搜索 input 输入-->
        <view class="my-search-box" :style="{'border-radius': radius + 'px'}">
            <uni-icons type="search" size="17"></uni-icons>
            <text class="placeholder">搜索商品</text>
        </view>
    </view>
</template>

<script>
export default {
    props: {
        bgcolor: {
            type: String,
            default: '#d81e06'
        },
        radius: {
            type: Number,
            default: 16
        }
    },
    name: 'my-search',
    data() {
        return {};
    },
    onLoad() {
        const sysInfo = uni.getSystemInfoSync();
        // 添加了搜索组件后 可用高度会减少因此需要手动减去高度 , 以防下拉不到问题
        // 可用高度 = 屏幕高度 - navigationBar高度 - tabBar高度 - 自定义的search组件高度
        this.wh = sysInfo.windowHeight - 42;
    },
    methods: {
        searchBoxHandler() {
            this.$emit('my-click');
        }
    }
};
</script>

<style lang="scss">
.my-search-container {
    // background-color: #d81e06;
    height: 42px;
    padding: 0 10px;
    display: flxe;
    align-items: center;
}

.my-search-box {
    height: 36px;
    background-color: #ffffff;
    // border-radius: 15px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .placeholder {
        font-size: 15px;
        margin-left: 5px;
    }
}
</style>
