<template>
    <view>
        <!-- 标题信息栏 -->
        <view class="cart-title">
            <view class="title">
                <u-icon name="shopping-cart" size="50rpx"></u-icon>
                <text style="margin-left: 10px;">购物车</text>
            </view>
            <text style="color: #e1251b;" v-if="!isNull(client)">暂无选择客户</text>
            <view style="width: 200rpx;">
                <u-button text="选择客户" type="success" @click="selectClient"></u-button>
            </view>
        </view>
        <!-- 客户信息 -->
        <view class="client-msg" v-if="isNull(client)">
            <view>
                <view>
                    <u-icon name="account"></u-icon>
                    <text>姓名</text>
                </view>
                <text>张三丰</text>
            </view>
            <view>
                <view>
                    <u-icon name="phone"></u-icon>
                    <text>电话</text>
                </view>
                <text>12345678901</text>
            </view>
            <view>
                <view>
                    <u-icon name="map"></u-icon>
                    <text>地址</text>
                </view>
                <text>大新镇大新街待考虑34号</text>
            </view>
        </view>

        <!-- 商品列表区域 -->
        <!-- 包裹删除UI -->
        <u-swipe-action>
            <block v-for="(goods, i) in cart" :key="i">
                <u-swipe-action-item :options="options" @click="swipeActionClickHandler(goods)">
                    <my-cart-goods :goods="goods" @num-change="numberChangeHandler"></my-cart-goods>
                </u-swipe-action-item>
            </block>
        </u-swipe-action>

        <!-- 扫码添加 -->
        <view class="qrCodeSkuAdd">
            <u-button type="success" icon="scan" size="large" text="扫码添加" @click="scanQrCode"></u-button>
        </view>
    </view>
</template>

<script>
import badgeMix from '@/mixins/tabbar-badge.js';
import {mapMutations} from 'vuex';
import {mapState} from 'vuex';
import {goodsDetail} from '@/util/api.js';
import {isEmpty} from '@/util/validate.js';
export default {
    mixins: [badgeMix],
    computed: {
        ...mapState('m_cart', ['cart'])
    },
    data() {
        return {
            client: '',
            options: [
                {
                    text: '删除',
                    style: {
                        backgroundColor: '#e1251b'
                    }
                }
            ]
        };
    },
    methods: {
        ...mapMutations('m_cart', ['updateGoodsCount', 'removeGoodsById', 'addToCart']),
        // 同步总数量
        numberChangeHandler(e) {
            this.updateGoodsCount(e);
        },
        // 点击滑动删除
        swipeActionClickHandler(goods) {
            this.removeGoodsById(goods.goodsId);
        },
        async scanQrCode() {
            let scanVal = await uni.scanCode();
            if (scanVal[0] != null) return uni.$showMsg('扫码异常!');
            let res = await goodsDetail(scanVal[1].result);
            this.addToCart({
                goodsId: res.data.id,
                goodsTitem: res.data.goodsTitle,
                goodsName: res.data.goodsName,
                goodsPrice: res.data.goodsPrice,
                goodsCount: 1,
                goodsSmallLogo: res.data.goodsSmallLogo
            });
            uni.$showMsg('添加成功', 1000);
        },
        isNull(obj) {
            isEmpty(obj);
        },
        selectClient() {
            uni.navigateTo({
                url: '../../subpkg/client-list/client-list'
            });
        }
    }
};
</script>

<style lang="scss">
.cart-title {
    position: sticky;
    top: 0;
    z-index: 999;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    border-bottom: 1px solid #efefef;
    background: #ffffff;

    .title {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin: 0 20rpx;
    }
}
.client-msg {
    display: flex;
    flex-direction: column;
    padding: 10rpx;
    border-bottom: 1px solid #e1251b;

    view {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    view > text {
        margin-left: 5px;
    }
}
.qrCodeSkuAdd {
    padding: 10px;
}
</style>
