<template>
	<view class="outerContainer">
		<view class="search-box">
			<u-search bgColor="#ffffff" shape="square" placeholder="请输入" v-model="kw" @blur="search" @search="search">
			</u-search>
		</view>
		<!-- 搜索建议列表 -->
		<view class="content-box">
			<!-- 搜索历史 -->
			<!-- v-if="searchResults.length === 0" -->
			<view class="history-box" v-if="searchHistoryStatus">
				<!-- 标题-->
				<view class="historyTitle">
					<view class="historyTop">
						<text>搜索历史</text>
						<view class="historyClean" @click="cleanAllHistory">
							删除
							<i class="iconfont icon-shanchu shanchu"></i>
						</view>
					</view>
					<view>
						<u-modal :show="showHistoryDialog" showCancelButton @confirm="confirmBtn" @cancel="cancelBtn"
							title="">
							<view class="slot-content">
								<rich-text nodes="确认清除所有历史记录？"></rich-text>
							</view>
						</u-modal>
					</view>
					<view class="tagBox">
						<u-tag v-if="historyList.length !== 0" bgColor="#d81e06" borderColor="#d81e06"
							v-for="(item,index) in historyList" :key="item" :text="item" size="medium" closable
							@close="tagclose(index)"></u-tag>
					</view>
				</view>

				<u-empty v-if="historyList.length === 0" mode="history"
					icon="http://cdn.uviewui.com/uview/empty/history.png">
				</u-empty>
			</view>
			<view class="searchList" v-if="!searchHistoryStatus">
				<goods v-if="searchList.length !== 0" :searchList=searchList></goods>
				<u-empty v-if="searchList.length === 0" mode="search"
					icon="http://cdn.uviewui.com/uview/empty/search.png">
				</u-empty>
			</view>
		</view>

	</view>
</template>

<script>
	import goods from '@/subpkg/goods/goods.vue'
	import {
		goodSearch
	} from '@/util/api.js'
	export default {
		data() {
			return {
				// 输入
				kw: '',
				searchResults: [],
				// 历史
				historyList: [],
				good: null, //参数
				no_more: false,
				page: 0,
				size: 5,
				pageCount: '',
				currentPage: '',
				searchStatus: false,
				searchHistoryStatus: true, //当点击搜索时,隐藏历史记录
				searchList: [], //搜索结果
				showHistoryDialog: false, //是否删除历史记录的对话框
			};
		},
		components: {
			goods
		},

		methods: {
			search() {
				this.searchHistoryStatus = true
				if (this.searchHistoryStatus) {
					if (!this.kw) {
						uni.showToast({
							title: '请输入搜索内容',
							icon: 'none',
							duration: 2000
						});
					} else {
						if (this.historyList.includes(this.kw)) {
							let index = this.historyList.indexOf(this.kw)
							this.historyList.splice(index, 1)
							this.historyList.unshift(this.kw)
							uni.setStorageSync('keywork', this.historyList.join())
							//let a = uni.getStorageSync('keywork')
							//let b = a.split(',')
							//console.log('aaaa',a.split(',') instanceof Array)
						} else {
							this.historyList.push(this.kw)
							uni.setStorageSync('keywork', this.historyList.join())
						}
						this.searchHistoryStatus = false
						console.log("搜索kw", this.kw)
						goodSearch(this.good).then(res => {
							console.log('res',res)
							this.searchList = res.records
							console.log('searchList', this.searchList)
						})
					}
				}
			},
			// 清楚单个历史记录
			tagclose(index) {
				this.historyList.splice(index, 1)
				uni.setStorageSync('keywork', this.historyList.join())
				console.log('this', this.historyList)
			},
			// 清空所有记录
			cleanAllHistory() {
				this.showHistoryDialog = true
			},
			// 取消删除所有历史记录
			cancelBtn() {
				this.showHistoryDialog = false
			},
			// 确定删除所有历史记录
			confirmBtn() {
				this.historyList = []
				uni.removeStorageSync('keywork')
				this.showHistoryDialog = false
			},
			input(e) {
				this.kw = e
				this.getSerchList()
			},
			async getSerchList() {
				if (this.kw) {
					if (this.kw.length === 0) {
						this.searchResults = []
						return
					}
				}
				const {
					data: res
				} = await uni.$http.get('/goods/search', {
					query: this.kw
				})
				if (res.meta.status !== 200) return uni.$showMsg()
				this.searchResults = res.message
			},
			gotoDetail(item) {
				this.saveSearchHistory()
				this.kw = ''
				uni.navigateTo({
					url: "/subpkg/goods_detail/goods_detail?goods_id=" + item.goods_id
				})
			},
			// 获取全部商品列表数据
			getgoodlist() {
				console.log('得到商品信息', this.good)
				goodSearch(this.good).then(res => {
					console.log('结果', res)
				})
			}
		},
		onReachBottom() {
			console.log('search到底了')
			if (this.no_more) {
				return;
			}
			this.page++;
			console.log(this.page)
		},
		onLoad() {
			// 持久化数据提取
			let historyList = uni.getStorageSync('keywork')
			if(historyList.length !== 0) {
				this.historyList = historyList.split(',')
			}
			console.log('historyList', this.historyList)
			// this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
			this.good = {
				"query": "9",
				"cid": "",
				"pageNum": "1",
				"pageSize": "20"
			}
		}
	}
</script>

<style lang="scss">
	page {
		padding: 0 15rpx;
		background-color: #f1f3f7;
	}

	.outerContainer {
		// padding: 0 15rpx;
		// position: fixed;
		// 		top: 0;
		// 		left: 0;
		// 		right: 0;
		// 		bottom: 0;
		// 		background: #f1f3f7;
		// 		z-index: -1;
	}

	.content-box {
		// background-color: white;
		border-radius: 2%;
		position: fixed;

		left: 15rpx;
		right: 15rpx;
		height: 82%;
		background: white;
		overflow:scroll
	}

	.search-box {
		position: sticky;
		top: 90rpx;
		z-index: 999;
		// background-color: #f1f3f7;
		padding: 20rpx 0;
		display: flex;
		justify-content: center;
	}

	.sugg-list {
		padding: 0 5px;

		.sugg-item {
			font-size: 12px;
			padding: 13px 0;
			border-bottom: 1px solid #efefef;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.goods-name {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				margin-right: 3px;
			}

		}
	}

	.history-box {
		padding: 0 5px;

		.historyTop {
			padding: 10rpx 16rpx;
			font-size: 30rpx;
			display: flex;
			justify-content: space-between;

			.historyClean {
				color: #d81e06;

				.shanchu {
					margin-left: 2rpx;
				}
			}
		}

		.historyTitle {
			margin-top: 15rpx;

			.tagBox {

				display: flex;
				align-items: center;
				flex-wrap: wrap;

				.tag {
					background-color: #d81e06;
				}
			}
		}

		.history-title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 40px;
			font-size: 13px;
			border-bottom: 1px solid #efefef;
		}

		.history-list {
			display: flex;
			flex-wrap: wrap;

			.u-transition {
				margin-top: 5px;
				margin-right: 10px;
			}
		}
	}
</style>
