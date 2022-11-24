<template>
    <view class="goods-info-box">
        <view class="goods-info-image"><image :src="goods_info.goodsBigLogo || defaultPic"></image></view>
        <view class="actButton">
            <u-button
                customStyle="border:1px solid #ffff; border-radius: 16rpx;"
                color="#f9ae3d"
                text="添加收藏"
                @click="addCollection()"
            ></u-button>
            <u-button
                customStyle="border:1px solid #ffff; border-radius: 16rpx;"
                color="#e1251b"
                text="添加购物车"
                @click="addGoods()"
            ></u-button>
        </view>

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
                <u-col span="10">
                    <u--textarea :disabled="edit" v-model="goods_info.goodsPrice" autoHeight></u--textarea>
                </u-col>
            </u-row>
            <u-row customStyle="margin-bottom: 10rpx">
                <u-col span="2">最低价:</u-col>
                <u-col span="10">
                    <u--textarea :disabled="edit" v-model="goods_info.goodsSmallPrice" autoHeight></u--textarea>
                </u-col>
            </u-row>
            <u-row customStyle="margin-bottom: 10rpx">
                <u-col span="2">备注 :</u-col>
                <u-col span="10">
                    <u--textarea :disabled="edit" v-model="goods_info.goodsRemarks" autoHeight></u--textarea>
                </u-col>
            </u-row>
            <u-row customStyle="margin-bottom: 10rpx">
                <u-col span="2"><text style="font-size: 28rpx;">最后修改</text></u-col>
                <u-col span="10">
                    <u--textarea disabled :value="goods_info.goodsUpdateTime | date" autoHeight></u--textarea>
                </u-col>
            </u-row>
        </view>
        <view class="goodsEdit" v-if="!edit">
            <u-button
                customStyle="border:1px solid #ffff; border-radius: 16rpx;"
                color="linear-gradient(to right, rgb(66, 83, 216), rgb(133, 69, 203))"
                text="恢复"
                @click="reset()"
            ></u-button>
            <u-button
                customStyle="border:1px solid #ffff; border-radius: 16rpx;"
                color="linear-gradient(to right, rgb(133, 69, 203), rgb(213, 51, 186))"
                text="修改"
                @click="submit()"
            ></u-button>
        </view>
    </view>
</template>

<script>
import {goodsEdit, goodsDetail} from '@/util/api.js';
import {isPrice, equals} from '@/util/validate.js';
import {mapMutations, mapState} from 'vuex';
export default {
    computed: {
        ...mapState('m_user', ['collection'])
    },
    data() {
        return {
            goodsSku: '',
            defaultPic:
                'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
            resetGoods: {},
            edit: true,
            goods_info: {
                goodsTitle: '摩飞（Morphyrichards）榨汁机 便携式充电迷你无线果汁机料理机搅拌机MR9600  白色',
                goodsName: '摩飞 迷你榨汁机555',
                goodsModel: null,
                goodsSku: '100003570147',
                goodsClassId: null,
                goodsBrand: '摩飞',
                goodsPrice: 299,
                goodsSmallPrice: null,
                goodsStatus: 1,
                goodsRemarks: null,
                goodsBigLogo: null,
                goodsSmallLogo: null,
                goodsUpdateTime: '2022-01-09T16:00:00.000+00:00'
            }
        };
    },
    methods: {
        ...mapMutations('m_cart', ['addToCart']),
        ...mapMutations('m_user', ['addCollectionGoods']),
        async getGoodsDetail() {
            let res = await goodsDetail(this.goodsSku);
            this.goods_info = res.data;
            // 新开辟地址
            this.resetGoods = Object.assign({}, res.data);
        },
        reset() {
            if (equals(this.resetGoods, this.goods_info)) return uni.$showMsg('无数据修改');
            this.goods_info = Object.assign({}, this.resetGoods);
            uni.$showMsg('恢复最初数据!');
        },
        async submit() {
            // 未修改跳过
            if (equals(this.resetGoods, this.goods_info)) return uni.$showMsg('无数据修改');
            // 验证数值
            if (!isPrice(this.goods_info.goodsSmallPrice) || !isPrice(this.goods_info.goodsPrice))
                return uni.$showMsg('价格有误');

            let res = await goodsEdit(this.goods_info);
            if (JSON.stringify(res) === '{}') uni.$showMsg('修改错误');
            this.goods_info = res.data;
            // 新开辟地址
            this.resetGoods = Object.assign({}, res.data);
            uni.$showMsg('修改完成');
        },
        addGoods() {
            this.addToCart({
                goodsId: this.goods_info.id,
                goodsTitem: this.goods_info.goodsTitle,
                goodsName: this.goods_info.goodsName,
                goodsPrice: this.goods_info.goodsPrice,
                goodsSmallPrice: this.goods_info.goodsSmallPrice || 0,
                goodsCount: 1,
                goodsSmallLogo: this.goods_info.goodsSmallLogo
            });
            uni.$showMsg('添加成功', 1000);
            uni.navigateBack();
        },
        addCollection() {
            // console.log(this.collection);
            this.addCollectionGoods(this.goods_info.goodsSku);
            uni.$showMsg('收藏成功', 1000);
        }
    },
    // url参数
    onLoad(options) {
        if (options.goods_sku == undefined) uni.navigateBack();
        this.goodsSku = options.goods_sku;
        this.edit = !options.edit;
        this.getGoodsDetail();
    },
    filters: {
        date: v => {
            if (v === undefined) return;
            let split = v.split('T');
            return split[0] + '  ' + split[1].substring(0, 8);
        }
    },
    onShow() {
        uni.$verifyLogin();
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
    .actButton {
        display: flex;
        justify-content: space-between;
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
