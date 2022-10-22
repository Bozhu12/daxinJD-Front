<template>
    <view>Cart</view>
</template>

<script>
import badgeMix from '@/mixins/tabbar-badge.js';
import {mapState} from 'vuex';
export default {
    mixins: [badgeMix],
    computed: {
        ...mapState('m_cart', ['cart'])
    },
    data() {
        return {};
    },
    methods: {
        ...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount', 'removeGoodsById'])
    },
    mounted() {
        console.log('cart', this.cart);
    }
};
</script>

<style lang="scss"></style>
