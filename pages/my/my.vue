<template>
    <view class="my-box">
        <!-- 内容 -->

        <!-- 未登录 -->
        <view class="login" v-if="!token">
            <u-button text="注册" @click="gotoRegister" type="warning" size="large"></u-button>
            <u-button text="登录" @click="gotoLogin" type="success" size="large"></u-button>
        </view>
    </view>
</template>

<script>
import {mapState} from 'vuex';
import badgeMix from '@/mixins/tabbar-badge.js';
export default {
    mixins: [badgeMix],
    data() {
        return {};
    },
    computed: {
        ...mapState('m_user', ['token'])
    },
    methods: {
        gotoRegister() {
            uni.navigateTo({
                url: '/subpkg/register/register'
            });
        },
        gotoLogin() {
            uni.navigateTo({
                url: '/subpkg/login/login'
            });
        }
    }
};
</script>

<style lang="scss">
.my-box {
    .login {
        position: fixed;
        bottom: -2px;
        z-index: 999;
        width: 100%;

        display: flex;
        justify-content: start;
    }
}
</style>
