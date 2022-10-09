<template>
	<view>
		<u-button text="登录按钮" @click="login"></u-button>
	</view>
</template>

<script>
	import {
		isMobile
	} from '@/util/validate'
	import {
		userLogin
	} from '@/util/api.js'
	export default {
		data() {
			return {
				phone: '18289454846',
				code: '123456'
			}
		},
		methods: {
			login() {
				let params
				// if (!this.phone) {
				// 	uni.showToast({
				// 		title: "请输入手机号",
				// 		icon: "none"
				// 	})
				// 	return false
				// }
				// if (!isMobile(this.phone)) {
				// 	uni.showToast({
				// 		title: "请输入正确的手机号",
				// 		icon: "none"
				// 	})
				// 	return false
				// }
				// // if (!this.loginFlag) {
				// 	//手机验证码登录
				// 	if (!this.code) {
				// 		uni.showToast({
				// 			title: "请输入验证码",
				// 			icon: "none"
				// 		})
				// 		return false
				// 	}

				params = {
					mobile: this.phone,
					ver_code: this.code,
				}

				// }
				//  else {
				// 	// 账号密码登录
				// 	if (!this.password) {
				// 		uni.showToast({
				// 			title: "请输入密码",
				// 			icon: "none"
				// 		})
				// 		return false
				// 	}

				// 	params = {
				// 		mobile: this.phone,
				// 		password: this.password,
				// 	}
				// }
				console.log('loginparams', params)
				userLogin(params).then((res) => {
					if (res.code == 500) {
						uni.showToast({
							title: res.msg,
							icon: "none",
							duration: 2000
						})
						return false

					}
					if (res.code == 10000) {
						if (res.data.token.length !== 0) {
							console.log("token----------", res.data.token)
							// uni.setStorageSync('token', res.data.token)
							uni.showToast({
								title: '登录成功',
								icon: "none"
							})
							let canNavBack = getCurrentPages();
							if (canNavBack && canNavBack.length > 1) {
								uni.navigateBack({
									delta: 1
								});
							} else {
								/* #ifdef H5 */
								console.log(1111)
								return
								/* #endif */

								/* #ifdef MP-WEIXIN */
								uni.switchTab({
									url: "/pages/home/home"
								})
								/* #endif */
							}
						}
						// userInfo({
						// 	token: uni.getStorageSync('token')
						// }).then(res1 => {
						// 	if (res1.userInfo) {
						// 		uni.setStorageSync('userId', res1.userInfo.userId)
						// 		uni.setStorageSync('username', res1.userInfo.userPhone)
						// 	}
						// 	uni.showToast({
						// 		title: '登录成功',
						// 		icon: "none"
						// 	})
						// 	let canNavBack = getCurrentPages();
						// 	if (canNavBack && canNavBack.length > 1) {
						// 		uni.navigateBack({
						// 			delta: 1
						// 		});
						// 	} else {
						// 		/* #ifdef H5 */
						// 		console.log(1111)
						// 		return
						// 		/* #endif */

						// 		/* #ifdef MP-WEIXIN */
						// 		uni.switchTab({
						// 			url: "/pages/home/home"
						// 		})
						// 		/* #endif */

						// 	}
						// })
					}
				})
			},

		}
	}
</script>

<style>

</style>
