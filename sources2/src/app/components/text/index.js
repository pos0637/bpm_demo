import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '~/components/baseComponent';
import { toFixed } from '~/misc/number';

/**
 * 文本
 *
 * @export
 * @class Text
 * @extends {BaseComponent}
 */
export default class Text extends BaseComponent {
    static propTypes = {
        value: PropTypes.any.isRequired, // 内容        
        left: PropTypes.number, // 横坐标
        top: PropTypes.number, // 纵坐标
        bottom: PropTypes.number, // 距底部距离
        width: PropTypes.number, // 宽度
        font: PropTypes.string, // 字体
        fontSize: PropTypes.number, // 字体大小
        weight: PropTypes.string, // 粗细
        color: PropTypes.any, // 颜色
        suffix: PropTypes.any, // 后缀
        suffixFont: PropTypes.string, // 后缀字体
        suffixFontSize: PropTypes.number, // 后缀字体大小
        suffixWeight: PropTypes.string, // 后缀粗细
        suffixColor: PropTypes.any, // 后缀颜色
        fixed: PropTypes.any, // 取值精度
        align: PropTypes.string // 对齐方式
    }

    static defaultProps = {
        left: null,
        top: null,
        bottom: null,
        font: 'SourceHanSansSC-Medium',
        fontSize: 48,
        weight: 'normal',
        color: 'rgb(255, 255, 255)',
        suffix: null,
        suffixFont: null,
        suffixFontSize: 0,
        suffixWeight: null,
        suffixColor: null,
        fixed: null,
        align: 'left'
    }

    render() {
        let { value } = this.props;
        const { font, fontSize, weight, color } = this.props;
        if (this.props.fixed !== null) {
            value = toFixed(value, this.props.fixed);
        }

        let suffixContent = null;
        if (this.props.suffix !== null) {
            let { suffixFont, suffixFontSize, suffixWeight, suffixColor } = this.props;
            suffixFont = suffixFont || font;
            suffixFontSize = suffixFontSize || fontSize;
            suffixWeight = suffixWeight || weight;
            suffixColor = suffixColor || color;

            suffixContent = (
                <span style={{ fontFamily: suffixFont, fontSize: `${suffixFontSize}px`, fontWeight: suffixWeight, color: suffixColor, lineHeight: 1 }}>{this.props.suffix}</span>
            );
        }

        const { left, top } = this.getRelativePosition(this.props.left, this.props.top);
        const { bottom } = this.props;

        return (
            <span style={{ position: 'absolute', left: `${left}px`, top: `${top}px`, bottom: `${bottom}px`, fontFamily: font, fontSize: `${fontSize}px`, fontWeight: weight, color: color, lineHeight: 1, textAlign: this.props.align, width: `${this.props.width}px` }}>
                {value}{suffixContent}
            </span>
        );
    }
}
