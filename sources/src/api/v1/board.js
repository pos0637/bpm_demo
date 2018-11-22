import { request } from '~/components/request';

/**
 * 获取概览数据
 *
 * @export
 * @param {*} succ 成功处理函数
 * @param {*} err 错误处理函数
 * @returns
 */
export function getOverviewData(succ, err) {
    return request('/api/v1/board/overview', 'get', null, succ, err);
}

/**
 * 获取主视图数据
 *
 * @export
 * @param {*} succ 成功处理函数
 * @param {*} err 错误处理函数
 * @returns
 */
export function getMainData(succ, err) {
    return request('/api/v1/board/main', 'get', null, succ, err);
}
