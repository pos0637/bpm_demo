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
        color: PropTypes.any, // 颜色
        placeholder: PropTypes.string, // 提示内容
        onFocus: PropTypes.func // 焦点选中事件处理函数
    }

    static defaultProps = {
        type: 'text',
        name: '',
        value: null,
        font: 'SourceHanSansSC-Normal',
        fontSize: 42,
        weight: 'normal',
        color: 'rgb(137, 149, 165)',
        placeholder: null,
        onFocus: null
    }

    state = {
        value: this.props.value
    }

    /**
     * 获取内容
     *
     * @returns 内容
     * @memberof Input
     */
    getValue() {
        return this.state.value;
    }

    /**
     * 添加内容
     *
     * @param {*} content
     * @memberof Input
     */
    onAppend(content) {
        let value = this.state.value;
        if (value === null) {
            value = '';
        }

        this.setState({
            value: value + content
        });
    }

    /**
     * 删除内容
     */
    onDelete() {
        let value = this.state.value;
        if (value === null) {
            value = '';
        }

        this.setState({
            value: this.state.value.substring(0, this.state.value.length - 1)
        });
    }

    _render() {
        const { left, top } = this.getRelativePosition(this.props.left, this.props.top);
        const { width, height, type, name, font, fontSize, weight, color } = this.props;

        return (
            <div style={{ position: 'absolute', left: `${left}px`, top: `${top}px` }}>
                <input type={type} name={name} value={this.state.value} style={{ fontFamily: font, fontSize: `${fontSize}px`, fontWeight: weight, color: color, lineHeight: 1, width: `${width}px`, height: `${height}px`, border: 0, backgroundColor: "transparent" }} placeholder={this.props.placeholder} onFocus={() => this.props.onFocus && this.props.onFocus(this)} />
            </div>
        );
    }
}
