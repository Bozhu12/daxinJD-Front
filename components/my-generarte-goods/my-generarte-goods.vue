<template>
    <view class="goods-item">
        <view class="left-panel"><image :src="goods.goodsSmallLogo || defaultPic" class="goods-image"></image></view>
        <view class="right-panel">
            <view class="goods-titem">{{ goods.goodsTitle }}</view>
            <view class="goods-info-box">
                <view class="goods-info-msg">
                    <!-- 名称/品牌 -->
                    <text>{{ (goods.goodsName == ' ' ? '' : goods.goodsName) || goods.goodsBrand }}</text>
                    <!-- 型号/类型 -->
                    <text>{{ goods.goodsModel || goods.goodsClassName }}</text>
                </view>
                <view class="goods-info-pric">
                    <view class="price">{{ goods.goodsPrice == undefined ? '0' : goods.goodsPrice.toFixed(2) }}</view>
                    <view class="sku" @click="copySku"><image src="@/static/icon/SKU.png" mode=""></image></view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    name: 'my-generarte-goods',
    props: {
        goods: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
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
.goods-item {
    display: flex;
    padding: 20rpx;

    .left-panel {
        margin-right: 15rpx;

        .goods-image {
            width: 230rpx;
            height: 230rpx;
            display: block;
            border-radius: 16rpx;
        }
    }

    .right-panel {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

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
