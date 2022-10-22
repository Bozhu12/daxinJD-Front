<template>
    <view>
        <!-- 搜索 -->
        <view class="search-box"><my-search @my-click="gotoSearch" :bgcolor="'#e1251b'"></my-search></view>
        <!-- 公告 -->
        <!-- 分类 -->
        <!-- ... -->
    </view>
</template>

<script>
import badgeMix from '@/mixins/tabbar-badge.js';
export default {
    mixins: [badgeMix],
    data() {
        return {};
    },
    methods: {
        gotoSearch() {
            uni.navigateTo({
                url: '/subpkg/search/search'
            });
        }
    },
    mounted() {}
};
</script>

<style lang="scss"></style>
