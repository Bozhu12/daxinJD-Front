<template>
    <view>
        <u-popup :show="shwo" :round="10" mode="bottom" closeable @close="showReversal">
            <view class="client-edit">
                <text class="title">编辑客户信息</text>
                <view class="data">
                    <u-row customStyle="margin-bottom: 10px">
                        <u-col span="2"><text>姓名</text></u-col>
                        <u-col span="10"><u--input border="surround" v-model="client.clientName"></u--input></u-col>
                    </u-row>
                    <u-row customStyle="margin-bottom: 10px">
                        <u-col span="2"><text>电话1</text></u-col>
                        <u-col span="10"><u--input border="surround" v-model="client.clientPhone1"></u--input></u-col>
                    </u-row>
                    <u-row customStyle="margin-bottom: 10px">
                        <u-col span="2"><text>电话2</text></u-col>
                        <u-col span="10"><u--input border="surround" v-model="client.clientPhone2"></u--input></u-col>
                    </u-row>
                    <u-row customStyle="margin-bottom: 10px">
                        <u-col span="2"><text>地址</text></u-col>
                        <u-col span="10"><u--input border="surround" v-model="client.clientAddress"></u--input></u-col>
                    </u-row>
                    <u-row customStyle="margin-bottom: 10px">
                        <u-col span="2"><text>备注</text></u-col>
                        <u-col span="10"><u--input border="surround" v-model="client.clientRemarks"></u--input></u-col>
                    </u-row>
                </view>
                <view class="submitButton">
                    <u-button type="warning" size="large" text="取消" @click="showReversal"></u-button>
                    <u-button type="error" size="large" text="修改" @click="editSubmit"></u-button>
                </view>
            </view>
        </u-popup>
    </view>
</template>

<script>
import {clienEditById} from '@/util/api.js';
export default {
    name: 'my-popup-clientEdit',
    props: {
        shwo: {
            type: Boolean,
            default: false
        },
        client: {
            type: Object,
            default: ''
        }
    },
    methods: {
        showReversal() {
            this.$emit('showReversal');
        },
        async editSubmit() {
            let res = await clienEditById(this.client);
            if (res.edit) {
                this.$emit('showReversal');
                this.$emit('flushed');
            }
        }
    },
    data() {
        return {};
    }
};
</script>

<style lang="scss">
.client-edit {
    margin-top: 32rpx;

    .title {
        margin: 0 20rpx;
        padding: 23rpx;
    }
    .data {
        padding: 20rpx;
    }
    .submitButton {
        display: flex;
        justify-content: start;
    }
}
</style>
