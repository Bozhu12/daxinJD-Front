<template>
    <view class="my-order-goods-iten">
        <!-- 左侧 -->
        <view class="goods-item-left">
            <image :src="goods.goodsSmallLogo || defaultPic" class="goods-image"></image>
        </view>
        <!-- 右侧 -->
        <view class="goods-item-right">
            <view class="goods-titem">{{ goods.goodsTitle }}</view>
            <view class="goods-info-box">
                <view class="goods-info-msg">
                    <!-- 名称/品牌 -->
                    <text>{{ (goods.goodsName == ' ' ? '' : goods.goodsName) || goods.goodsBrand }}</text>
                    <!-- 型号/类型 -->
                    <text>{{ goods.goodsModel || goods.goodsClassName }}</text>
                </view>
                <view class="goods-info-pric">
                    <view>{{ orderMsg.orderinfoGoodsPrice }}￥</view>
                    <view class="sku" @click="copySku"><image src="@/static/icon/SKU.png" mode=""></image></view>
                </view>
                <view class="goods-info-pric">
                    <view class="price">{{ orderMsg.orderinfoGoodsPrice * orderMsg.orderinfoCount }}￥</view>
                    <view>x{{ orderMsg.orderinfoCount }}</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    name: 'my-order-goods',
    props: {
        goods: {
            type: Object,
            default: {}
        },
        orderMsg: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            // 默认的空图片
            defaultPic:
                'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
        };
    },
    methods: {
        // 拷贝
        copySku() {
            uni.setClipboardData({
                data: this.goods.goodsSku,
                success: function() {
                    uni.$showMsg('SKU拷到手!');
                },
                fail: function() {
                    uni.$showMsg('拷了个寂寞!?');
                }
            });
        }
    }
};
</script>

<style lang="scss">
.my-order-goods-iten {
    display: flex;
    margin-bottom: 20rpx;

    .goods-item-left {
        margin-right: 15rpx;

        .goods-image {
            width: 230rpx;
            height: 230rpx;
            display: block;
            border-radius: 16rpx;
        }
    }

    .goods-item-right {
        display: flex;
        flex-direction: column;

        .goods-titem {
            font-size: 16px;
            font-weight: 600;
            // 溢出隐藏
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
        }

        .goods-info-box {
            display: flex;
            flex-direction: column;
            .sku > image {
                width: 54rpx;
                height: 42rpx;
            }

            .goods-info-msg {
                display: flex;
                justify-content: space-between;
                text {
                    font-size: 14px;
                }
            }
            .goods-info-pric {
                display: flex;
                justify-content: space-between;

                .price {
                    font-size: 18px;
                    font-weight: 600;
                    color: $u-warning-dark;
                }
                .sku > image {
                    width: 54rpx;
                    height: 42rpx;
                }
            }

            .goods-button {
                display: flex;
                justify-content: space-between;
            }
        }
    }
}
</style>
