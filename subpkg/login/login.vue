<template>
    <view class="login-box">
        <view class="login-head">
            <u-icon name="account" size="64px"></u-icon>
        </view>
        <view class="login-text">
            柏竹
        </view>
        <view class="login-button">
            <u-button text="登录按钮" @click="login" color="#71d5a1"></u-button>
        </view>

    </view>
</template>

<script>
    import {
        userLogin
    } from '@/util/api.js'
    import {
        mapMutations
    } from 'vuex'
    export default {
        data() {
            return {
                
            }
        },
        methods: {
            ...mapMutations('m_user', ['updateUserInfo', 'updateToken']),
            async login() {
                let login = uni.login({
                    provider: 'weixin'
                });
                if (login[1].errMsg.search(/fail/g) !== -1)
                    return uni.$showMsg('请重新进行授权!!')
                let res = await userLogin({
                    appid: 'wx85e1042ea783dd18',
                    code: login[1].code
                });
                this.updateToken(res.token);
                this.updateUserInfo(res.data);
                // 重定向 (在当前路径返回上级进行跳转 , 否则无效)
                uni.switchTab({
                    url: '../../pages/home/home'
                })
            }
        }
    }
</script>

<style lang="scss">
    .login-box {
        height: 750rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        flex-direction: column;

        .login-head {
            width: 126rpx;
            height: 126rpx;
            border: 1px solid $u-info-dark;
            border-radius: 50%;
            margin-bottom: 40rpx;
        }

        .login-button {
            margin-top: 80rpx;
            width: 100%;
        }

    }
</style>
