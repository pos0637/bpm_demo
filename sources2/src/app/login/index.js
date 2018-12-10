import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '~/components/baseComponent';
import Input from '~/app/components/input';
import Image from '~/app/components/image';
import Container from '~/app/components/container';

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

    render() {
        return (
            <Container width={3840} height={2160}>               
                <Container left={1128} top={551} background={require("./images/box1.png")}>                    
                    <Image left={1558} top={707} src={require("./images/icon1.png")} />
                    <Input left={1642} top={674} width={500} height={100} value="请输入用户账号"  />
                    <Image left={1564} top={858} src={require("./images/icon2.png")} />
                    <Input left={1642} top={822} width={500} height={100} type="password" value="请输入密码" />
                    <Image left={1447} top={1024} src={require("./images/login.png")} onClick={() => this._onLoginButtonClick()} />
                    <Image left={1474} top={1309} src={require("./images/keyboard.png")} />
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
        this.context.router.history.replace('/overview');
    }
}
