<template>
    <view>
        <!-- 标题信息栏 -->
        <view class="cart-title">
            <view class="title">
                <u-icon name="shopping-cart" size="50rpx"></u-icon>
                <text style="margin-left: 10px;">购物车</text>
            </view>
            <text style="color: #e1251b;" v-show="isShow">暂无选择客户</text>
            <view style="width: 200rpx;">
                <u-button text="选择客户" type="success" @click="selectClient"></u-button>
            </view>
        </view>
        <!-- 客户信息 -->
        <view class="client-msg" v-show="!isShow">
            <view>
                <view>
                    <u-icon name="account"></u-icon>
                    <text>姓名</text>
                </view>
                <text>{{ client.clientName || '张三丰' }}</text>
            </view>
            <view>
                <view>
                    <u-icon name="phone"></u-icon>
                    <text>电话</text>
                </view>
                <view class="clientPhone">
                    ①:
                    <text v-if="client.clientPhone1 !== ''" @click="phoneCall(client.clientPhone1)">
                        {{ client.clientPhone1 }}
                    </text>
                    ②:
                    <text v-if="client.clientPhone2 !== ''" @click="phoneCall(client.clientPhone2)">
                        {{ client.clientPhone2 }}
                    </text>
                </view>
            </view>
            <view>
                <view>
                    <u-icon name="map"></u-icon>
                    <text>地址</text>
                </view>
                <text>{{ client.clientAddress || '大新镇大新街23号' }}</text>
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

        <!-- 空提示 -->
        <u-empty mode="car" icon="http://cdn.uviewui.com/uview/empty/car.png" v-if="cart.length === 0"></u-empty>

        <!-- 结算 -->
        <view class="submitOrder">
            <view class="msg">
                <text class="total">合计 :</text>
                <text class="price">￥{{ checkedGoodsAmount }}</text>
            </view>
            <view class="button">
                <u-button
                    type="warning"
                    icon="bookmark"
                    size="large"
                    text="备注"
                    @click="remarkShow = !remarkShow"
                ></u-button>
                <u-button type="success" icon="shopping-cart" size="large" text="结算" @click="settleOrder"></u-button>
            </view>
        </view>

        <!-- 备注编辑 -->
        <u-popup :show="remarkShow" :round="10" mode="bottom" closeable @close="remarkShow = !remarkShow">
            <view class="remark">
                <text>备注信息</text>
                <view class="textarea">
                    <u--textarea v-model="orderRemark" placeholder="请输入备注内容"></u--textarea>
                </view>
                <u-button type="success" size="large" text="确定" @click="remarkShow = !remarkShow"></u-button>
            </view>
        </u-popup>
    </view>
</template>

<script>
import badgeMix from '@/mixins/tabbar-badge.js';
import {mapMutations, mapGetters} from 'vuex';
import {mapState} from 'vuex';
import {goodsDetail, clientGetById, orderSubmit} from '@/util/api.js';
import {isEmpty} from '@/util/validate.js';
export default {
    mixins: [badgeMix],
    computed: {
        ...mapState('m_cart', ['cart']),
        ...mapGetters('m_cart', ['checkedGoodsAmount']),
        isShow() {
            return isEmpty(this.client);
        }
    },
    data() {
        return {
            client: '',
            orderRemark: '',
            remarkShow: false,
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
        ...mapMutations('m_cart', ['updateGoodsCount', 'removeGoodsById', 'addToCart', 'updateGoodsPrice']),
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
                goodsSmallPrice: res.data.goodsSmallPrice || 0,
                goodsCount: 1,
                goodsSmallLogo: res.data.goodsSmallLogo
            });
            uni.$showMsg('添加成功', 1000);
        },
        selectClient() {
            uni.navigateTo({
                url: '../../subpkg/client-list/client-list'
            });
        },
        async getClient(id) {
            let res = await clientGetById(id);
            this.client = res.client;
        },
        phoneCall(phone) {
            uni.makePhoneCall({
                phoneNumber: phone,
                fail: e => {
                    uni.$showMsg(e);
                }
            });
        },
        async settleOrder() {
            let res = await orderSubmit({
                orderPrice: this.checkedGoodsAmount,
                clientId: this.client.id,
                // TOOD 登录完善
                userId: 1,
                orderRemark: '备注',
                goodsList: []
            });
        }
    },
    // url参数
    onLoad(options) {
        if (options.client_id === '' || options.client_id === undefined) return;
        this.getClient(options.client_id);
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
    padding: 16rpx 32rpx;
    border-bottom: 1px solid #e1251b;

    view {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    view > text {
        margin-left: 5px;
    }
    .clientPhone > text {
        color: $u-primary-dark;
    }
}
.qrCodeSkuAdd {
    padding: 10px 10px 70px 10px;
}
.submitOrder {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: -2px;
    z-index: 999;
    width: 100%;
    background: #ffffff;
    border-top: 1px solid $u-info-disabled;

    .msg {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-left: 20rpx;

        .total {
            font-size: 48rpx;
        }

        .price {
            padding-left: 4px;
            font-size: 42rpx;
            font-weight: 600;
            color: #e1251b;
        }
    }

    .button {
        width: 350rpx;
        display: flex;
        justify-content: start;
    }
}
.remark {
    display: flex;
    flex-direction: column;
    margin-top: 20rpx;

    text {
        padding: 10rpx 26rpx;
    }
    .textarea {
        padding: 30rpx;
    }
}
</style>
