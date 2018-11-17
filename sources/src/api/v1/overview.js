import { request } from '~/components/request';

/**
 * 获取概览数据
 *
 * @export
 * @param {*} succ 成功处理函数
 * @param {*} err 错误处理函数
 * @returns
 */
export default function getOverviewData(succ, err) {
    return request('/api/v1/overview', 'get', null, succ, err);
}
