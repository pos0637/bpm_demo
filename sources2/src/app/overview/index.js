import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '~/components/baseComponent';

/**
 * 概览视图
 *
 * @export
 * @class Overview
 * @extends {BaseComponent}
 */
export default class Overview extends BaseComponent {
    static contextTypes = {
        router: PropTypes.object // 路由
    }

    state = {
        showLoginForm: false, // 显示登录窗口
    }

    componentDidMount() {
        super.componentDidMount();
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
        super.componentWillUnmount();
    }

    render() {
        return (
            <div>123</div>
        );
    }

    /**
     * 登录按钮点击事件处理函数
     *
     * @memberof Overview
     */
    _onLoginButtonClick() {
        this.setState({ showLoginForm: true });
    }

    /**
     * 登录事件处理函数
     *
     * @memberof Overview
     */
    _onLogin() {
        this.setState({ showLoginForm: false });
        this.context.router.history.replace('/main');
    }
}
