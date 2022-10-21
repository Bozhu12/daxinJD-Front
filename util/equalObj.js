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
