// let server_url = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'https://bozhu.free.svipss.top';
let server_url = 'http://localhost:8080/api';

function service(options = {}) {
    let uri = options.url;
    let isCookie = uri !== '/user/login';
    // 添加cookie
    if (isCookie) options.header = { 'cookie': uni.$store.state.m_user.cookie }
    options.url = `${server_url}${options.url}`;
    uni.showLoading({
        title: '加载中...'
    });
    return new Promise((resolve, reject) => {
        // 成功
        options.success = (res) => {
            // console.log("success :>", res);
            uni.hideLoading();
            // 请求成功
            let code = Number(res.data.code);
            // 报错弹窗
            if (code != 20000) uni.$showMsg(`${res.data.message}`);
            // 重新登录 (该uri检查登录状态,防止死循环)
            if (code === 40100 && uri !== '/user/curr') uni.$verifyLogin();
            // 登录存cookie
            if (!isCookie) uni.$store.commit('m_user/updateCookie', res.cookies[0])
            resolve(res.data.response);
        }
        //错误
        options.fail = (err) => {
            uni.hideLoading();
            console.log("err :>", err);
            server_url = "http://192.168.20.170:8080/api"
        }
        uni.request(options);
    });
}
export default service;
