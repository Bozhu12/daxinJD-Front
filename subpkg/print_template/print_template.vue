<template>
    <view class="print-template">
        <!-- 打印配置 -->
        <view @click="config.show = !config.show" class="printConfig">
            打印机设置 =>
            <view><u-icon name="setting-fill"></u-icon></view>
        </view>
        <!-- 设置框 -->
        <view>
            <u-popup
                closeable
                :show="config.show"
                @close="config.show = !config.show"
                :closeOnClickOverlay="false"
                mode="center"
                :round="10"
                :customStyle="{marginTop: selectData.show ? '-170px' : '0'}"
            >
                <view class="popup-print-config">
                    <view style="margin-bottom: 10px">打印机配置: (单位:毫米)</view>
                    <u-row customStyle="margin-bottom: 10px">
                        <u-col span="4"><view>标签宽度:</view></u-col>
                        <u-col span="8">
                            <view><u--input v-model="config.w"></u--input></view>
                        </u-col>
                    </u-row>
                    <u-row customStyle="margin-bottom: 10px">
                        <u-col span="4"><view>标签高度:</view></u-col>
                        <u-col span="8">
                            <view><u--input v-model="config.h"></u--input></view>
                        </u-col>
                    </u-row>
                    <u-row customStyle="margin-bottom: 10px">
                        <u-col span="4"><view>旋转(顺):</view></u-col>
                        <u-col span="8">
                            <view>
                                <u--input
                                    v-model="config.rotation"
                                    suffixIcon="arrow-down"
                                    @focus="openSelect('rotation')"
                                ></u--input>
                            </view>
                        </u-col>
                    </u-row>
                    <u-row customStyle="margin-bottom: 10px">
                        <u-col span="4"><view>标签类型:</view></u-col>
                        <u-col span="8">
                            <view>
                                <u--input
                                    v-model="config.gapType"
                                    suffixIcon="arrow-down"
                                    @focus="openSelect('gapType')"
                                ></u--input>
                            </view>
                        </u-col>
                    </u-row>
                    <u-row customStyle="margin-bottom: 10px">
                        <u-col span="4"><view>打印浓度:</view></u-col>
                        <u-col span="8">
                            <view>
                                <u--input
                                    v-model="config.darkness"
                                    suffixIcon="arrow-down"
                                    @focus="openSelect('darkness')"
                                ></u--input>
                            </view>
                        </u-col>
                    </u-row>
                </view>
                <u-button type="success" text="确定" @click="submitConfig"></u-button>
            </u-popup>
            <u-picker
                :show="selectData.show"
                :columns="selectData.type"
                @close="
                    selectData.show = !selectData.show;
                    selectData.type = '';
                "
                @cancel="selectData.show = !selectData.show"
                keyName="label"
                :closeOnClickOverlay="true"
                @confirm="selected"
            ></u-picker>
        </view>

        <!-- 模板列表 -->
        <view class="panel">
            <view class="template-list" v-if="models.length !== 0">
                <block v-for="(item, i) in models" :key="i">
                    <my-print-template
                        :printConfig="printConfig"
                        :model="item"
                        @click="selecteTemplate(i + 1)"
                    ></my-print-template>
                </block>
            </view>
        </view>
        <!-- 其他功能 -->
    </view>
</template>

<script>
import {mapState, mapMutations} from 'vuex';
export default {
    computed: {
        ...mapState('m_print', ['printConfig', 'models']),
    },
    data() {
        return {
            // 打印机配置
            config: {
                show: false,
                w: 40,
                h: 40,
                rotation: 0,
                count: 1,
                gapType: 1,
                darkness: 3,
            },
            selectData: {
                show: false,
                // 选择类型数据
                selected: '',
                // 展示类型数据
                type: '',
                rotation: [
                    [
                        {label: '不旋转', val: 0},
                        {label: '90顺', val: 90},
                        {label: '180顺', val: 180},
                        {label: '270顺(90逆)', val: 270},
                    ],
                ],
                gapType: [
                    [
                        {label: '间隙纸', val: 1},
                        {label: '黑标纸', val: 2},
                        {label: '连续纸', val: 3},
                        {label: '透明纸', val: 4},
                    ],
                ],
                darkness: [
                    [
                        {label: '1', val: 1},
                        {label: '2', val: 2},
                        {label: '3', val: 3},
                        {label: '4', val: 4},
                        {label: '5', val: 5},
                    ],
                ],
            },
        };
    },
    methods: {
        ...mapMutations('m_print', ['updatePrintConfig']),
        selecteTemplate(index) {
            uni.redirectTo({
                url: `../../subpkg/generate_code/generate_code?templateNum=${index}`,
            });
        },
        // 打开选择器
        openSelect(type) {
            this.selectData.selected = type;
            this.selectData.type = this.selectData[type];
            this.selectData.show = !this.selectData.show;
        },
        // 选择数据
        selected({value}) {
            let val = value[0].val;
            this.config[this.selectData.selected] = val;
            this.selectData.show = !this.selectData.show;
        },
        // 提交更改配置
        submitConfig() {
            this.config.show = !this.config.show;
            this.updatePrintConfig(this.config);
        },
    },
};
</script>

<style lang="scss">
.print-template {
    .printConfig {
        position: sticky;
        top: 0;
        z-index: 999;
        background-color: #e1251b;
        height: 25px;
        padding: 0 10px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .popup-print-config {
        padding: 30rpx;
    }

    .template-list {
        display: flex;
        justify-content: start;
        flex-wrap: wrap;
        width: 650rpx;
        margin: auto;
    }
}
</style>
