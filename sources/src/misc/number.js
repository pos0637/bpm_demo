/**
 * 数值四舍五入为指定小数位数的数字
 *
 * @export
 * @param {*} value 数值
 * @param {*} num 规定小数的位数
 */
export function toFixed(value, num) {
    if (typeof value !== 'number') {
        return value;
    } else {
        return value.toFixed(num);
    }
}
