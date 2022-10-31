<template>
    <view class="client-list-box">
        <!-- 搜索 -->
        <view class="search-box">
            <!-- 搜索 -->
            <view class="search-content">
                <u-search
                    focus
                    v-model="kw"
                    bgColor="#ffffff"
                    placeholder="请输入 客户 姓名/手机号"
                    @custom="scanClient"
                    @search="scanClient"
                ></u-search>
            </view>
        </view>
        <!-- 客户列表 -->
        <u-index-list inactiveColor="transparent" activeColor="transparent" :index-list="indexList">
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
                                    <view v-show="selected">
                                        <u-button
                                            customStyle="width: 120rpx; margin: 0;"
                                            text="选择"
                                            type="success"
                                            @click="selectClient(cell.id)"
                                        ></u-button>
                                    </view>
                                </view>
                            </view>
                        </u-swipe-action-item>
                    </u-index-item>
                </template>
            </u-swipe-action>
        </u-index-list>
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
    </view>
</template>

<script>
import {clientList, clienDelById, clientGetById} from '@/util/api.js';
export default {
    data() {
        return {
            selected: false,
            kw: '',
            // 是否展示编辑窗口
            operateShow: false,
            // 选择的客户
            selectedClient: '',
            // 遍历集合
            itemArr: [],
            cacheData: '',
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
                '#',
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
                'Z'
            ]
        };
    },
    methods: {
        operateShowReversal() {},
        async getClientList() {
            let res = await clientList();
            this.cacheData = res.data;
            this.arrFill(res.data);
        },
        arrFill(res) {
            this.itemArr = [];
            let arr;

            // 非法字符添加
            arr = res.filter(e => !/[A-Z]/.test(e.serialNumber));
            this.itemArr = [...this.itemArr, arr];
            // 序列添加
            for (var i = 1; i < this.indexList.length; i++) {
                arr = res.filter(e => this.indexList[i] === e.serialNumber);
                if (arr.length <= 0) {
                    this.itemArr = [...this.itemArr, []];
                    continue;
                }
                this.itemArr = [...this.itemArr, arr];
            }
        },
        async selectClient(id) {
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
        },
        scanClient() {
            if (this.kw == '') {
                this.getClientList();
                return;
            }
            let arr = this.cacheData.filter(e => {
                if (e.clientName == this.kw) return true;
                if (e.clientPhone1 == this.kw) return true;
                if (e.clientPhone2 == this.kw) return true;
                return false;
            });
            this.itemArr = [[...arr]];
        }
    },
    onLoad(options) {
        this.getClientList();
        if (options.selected === '' || options.selected === undefined) this.selected = false;
        if (options.selected === 'true') this.selected = true;
    },
    onShow() {
        uni.$verifyLogin();
    }
};
</script>

<style lang="scss" scoped>
.client-list-box {
    .search-box {
        position: sticky;
        top: 0;
        z-index: 999;
        background-color: #e1251b;
        height: 42px;
        padding: 0 10px;
        align-items: center;

        .search-content {
            height: 36px;
            border-radius: 16px;
            padding: 0 4px;
            background-color: #ffffff;
        }
    }

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
}
</style>
