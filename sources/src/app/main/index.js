import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '~/components/baseComponent';
import PowerGridInformation from './powerGridInformation';
import SystemState from './systemState';
import style from "./index.scss";

/**
 * 概览视图
 *
 * @export
 * @class MainView
 * @extends {BaseComponent}
 */
export default class MainView extends BaseComponent {
    static contextTypes = {
        router: PropTypes.object // 路由
    }

    state = {
        showLoginForm: false // 显示登录窗口
    }

    render() {
        return (
            <div className={style.container}>
                <div className={style.powerGridInformation}>
                    <PowerGridInformation />
                </div>
                <div className={style.systemState}>
                    <SystemState />
                </div>
            </div>
        );
    }
}
