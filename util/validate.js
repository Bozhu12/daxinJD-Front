/**
 * 手机号码
 * @param {*} s
 */
export function isMobile(s) {
    // return /^1[0-9]{10}$/.test(s)
    return /^1[3456789]\d{9}$/.test(s)
}
/**
 * 电话号码
 * @param {*} s
 */
export function isPhone(s) {
    return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}
/**
 * 价格
 */
export function isPrice(v) {
    return /(^[1-9][0-9]{0,7}$)|(^((0\.0[1-9]$)|(^0\.[1-9]\d?)$)|(^[1-9][0-9]{0,7}\.\d{1,2})$)/.test(v)
}
