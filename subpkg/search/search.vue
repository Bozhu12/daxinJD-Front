<template>
    <view>
        <view class="search-box">
            <view class="search-content">
                <u--input placeholder="请输入" border="none" prefixIcon="search" fontSize="16px"
                    prefixIconStyle="color: #909399" @blur="input" @confirm="input" maxlength="32" 
                    clearable customStyle="padding-top: 5px;" v-model="kw">
                </u--input>
            </view>
        </view>

        <!-- 搜索历史 -->
        <view class="history-box" v-if="searchResults.length === 0">
            <!-- 标题-->
            <view class="history-title">
                <text>搜索历史</text>
                <u-icon name="close" @click="cleanHistory"></u-icon>
            </view>
            <!-- 列表-->
            <view class="history-list">
                <u-tag :text="item" plain closable @click="input(item)" closeColor="#e1251b"
                    v-for="(item,i) in historyList" :key="i" @close="tagClose(i)"></u-tag>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                // 输入
                kw: '',
                searchResults: [],
                // 历史
                historyList: []
            };
        },
        methods: {
            input(e) {
                if (this.kw.length === 0) {
                    this.searchResults = []
                    return
                }
                this.saveSearchHistory();
                this.getSerchList()
            },
            async getSerchList() {
                const {
                    data: res
                } = await uni.$http.get('/goods/search', {
                    query: this.kw
                })
                if (res.meta.status !== 200) return uni.$showMsg()
                this.searchResults = res.message
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
            padding: 0 8px;
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
