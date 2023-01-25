// 从vuex中获取登录凭证
let token = '';
// let server_url = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'https://bozhu.free.svipss.top';
let server_urls = uni.$api;
let num = 0;
// let server_url = 'https://bozhu.free.svipss.top';
import store from '@/store/store.js';

function service(options = {}) {
    uni.showLoading({
        title: '加载中...'
    }); 
    // 认证
    if (options.url !== '/user/login') { 
        token = store.state.m_user.token;
        // 配置请求头
        options.header = {
            AccessToken: `${token}`
        };
    }
    let uri = options.url;
    // options.url = server_urls[num] + options.url;
    return new Promise((resolve, reject) => {
        
        // 成功
        options.success = (res) => {
            console.log("success :>",res);
            uni.hideLoading();
            // 请求成功
            // console.log("请求结构 : "+res);
            const code = Number(res.data.code);
            if (code == 20000) {
                resolve(res.data.response);
            }else{
                uni.$showMsg(`${res.data.message}`);
                reject(res.data.message);
            }
            // if (Number(res.data.code) === 40100) {
            //     setTimeout(() => {
            //         uni.switchTab({
            //             url: '/pages/my/my'
            //         })
            //     }, 2000);
            // }
        }
        //错误
        options.fail = (err) => {
            uni.hideLoading();
            console.log("err :>",err);
            num++;
            if(server_urls.length > num){
                options.url = `${server_urls[num]}${uri}`;
                console.log("op.url :>", options);
                console.log("num :>", num);
                uni.request(options);
            }else{
                num--;
                reject(err); //错误
            }
        }
        options.url = `${server_urls[num]}${uri}`;
        uni.request(options);
    });
}
export default service;
