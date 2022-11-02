<template>
    <view>
        <view class="goodsList-box" v-if="goodsList.length !== 0">
            <block v-for="(item, i) in goodsList" :key="i"><my-goods :goods="item"></my-goods></block>
        </view>
    </view>
</template>

<script>
import {mapState} from 'vuex';
import {goodsFindBySkus} from '@/util/api.js';
export default {
    computed: {
        ...mapState('m_user', ['collection'])
    },
    data() {
        return {
            goodsList: []
        };
    },
    methods: {
        async loadGoodsList() {
            let res = await goodsFindBySkus({
                skus: this.collection
            });
            this.goodsList = res.list;
        }
    },
    onLoad() {
        this.loadGoodsList();
    }
};
</script>

<style lang="scss"></style>
