import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '~/components/baseComponent';
import style from "./index.scss";

/**
 * 图像开关
 *
 * @export
 * @class Switch2
 * @extends {BaseComponent}
 */
export default class Switch2 extends BaseComponent {
    static propTypes = {
        src: PropTypes.any.isRequired, // 图片数组
        left: PropTypes.number.isRequired, // 横坐标
        top: PropTypes.number.isRequired, // 纵坐标
        value: PropTypes.number.isRequired // 值
    }

    _render() {
        const { left, top } = this.getRelativePosition(this.props.left, this.props.top);
        const src = this.props.src[this.props.value];

        return (
            <div className={style.background} style={{ left: `${left}px`, top: `${top}px` }}>
                <img src={src} alt="" />
            </div>
        );
    }
}
