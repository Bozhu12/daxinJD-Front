<template>
    <view>
        <view class="goodsList-box" v-if="orderList.length !== 0">
            <block v-for="(item, i) in orderList" :key="i"><my-order :order="item"></my-order></block>
        </view>
        <view v-if="orderList.length === 0">
            <u-empty mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png" text="没有相关订单"></u-empty>
        </view>
    </view>
</template>

<script>
import {orderList} from '@/util/api.js';
export default {
    data() {
        return {
            orderList: [],
            isloading: false,
            page: {
                pageNum: 1,
                pageSize: 5
            }
        };
    },
    methods: {
        async loadData() {
            if (this.isloading) return;
            this.isloading = true;
            let res = await orderList(this.page.pageNum, this.page.pageSize);
            this.orderList = [...this.orderList, ...res.list];
            this.isloading = false;
        }
    },
    // 触底 加页
    onReachBottom() {
        // 请求过程禁止继续加页
        if (this.isloading) return;
        this.page.pageNum += 1;
        this.loadData();
    },
    onLoad() {
        this.loadData();
    }
};
</script>

<style lang="scss"></style>
