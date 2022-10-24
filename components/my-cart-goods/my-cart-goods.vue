<template>
    <view class="goods-item">
        <!-- 左图 -->
        <view class="goods-item-left"><image :src="goods.goodsSmallLogo || defaultPic" class="goods-pic"></image></view>
        <!-- 右信息 -->
        <view class="goods-item-right">
            <view class="goods-titem">{{ goods.goodsTitem }}</view>
            <view class="goods-name">{{ goods.goodsName }}</view>
            <view class="goods-info-box">
                <view class="goods-price">
                    <!-- {{ goods.goodsPrice == undefined ? '0' : goods.goodsPrice.toFixed(2) }} 元 -->
                    <u--input
                        type="digit"
                        maxlength="6"
                        prefixIcon="rmb"
                        prefixIconStyle="color: #e1251b"
                        color="#e1251b"
                        fontSize="21px"
                        shape="none"
                        customStyle="border:none; font-weight: 600;"
                        :value="goods.goodsPrice == undefined ? 0 : goods.goodsPrice"
                        @input="pirceChange"
                    ></u--input>
                </view>
                <u-number-box v-model="goods.goodsCount" @change="numChangeHandler"></u-number-box>
            </view>
        </view>
    </view>
</template>

<script>
import {mapMutations} from 'vuex';
import {isPrice} from '@/util/validate.js';
export default {
    name: 'my-cart-goods',
    props: {
        // 商品对象
        goods: {
            type: Object,
            defaul: {}
        }
    },
    data() {
        return {
            defaultPic:
                'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
            // 防抖延时器
            timer: null
        };
    },
    methods: {
        ...mapMutations('m_cart', ['updateGoodsPrice']),
        // numberBox 组件 数值变化时间
        numChangeHandler(num) {
            // 传递 goodsId 和 goodsCount 最新数量
            this.$emit('num-change', {
                goodsId: this.goods.goodsId,
                // 不能保证时时刻刻都是数值类型 +变量 能够快速转换数值
                goodsCount: +num.value
            });
        },
        pirceChange(v) {
            // 清除 timer 对应的延时器
            clearTimeout(this.timer);
            // 1s 未触发则更新数值
            this.timer = setTimeout(() => {
                if (!isPrice(v)) {
                    uni.$showMsg('填写价钱有误!');
                    return;
                }
                this.updateGoodsPrice({
                    id: this.goods.goodsId,
                    price: parseFloat(v || 0)
                });
            }, 1000);
        }
    }
};
</script>

<style lang="scss">
.goods-item {
    // 占宽
    width: 750rpx;
    box-sizing: border-box;

    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #f0f0f0;

    .goods-item-left {
        margin-right: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .goods-pic {
            width: 100px;
            height: 100px;
            display: flex;
        }
    }

    .goods-item-right {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: space-between;

        .goods-name {
            font-size: 13px;
        }

        .goods-titem {
            // 溢出隐藏
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
        }

        .goods-info-box {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .goods-price {
            font-size: 16xp;
            color: #d81e06;
        }
    }
}
</style>
