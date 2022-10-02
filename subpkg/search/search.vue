<template>
    <view>
        <view class="search-box">
            <!-- <uni-search-bar v-model="kw" @input="input" :radius="20" cancelButton="none"></uni-search-bar> -->
            <u--input placeholder="请输入" border="bottom" 
            prefixIcon="search" prefixIconStyle="color: #909399" v-model="kw"
                @blur="input" @confirm="input"></u--input>
        </view>
        <!-- 搜索建议列表 -->
        <view class="sugg-list" v-if="searchResults.length !== 0">
            <!-- list op-->
            <view class="sugg-item" v-for="(item , i) in searchResults" :key="i" @click="gotoDetail(item)">
                <view class="goods-name">{{item.goods_name}}</view>
                <!-- <uni-icons type="arrowright" size="16"></uni-icons> -->
                <u-icon name="arrow-down" color="#bfa199" size="16"></u-icon>
            </view>
            <!-- list ed -->
        </view>
        <!-- 搜索历史 -->
        <view class="history-box" v-if="searchResults.length === 0">
            <!-- 标题-->
            <view class="history-title">
                <text>搜索历史</text>
                <!-- <uni-icons type="trash" size="17" @click="cleanHistory"></uni-icons> -->
                <u-icon name="close" @click="cleanHistory"></u-icon>
            </view>
            <!-- 列表-->
            <view class="history-list">
                <!-- <uni-tag :text="item" v-for="(item,i) in historyList" :key="i" @click="gotoGoodsList(item)"></uni-tag> -->
                <u-tag :text="item" plain size="mini" @click="input(item)" closeColor="#ecf5ff"
                    v-for="(item,i) in historyList" :key="i"></u-tag>
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
                historyList: ['a', 'b', 'c']
            };
        },
        methods: {
            input(e) {
                this.kw = e
                this.getSerchList()
            },
            async getSerchList() {
                if (this.kw.length === 0) {
                    this.searchResults = []
                    return
                }
                const {
                    data: res
                } = await uni.$http.get('/goods/search', {
                    query: this.kw
                })
                if (res.meta.status !== 200) return uni.$showMsg()
                this.searchResults = res.message
            },
            gotoDetail(item) {
                this.saveSearchHistory()
                this.kw = ''
                uni.navigateTo({
                    url: "/subpkg/goods_detail/goods_detail?goods_id=" + item.goods_id
                })
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
    }

    .sugg-list {
        padding: 0 5px;

        .sugg-item {
            font-size: 12px;
            padding: 13px 0;
            border-bottom: 1px solid #efefef;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .goods-name {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                margin-right: 3px;
            }

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

            .u-transition {
                margin-top: 5px;
                margin-right: 10px;
            }
        }
    }
</style>
