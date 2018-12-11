import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '~/components/baseComponent';

/**
 * 仪表盘
 *
 * @export
 * @class Gauge
 * @extends {BaseComponent}
 */
export default class Gauge extends BaseComponent {
    static propTypes = {
        left: PropTypes.number.isRequired, // 横坐标
        top: PropTypes.number.isRequired, // 纵坐标
        width: PropTypes.number.isRequired, // 宽度
        value: PropTypes.string, // 值
        font: PropTypes.string, // 字体
        fontSize: PropTypes.number, // 字体大小
        weight: PropTypes.string, // 粗细
        color: PropTypes.any // 颜色
    }

    static defaultProps = {
        value: null,
        font: 'SourceHanSansSC-Normal',
        fontSize: 42,
        weight: 'normal',
        color: 'rgb(137, 149, 165)'
    }

    render() {
        const { left, top } = this.getRelativePosition(this.props.left, this.props.top);
        const { width, height, value, font, fontSize, weight, color } = this.props;

        return (
            <div style={{ position: 'absolute', left: `${left}px`, top: `${top}px` }}>
            </div>
        );
    }
}
