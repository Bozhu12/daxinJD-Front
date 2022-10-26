<template>
    <u-index-list :index-list="indexList">
        <u-swipe-action>
            <template v-for="(item, index) in itemArr">
                <u-index-item>
                    <u-index-anchor :text="indexList[index]" v-if="item.length !== 0"></u-index-anchor>
                    <u-swipe-action-item
                        v-for="(cell, i) in item"
                        :key="i"
                        @click="clientOperate($event, cell.id)"
                        :options="options"
                    >
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
                </u-index-item>
            </template>
        </u-swipe-action>
        <!-- 编辑页 -->
        <my-popup-clientEdit
            :shwo="operateShow"
            :client="selectedClient"
            @showReversal="
                operateShow = !operateShow;
                selectedClient = '';
            "
            @flushed="getClientList"
        ></my-popup-clientEdit>
    </u-index-list>
</template>

<script>
import {clientList, clienDelById, clientGetById} from '@/util/api.js';
export default {
    data() {
        return {
            operateShow: false,
            selectedClient: '',
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
        operateShowReversal() {},
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
        },
        async clientOperate(...props) {
            // 0.{index,name}  , 2.客户id
            // 0编辑 ; 1删除
            if (props[0].index === 0) {
                let res = await clientGetById(props[1]);
                this.selectedClient = res.client;
                this.operateShow = !this.operateShow;
            } else if (props[0].index === 1) {
                await clienDelById(props[1]);
                this.getClientList();
                uni.$showMsg('删除成功');
            }
        }
    },
    onLoad() {
        this.getClientList();
    },
    onShow() {
        uni.$verifyLogin();
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
