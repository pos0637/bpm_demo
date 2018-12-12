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
        startAngle: PropTypes.number, // 开始角度
        endAngle: PropTypes.number, // 结束角度
        backgroundColor: PropTypes.any, // 背景颜色
        progressColor: PropTypes.any, // 进度条颜色
        value: PropTypes.value, // 值
        content: PropTypes.string, // 内容
        font: PropTypes.string, // 字体
        fontSize: PropTypes.number, // 字体大小
        weight: PropTypes.string, // 粗细
        color: PropTypes.any // 颜色
    }

    static defaultProps = {
        startAngle: 270 - 45,
        endAngle: 270 + 45,
        backgroundColor: 'rgb(73, 98, 131)',
        progressColor: 'rgb(7, 229, 255)',
        value: null,
        content: null,
        font: 'SourceHanSansSC-Heavy',
        fontSize: 58,
        weight: 'normal',
        color: 'rgb(7, 229, 255)'
    }

    render() {
        const { left, top } = this.getRelativePosition(this.props.left, this.props.top);
        const { width, startAngle, endAngle, backgroundColor, progressColor, value, content, font, fontSize, weight, color } = this.props;
        const progressWidth = 20 * width / 300;
        const radius = (width / 2) - progressWidth;
        const centerX = radius + progressWidth;
        const centerY = radius + progressWidth;
        const progressAngle = startAngle - ((360 - (endAngle - startAngle)) * value / 100);
        const startPos1 = this._getPosition(centerX, centerY, radius, startAngle);
        const endPos1 = this._getPosition(centerX, centerY, radius, endAngle);
        const endPos2 = this._getPosition(centerX, centerY, radius, progressAngle);

        const background = `M ${startPos1.x} ${startPos1.y} A ${radius} ${radius} 0 ${360 - (endAngle - startAngle) >= 180 ? 1 : 0} 1  ${endPos1.x} ${endPos1.y}`;
        const progrss = `M ${startPos1.x} ${startPos1.y} A ${radius} ${radius} 0 ${startAngle - progressAngle >= 180 ? 1 : 0} 1  ${endPos2.x} ${endPos2.y}`;
        const indicator = `M ${centerX - 18 * width / 300} ${centerY} L ${centerX} ${centerY + 39 * width / 300} L ${centerX + 18 * width / 300} ${centerY} L ${centerX} ${centerY - 116 * width / 300} Z`;
        const textTop = startPos1.y;

        return (
            <div style={{ position: 'absolute', left: `${left}px`, top: `${top}px` }}>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width={width} height={width}>
                    <path d={background} fill="none" strokeWidth={progressWidth} strokeDasharray={`${40 * width / 300}px, 2px`} stroke={backgroundColor} />
                    <path d={progrss} fill="none" strokeWidth={progressWidth} strokeDasharray={`${40 * width / 300}px, 2px`} stroke={progressColor} />
                    <path d={indicator} fill={progressColor} transform={`rotate(${360 - progressAngle + 90}, ${centerX} ${centerY})`} />
                </svg>
                <span style={{ position: 'absolute', left: `0px`, top: `${textTop}px`, fontFamily: font, fontSize: `${fontSize}px`, fontWeight: weight, color: color, lineHeight: 1, textAlign: "center", width: `${width}px` }}>
                    {content}
                </span>
            </div>
        );
    }


    /**
     * 获取位置
     *
     * @param {*} centerX 圆心横坐标
     * @param {*} centerY 圆心纵坐标
     * @param {*} radius 半径
     * @param {*} angle 角度
     * @returns 位置
     * @memberof Gauge
     */
    _getPosition(centerX, centerY, radius, angle) {
        const theta = angle * Math.PI / 180.0;

        return {
            x: centerX + radius * Math.cos(theta),
            y: centerY - radius * Math.sin(theta)
        };
    }
}
