import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '~/components/baseComponent';
import style from "./index.scss";
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
        left: PropTypes.number.isRequired, // 横坐标
        top: PropTypes.number.isRequired, // 纵坐标
        font: PropTypes.string, // 字体
        fontSize: PropTypes.number, // 字体大小
        weight: PropTypes.string, // 粗细
        color: PropTypes.any, // 颜色
        suffix: PropTypes.any, // 后缀
        suffixFont: PropTypes.string, // 后缀字体
        suffixFontSize: PropTypes.number, // 后缀字体大小
        suffixWeight: PropTypes.string, // 后缀粗细
        suffixColor: PropTypes.any, // 后缀颜色
        fixed: PropTypes.any // 取值精度
    }

    static defaultProps = {
        font: 'SourceHanSansSC-Medium',
        fontSize: 48,
        weight: 'normal',
        color: 'rgb(255, 255, 255)',
        suffix: null,
        suffixFont: 'SourceHanSansSC-Medium',
        suffixFontSize: 48,
        suffixWeight: 'normal',
        suffixColor: 'rgb(255, 255, 255)',
        fixed: null
    }

    render() {
        let { value } = this.props;
        if (this.props.fixed !== null) {
            value = toFixed(value, this.props.fixed);
        }

        let suffixContent = null;
        if (this.props.suffix !== null) {
            suffixContent = (
                <span style={{ font: this.props.suffixFont, fontSize: `${this.props.suffixFontSize}px`, fontWeight: this.props.suffixWeight, color: this.props.suffixColor }}>{this.props.suffix}</span>
            );
        }

        return (
            <span className={style.content} style={{ left: `${this.props.left}px`, top: `${this.props.top}px`, font: this.props.font, fontSize: `${this.props.fontSize}px`, fontWeight: this.props.weight, color: this.props.color }}>
                {value}{suffixContent}
            </span>
        );
    }
}
