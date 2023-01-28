import request from './@/util/request.js'
// 登录 用户
export function userLogin(userAccount, userPassword) {
    return request({
        url: '/user/login',
        method: 'post',
        data: {
            "userAccount": userAccount,
            "userPassword": userPassword
        }
    })
}
// 退出
export function outLogin() {
    return request({
        url: '/user/outLogin',
        method: 'get'
    })
}
// 当前 用户
export function getCurrentUser() {
    return request({
        url: '/user/curr',
        method: 'get'
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
// 添加客户
export function clientAdd(paarams) {
    return request({
        url: `/client/add`,
        method: 'post',
        data: paarams
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
export function orderSubmit(orderPrice, clientId, userId, orderRemark, goodsList, payType) {
    return request({
        url: '/orders/create',
        method: 'post',
        data: {
            orderPrice,
            clientId,
            userId,
            orderRemark,
            goodsList,
            payType
        }
    })
}
// 订单列表
export function orderList(pageNum, pageSize, orderStatus) {
    return request({
        url: '/orders/list',
        method: 'post',
        data: {
            pageNum,
            pageSize,
            orderStatus
        }
    })
}
// 订单详细
export function orderInfo(id) {
    return request({
        url: `/orders/info/${id}`,
        method: 'get'
    })
}
// 订单数
export function orderCount(status) {
    return request({
        url: `/orders/count/${status}`,
        method: 'get'
    })
}
// 订单状态编辑
export function orderStatusEdit(id, orderStatus) {
    return request({
        url: `/orders/status/edit`,
        method: 'post',
        data: {
            id,
            orderStatus
        }
    })
}
