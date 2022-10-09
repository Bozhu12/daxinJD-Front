<template>
    <view>
        <!-- 搜索 -->
        <view class="search-box">
            <search @my-click="gotoSearch" :bgcolor="'#d81e06'"></search>
        </view>
        <!-- 公告 -->
        <!-- 分类 -->
        <!-- ... -->
    </view>
</template>

<script>
	import search from "@/components/my-search/my-search.vue"
    export default {
        data() {
            return {

            };
        },
		components:{
			search
		},
        methods: {
            gotoSearch() {
                uni.navigateTo({
                    url: '/subpkg/search/search'
                })
            }
        },
        mounted() {
        }
    }
</script>

<style lang="scss">

</style>
