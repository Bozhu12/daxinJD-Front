<template>
	<view class="goodsBox">
		<view class="goodsItem" v-for="item in searchList" :key="item.id" @click="goGoodDetail(item.id)" >
			<view class="goodImg" >
				<u--image :showLoading="true" src="https://cdn.uviewui.com/uview/album/1.jpg" width="280rpx"
					height="280rpx"></u--image>
			</view>
			<view class="goodText">
				<view class="good">
					<span class="goodBrand">{{item.goodsBrand}}</span>
					<span>{{item.goodsClassName}}</span>
				</view>
				<view class="price">
					<i class="iconfont icon-xiaoshoujia priceImg"></i>
					<span class="priceNum">￥{{item.goodsPrice}}</span>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		props: {
			searchList: { //搜索列表
				type: Array
			},
			// productDetail: { //详情
			// 	type: Object,
			// 	default: {}
			// },
			// skuId: {
			// 	default: ''
			// }
		},
		data() {
			return {
				no_more: false,
				page: 0,
				size: 5,
				pageCount: '',
				currentPage: '',
			};
		},
		methods: {
			goGoodDetail(id) {
				console.log('0000')
				uni.navigateTo({
					url: `/subpkg/goods/goods_details?goods_id=${id}`
				})
			},
		},
		onShow() {
			console.log('-------------------------------------------------')
			console.log('66666', this.searchList)
		}
	}
</script>

<style lang="scss">
	.goodsBox {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;

		.goodsItem {
			background-color: #f1f3f7;
			border-radius: 16rpx;
			width: 330rpx;
			height: 410rpx;
			margin: 10rpx;

			.goodImg {
				height: 320rpx;
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.goodText {
				font-size: 24rpx;

				.good {
					margin: 10rpx 10rpx;

					.goodBrand {
						margin-right: 10rpx;
					}
				}

				.price {
					margin: 0 10rpx;
					color: #d81e06;
				}
			}
		}
	}
</style>
