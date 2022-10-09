<template>
	<view>
		<u-button text="My" @click="getNewList(test)"></u-button>
		<u-button text="登录" @click="goLogin"></u-button>
	</view>
</template>

<script>
	import {
		newList
	} from '../../util/api.js'
	export default {
		data() {
			return {
				// test: '1111'
				test: {
					mobile: '18289454846',
					theme_news: '国际新闻',
					page: 1,
					pageSize: 20
				}
			};
		},
		methods: {
			getNewList(test) {
				// console.log(testtt)
				newList(test).then(data => {
					console.log('22-10-07', data);
				});
			},
			goLogin(){
				uni.navigateTo({
					url: '/pages/login/login'
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
