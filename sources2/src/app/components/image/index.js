import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '~/components/baseComponent';
import style from "./index.scss";

/**
 * 图像
 *
 * @export
 * @class Image
 * @extends {BaseComponent}
 */
export default class Image extends BaseComponent {
    static propTypes = {
        src: PropTypes.any.isRequired, // 图片
        left: PropTypes.number.isRequired, // 横坐标
        top: PropTypes.number.isRequired // 纵坐标
    }

    render() {
        return (
            <div className={style.background} style={{ left: `${this.props.left}px`, top: `${this.props.top}px` }}>
                <img src={this.props.src} alt="" />
            </div>
        );
    }
}
