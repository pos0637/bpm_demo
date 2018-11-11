/**
 * 从数组中获取随机值
 *
 * @param {*} arr 数组
 * @returns 随机值
 */
function getRandomValue(arr) {
    return arr[Math.floor(Math.random() * (arr.length + 1))];
}

/**
 * 获取随机值
 *
 * @param {*} min 最小值
 * @param {*} max 最大值
 * @returns 随机值
 */
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}