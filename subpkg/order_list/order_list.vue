<template>
    <view>
        <view class="goodsList-box" v-if="orderList.length !== 0">
            <block v-for="(item, i) in orderList" :key="i">
                <my-order :showWithdraw="showWithdraw" @clearItem="clearItem(i)" :order="item"></my-order>
            </block>
        </view>
        <view v-if="orderList.length === 0">
            <u-empty mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png" text="没有相关订单"></u-empty>
        </view>
    </view>
</template>

<script>
import {orderList, withdrawalOrderList} from '@/util/api.js';
export default {
    data() {
        return {
            showWithdraw: false,
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
            res.list.reverse();
            this.orderList = [...this.orderList, ...res.list];
            this.isloading = false;
            if(res.list.length == 0) {
                uni.$showMsg("到底啦~")
                this.page.pageNum -= 1;
                return;
            }
            if(this.orderList.length < this.page.pageSize){
                this.page.pageNum += 1;
                this.loadData()
            }
        },
        async loadWithdrawData() {
            if (this.isloading) return;
            this.isloading = true;
            let res = await withdrawalOrderList(this.page.pageNum, this.page.pageSize);
            this.orderList = [...this.orderList, ...res.list];
            this.isloading = false;
            if(res.list.length == 0) {
                uni.$showMsg("到底啦~")
                this.page.pageNum -= 1;
                return;
            }
            if(this.orderList.length < this.page.pageSize){
                this.page.pageNum += 1;
                this.loadWithdrawData()
            }
        },
        clearItem(i) {
            this.orderList.splice(i, 1);
        }
    },
    // 触底 加页
    onReachBottom() {
        // 请求过程禁止继续加页
        if (this.isloading) return;
        this.page.pageNum += 1;
        if(this.showWithdraw){
            this.loadData();
        }else{
            this.loadWithdrawData();
        }
    },
    onLoad(options) {
        if (options.withdraw === undefined) uni.navigateBack();
        if (options.withdraw === '1') {
            this.showWithdraw = false;
            this.loadWithdrawData();
        } else {
            this.showWithdraw = true;
            this.loadData();
        }
    }
};
</script>

<style lang="scss"></style>
