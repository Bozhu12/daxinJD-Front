import request from './@/util/request.js'
// 登录 用户
export function userLogin(params) {
    return request({
        url: '/user/login',
        method: 'post',
        data: params,
        header: {
            "Authorization": 'token'
        }
    })
}
// 注册 用户
export function userRegister(params) {
    return request({
        url: '/user/register',
        method: 'post',
        data: params,
    })
}
// 搜索 商品
export function goodSearch(params) {
    return request({
        url: '/goods/search',
        method: 'post',
        data: params
    })
}
// 查询 商品 按sku
export function goodsDetail(sku) {
    return request({
        url: `/goods/find/${sku}`,
        method: 'get',
        data: {}
    })
}
// 查询 商品 按sku (批量)
export function goodsFindBySkus(skus) {
    return request({
        url: `/goods/find/sku`,
        method: 'post',
        data: { skus }
    })
}
// 修改 商品
export function goodsEdit(params) {
    return request({
        url: `/goods/edit/${params.id}`,
        method: 'post',
        data: params
    })
}
// 获取客户列表(带索引)
export function clientList() {
    return request({
        url: `/client/indexlist`,
        method: 'get',
        data: {}
    })
}
// 查询 客户 按id
export function clientGetById(params) {
    return request({
        url: `/client/find/${params}`,
        method: 'get',
        data: {}
    })
}
// 客户编辑(按id)
export function clienEditById(params) {
    return request({
        url: `/client/edit`,
        method: 'post',
        data: params
    })
}
// 客户删除(按id)
export function clienDelById(params) {
    return request({
        url: `/client/del/${params}`,
        method: 'get',
        data: {}
    })
}
// 订单提交
export function orderSubmit(params) {
    return request({
        url: '/orders/create',
        method: 'post',
        data: params
    })
}
// 订单列表
export function orderList(pageNum, pageSize) {
    return request({
        url: '/orders/list',
        method: 'post',
        data: {
            pageNum,
            pageSize
        }
    })
}
// 订单详细
export function orderInfo(id) {
    return request({
        url: `/orders/info/${id}`,
        method: 'get',
        data: {}
    })
}
// 订单数
export function orderCount() {
    return request({
        url: '/orders/count',
        method: 'get',
        data: {}
    })
}
// 订单 撤回数
export function withdrawalOrderCount() {
    return request({
        url: '/orders/withdrawal/count',
        method: 'get',
        data: {}
    })
}
// 订单 撤回 列表
export function withdrawalOrderList(pageNum, pageSize) {
    return request({
        url: '/orders/withdrawal/list',
        method: 'post',
        data: {
            pageNum,
            pageSize
        }
    })
}
// 订单 撤回 操作
export function withdrawalOrderEdit(orderId) {
    return request({
        url: `/orders/withdrawal/edit/${orderId}`,
        method: 'get',
        data: {}
    })
}
