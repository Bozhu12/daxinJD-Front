<template>
    <view class="camera-view" :style="{height: caremaHeight + 'px'}">
        <camera
            device-position="back"
            flash="auto"
            class="camera"
            mode="scanCode"
            :flash="flash"
            @scancode="scanCode"
        ></camera>

        <canvas class="scan-canvas" canvas-id="scanCanvas"></canvas>

        <canvas
            class="scan-canvas-photo"
            :style="{width: photoWidth + 'px', height: photoHeight + 'px'}"
            canvas-id="scanPhoto"
        ></canvas>

        <view class="scan-list" v-if="isContinuous && scanList.length > 0 && !showDetail && showList">
            <view class="list-view" :style="{height: caremaHeight / 3 + 'px'}">
                <view class="scan-item" v-for="(item, index) in scanList" :key="index" @click="showDetailFunc(item)">
                    <view class="text">{{ item.text }}</view>
                    <image class="icon" :src="item.url"></image>
                    <view class="icon-view">
                        <view class="iconfont icon-delete" @click.stop="delItem(index)"></view>
                    </view>
                </view>
            </view>
            <view class="btn-view">
                <view class="btn del" @click="clearList">全部清除</view>
                <view class="btn copy" @click="copyByKSUList">复制SKU</view>
            </view>
        </view>

        <view class="dialog-view" v-if="((scanItem.text || scanItem.url) && !isContinuous) || showDetail">
            <view class="dialog">
                <view class="result" v-if="scanItem.text">
                    <view class="label">扫码结果:</view>
                    <text class="value">{{ scanItem.text }}</text>
                </view>

                <view class="result" v-if="scanItem.url">
                    <view class="label">扫码图片:</view>
                    <view class="image-view"><image class="photo" :src="scanItem.url" mode="widthFix"></image></view>
                </view>
            </view>

            <view class="iconfont icon-clear" @click="reset"></view>
        </view>
    </view>
</template>

<script src="./index.js" type="text/javascript"></script>

<style lang="scss" scoped>
@import './css/index.scss';
</style>
