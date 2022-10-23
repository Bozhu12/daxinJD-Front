<template>
    <u-index-list :index-list="indexList">
        <template v-for="(item, index) in itemArr">
            <!-- #ifdef APP-NVUE -->
            <u-index-anchor :text="indexList[index]"></u-index-anchor>
            <!-- #endif -->
            <u-index-item>
                <!-- #ifndef APP-NVUE -->
                <u-index-anchor :text="indexList[index]" v-if="item.length !== 0"></u-index-anchor>
                <!-- #endif -->
                <view class="list-cell" v-for="(cell, index) in item" :key="index">{{ cell.clientName }}</view>
            </u-index-item>
        </template>
    </u-index-list>
</template>

<script>
import {clientList} from '@/util/api.js';
export default {
    data() {
        return {
            indexList: [
                'A',
                'B',
                'C',
                'D',
                'E',
                'F',
                'G',
                'H',
                'I',
                'J',
                'K',
                'L',
                'M',
                'N',
                'O',
                'P',
                'Q',
                'R',
                'S',
                'T',
                'U',
                'V',
                'W',
                'X',
                'Y',
                'Z',
                '#'
            ],
            itemArr: [['列表A1', '列表A2', '列表A3'], ['列表B1', '列表B2', '列表B3'], ['列表C1', '列表C2', '列表C3']]
        };
    },
    methods: {
        async getClientList() {
            let res = await clientList();
            this.arrFill(res.data);
        },
        arrFill(res) {
            this.itemArr = [];
            for (var i = 0; i < this.indexList.length; i++) {
                let list = res.filter(e => this.indexList[i] === e.serialNumber);
                if (list.length <= 0) {
                    this.itemArr = [...this.itemArr, []];
                    continue;
                }
                this.itemArr = [...this.itemArr, list];
            }
        }
    },
    onLoad() {
        this.getClientList();
    }
};
</script>

<style lang="scss" scoped>
.list-cell {
    display: flex;
    box-sizing: border-box;
    width: 100%;
    padding: 10px 24rpx;
    overflow: hidden;
    color: #323233;
    font-size: 14px;
    line-height: 24px;
    background-color: #fff;
}
</style>
