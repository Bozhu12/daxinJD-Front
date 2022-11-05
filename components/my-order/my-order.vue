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
                <u-button
                    type="primary"
                    shape="circle"
                    text="订单详细"
                    customStyle="padding: 16px 32rpx; height: 30px;"
                ></u-button>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    name: 'my-order',
    props: {
        order: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
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
        }
    }
}
</style>
