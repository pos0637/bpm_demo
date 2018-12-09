import React from 'react';
import PropTypes from 'prop-types';
import { Line } from '~/app/components/rc-progress';
import BaseComponent from '~/components/baseComponent';

/**
 * 进度条组件
 *
 * @export
 * @class Progress
 * @extends {BaseComponent}
 */
export default class Progress extends BaseComponent {
    static propTypes = {
        left: PropTypes.number.isRequired, // 横坐标
        top: PropTypes.number.isRequired, // 纵坐标
        width: PropTypes.number, // 宽度
        height: PropTypes.number, // 高度
        value: PropTypes.number, // 值
        color: PropTypes.any // 颜色
    }

    static defaultProps = {
        width: 100,
        height: 20,
        value: 0,
        color: '#D3D3D3'
    }

    render() {
        const { left, top } = this.getRelativePosition(this.props.left, this.props.top);

        return (
            <div style={{ position: 'absolute', left: `${left}px`, top: `${top}px` }}>
                <Line
                    strokeWidth="4"
                    strokeColor={this.props.color}
                    trailWidth="4"
                    trailColor="#4A6284"
                    percent={this.props.value}
                    width={this.props.width}
                    height={this.props.height}
                />
            </div>
        );
    }
}
