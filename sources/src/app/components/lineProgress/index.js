import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'rc-progress';
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
        width: PropTypes.number,
        value: PropTypes.number,
        color: PropTypes.string
    }

    static defaultProps = {
        width: 0,
        value: 0,
        color: '#D3D3D3'
    }

    render() {
        return (
            <Line
                strokeWidth="4"
                strokeColor={this.props.color}
                trailWidth="4"
                trailColor="#4A6284"
                percent={this.props.value}
                width={this.props.width}
                height="20"
            />
        );
    }
}
