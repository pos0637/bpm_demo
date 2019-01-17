import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '~/components/baseComponent';
import style from './index.scss';

/**
 * 主框架
 *
 * @export
 * @class MainFrame
 * @extends {BaseComponent}
 */
export default class Framework extends BaseComponent {
    static contextTypes = {
        router: PropTypes.object // 路由
    }

    static propTypes = {
        logout: PropTypes.bool, // 是否允许注销
        back: PropTypes.bool // 是否允许返回
    }

    static defaultProps = {
        logout: false,
        back: false
    }

    _render() {
        return (
            <div>
                <img className={style.background} src={require("./images/bg.png")} alt="" />
                <div className={style.content}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
