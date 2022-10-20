<template>
    <view class="goods-info-box">
        <view class="goods-info-image"><image :src="goods_info.goodsBigLogo || defaultPic"></image></view>
        <u-divider text="商品编辑" textColor="#2979ff" lineColor="#e1251b"></u-divider>
        <view class="godos-data">
            <u-row customStyle="margin-bottom: 10rpx">
                <u-col span="2">SKU :</u-col>
                <u-col span="10"><u--textarea disabled v-model="goods_info.goodsSku" autoHeight></u--textarea></u-col>
            </u-row>
            <u-row align="flex-start" customStyle="margin-bottom: 10rpx">
                <u-col span="2">标题 :</u-col>
                <u-col span="10"><u--textarea v-model="goods_info.goodsTitle" autoHeight></u--textarea></u-col>
            </u-row>
            <u-row customStyle="margin-bottom: 10rpx">
                <u-col span="2">名称 :</u-col>
                <u-col span="10"><u--textarea v-model="goods_info.goodsName" autoHeight></u--textarea></u-col>
            </u-row>
            <u-row customStyle="margin-bottom: 10rpx">
                <u-col span="2">型号 :</u-col>
                <u-col span="10"><u--textarea v-model="goods_info.goodsModel" autoHeight></u--textarea></u-col>
            </u-row>
            <u-row customStyle="margin-bottom: 10rpx">
                <u-col span="2">品牌 :</u-col>
                <u-col span="10"><u--textarea v-model="goods_info.goodsBrand" autoHeight></u--textarea></u-col>
            </u-row>
            <u-row customStyle="margin-bottom: 10rpx">
                <u-col span="2">市场价:</u-col>
                <u-col span="10"><u--textarea v-model="goods_info.goodsPrice" autoHeight></u--textarea></u-col>
            </u-row>
            <u-row customStyle="margin-bottom: 10rpx">
                <u-col span="2">最低价:</u-col>
                <u-col span="10"><u--textarea v-model="goods_info.goodsSmallPrice" autoHeight></u--textarea></u-col>
            </u-row>
            <u-row customStyle="margin-bottom: 10rpx">
                <u-col span="2">备注 :</u-col>
                <u-col span="10"><u--textarea v-model="goods_info.goodsRemarks" autoHeight></u--textarea></u-col>
            </u-row>
            <u-row customStyle="margin-bottom: 10rpx">
                <u-col span="2"><text style="font-size: 28rpx;">最后修改</text></u-col>
                <u-col span="10">
                    <u--textarea disabled :value="goods_info.goodsUpdateTime | date" autoHeight></u--textarea>
                </u-col>
            </u-row>
        </view>
        <view class="goodsEdit">
            <u-button
                customStyle="border:1px solid #ffff; border-radius: 16rpx;"
                color="linear-gradient(to right, rgb(66, 83, 216), rgb(133, 69, 203))"
                text="恢复"
            ></u-button>
            <u-button
                customStyle="border:1px solid #ffff; border-radius: 16rpx;"
                color="linear-gradient(to right, rgb(133, 69, 203), rgb(213, 51, 186))"
                text="修改"
            ></u-button>
        </view>
    </view>
</template>

<script>
import {goodsDetail} from '@/util/api.js';
export default {
    data() {
        return {
            goodsSku: '',
            defaultPic:
                'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
            goods_info: {
                id: 4,
                goodsTitle: '摩飞（Morphyrichards）榨汁机 便携式充电迷你无线果汁机料理机搅拌机MR9600  白色',
                goodsName: null,
                goodsModel: null,
                goodsSku: '100003570147',
                goodsClassId: null,
                goodsClassName: '榨汁机/原汁机',
                goodsBrand: '摩飞',
                goodsPrice: 299,
                goodsSmallPrice: null,
                goodsStatus: 1,
                goodsRemarks: null,
                goodsBigLogo:
                    'https://img10.360buyimg.com/n1/jfs/t1/95077/5/22772/176536/62203d6cE7fcbe2ca/3a928c7502ed3b21.jpg.avif',
                goodsSmallLogo: null,
                goodsCreateTime: '2022-01-09T16:00:01.000+00:00',
                goodsUpdateTime: '2022-01-09T16:00:00.000+00:00'
            }
        };
    },
    methods: {
        async getGoodsDetail() {
            let res = await goodsDetail(this.goodsSku);
            this.goods_info = res.data;
        }
    },
    // url写单参数
    onLoad(options) {
        this.goods_id = options.goods_id;
        // TODO dev
        // this.getGoodsDetail();
    },
    filters: {
        date: v => {
            let split = v.split('T');
            return split[0] + '  ' + split[1].substring(0, 7);
        }
    }
};
</script>

<style lang="scss">
.goods-info-box {
    .goods-info-image {
        image {
            width: 100%;
        }
    }
    .godos-data {
        padding: 8rpx 20rpx;
    }
    .goodsEdit {
        display: flex;
        justify-content: space-between;
    }
}
</style>
