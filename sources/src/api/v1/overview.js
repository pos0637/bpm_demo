import Request from '~/components/request';

/**
 * 获取概览数据
 *
 * @export
 * @param {*} succ 成功处理函数
 * @param {*} err 错误处理函数
 * @returns
 */
export default function getOverviewData(succ, err) {
    return Request.get('/api/v1/overview').then(response => succ && succ(response.data)).catch((error) => err && err(error));
}
