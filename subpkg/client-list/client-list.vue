<template>
    <u-index-list :index-list="indexList">
        <template v-for="(item, index) in itemArr">
            <u-index-item>
                <u-swipe-action>
                    <u-index-anchor :text="indexList[index]" v-if="item.length !== 0"></u-index-anchor>
                    <u-swipe-action-item v-for="(cell, i) in item" :key="i" @click="selected(cell)" :options="options">
                        <view class="list-cell u-border-top u-border-bottom">
                            <view class="cell swipe-action__content">
                                <text class="swipe-action__content__text">{{ cell.clientName }}</text>
                                <u-button
                                    customStyle="width: 120rpx; margin: 0;"
                                    text="选择"
                                    type="success"
                                    @click="selected(cell.id)"
                                ></u-button>
                            </view>
                        </view>
                    </u-swipe-action-item>
                </u-swipe-action>
            </u-index-item>
        </template>
    </u-index-list>
</template>

<script>
import {clientList} from '@/util/api.js';
export default {
    data() {
        return {
            options: [
                {
                    text: '编辑',
                    style: {
                        backgroundColor: '#f1a532'
                    }
                },
                {
                    text: '删除',
                    style: {
                        backgroundColor: '#e1251b'
                    }
                }
            ],
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
            itemArr: []
        };
    },
    methods: {
        async getClientList() {
            let res = await clientList();
            this.arrFill(res.data);
        },
        arrFill(res) {
            this.itemArr = [];
            let arr;
            for (var i = 0; i < this.indexList.length - 1; i++) {
                arr = res.filter(e => this.indexList[i] === e.serialNumber);
                if (arr.length <= 0) {
                    this.itemArr = [...this.itemArr, []];
                    continue;
                }
                this.itemArr = [...this.itemArr, arr];
            }
            // 非法字符添加
            arr = res.filter(e => !/[A-Z]/.test(e.serialNumber));
            this.itemArr = [...this.itemArr, arr];
        },
        async selected(id) {
            uni.reLaunch({
                url: `../../pages/cart/cart?client_id=${id}`
            });
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
    align-items: center;
    width: 100%;
    padding: 10px 24rpx;
    overflow: hidden;
    color: #323233;
    font-size: 14px;
    line-height: 24px;
    background-color: #fff;

    .cell {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;

        text {
            font-size: 20px;
        }
    }
}
</style>
