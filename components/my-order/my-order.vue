<template>
    <view class="my-order-box">
        <view class="title">{{ order.title }}</view>
        <view class="time">{{ order.createTime }}</view>
        <view class="proper">
            <view class="user">{{ order.userName }}</view>
            <view class="client">客户: {{ order.clientName }}</view>
        </view>
        <view class="last-box">
            <view class="sell">
                <view class="price">{{ order.price }}￥</view>
                <view class="count">x{{ order.goodsCount }}</view>
            </view>
            <view class="button-info">
                <view style="margin-right: 10px;">
                    <!-- 配送中 (完成 1=>2) -->
                    <u-button
                        v-if="order.orderStatus === 1"
                        type="success"
                        shape="circle"
                        text="配送完成"
                        customStyle="margin-right: 10rpx; padding: 16px 32rpx; height: 30px;"
                        @click="orderAction(order, 2)"
                    ></u-button>
                    <!-- 完成 (撤回未完成 2=>0) -->
                    <u-button
                        v-if="order.orderStatus === 2"
                        type="warning"
                        shape="circle"
                        color="#e1251b"
                        text="撤回订单"
                        customStyle="margin-right: 10rpx; padding: 16px 32rpx; height: 30px;"
                        @click="orderAction(order, 0)"
                    ></u-button>
                    <!-- 返回撤回 0 => 2-->
                    <u-button
                        v-if="order.orderStatus === 0"
                        type="warning"
                        shape="circle"
                        text="恢复完成"
                        customStyle="margin-right: 10rpx; padding: 16px 32rpx; height: 30px;"
                        @click="orderAction(order, 2)"
                    ></u-button>
                </view>
                <u-button
                    type="primary"
                    shape="circle"
                    text="订单详细"
                    customStyle="padding: 16px 32rpx; height: 30px;"
                    @click="gotoOrderInfo"
                ></u-button>
            </view>
        </view>
        <u-modal
            @confirm="confirmOptions"
            @cancel="modal.show = false"
            @close="modal.show = false"
            :show="modal.show"
            :title="modal.title"
            :content="`将要对订单进行操作?`"
            showCancelButton
            closeOnClickOverlay
        ></u-modal>
    </view>
</template>

<script>
import {orderStatusEdit} from '@/util/api.js'
export default {
    name: 'my-order',
    props: {
        order: {
            type: Object,
            default: null
        },
        showMsg: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            modal: {
                show: false,
                title: '温馨提示',
                content: ''
            },
            editData:{
                orderId : -1,
                status: -1
            }
            // order: {
            //     id: 14,
            //     clientName: '钟果',
            //     userName: '张三丰',
            //     price: 22989,
            //     createTime: '2022-11-03 20:06:00',
            //     title:
            //         '新飞（Frestec）10公斤全自动波轮洗衣机 自编程仿手搓洗 模糊控制 8程序 8水位（透明黑）XQB100-1806D',
            //     goodsCount: 4
            // }
        };
    },
    methods: {
        gotoOrderInfo() {
            uni.navigateTo({
                url: '../../subpkg/order_info/order_info?orderId=' + this.order.id
            });
        },
        async confirmOptions(){
            let res = await orderStatusEdit(this.editData.orderId , this.editData.status)
            if(res.order) this.$emit('editDate')
        },
        orderAction(order, stastus){
           this.editData.orderId = order.id
           this.editData.status = stastus
           this.modal.show = true;
        }
    }
};
</script>

<style lang="scss">
.my-order-box {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 20rpx;
    padding: 12rpx 20rpx;
    border: 1px solid $u-info-dark;
    border-radius: 20rpx;

    .title {
        font-size: 16px;
        font-weight: 600;
        // 溢出隐藏
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
    }

    .time {
        color: $u-info-dark;
        margin: 10rpx 0;
    }

    .proper {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10rpx;
        .client {
            font-size: 32rpx;
        }
        .user {
            font-size: 32rpx;
            font-weight: 600;
        }
    }

    .last-box {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        .sell {
            display: flex;
            align-items: flex-end;
            .price {
                font-size: 52rpx;
                font-weight: 600;
                color: $u-warning-dark;
            }
            .count {
                margin-left: 10rpx;
            }
        }
        .button-info {
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>
