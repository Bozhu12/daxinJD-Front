<template>
    <view class="home-box">
        <!-- 搜索 -->
        <view class="search-box"><my-search @my-click="gotoSearch" :bgcolor="'#e1251b'"></my-search></view>
        <!-- 公告 -->
        <view class="announcementMsg"><u-notice-bar :text="announcementMsg" direction="column"></u-notice-bar></view>
        <!-- 扫码 -->
        <view class="qrCodeSku">
            <u-button type="success" icon="scan" size="large" text="扫码查商品" @click="scanQrCode"></u-button>
        </view>
        <!-- 分类 -->
        <view class="type">
            <u-grid :border="true" @click="gotoFindByType" col="4">
                <u-grid-item v-for="(baseListItem, baseListIndex) in baseList" :key="baseListIndex">
                    <!-- <u-icon :customStyle="{paddingTop: 20 + 'rpx'}" :name="baseListItem.name" :size="22"></u-icon> -->
                    <view class="type-icon"><image :src="baseListItem.src"></image></view>
                    <text class="grid-text">{{ baseListItem.title }}</text>
                </u-grid-item>
            </u-grid>
            <u-toast ref="uToast" />
        </view>
        <!-- ... -->
    </view>
</template>

<script>
import badgeMix from '@/mixins/tabbar-badge.js';
export default {
    mixins: [badgeMix],
    data() {
        return {
            announcementMsg: ['欢迎使用大新京东销售系统', '本系统为了便捷操作查看', '如有问题可进行反馈!'],
            baseList: [
                {
                    src: '/static/icon/tv.png',
                    title: '电视'
                },
                {
                    src: '/static/icon/refrigerator.png',
                    title: '冰箱'
                },
                {
                    src: '/static/icon/washer.png',
                    title: '洗衣机'
                },
                {
                    src: '/static/icon/waterHeater.png',
                    title: '热水器'
                },
                {
                    src: '/static/icon/fan.png',
                    title: '空调'
                },
                {
                    src: '/static/icon/cooker.png',
                    title: '电饭煲'
                },

                {
                    src: '/static/icon/solarEnergy.png',
                    title: '太阳能'
                },
                {
                    src: '/static/icon/disinfectionCabinet.png',
                    title: '消毒柜'
                }
            ]
        };
    },
    methods: {
        gotoSearch() {
            uni.navigateTo({
                url: '/subpkg/search/search'
            });
        },
        async scanQrCode() {
            let scanVal = await uni.scanCode();
            if (scanVal[0] != null) return uni.$showMsg('扫码异常!');
            uni.navigateTo({
                url: `../../subpkg/goods_info/goods_info?goods_sku=${scanVal[1].result}&edit=true`
            });
        },
        gotoFindByType(e) {
            console.log(e);
        }
    },
    onShow() {
        uni.$verifyLogin();
    }
};
</script>

<style lang="scss">
.home-box {
    .search-box {
        width: 100%;
    }
    .qrCodeSku {
        width: 666rpx;
        margin: auto;
        margin-top: 10rpx;
    }

    .type {
        padding-top: 40rpx;
        .type-icon {
            padding-top: 40rpx;
            image {
                width: 64rpx;
                height: 64rpx;
            }
        }
        .grid-text {
            font-size: 14px;
            color: #909399;
            padding: 10rpx 0 20rpx 0rpx;
        }
    }
}
</style>
