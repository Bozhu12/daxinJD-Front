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
                @clear="query"
                :actionText="buttonText"
            ></u-search>
        </view>
        <view class="ico-button" v-if="isIco"><u-icon :name="icoName" size='25px' color='#ffffff' @click="icoClick"></u-icon></view>
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
        icoName:{
            tyep: String,
            default: 'calendar'
        },
        isIco:{
            type: Boolean,
            default: false
        }
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
        icoClick(){
            this.$emit('icoClick');
        }
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
    display: flex;
    justify-content: space-between;

    .search-content {
        flex: 1;
        height: 36px;
        border-radius: 16px;
        padding: 0 4px;
        background-color: #ffffff;
    }

    .ico-button {
        padding-left: 10px;
    }
}
</style>
