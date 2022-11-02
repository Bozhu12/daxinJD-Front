<template>
    <view>
        <view class="search-box">
            <!-- 搜索 -->
            <view class="search-content">
                <u-search
                    focus
                    v-model="kw"
                    bgColor="#ffffff"
                    placeholder="请输入 关键字/商品SKU"
                    @clickIcon="scanQrcode"
                    @custom="input"
                    searchIcon="scan"
                    @search="input"
                ></u-search>
            </view>
        </view>

        <!-- 搜索历史 -->
        <view class="history-box" v-if="goodsList.length === 0 || searchResults === null">
            <view class="history-title">
                <text>搜索历史</text>
                <u-icon name="close" @click="cleanHistory"></u-icon>
            </view>
            <!-- 列表 -->
            <view class="history-list">
                <u-tag
                    :text="item"
                    plain
                    closable
                    @click="input(item)"
                    closeColor="#e1251b"
                    v-for="(item, i) in historyList"
                    :key="i"
                    @close="cleanHistoryByTag(i)"
                ></u-tag>
            </view>
        </view>

        <!-- 商品列表 -->
        <view class="goodsList-box" v-if="goodsList.length !== 0">
            <block v-for="(item, i) in goodsList" :key="i"><my-goods :goods="item"></my-goods></block>
        </view>
    </view>
</template>

<script>
import {goodSearch} from '@/util/api.js';
export default {
    data() {
        return {
            // 输入
            kw: '',
            goodsList: [],
            searchResults: {
                records: [],
                total: 0,
                size: 0,
                current: 0,
                orders: [],
                optimizeCountSql: true,
                searchCount: true,
                countId: null,
                maxLimit: null,
                pages: 1
            },
            searchParams: {
                query: '',
                cid: '',
                type: '',
                pageNum: 1,
                pageSize: 20
            },
            // 历史
            historyList: [],
            // 防止高频刷新
            isloading: false
        };
    },
    methods: {
        // 首次搜索
        input(e) {
            this.kw = e;
            this.searchParams.pageNum = 1;
            this.searchResults = null;
            this.goodsList = [];
            if (this.kw.length === 0 && this.searchParams.tyep !== '') return;
            this.getSerchList();
        },
        async getSerchList() {
            this.isloading = true;
            this.searchParams.query = this.kw;
            let res = await goodSearch(this.searchParams);
            this.searchResults = res.data;
            this.goodsList = [...this.goodsList, ...res.data.records];
            this.saveSearchHistory();
            this.isloading = false;
        },
        // 保存 并处理 (顺序,重复) 问题
        saveSearchHistory() {
            if (this.kw === '' || this.kw === undefined) return;
            // 将数组 set集合化 并合并添加
            this.historyList = [...new Set([this.kw, ...this.historyList])];
            // this.historyList.push(this.kw);
            // 持久化存储
            uni.setStorageSync('kw', JSON.stringify(this.historyList));
        },
        cleanHistory() {
            this.historyList = [];
            uni.setStorageSync('kw', '[]');
        },
        cleanHistoryByTag(i) {
            this.historyList.splice(i, 1);
            uni.setStorageSync('kw', JSON.stringify(this.historyList));
        },
        // 扫码
        async scanQrcode() {
            let res = uni.scanCode();
            if (res[0] != null) return uni.$showMsg('扫码异常!');
            this.kw = res[1].result;
        },
        // 触底 加页
        onReachBottom() {
            // 请求过程禁止继续加页
            if (this.isloading) return;
            this.searchParams.pageNum += 1;
            this.getSerchList();
        },
        // 修改数据则重新加载
        async onShow() {
            if (this.goodsList.length !== 0) {
                let res = await goodSearch(this.searchParams);
                this.searchResults = res.data;
                this.goodsList = res.data.records;
            }
        }
    },
    onLoad(options) {
        if (options.type === '' || options.type === undefined) {
            // 持久化数据提取
            this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]');
        } else {
            this.searchParams.type = options.type;
            this.getSerchList();
        }
    },
    onShow() {
        uni.$verifyLogin();
    }
};
</script>

<style lang="scss">
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

.history-box {
    padding: 0 5px;

    .history-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 40px;
        font-size: 13px;
        border-bottom: 1px solid #efefef;
    }

    .history-list {
        display: flex;
        flex-wrap: wrap;
    }
}
</style>
