<template>
    <view class="order-info">
        <view class="panel">
            <view class="listUnit"><view class="title">订单信息</view></view>
            <view class="listUnit">
                <view class="headMsg">订单编号 :</view>
                <view>{{ orderInfo.id }}</view>
            </view>
            <view class="listUnit">
                <view class="headMsg">订单状态 :</view>
                <view>{{ orderInfo.status === 0 ? '成功' : '失败' }}</view>
            </view>
            <view class="listUnit">
                <view class="headMsg">销售时间 :</view>
                <view>{{ orderInfo.createTime }}</view>
            </view>
            <view class="listUnit">
                <view class="headMsg">销售人名 :</view>
                <view>{{ orderInfo.userName }}</view>
            </view>
            <view class="listUnit">
                <view class="headMsg">订单备注 :</view>
                <view>{{ orderInfo.remark === '' ? '未备注' : orderInfo.remark }}</view>
            </view>
            <view class="listUnit">
                <view class="headMsg">销售总价 :</view>
                <view>{{ orderInfo.price }}</view>
            </view>
        </view>
        <view class="panel">
            <view class="listUnit"><view class="title">客户信息</view></view>
            <view class="listUnit">
                <view class="headMsg">客户姓名 :</view>
                <view>{{ orderInfo.clientName }}</view>
            </view>
            <view class="listUnit">
                <view class="headMsg">客户手机 :</view>
                <view>{{ orderInfo.clientPhone1 }}</view>
            </view>
            <view class="listUnit">
                <view class="headMsg">客户手机 :</view>
                <view>{{ orderInfo.clientPhone2 }}</view>
            </view>
            <view class="listUnit">
                <view class="headMsg">客户地址 :</view>
                <view>{{ orderInfo.clientAddress }}</view>
            </view>
        </view>
        <view class="panel">
            <view class="listUnit"><view class="title">商品信息</view></view>
            <block v-for="(goods, i) in orderInfo.goodsList" :key="i">
                <my-order-goods :goods="goods" :orderMsg="orderInfo.orderInfoList[i]"></my-order-goods>
            </block>
            <u-line color="#242424"></u-line>
            <view class="listUnit total">
                <view class="price">总计 :</view>
                <view class="price">{{ orderInfo.price }}￥</view>
            </view>
        </view>
    </view>
</template>

<script>
import {orderInfo} from '@/util/api.js';
export default {
    data() {
        return {
            orderInfo: {}
        };
    },
    methods: {
        async loadData(id) {
            let res = await orderInfo(id);
            this.orderInfo = res.data;
        }
    },
    onLoad(options) {
        if (options.orderId === null || options.orderId === undefined) {
            uni.navigateBack();
            return;
        }
        this.loadData(options.orderId);
    }
};
</script>

<style lang="scss">
.order-info {
    background-color: #f1f1f1;
    padding: 10rpx 0 20rpx;

    .panel {
        background-color: #fefefe;
        margin: 20rpx;
        padding: 20rpx;
        .listUnit {
            display: flex;
            justify-content: start;
            align-items: center;
        }
        .headMsg {
            font-weight: 600;
            font-size: 32rpx;
            margin-bottom: 10rpx;
            margin-right: 20rpx;
        }
        .title {
            font-size: 42rpx;
            font-weight: 600;
            margin-bottom: 20rpx;
        }
        .total {
            display: flex;
            justify-content: space-between;
            .price {
                font-weight: 600;
                font-size: 46rpx;
                color: #e1251b;
            }
        }
    }
}
</style>
