import React from 'react';
import PropTypes from 'prop-types';
import { Circle } from '~/app/components/rc-progress';
import BaseComponent from '~/components/baseComponent';
import style from "./index.scss";

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
        color: PropTypes.string,
        text1: PropTypes.any,
        text1Top: PropTypes.number,
        text2: PropTypes.any,
        text2Top: PropTypes.number,
        onRenderContent: PropTypes.func
    }

    static defaultProps = {
        width: 0,
        value: 0,
        color: '#D3D3D3',
        text1: null,
        text1Top: 50,
        text2: null,
        text2Top: 100,
        onRenderContent: null
    }

    render() {
        const content = this.props.onRenderContent ? this.props.onRenderContent() : <div />;

        return (
            <div className={style.container}>
                <div className={style.content}>
                    <Circle
                        strokeWidth="10"
                        strokeColor={this.props.color}
                        trailWidth="10"
                        trailColor="#4A6284"
                        percent={this.props.value}
                        width={this.props.width}
                    />
                </div>
                <div className={style.text1_box} style={{ top: this.props.text1Top }}>
                    <span className={style.text1}>{this.props.text1}</span>
                </div>
                <div className={style.text2_box} style={{ top: this.props.text2Top }}>
                    <span className={style.text2}>{this.props.text2}</span>
                </div>
                <div className={style.user_content}>
                    {content}
                </div>
            </div>
        );
    }
}
