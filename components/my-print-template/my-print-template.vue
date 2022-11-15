<template>
    <view v-if="printConfig !== undefined && model !== undefined">
        <view class="item" @click="selected">
            <view class="left"><image :src="imageSrc"></image></view>
            <view class="right">模板-01</view>
        </view>
    </view>
</template>

<script>
export default {
    name: 'my-print-template',
    props: {
        printConfig: {
            type: Object,
            default: undefined,
        },
        model: {
            type: Object,
            default: undefined,
        },
    },
    computed: {
        imageSrc() {
            return `../../static/print-template/${this.model.fileName}`;
        },
    },
    data() {
        return {};
    },
    methods: {
        selected() {
            this.$emit('click');
        },
    },
};
</script>

<style lang="scss">
.item {
    display: flex;
    margin: 20rpx;
    padding: 0 10rpx 12rpx 10rpx;
    border: 1px solid #767a82;
    border-radius: 20rpx;
    flex-direction: column;
    justify-content: content;
    align-items: center;
    width: 260rpx;

    .left > image {
        width: 300rpx;
        height: 300rpx;
        display: block;
        border-radius: 16rpx;
    }
}
</style>
