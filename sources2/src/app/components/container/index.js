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
        left: PropTypes.number.isRequired, // 横坐标
        top: PropTypes.number.isRequired // 纵坐标
    }

    static defaultProps = {
        background: null
    }

    render() {
        let background = null;
        if (this.props.background !== null) {
            background = <img className={style.background} src={this.props.background} alt="" />
        }

        const { left, top } = this.getRelativePosition(this.props.left, this.props.top);

        return (
            <div className={style.container} style={{ left: `${left}px`, top: `${top}px` }}>
                {background}
                <div className={style.content}>
                    {this.props.children}
                </div>
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
        return { left: left - this.props.left, top: top - this.props.top };
    }
}
