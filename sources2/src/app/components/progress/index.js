import React from 'react';
import PropTypes from 'prop-types';
import { Circle } from '~/app/components/rc-progress';
import Container from '~/app/components/container';

/**
 * 进度条组件
 *
 * @export
 * @class CircleProgress
 * @extends {Container}
 */
export default class CircleProgress extends Container {
    static propTypes = {
        left: PropTypes.number.isRequired, // 横坐标
        top: PropTypes.number.isRequired, // 纵坐标
        width: PropTypes.number, // 宽度
        value: PropTypes.number, // 值
        color: PropTypes.any, // 颜色
        colorStart: PropTypes.any, // 渐进色
        colorEnd: PropTypes.any, // 渐进色
        trailColor: PropTypes.any // 背景色
    }

    static defaultProps = {
        width: 0,
        value: 0,
        trailColor: '#4A6284'
    }

    render() {
        const { left, top } = this.getRelativePosition(this.props.left, this.props.top);
        const { width, color, colorStart, colorEnd, trailColor } = this.props;

        return (
            <div style={{ position: 'absolute', left: `${left}px`, top: `${top}px`, width: `${width}px`, height: `${width}px` }}>
                <Circle
                    strokeWidth="10"
                    strokeColor={color}
                    strokeColorStart={colorStart}
                    strokeColorEnd={colorEnd}
                    trailWidth="10"
                    trailColor={trailColor}
                    percent={this.props.value}
                    width={this.props.width}
                />
                <div style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
