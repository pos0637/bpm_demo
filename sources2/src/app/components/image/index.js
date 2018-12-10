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
        top: PropTypes.number.isRequired, // 纵坐标
        onClick: PropTypes.func // 点击事件处理函数
    }

    static defaultProps = {
        onClick: null
    }

    render() {
        const { left, top } = this.getRelativePosition(this.props.left, this.props.top);

        return (
            <div className={style.background} style={{ left: `${left}px`, top: `${top}px` }}>
                <img src={this.props.src} alt="" onClick={this.props.onClick} />
            </div>
        );
    }
}
