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
    if (v === '' || v === null || v === 0) return true;
    return /(^[1-9][0-9]{0,7}$)|(^((0\.0[1-9]$)|(^0\.[1-9]\d?)$)|(^[1-9][0-9]{0,7}\.\d{1,2})$)/.test(v)
}
/**
 * 比较两对象的各个属性是否相同
 * @param {Object} obj1 对象1
 * @param {Object} obj2 对象2
 */
export function equals(obj1, obj2) {
    if (obj1 === undefined || obj2 === undefined) return false;
    if (obj1 === null && obj2 === null) return true;
    if (JSON.stringify(obj1) === '{}' && JSON.stringify(obj2) === '{}') return true;
    if (obj1 === null || JSON.stringify(obj1) === '{}') return false;
    if (obj2 === null || JSON.stringify(obj2) === '{}') return false;
    let keys1 = Object.keys(obj1);
    let keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) return false;
    for (let key of keys1) {
        if (obj1[key] !== obj2[key]) return false;
    }
    return true;
}
/**
 * 验证是否为空
 * @param {Object} obj
 */
export function isEmpty(obj) {
    if (obj === '' || obj === null || obj === undefined) return true;
    if (JOSN.stringify(obj) === '{}') return true;
    for (let n in obj) return false;
    return false;
};
