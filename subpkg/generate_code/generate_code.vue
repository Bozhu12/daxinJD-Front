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
                type="success"
                :text="bluetoothData.nowPrint.name ? `当前连接${bluetoothData.nowPrint.name}` : `连接打印机`"
                size="large"
                @click="bluetoothList"
            ></u-button>
            <u-button
                class="custom-style"
                type="primary"
                :text="templateNum ? '选择打印生成模板' : `模板${templateNum + 1}  (点击更改模板)`"
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

        <!-- 告示 -->
        <view class="notice">
            <u-alert title="注意 :" type="warning" closable="true" :description="description" fontSize="16"></u-alert>
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

        <view class="popup">
            <!-- 编辑框 -->
            <u-popup
                :show="editGoods.show"
                :round="10"
                mode="bottom"
                closeable
                @close="editGoods.show = !editGoods.show"
            >
                <view class="goods-edit">
                    <view class="title">编辑生成内容</view>
                    <view class="msg">
                        <view class="unit">
                            <view class="margin-right">SKU :</view>
                            <u--input border="surround" disabled v-model="editGoods.sku"></u--input>
                        </view>
                        <view class="unit">
                            <view class="margin-right">标题内容1:</view>
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

            <!-- 选择连接蓝牙 -->
            <u-popup
                :show="bluetoothData.showPrinters"
                :round="10"
                mode="bottom"
                @close="bluetoothData.showPrinters = !bluetoothData.showPrinters"
            >
                <view class="title">请选择蓝牙 : (选择 B3S-xxx 打印机)</view>
                <view>
                    <view class="title" v-if="bluetoothData.printerLists.length == 0">查看以上注意事项!!!</view>
                    <view class="title" v-if="bluetoothData.nowPrint">当前连接: {{ bluetoothData.nowPrint.name }}</view>
                    <u-cell-group>
                        <block v-for="(item, i) in bluetoothData.printerLists" :key="i">
                            <u-cell :title="item.name" isLink value="点击连接" @click="connectPrint(item)"></u-cell>
                        </block>
                    </u-cell-group>
                </view>
            </u-popup>
        </view>

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
        <view class="canvas">
            <canvas canvas-id="printDemo" :style="{width: canvas.w + 'px', height: canvas.h + 'px'}" />
        </view>
    </view>
</template>

<script>
import {goodsDetail} from '@/util/api.js';
import {mapState, mapMutations} from 'vuex';
export default {
    computed: {
        ...mapState('m_print', ['printConfig', 'models', 'goodsList']),
    },
    data() {
        return {
            canvas: {
                w: 0,
                h: 0,
            },
            description: '1. 打印需要打开定位功能\t\n 2. 打印需要蓝牙功能 (B3S-XXX)',
            templateNum: -1,
            jishu: 0,
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
            goodsTemp: null,
            bluetoothData: {
                nowPrint: null,
                showPrinters: false,
                printerLists: [],
            },
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
        ...mapMutations('m_print', ['addGoods', 'updateGoodsByIndex', 'clearGoodsByIndex']),
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
            this.addGoods(res.data);
            // this.goodsList = [...this.goodsList, res.data];
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
            // console.log("options :>>",options);
            // console.log("index :>>",index);
            // console.log("goods :>>",goods);
            // options.index 0 => 编辑 (填充展示数据)
            if (options.index === 0) {
                if (!goods) return;
                this.editGoods.show = !this.editGoods.show;
                this.editGoods.selected = goods;
                this.editGoods.index = index;

                // 填充数据内容
                this.editGoods.sku = goods.goodsSku;
                // this.editGoods.msg1 = goods.goodsName===' '?'':goods.msg2;
                this.editGoods.msg1 = goods.msg1 ? goods.msg1 : goods.goodsName;
                this.editGoods.msg2 = goods.msg2;
            }
            // options.index 1 => 删除
            if (options.index === 1) {
                this.clearGoodsByIndex(index);
                // this.goodsList.splice(index, 1);
            }
        },
        editSubmit() {
            if (this.editGoods.selected === {} || this.editGoods.index === -1) {
                this.editGoods.show = !this.editGoods.show;
                uni.$showMsg('未选中编辑对象');
                return;
            }
            this.editGoods.selected.msg1 = this.editGoods.msg1;
            this.editGoods.selected.msg2 = this.editGoods.msg2;

            // vue更改
            // console.log("this.editGoods.selected :>>",this.editGoods.selected);
            this.updateGoodsByIndex({index: this.editGoods.index, goods: this.editGoods.selected});

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
            if (!this.bluetoothData.nowPrint) {
                uni.$showMsg('请连接打印机!');
                return;
            }
            if (this.goodsList.length <= 0) {
                uni.$showMsg('请选择 添加商品!');
                return;
            }
            if (this.templateNum <= -1) {
                uni.$showMsg('请选择 模板!');
                return;
            }
            // 确认框
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
                // 新开辟空间
                modelArray[i] = JSON.parse(JSON.stringify(model));
                modelArray[i].qrCode.value = uni.$packQrCode(this.goodsList[i].goodsSku);
                modelArray[i].title.value = this.goodsList[i].msg1;
                modelArray[i].text.value = this.goodsList[i].msg2;
            }

            // 装配数据
            this.printConfig.count = this.goodsList.length;
            let printData = {
                printConfig: this.printConfig,
                modelArray,
            };

            // 测试直接封装数据
            // let printData = {
            //     modelArray: [
            //         {
            //             fileName: '01-print-temp.png',
            //             qrCode: {x: 2, y: 1, w: 30, h: 30, rotation: 0, value: 'https://item.jd.com/100005722048.html'},
            //             text: {x: 37, y: 30, fontSize: 3, rotation: 270, value: '1123'},
            //             title: {x: 2, y: 35, fontSize: 3, rotation: 0, value: '2234'},
            //         },
            //         {
            //             fileName: '01-print-temp.png',
            //             qrCode: {x: 2, y: 1, w: 30, h: 30, rotation: 0, value: 'https://item.jd.com/100011645068.html'},
            //             text: {x: 37, y: 30, fontSize: 3, rotation: 270, value: '1111'},
            //             title: {x: 2, y: 35, fontSize: 3, rotation: 0, value: '2222'},
            //         },
            //     ],
            //     printConfig: {
            //         count: 2,
            //         darkness: 3,
            //         gapType: 1,
            //         h: 40,
            //         rotation: 0,
            //         w: 40,
            //     },
            // };

            //异常
            JCAPI.didReadPrintErrorInfo(function(res) {
                console.log('-----收到出错信息 :----');
                console.log(res);
            });

            this.jishu = 0;
            // 打印数据
            JCAPI.startJob(
                printData.printConfig.gapType,
                printData.printConfig.darkness,
                printData.printConfig.count,
                () => {
                    uni.showLoading({title: '打印中...'});
                    this.canvas.w = printData.printConfig.w * 8;
                    this.canvas.h = printData.printConfig.h * 8;
                    this.startPrinting(printData);
                },
            );
        },
        startPrinting(printData) {
            if (printData.modelArray.length <= this.jishu) return;
            console.log('打印', printData);
            let config = printData.printConfig;
            JCAPI.startDrawLabel('printDemo', this, config.w, config.h, config.rotation);

            let item = printData.modelArray[this.jishu];
            // 查看包含有哪些操作元素
            let keys = Object.keys(item);
            for (let i = 1; i < keys.length; i++) {
                let element = item[keys[i]];
                let key = keys[i];
                if (key === 'qrCode') {
                    console.log(`${key} (${this.jishu}-${i}) :>> ${element}`);
                    JCAPI.drawQRCode(element.value, element.x, element.y, element.w, element.h, element.rotation);
                }
                if (key === 'text' || key === 'title') {
                    console.log(`${key} (${this.jishu}-${i}) :>> ${element}`);
                    JCAPI.drawText(element.value, element.x, element.y, element.fontSize, element.rotation);
                }
            }
            let _this = this;
            JCAPI.endDrawLabel(function() {
                if (_this.jishu + 1 <= config.count) uni.hideLoading();
                JCAPI.print(1, function() {
                    console.log('下一张纸');
                    _this.jishu++;
                    _this.startPrinting(printData);
                });
            });
        },
        // 蓝牙列表
        bluetoothList() {
            uni.showLoading({title: '加载中...', mask: true});
            JCAPI.scanedPrinters(didGetScanedPrinters => {
                uni.hideLoading();
                let arr = didGetScanedPrinters;
                arr = didGetScanedPrinters.filter(items => {
                    // return  items.name.indexOf('B21-')>-1;
                    if (items.name === '未知设备') return false;
                    return items;
                });
                // if (this.bluetoothData.nowPrint && this.bluetoothData.nowPrint.name) {
                //     arr = arr.filter(items => {
                //         return items.name !== this.bluetoothData.nowPrint.name;
                //     });
                // }
                // console.log('arr :>>',arr);
                this.bluetoothData.showPrinters = !this.bluetoothData.showPrinters;
                this.bluetoothData.printerLists = arr;
            });
        },
        // 蓝牙连接
        connectPrint(item) {
            // console.log(item);
            this.bluetoothData.showPrinters = !this.bluetoothData.showPrinters;
            uni.showLoading({title: '连接中...'});
            JCAPI.openPrinter(
                item.name,
                () => {
                    // 成功
                    uni.hideLoading();
                    uni.$showMsg('连接成功!', 500);
                    this.bluetoothData.nowPrint = item;
                },
                () => {
                    // 失败
                    uni.hideLoading();
                    uni.$showMsg('连接失败!', 500);
                    this.bluetoothData.nowPrint = null;
                    this.bluetoothData.printerLists = [];
                },
            );
        },
    },
    onLoad(options) {
        if (options.templateNum === undefined) return;
        // 在数组中下标从0开始的因此-1
        this.templateNum = options.templateNum - 1;
    },
    // 监听选择的模板
    onShow() {
        uni.$once('number', number => {
            this.templateNum = number - 1;
        });
    },
};
</script>

<style lang="scss">
.generate-code-box {
    .popup {
        .title {
            padding: 22rpx;
            font-size: 18px;
            font-weight: 600;
            margin-left: 23rpx;
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

    .generate-template-buttom {
        display: flex;
        justify-content: space-between;
    }
    .goodslist {
    }
    .notice {
        width: 666rpx;
        margin: auto;
        margin-bottom: 20rpx;
    }
    .scan-addCode-buttom {
        margin: 10px 40px;
    }

    .generate-submit-buttom {
        width: 100%;
        position: fixed;
        bottom: -2px;
        z-index: 999;
    }

    .canvas {
        position: fixed;
        top: -1000px;
    }
}
</style>
