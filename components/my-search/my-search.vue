<template>
    <view class="my-search-box">
        <!-- 搜索 -->
        <view class="search-content">
            <u-search
                v-model="kw"
                bgColor="#ffffff"
                :placeholder="placeholder"
                @clickIcon="scanQrcode"
                @custom="query"
                :searchIcon="searchIcon"
                @search="query"
                :actionText="buttonText"
            ></u-search>
        </view>
    </view>
</template>

<script>
export default {
    props: {
        inputData: {
            type: String,
            default: '',
        },
        placeholder: {
            type: String,
            default: '请输入内容',
        },
        searchIcon: {
            tyep: String,
            default: 'search',
        },
        buttonText: {
            type: String,
            default: '搜索',
        },
    },
    name: 'my-search',
    data() {
        return {
            kw: '',
        };
    },
    watch: {
        inputData(newV, oldV) {
            this.kw = newV;
        },
    },
    methods: {
        query() {
            this.$emit('search', this.kw);
        },
        async scanQrcode() {
            let [err, res] = await uni.scanCode();
            if (err != null) return uni.$showMsg('扫码异常!');
            this.kw = uni.$parsingQrCode(res.result);
        },
    },
};
</script>

<style lang="scss">
.my-search-box {
    position: sticky;
    top: 0;
    z-index: 999;
    background-color: #e1251b;
    height: 42px;
    padding: 0 10px;
    align-items: center;

    .search-content {
        height: 36px;
        border-radius: 16px;
        padding: 0 4px;
        background-color: #ffffff;
    }
}
</style>
