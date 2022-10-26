<template>
    <view class="login-box">
        <view class="login-head"><u-icon name="account" size="100px"></u-icon></view>
        <view class="login-msg">
            <u-row customStyle="margin-bottom: 10px" justify="space-between">
                <u-col span="2"><text>账号</text></u-col>
                <u-col span="10">
                    <view class="input">
                        <u--input
                            placeholder="请输入 名称/手机号"
                            border="bottom"
                            v-model="user.userAccount"
                        ></u--input>
                    </view>
                </u-col>
            </u-row>
            <u-row customStyle="margin-bottom: 10px" justify="space-between">
                <u-col span="2"><text>密码</text></u-col>
                <u-col span="10">
                    <view class="input">
                        <u--input password border="bottom" v-model="user.userPassword"></u--input>
                    </view>
                </u-col>
            </u-row>
        </view>
        <view class="login-button"><u-button text="登录按钮" @click="login" color="#71d5a1"></u-button></view>
    </view>
</template>

<script>
import {userLogin} from '@/util/api.js';
import {mapMutations} from 'vuex';
export default {
    data() {
        return {
            user: {
                userAccount: '',
                userPassword: ''
            }
        };
    },
    methods: {
        ...mapMutations('m_user', ['updateUserInfo', 'updateToken']),
        async login() {
            let res = await userLogin(this.user);
            this.updateToken(res.token);
            this.updateUserInfo(res.user);
            // 重定向 (在当前路径返回上级进行跳转 , 否则无效)
            uni.switchTab({
                url: '../../pages/home/home'
            });
        }
    }
};
</script>

<style lang="scss">
.login-box {
    height: 750rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .login-head {
        width: 200rpx;
        height: 200rpx;
        border: 1px solid $u-info-dark;
        border-radius: 50%;
        margin-bottom: 40rpx;
    }

    .login-msg {
        width: 666rpx;
        padding: 20rpx;

        .input {
            display: flex;
            justify-content: start;
            align-items: flex-end;
            margin-right: 20rpx;
        }
    }

    .login-button {
        margin: 40rpx;
        width: 642rpx;
        position: fixed;
        bottom: -2px;
        z-index: 999;
    }
}
</style>
