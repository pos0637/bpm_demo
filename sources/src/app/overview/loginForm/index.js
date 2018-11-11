import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '~/components/baseComponent';
import style from "./index.scss";

/**
 * 登录窗口组件
 *
 * @export
 * @class LoginForm
 * @extends {BaseComponent}
 */
export default class LoginForm extends BaseComponent {
    static propTypes = {
        onLogin: PropTypes.func // 登录事件处理函数
    }

    static defaultProps = {
        onLogin: null
    }

    render() {
        return (
            <div className={style.contrainer}>
                <div className={style.background}>
                    <img className={style.background_image} src={require("./images/background.png")} alt="" />
                </div>
                <div className={style.username_icon}>
                    <img src={require("./images/icon_username.png")} alt="" />
                </div>
                <div className={style.username_input_box}>
                    <input type="text" name="username" className={style.username_input} />
                </div>
                <div className={style.username_line}>
                    <img src={require("./images/line.png")} alt="" />
                </div>
                <div className={style.password_icon}>
                    <img src={require("./images/icon_password.png")} alt="" />
                </div>
                <div className={style.password_input_box}>
                    <input type="password" name="password" className={style.password_input} />
                </div>
                <div className={style.password_line}>
                    <img src={require("./images/line.png")} alt="" />
                </div>
                <div className={style.login_button}>
                    <input type="button" className={style.login_button_image} onClick={() => this._onLoginButtonClick()} />
                </div>
                <div className={style.keyboard}>
                    <img src={require("./images/keyboard.png")} alt="" />
                </div>
            </div>
        );
    }

    /**
     * 登录按钮点击事件
     *
     * @memberof LoginForm
     */
    _onLoginButtonClick() {
        this.props.onLogin && this.props.onLogin();
    }
}
