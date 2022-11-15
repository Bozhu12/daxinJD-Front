export default {
    namespaced: true,
    state: () => ({
        // 打印机配置
        printConfig: JSON.parse(uni.getStorageSync('printConfig') ||
            '{"w": 40,"h": 40,"rotation": 0,"count": 1,"gapType": 1,"darkness": 3}'),
        models: [
            // 模板1 二维码 & 标题文本 & 数值信息
            {
                // 打印模板
                fileName: '01-print-temp.png',
                qrCode: {
                    x: 2,
                    y: 1,
                    w: 30,
                    h: 30,
                    rotation: 0,
                    value: '',
                },
                title: {
                    x: 2,
                    y: 35,
                    fontSize: 2.8,
                    rotation: 0,
                    value: '',
                },
                text: {
                    x: 2,
                    y: 35,
                    fontSize: 2.8,
                    rotation: 0,
                    value: '',
                },
            }
            // 其他模板
        ]
    }),
    mutations: {
        // 编辑打印配置
        updatePrintConfig(state, config) {
            state.printConfig = Object.assign(state.printConfig, config);
            this.commit('m_print/savePrintConfig')
        },
        savePrintConfig(state) {
            uni.setStorageSync('printConfig', JSON.stringify(state.printConfig))
        }
    },
    getters: {}
}
