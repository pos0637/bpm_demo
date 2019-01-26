import React from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';
import BaseComponent from '~/components/baseComponent';
import Input from '~/app/components/input';
import Image from '~/app/components/image';
import Container from '~/app/components/container';
import Keyboard from '~/app/components/keyboard';

/**
 * 登录视图
 *
 * @export
 * @class Login
 * @extends {BaseComponent}
 */
export default class Login extends BaseComponent {
    static contextTypes = {
        router: PropTypes.object // 路由
    }

    InputUserName = null

    InputPassword = null

    currentInput = null

    _render() {
        return (
            <Container width={3840} height={2160}>
                {/* 
                <Image left={200} top={173} src={require("../../framework/images/logo.png")} />
                <Image left={902} top={184} src={require("../../framework/images/title.png")} />
                */}
                <Image left={3070} top={2026} src={require("../../framework/images/logo.png")} />
                <Image left={200} top={184} src={require("../../framework/images/title.png")} />
                <Image left={3084} top={182} src={require("../../framework/images/back.png")} onClick={() => this.context.router.history.replace('/overview')} />

                <Container left={1128} top={551} background={require("./images/box1.png")}>
                    <Image left={1558} top={707} src={require("./images/icon1.png")} />
                    <Input left={1642} top={674} width={500} height={100} placeholder="请输入用户账号" ref={(ref) => { this.InputUserName = ref; }} onFocus={(sender) => { this.currentInput = sender; }} />
                    <Image left={1564} top={858} src={require("./images/icon2.png")} />
                    <Input left={1642} top={822} width={500} height={100} type="password" placeholder="请输入密码" ref={(ref) => { this.InputPassword = ref; }} onFocus={(sender) => { this.currentInput = sender; }} />
                    <Image left={1447} top={1024} src={require("./images/login.png")} onClick={() => this._onLoginButtonClick()} />
                    <Keyboard left={1474} top={1309} onKeyPress={(keyCode) => this._onKeyPress(keyCode)} />
                </Container>
            </Container>
        );
    }

    /**
     * 登录按钮点击事件
     *
     * @memberof Login
     */
    _onLoginButtonClick() {
        const userName = this.InputUserName.getValue();
        const password = this.InputPassword.getValue();
        if ((userName === null) || (userName.length === 0)) {
            message.info('请输入用户名!');
            return;
        }
        else if ((password === null) || (password.length === 0)) {
            message.info('请输入密码!');
            return;
        }
        else if ((userName.toLowerCase() !== 'jinmao') || (password.toLowerCase() !== 'jmlj')) {
            message.info('密码错误!');
            return;
        }

        window.login = true;
        this.context.router.history.replace('/overview');
    }

    /**
     * 按键事件处理函数
     *
     * @param {*} keyCode 按键
     * @memberof Login
     */
    _onKeyPress(keyCode) {
        if (keyCode === 'delete') {
            this.currentInput && this.currentInput.onDelete();
        }
        else {
            this.currentInput && this.currentInput.onAppend(keyCode);
        }
    }
}
