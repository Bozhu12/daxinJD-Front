<template>
    <view class="home-box">
        <!-- 搜索 -->
        <view class="search-box">
            <!-- <my-search @my-click="gotoSearch" :bgcolor="'#e1251b'"></my-search> -->
            <view class="my-search-container" @click="gotoSearch">
                <!-- 搜索 input 输入-->
                <view class="my-search-box">
                    <uni-icons type="search" size="17"></uni-icons>
                    <text class="placeholder">搜索商品</text>
                </view>
            </view>
        </view>
        <!-- 公告 -->
        <view class="announcementMsg"><u-notice-bar :text="announcementMsg" direction="column"></u-notice-bar></view>
        <!-- 分类 -->
        <view class="type">
            <u-grid :border="true" @click="gotoFindByType" col="4">
                <u-grid-item v-for="(baseListItem, baseListIndex) in baseList" :key="baseListIndex">
                    <view class="type-icon"><image :src="baseListItem.src"></image></view>
                    <text class="grid-text">{{ baseListItem.title }}</text>
                </u-grid-item>
            </u-grid>
            <u-toast ref="uToast" />
        </view>
        <!-- 功能模块 -->
        <view class="editPanel">
            <view class="editPanel-left">
                <view class="editPanel-left-head">
                    <u-button
                        customStyle="height: 144rpx"
                        type="warning"
                        size="large"
                        text="客户列表"
                        @click="gotoClientList"
                    ></u-button>
                </view>
                <view class="editPanel-left-tail">
                    <u-button
                        customStyle="height: 144rpx"
                        type="success"
                        icon="scan"
                        size="large"
                        text="连续扫码"
                        @click="scanQrCodeLast"
                    ></u-button>
                </view>
            </view>
            <view class="editPanel-right">
                <view class="editPanel-right-head">
                    <u-button
                        customStyle="height: 144rpx"
                        type="primary"
                        size="large"
                        text="二维码生成"
                        @click="gotoQrCodeCreate"
                    ></u-button>
                </view>
                <view class="editPanel-right-tail">
                    <u-button
                        customStyle="height: 144rpx"
                        type="success"
                        icon="scan"
                        size="large"
                        text="扫码查商品"
                        @click="scanQrCode"
                    ></u-button>
                </view>
            </view>
        </view>
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
                    title: '电视',
                    typeText: '电视'
                },
                {
                    src: '/static/icon/refrigerator.png',
                    title: '冰箱',
                    typeText: '冰'
                },
                {
                    src: '/static/icon/washer.png',
                    title: '洗衣机',
                    typeText: '洗衣机'
                },
                {
                    src: '/static/icon/waterHeater.png',
                    title: '热水器',
                    typeText: '热水器'
                },
                {
                    src: '/static/icon/fan.png',
                    title: '空调',
                    typeText: '空调'
                },
                {
                    src: '/static/icon/cooker.png',
                    title: '电饭煲',
                    typeText: '电饭'
                },

                {
                    src: '/static/icon/solarEnergy.png',
                    title: '太阳能',
                    typeText: '太阳能'
                },
                {
                    src: '/static/icon/disinfectionCabinet.png',
                    title: '消毒柜',
                    typeText: '消毒柜'
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
            uni.navigateTo({
                url: `../../subpkg/search/search?type=${this.baseList[e].typeText}`
            });
        },
        gotoClientList() {
            uni.navigateTo({
                url: '../../subpkg/client-list/client-list?selected=false'
            });
        },
        gotoQrCodeCreate() {
            uni.navigateTo({
                url: '../../subpkg/generate_code/generate_code'
            });
        },
        scanQrCodeLast() {
            uni.navigateTo({
                url: '../../subpkg/qrCode/qrCode'
            });
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

        .my-search-container {
            background-color: #e1251b;
            height: 42px;
            padding: 0 10px;
            display: flxe;
            align-items: center;
        }

        .my-search-box {
            height: 36px;
            background-color: #ffffff;
            border-radius: 16px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            .placeholder {
                font-size: 15px;
                margin-left: 5px;
            }
        }
    }

    .editPanel {
        width: 666rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: auto;
        margin-top: 20rpx;
        padding: 10rpx;
        border-radius: 10rpx;

        .editPanel-left {
            width: 333rpx;

            .editPanel-left-tail {
                margin-top: 10rpx;
            }
        }
        .editPanel-right {
            width: 333rpx;
            padding-left: 23rpx;
            .editPanel-right-tail {
                margin-top: 10rpx;
            }
        }
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
