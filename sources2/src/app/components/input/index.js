import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '~/components/baseComponent';

/**
 * 输入框
 *
 * @export
 * @class Input
 * @extends {BaseComponent}
 */
export default class Input extends BaseComponent {
    static propTypes = {
        left: PropTypes.number.isRequired, // 横坐标
        top: PropTypes.number.isRequired, // 纵坐标
        width: PropTypes.number.isRequired, // 宽度
        height: PropTypes.number.isRequired, // 高度
        type: PropTypes.string, // 类型
        name: PropTypes.string, // 名称
        value: PropTypes.string, // 值
        font: PropTypes.string, // 字体
        fontSize: PropTypes.number, // 字体大小
        weight: PropTypes.string, // 粗细
        color: PropTypes.any // 颜色
    }

    static defaultProps = {
        type: 'text',
        name: '',
        value: null,
        font: 'SourceHanSansSC-Normal',
        fontSize: 42,
        weight: 'normal',
        color: 'rgb(137, 149, 165)'
    }

    _render() {
        const { left, top } = this.getRelativePosition(this.props.left, this.props.top);
        const { width, height, type, name, value, font, fontSize, weight, color } = this.props;

        return (
            <div style={{ position: 'absolute', left: `${left}px`, top: `${top}px` }}>
                <input type={type} name={name} value={value} style={{ fontFamily: font, fontSize: `${fontSize}px`, fontWeight: weight, color: color, lineHeight: 1, width: `${width}px`, height: `${height}px`, border: 0, backgroundColor: "transparent" }} />
            </div>
        );
    }
}
