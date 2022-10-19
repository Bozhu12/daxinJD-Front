<template>
    <view>
        <view class="search-box">
            <!-- 搜索 -->
            <view class="search-content">
                <u-search v-model="kw" focus bgColor="#ffffff" placeholder="请输入 关键字/商品SKU" @clickIcon="scanQrcode"
                    @custom="input" searchIcon="scan" @search="input"></u-search>
            </view>
        </view>

        <!-- 搜索历史 -->
        <view class="history-box" v-if="searchResults.records.length === 0">
            <view class="history-title">
                <text>搜索历史</text>
                <u-icon name="close" @click="cleanHistory"></u-icon>
            </view>
            <!-- 列表 -->
            <view class="history-list">
                <u-tag :text="item" plain closable @click="input(item)" closeColor="#e1251b"
                    v-for="(item,i) in historyList" :key="i" @close="tagClose(i)"></u-tag>
            </view>
        </view>
        
        <!-- 商品列表 -->
        <view class="goodsList-box" v-if="searchResults.records.length !== 0">
            <block v-for="(item,i) in searchResults.records" :key="i">
                <!-- <view>{{item}} - {{i}}</view> -->
                <my-goods></my-goods>
            </block>
        </view>
        
    </view>
</template>

<script>
    import {
        goodSearch
    } from '@/util/api.js'
    export default {
        data() {
            return {
                // 输入
                kw: '',
                searchResults: {
                    records: [1,2,3,4,5],
                    total: 13,
                    size: 20,
                    current: 1,
                    orders: [],
                    optimizeCountSql: true,
                    searchCount: true,
                    countId: null,
                    maxLimit: null,
                    pages: 1
                },
                // 历史
                historyList: []
            };
        },
        methods: {
            input(e) {
                this.kw = e;
                if (this.kw.length === 0) {
                    this.searchResults = []
                    return
                }
                this.saveSearchHistory();
                this.getSerchList();
            },
            async getSerchList() {
                let res = await goodSearch({
                    "query": this.kw,
                    "cid": "",
                    "pageNum": 1,
                    "pageSize": 20
                });
                this.searchResults = res.data
            },
            // 保存 并处理 (顺序,重复) 问题
            saveSearchHistory() {
                // 将数组 set集合化 并合并添加
                this.historyList = [...new Set([this.kw, ...this.historyList])]
                // this.historyList.push(this.kw);
                // 持久化存储
                uni.setStorageSync('kw', JSON.stringify(this.historyList))
            },
            cleanHistory() {
                this.historyList = []
                uni.setStorageSync('kw', '[]')
            },
            tagClose(i) {
                this.historyList.splice(i, 1);
                uni.setStorageSync('kw', JSON.stringify(this.historyList))
            },
            // 扫码
            async scanQrcode() {
                let res = uni.scanCode();
                if (res[0] != null)
                    return uni.$showMsg('扫码异常!')
                this.kw = res[1].result;
            }
        },
        onLoad() {
            // 持久化数据提取
            this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
        }
    }
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
    
    .goodsList-box{
        
    }
</style>
