<template>
    <view class="goods-item">
        <!-- 左侧 -->
        <view class="goods-item-left"><image :src="defaultPic" class="goods-image"></image></view>
        <!-- 右侧 -->
        <view class="goods-item-right">
            <view class="goods-titem">标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</view>
            <view class="goods-info-box">
                <view class="goods-info-msg">
                    <text>名称</text>
                    <text>型号</text>
                </view>
                <view class="goods-info-pric">
                    <view class="price">5964.00</view>
                    <view class="sku"><image src="@/static/icon/SKU.png" mode=""></image></view>
                </view>
                <view class="goods-button">
                    <u-button
                        type="primary"
                        shape="circle"
                        text="商品详细"
                        customStyle="margin: 0px 8px; height: 30px;"
                    ></u-button>
                    <u-button
                        type="primary"
                        shape="circle"
                        text="添加购物车"
                        color="#e1251b"
                        customStyle="margin: 0px 8px; height: 30px;"
                    ></u-button>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    name: 'my-goods',
    data() {
        return {
            // 默认的空图片
            defaultPic:
                'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
        };
    }
};
</script>

<style lang="scss">
.goods-item {
    display: flex;
    margin: 32rpx 20rpx;
    padding: 12rpx 10rpx;
    border: 1px solid $u-info-dark;
    border-radius: 20rpx;

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
                    font-size: 12px;
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
