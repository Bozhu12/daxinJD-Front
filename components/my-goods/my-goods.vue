<template>
    <view class="goods-item">
        <!-- 左侧 -->
        <view class="goods-item-left" @click="gotoJdPage">
            <image :src="goods.goodsSmallLogo || defaultPic" class="goods-image"></image>
        </view>
        <!-- 右侧 -->
        <view class="goods-item-right">
            <view class="goods-titem" @click="gotoJdPage">{{ goods.goodsTitle }}</view>
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
                <view class="goods-button">
                    <u-button
                        type="primary"
                        shape="circle"
                        text="商品详细"
                        customStyle="margin: 0px 8px; height: 30px;"
                        @click="gotoGoodsInfo(goods.goodsSku)"
                    ></u-button>
                    <u-button
                        type="primary"
                        shape="circle"
                        text="添加购物车"
                        color="#e1251b"
                        customStyle="margin: 0px 8px; height: 30px;"
                        @click="addGoods(goods)"
                        v-if="addShow"
                    ></u-button>
                    <u-button
                        type="primary"
                        shape="circle"
                        text="取消收藏"
                        color="#e1251b"
                        customStyle="margin: 0px 8px; height: 30px;"
                        @click="delCollection(goods.goodsSku)"
                        v-if="!addShow"
                    ></u-button>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import {mapMutations} from 'vuex';
export default {
    name: 'my-goods',
    props: {
        goods: {
            type: Object,
            default: {}
        },
        addShow: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            jdUrl: 'http://item.jd.com/',
            // 默认的空图片
            defaultPic:
                'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
        };
    },
    methods: {
        ...mapMutations('m_cart', ['addToCart']),
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
        },
        gotoGoodsInfo(sku) {
            uni.navigateTo({
                url: `../goods_info/goods_info?goods_sku=${sku}&edit=true`
            });
        },
        addGoods() {
            this.addToCart({
                goodsId: this.goods.id,
                goodsTitem: this.goods.goodsTitle,
                goodsName: this.goods.goodsName,
                goodsPrice: this.goods.goodsPrice,
                goodsSmallPrice: this.goods.goodsSmallPrice || 0,
                goodsCount: 1,
                goodsSmallLogo: this.goods.goodsSmallLogo
            });
            uni.$showMsg('添加成功', 1000);
        },
        gotoJdPage() {
            let url = this.jdUrl + this.goods.goodsSku + '.html';
            uni.navigateTo({
                url: `../webview/webview?url=${url}`
            });
        },
        delCollection() {
            this.$emit('clear');
        }
    }
};
</script>

<style lang="scss">
.goods-item {
    display: flex;
    margin: 20rpx;
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
