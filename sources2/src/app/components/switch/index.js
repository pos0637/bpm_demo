import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '~/components/baseComponent';
import style from "./index.scss";

/**
 * 图像开关
 *
 * @export
 * @class Switch
 * @extends {BaseComponent}
 */
export default class Switch extends BaseComponent {
    static propTypes = {
        src1: PropTypes.any.isRequired, // 图片1
        src2: PropTypes.any.isRequired, // 图片2
        left: PropTypes.number.isRequired, // 横坐标
        top: PropTypes.number.isRequired, // 纵坐标
        value: PropTypes.number.isRequired // 值
    }

    render() {
        const { left, top } = this.getRelativePosition(this.props.left, this.props.top);
        const src = this.props.value ? this.props.src1 : this.props.src2;

        return (
            <div className={style.background} style={{ left: `${left}px`, top: `${top}px` }}>
                <img src={src} alt="" />
            </div>
        );
    }
}
