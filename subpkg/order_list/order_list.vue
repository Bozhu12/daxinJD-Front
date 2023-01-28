<template>
    <view>
        <my-search placeholder="筛选关键字" @search="searchKey" isIco @icoClick="selectDate.show = true"></my-search>
        <u-popup :show="selectDate.show" mode="bottom" @close="selectDate.show = false">
            <view :class="selectDate.tableShow ? 'opedDate opedDateT' : 'opedDate opedDateF'">
                <view class="opedText">{{ selectDate.opDate }} - {{ selectDate.edDate }}</view>
                <view class="opedButton">
                    <view>
                        <u-button
                            type="primary"
                            size="mini"
                            shape="circle"
                            text="开始时间"
                            @click="opSelectDate(true)"
                        ></u-button>
                    </view>
                    <view style="padding: 0 4px">-</view>
                    <view>
                        <u-button
                            type="primary"
                            size="mini"
                            shape="circle"
                            text="结束时间"
                            @click="opSelectDate(false)"
                        ></u-button>
                    </view>
                </view>
                <view class="optionButton" v-if="!selectDate.tableShow">
                    <u-button type="warning" text="重置关闭" @click="resetDate"></u-button>
                    <u-button type="success" text="确认筛选" @click="searchKey(key)"></u-button>
                </view>
            </view>
            <u-datetime-picker
                :showToolbar="false"
                :show="selectDate.tableShow"
                mode="date"
                closeOnClickOverlay
                v-model="selectDate.value"
                @close="selectDate.tableShow = false"
                @change="changeDate"
            ></u-datetime-picker>
        </u-popup>
        <!-- 分段器 -->
        <view>
            <u-subsection
                @change="sectionChange"
                fontSize="14"
                activeColor="#e1251b"
                :list="orderStatus.list"
                :current="orderStatus.index"
            ></u-subsection>
        </view>
        <view class="goodsList-box" v-if="orderList.length !== 0">
            <block v-for="(item, i) in orderList" :key="i">
                <my-order :showMsg="showMsg" @editDate="resetDate" :order="item"></my-order>
            </block>
        </view>
        <view v-if="orderList.length === 0">
            <u-empty mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png" text="没有相关订单"></u-empty>
        </view>
    </view>
</template>

<script>
import {orderList} from '@/util/api.js';
import moment from 'moment';
export default {
    data() {
        return {
            key: '',
            orderStatus: {
                index: 3,
                list: ['未完成', '配送中', '已完成', '全部'],
            },
            showMsg: {
                withdraw: false,
                delivery: false,
                finish: false,
                all: false,
            },
            selectDate: {
                show: false,
                tableShow: false,
                isOP: true,
                opDate: 'OP时间',
                edDate: 'ED时间',
                value: Number(new Date()),
            },
            orderList: [],
            isloading: false,
            page: {
                pageNum: 1,
                pageSize: 5,
            },
        };
    },
    methods: {
        async loadData() {
            if (this.isloading) return;
            this.isloading = true;
            let res = await orderList(this.page.pageNum, this.page.pageSize, this.orderStatus.index);
            this.isloading = false;
            if (res.list.length === 0) {
                uni.$showMsg('到底啦~');
                this.page.pageNum -= 1;
                return;
            }
            // 最新数据在头
            res.list.reverse();
            // 过滤key数据
            if (this.key.length !== 0 || this.key.trim().length !== 0)
                res.list = this.filterContainsKey(res.list, this.key);
            if (this.selectDate.opDate !== 'OP时间') this.orderList = this.opDateFilter(this.orderList);
            if (this.selectDate.edDate !== 'ED时间') this.orderList = this.edDateFilter(this.orderList);
            this.orderList = [...this.orderList, ...res.list];
        },
        sectionChange(index) {
            if (this.orderStatus.index === index) return;
            this.orderStatus.index = index;
            // 切换清空原来数据
            this.withdraw = false;
            this.delivery = false;
            this.finish = false;
            this.all = false;
            this.orderList = [];
            if (index === '0') this.withdraw = true;
            if (index === '1') this.delivery = true;
            if (index === '2') this.finish = true;
            if (index === '3') this.all = true;
            this.loadData();
        },
        filterContainsKey(list) {
            let tempList = [];
            for (var i = 0; i < list.length; i++) {
                let order = list[i];
                if (order.clientName.indexOf(this.key) != -1) tempList.push(order);
                if (order.title.indexOf(this.key) != -1) tempList.push(order);
                if (order.userName.indexOf(this.key) != -1) tempList.push(order);
            }
            return tempList;
        },
        searchKey(kw) {
            this.key = kw;
            if (this.orderList.length !== 0 && kw.length !== 0) this.orderList = this.filterContainsKey(this.orderList);
            if (this.selectDate.opDate !== 'OP时间') this.orderList = this.opDateFilter(this.orderList);
            if (this.selectDate.edDate !== 'ED时间') this.orderList = this.edDateFilter(this.orderList);
        },
        opDateFilter(list) {
            return list.filter(order => {
                let temp = order.createTime;
                return this.compareDate(this.selectDate.opDate, temp.substr(0, 10));
            });
        },
        edDateFilter(list) {
            return list.filter(order => {
                let temp = order.createTime;
                return this.compareDate(temp.substr(0, 10), this.selectDate.edDate);
            });
        },
        //时间比较（yyyy-MM-dd）
        compareDate(startDate, endDate) {
            let startTimes = moment(startDate).unix() * 1000;
            let endTimes = moment(endDate).unix() * 1000;
            if (endTimes < startTimes) {
                return false;
            } else {
                return true;
            }
        },
        opSelectDate(isOP) {
            this.selectDate.tableShow = true;
            this.selectDate.isOP = isOP;
        },
        changeDate(options) {
            if (this.selectDate.isOP) {
                this.selectDate.opDate = moment(options.value).format('YYYY-MM-DD');
            } else {
                this.selectDate.edDate = moment(options.value).format('YYYY-MM-DD');
            }
        },
        resetDate() {
            this.selectDate = {
                show: false,
                tableShow: false,
                isOP: true,
                opDate: 'OP时间',
                edDate: 'ED时间',
                value: Number(new Date()),
            };
            this.key = '';
            this.page.pageNum = 1;
            this.orderList = [];
            this.loadData();
        },
    },
    // 触底 加页
    onReachBottom() {
        // 请求过程禁止继续加页
        if (this.isloading) return;
        this.page.pageNum += 1;
        this.loadData();
    },
    onLoad() {
        this.loadData();
    },
};
</script>

<style lang="scss">
.opedDate {
    padding: 10rpx;
    display: flex;
    flex-direction: column;

    .opedText {
        text-align: center;
        font-size: 18px;
        font-weight: 600;
    }
    .opedButton {
        display: flex;
        justify-content: center;
        margin-top: 10px;
    }
    .optionButton {
        margin-top: 10px;
        display: flex;
    }
}
.opedDateT {
    margin-bottom: 444rpx;
}
.opedDateF {
}
</style>
