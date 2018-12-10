import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '~/components/baseComponent';
import style from "./index.scss";

/**
 * 容器
 *
 * @export
 * @class Container
 * @extends {BaseComponent}
 */
export default class Container extends BaseComponent {
    static propTypes = {
        background: PropTypes.any, // 图片
        left: PropTypes.number, // 横坐标
        top: PropTypes.number, // 纵坐标
        width: PropTypes.number, // 宽度
        height: PropTypes.number, // 高度
        onClick: PropTypes.func // 点击事件处理函数
    }

    static defaultProps = {
        background: null,
        left: null,
        top: null,
        width: null,
        height: null,
        onClick: null
    }

    render() {
        let background = null;
        if (this.props.background !== null) {
            background = <img className={style.background} src={this.props.background} alt="" />
        }

        const { left, top } = this.getRelativePosition(this.props.left, this.props.top);
        const { width, height, onClick } = this.props;

        return (
            <div className={style.container} style={{ left: `${left}px`, top: `${top}px`, width: `${width}px`, height: `${height}px` }}>
                {background}
                <div className={style.content}>
                    {this.props.children}
                </div>
                {onClick ? <div className={style.content} onClick={onClick} /> : null}
            </div>
        );
    }

    /**
     * 计算相对位置
     *
     * @param {*} left 横坐标
     * @param {*} top 纵坐标
     * @returns 相对位置
     * @memberof Container
     */
    calcRelativePosition(left, top) {
        return { left: left - this.props.left || 0, top: top - this.props.top || 0 };
    }
}
