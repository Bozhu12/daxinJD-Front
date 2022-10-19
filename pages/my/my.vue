<template>
    <view class="my-box">

        <view class="login" v-if="!token">
            <u-button text="登录" @click="gotoLogin" type="success" size="large"></u-button>
        </view>
    </view>
</template>

<script>
    import {
        mapState
    } from 'vuex'
    export default {
        data() {
            return {

            };
        },
        computed: {
            ...mapState('m_user', ['token'])
        },
        methods: {
            gotoLogin() {
                uni.navigateTo({
                    url: '/subpkg/login/login'
                })
            }
        },
    }
</script>

<style lang="scss">
    .my-box {

        .login {
            position: fixed;
            bottom: -2px;
            z-index: 999;
            width: 100%;
        }
    }
</style>
