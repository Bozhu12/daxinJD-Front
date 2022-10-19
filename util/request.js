// 从vuex中获取登录凭证
let token = '';
let server_url = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'http://***/api' ;
function service(options = {}) {
    if(options.url !== '/user/login'){
        token = store.state.m_user.token;
        // 配置请求头
        options.header = {
            'accessToken': `${token}`
        };
    }
    options.url = `${server_url}${options.url}`;
    return new Promise((resolved, rejected) => {
        // 成功
        options.success = (res) => {
            // 请求成功
            // console.log("请求结构 : "+res);
            if (Number(res.data.code) == 20000) {
                resolved(res.data.response);
            } else {
                uni.showToast({
                    icon: 'none',
                    duration: 3000,
                    title: `${res.data.message}`
                });
                // 错误
                rejected(res.data.message);
            }
        }
        //错误
        options.fail = (err) => {
            rejected(err); //错误
        }
        uni.request(options);
    }).catch((e) => {});
}
export default service;
