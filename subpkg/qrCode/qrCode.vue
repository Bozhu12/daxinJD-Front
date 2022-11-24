<template>
    <view class="container"><ws-carema ref="carema" @scanList="scanList"></ws-carema></view>
</template>

<script>
import WsCarema from '@/components/ws-carema/index.vue';
import {mapState, mapMutations} from 'vuex';
export default {
    components: {WsCarema},
    computed: {
        ...mapState('m_cart', ['goodsSkuList'])
    },
    data() {
        return {
            selectedType: '',
            reslist: []
        };
    },
    methods: {
        ...mapMutations('m_cart', ['updateToscanData']),
        scanItem(e) {},
        scanList(list) {
            this.reslist = list;
        },
        onHide() {
            this.updateToscanData(this.reslist);
        }
    }
};
</script>

<style lang="less">
.container {
}
</style>
