<template>
    <view>
        <u-popup :show="shwo" :round="10" mode="bottom" closeable @close="showReversal">
            <view class="client-edit">
                <text class="title">{{add?'添加':'编辑'}}客户信息</text>
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
                    <u-button type="error" size="large" :text="add?'添加':'修改'" @click="submitData"></u-button>
                </view>
            </view>
        </u-popup>
    </view>
</template>

<script>
import {clienEditById,clientAdd} from '@/util/api.js';
export default {
    name: 'my-popup-clientEdit',
    props: {
        shwo: {
            type: Boolean,
            default: false
        },
        client: {
            type: Object,
            default: {}
        },
        add:{
           type:Boolean,
           default: false
        }
    },
    methods: {
        showReversal() {
            this.$emit('showReversal');
        },
        async submitData() {
            // 添加 / 编辑
            let res;
            console.log(this.client);    
            if(this.add){
                res = await clientAdd(this.client);
            }else{
                res = await clienEditById(this.client);
            }
            if (res.edit || res.client) {
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
