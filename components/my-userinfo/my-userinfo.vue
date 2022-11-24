<template>
    <view class="my-userinfo-contatiner">
        <!-- 头像区域 -->
        <view class="top-box">
            <image :src="userinfo.avatarUrl" class="avatar"></image>
            <view class="nickname">{{ userinfo.nickName }}</view>
        </view>

        <view class="panel-list">
            <!-- 面板1区域 -->
            <view class="panel">
                <view class="panel-body">
                    <view class="panel-item" @click="gotoGoodsList">
                        <text>{{ collection.length }}</text>
                        <text>我的收藏</text>
                    </view>
                    <view class="panel-item">
                        <text>32</text>
                        <text>我的订单</text>
                    </view>
                    <view class="panel-item">
                        <text>32</text>
                        <text>订单回退</text>
                    </view>
                </view>
            </view>
            <!-- 面板2区域 -->
            <view class="panel">
                <u-cell-group>
                    <u-cell icon="setting-fill" title="个人设置"></u-cell>
                    <u-cell icon="question-circle" title="问题反馈"></u-cell>
                    <u-cell icon="account" title="退出登录" @click="outLogin"></u-cell>
                </u-cell-group>
            </view>
        </view>
    </view>
</template>

<script>
import {mapState, mapMutations} from 'vuex';
export default {
    name: 'my-userinfo',
    computed: {
        ...mapState('m_user', ['userinfo', 'collection'])
    },
    data() {
        return {};
    },
    methods: {
        ...mapMutations('m_user', ['updateToken']),
        gotoGoodsList() {
            uni.navigateTo({
                url: '../../subpkg/goods_list/goods_list'
            });
        },
        outLogin() {
            this.updateToken('');
            uni.$showMsg('退出成功');
        }
    }
};
</script>

<style lang="scss">
.my-userinfo-contatiner {
    height: 100%;
    background-color: #f4f4f4;

    .top-box {
        height: 400rpx;
        background: linear-gradient(#e1251b, #e1251b, #e1251b, #f4f4f4);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .avatar {
            display: block;
            width: 90px;
            height: 90px;
            border-radius: 45px;
            border: 2px solid white;
            box-shadow: 0 1px 5px black;
        }

        .nickname {
            color: white;
            font-weight: bold;
            font-size: 16px;
            margin-top: 10px;
        }
    }

    .panel-list {
        padding: 0 10px;
        position: relative;
        top: -10px;

        .panel {
            background-color: white;
            border-radius: 3px;
            margin-bottom: 8px;

            .panel-body {
                display: flex;
                justify-content: space-around;

                .panel-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-around;
                    font-size: 13px;
                    padding: 10px 0;
                }
            }
        }
    }
}
</style>
