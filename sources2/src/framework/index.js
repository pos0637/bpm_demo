import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '~/components/baseComponent';
import style from './index.scss';
import Image from '~/app/components/image';

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

    render() {
        return (
            <div>
                <img className={style.background} src={require("./images/bg.png")} alt="" />
                <div className={style.content}>
                    {this.props.children}
                </div>
                {this.props.logout ? <Image left={3084} top={182} src={require("./images/back.png")} onClick={() => this._onLogoutButtonClick()} /> : null}
                {this.props.back ? <Image left={3084} top={182} src={require("./images/back.png")} onClick={() => this._onBackButtonClick()} /> : null}
            </div>
        );
    }

    /**
     * 注销按钮点击事件
     *
     * @memberof Framework
     */
    _onLogoutButtonClick() {
        this.context.router.history.replace('/');
    }

    /**
     * 返回按钮点击事件
     *
     * @memberof Framework
     */
    _onBackButtonClick() {
        this.context.router.history.replace('/overview');
    }
}
