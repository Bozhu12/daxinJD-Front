<template>
    <view class="generate-code-box">
        <!-- 添加 -->
        <my-search
            @search="input"
            :inputData="kw"
            placeholder="请输入 sku 进行对商品添加"
            searchIcon="scan"
            buttonText="添加"
        ></my-search>

        <!-- 模板选择 -->
        <view class="generate-template-buttom">
            <u-button
                class="custom-style"
                type="primary"
                :text="templateNum === -1 ? '选择打印生成模板' : `模板${templateNum + 1}  (点击更改模板)`"
                size="large"
                @click="selectPrintTemplate"
            ></u-button>
        </view>

        <!-- 码列表 -->
        <u-swipe-action>
            <view class="goodslist" v-if="goodsList.length !== 0">
                <block v-for="(iten, i) in goodsList" :key="i">
                    <u-swipe-action-item :options="options" @click="swipeActionClickHandler($event, iten, i)">
                        <my-generarte-goods :goods="iten"></my-generarte-goods>
                    </u-swipe-action-item>
                </block>
            </view>
        </u-swipe-action>

        <!-- 扫描添加码 -->
        <view class="scan-addCode-buttom">
            <u-button
                class="custom-style"
                type="success"
                icon="scan"
                text="扫码添加"
                size="large"
                @click="scanQrCode"
            ></u-button>
        </view>

        <!-- 生成按钮 -->
        <view class="generate-submit-buttom">
            <u-button
                class="custom-style"
                type="success"
                text="打印生成"
                size="large"
                @click="modal.show = !modal.show"
            ></u-button>
        </view>

        <!-- 编辑框 -->
        <u-popup :show="editGoods.show" :round="10" mode="bottom" closeable @close="editGoods.show = !editGoods.show">
            <view class="goods-edit">
                <view class="title">编辑生成内容</view>
                <view class="msg">
                    <view class="unit">
                        <view class="margin-right">SKU :</view>
                        <u--input border="surround" disabled v-model="editGoods.sku"></u--input>
                    </view>
                    <view class="unit">
                        <view class="margin-right">生成内容1:</view>
                        <u--input placeholder="请输入内容1" v-model="editGoods.msg1"></u--input>
                    </view>
                    <view class="unit">
                        <view class="margin-right">生成内容2:</view>
                        <u--input placeholder="请输入内容2" v-model="editGoods.msg2"></u--input>
                    </view>
                </view>
                <u-button type="success" size="large" text="确定" @click="editSubmit"></u-button>
            </view>
        </u-popup>

        <!-- 生成提示 -->
        <u-modal
            cancelText="否"
            confirmText="是"
            showCancelButton
            :show="modal.show"
            :title="modal.title"
            :content="modal.content"
            @cancel="modal.show = !modal.show"
            @confirm="print"
        ></u-modal>
    </view>
</template>

<script>
import {goodsDetail} from '@/util/api.js';
import {mapState} from 'vuex';
export default {
    computed: {
        ...mapState('m_print', ['printConfig', 'models']),
    },
    data() {
        return {
            templateNum: -1,
            modal: {
                show: false,
                title: '生成提示',
                content: '确定打印进行打印?',
            },
            editGoods: {
                index: -1,
                selected: '',
                show: false,
                sku: '',
                msg1: '',
                msg2: '',
            },
            kw: '',
            goodsList: [],
            options: [
                {
                    text: '编辑',
                    style: {
                        backgroundColor: '#f9ae3d',
                    },
                },
                {
                    text: '删除',
                    style: {
                        backgroundColor: '#e1251b',
                    },
                },
            ],
        };
    },
    methods: {
        input(v) {
            this.kw = v;
            if (!this.verifySku(this.kw)) return;
            this.loadList(this.kw);
        },
        verifySku(sku) {
            if (sku === '') {
                uni.$showMsg('sku不能为空!');
                return false;
            }
            if (!/^\d*$/.test(sku)) {
                uni.$showMsg('sku必须为数值!');
                return false;
            }
            // let res = this.goodsList.find(e => e.goodsSku === sku);
            // if (res !== undefined) {
            //     uni.$showMsg('该sku已经有啦!');
            //     return false;
            // }
            return true;
        },
        async loadList(sku) {
            let res = await goodsDetail(sku);
            res.data.msg1 = res.data.goodsName;
            res.data.msg2 = '';
            this.goodsList = [...this.goodsList, res.data];
            uni.$showMsg('添加成功');
            this.kw = '';
        },
        async scanQrCode() {
            let [err, res] = await uni.scanCode();
            if (err != null) return uni.$showMsg('扫码异常!');
            let sku = uni.$parsingQrCode(res.result);
            if (!this.verifySku(sku)) return;
            this.loadList(sku);
        },
        swipeActionClickHandler(options, goods, index) {
            // options.index 0 => 编辑
            if (options.index === 0) {
                this.editGoods.show = !this.editGoods.show;
                this.editGoods.selected = goods;
                this.editGoods.index = index;

                // 填充数据
                this.editGoods.sku = goods.goodsSku;
                this.editGoods.msg1 = goods.goodsName;
                this.editGoods.msg2 = goods.msg2;
            }
            // options.index 1 => 删除
            if (options.index === 1) {
                this.goodsList.splice(index, 1);
            }
        },
        editSubmit() {
            if (this.editGoods.selected === {} || this.editGoods.index === -1) {
                this.editGoods.show = !this.editGoods.show;
                uni.$showMsg('未选中编辑对象');
                return;
            }
            this.goodsList[this.editGoods.index].msg1 = this.editGoods.msg1;
            this.goodsList[this.editGoods.index].msg2 = this.editGoods.msg2;
            this.editGoods.show = !this.editGoods.show;
            this.editGoods.selected = {};
            this.editGoods.index = -1;
            uni.$showMsg('编辑成功');
        },
        selectPrintTemplate() {
            uni.navigateTo({
                url: '../../subpkg/print_template/print_template',
            });
        },
        // 打印操作
        print() {
            this.modal.show = !this.modal.show;
            // 打印机参数
            // console.log(this.printConfig);
            // 打印模板数据
            // console.log(this.models[this.templateNum]);
            // 物品数量
            // console.log(this.goodsList);
            let modelArray = [];
            let model = {...this.models[this.templateNum]};
            for (var i = 0; i < this.goodsList.length; i++) {
                modelArray[i] = JSON.parse(JSON.stringify(model));
                modelArray[i].qrCode.value = uni.$packQrCode(this.goodsList[i].goodsSku);
                modelArray[i].title.value = this.goodsList[i].msg1;
                modelArray[i].text.value = this.goodsList[i].msg2;
            }

            // 装配数据
            let printData = {
                printConfig: this.printConfig,
                modelArray,
            };
            console.log(printData);
        },
    },
    onLoad(options) {
        if (options.templateNum === undefined) return;
        // 在数组中下标从0开始的因此-1
        this.templateNum = options.templateNum - 1;
    },
};
</script>

<style lang="scss">
.generate-code-box {
    .generate-template-buttom {
    }
    .goodslist {
    }
    .scan-addCode-buttom {
        margin: 10px 40px 60px 40px;
    }

    .generate-submit-buttom {
        width: 100%;
        position: fixed;
        bottom: -2px;
        z-index: 999;
    }

    .goods-edit {
        .title {
            font-size: 18px;
            padding: 22rpx;
            font-weight: 600;
        }
        .msg {
            margin: 10rpx 32rpx;
            .unit {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10rpx 0;

                .margin-right {
                    margin-right: 23rpx;
                }
            }
        }
    }
}
</style>
