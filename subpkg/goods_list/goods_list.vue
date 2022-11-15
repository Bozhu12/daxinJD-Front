<template>
    <view>
        <view class="goodsList-box" v-if="goodsList.length !== 0">
            <block v-for="(item, i) in goodsList" :key="i">
                <my-goods @clear="delCollection(i)" :goods="item" :addShow="false"></my-goods>
            </block>
        </view>
        <view v-if="goodsList.length === 0">
            <u-empty mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png" text="无收藏有相关商品"></u-empty>
        </view>
    </view>
</template>

<script>
import {mapState, mapMutations} from 'vuex';
import {goodsFindBySkus} from '@/util/api.js';
export default {
    computed: {
        ...mapState('m_user', ['collection'])
    },
    data() {
        return {
            goodsList: [],
            skus: []
        };
    },
    methods: {
        ...mapMutations('m_user', ['deleteCollection']),
        async loadGoodsList() {
            if (this.skus.length === 0) return;
            let res = await goodsFindBySkus(this.skus);
            this.goodsList = res.list;
        },
        delCollection(i) {
            this.goodsList.splice(i, 1);
            this.deleteCollection(i);
        }
    },
    onShow() {
        if (this.collection.length === 0) return;
        this.skus = this.collection;
        this.loadGoodsList();
    }
};
</script>

<style lang="scss"></style>
