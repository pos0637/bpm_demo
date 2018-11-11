import { Mock } from '~/components/request';

const runningInformation = [0, 1];

/**
 * 从数组中获取随机值
 *
 * @param {*} arr 数组
 * @returns
 */
function getRandomValue(arr) {
    return arr[Math.floor(Math.random() * (arr.length + 1))];
}

Mock.onGet('/api/v1/overview').reply(200, {
    code: 200,
    data: {
        runningInformation: getRandomValue(runningInformation)
    }
});
