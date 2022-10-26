<template>
    <view class="login-box">
        <view class="login-head"><u-icon name="account" size="100px"></u-icon></view>
        <view class="login-msg">
            <u-row customStyle="margin-bottom: 10px" justify="space-between">
                <u-col span="2"><text>姓名</text></u-col>
                <u-col span="10">
                    <view class="input">
                        <u--input
                            @input="checking($event, 'name')"
                            placeholder="请输入名称"
                            border="bottom"
                            v-model="user.name"
                        ></u--input>
                        <u-icon ref="name" v-if="user.name !== ''"></u-icon>
                    </view>
                </u-col>
            </u-row>
            <u-row customStyle="margin-bottom: 10px" justify="space-between">
                <u-col span="2"><text>手机</text></u-col>
                <u-col span="10">
                    <view class="input">
                        <u--input
                            @input="checking($event, 'phone')"
                            placeholder="请输入手机号"
                            border="bottom"
                            v-model="user.phone"
                        ></u--input>
                        <u-icon ref="phone" v-if="user.phone !== ''"></u-icon>
                    </view>
                </u-col>
            </u-row>
            <u-row customStyle="margin-bottom: 10px" justify="space-between">
                <u-col span="2"><text>邮箱</text></u-col>
                <u-col span="10">
                    <view class="input">
                        <u--input
                            @input="checking($event, 'Email')"
                            placeholder="请输入邮箱"
                            border="bottom"
                            v-model="user.Email"
                        ></u--input>
                        <u-icon ref="Email" v-if="user.Email !== ''"></u-icon>
                    </view>
                </u-col>
            </u-row>
            <u-row customStyle="margin-bottom: 10px" justify="space-between">
                <u-col span="2"><text>密码</text></u-col>
                <u-col span="10">
                    <view class="input">
                        <u--input
                            @input="checking($event, 'password')"
                            border="bottom"
                            v-model="user.password"
                        ></u--input>
                    </view>
                    <u-icon ref="password" v-if="user.password !== ''"></u-icon>
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
                name: '',
                phone: '',
                password: '',
                Email: ''
            },
            promptStyle: [
                {
                    name: 'checkmark-circle',
                    color: '#5ac725'
                },
                {
                    name: 'close-circle',
                    color: '#f56c6c'
                }
            ]
        };
    },
    methods: {
        ...mapMutations('m_user', ['updateUserInfo', 'updateToken']),
        async login() {
            let login = await uni.login({
                provider: 'weixin'
            });
            if (login[1].errMsg.search(/fail/g) !== -1) return uni.$showMsg('请重新进行授权!!');
            let res = await userLogin({
                appid: 'wx85e1042ea783dd18',
                code: login[1].code
            });
            this.updateToken(res.token);
            this.updateUserInfo(res.data);
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
