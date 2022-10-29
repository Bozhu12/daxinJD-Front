<template>
    <web-view :src="targetUrl"></web-view>
</template>

<script>
export default {
    data() {
        return {
            targetUrl: ''
        };
    },
    onLoad(options) {
        this.targetUrl = options.url;
    }
};
</script>

<style lang="scss"></style>
