import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '~/components/baseComponent';
import PowerGridInformation from './powerGridInformation';
import SystemState from './systemState';
import TransformatorOverview from './transformatorOverview';
import PcsOverview from './pcsOverview';
import BmsOverview from './bmsOverview';
import style from "./index.scss";

/**
 * 概览视图
 *
 * @export
 * @class MainView
 * @extends {BaseComponent}
 */
export default class MainView extends BaseComponent {
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
                <div className={style.transformatorOverview}>
                    <TransformatorOverview />
                </div>
                <div className={style.pcsOverview}>
                    <PcsOverview />
                </div>
                <div className={style.bmsOverview}>
                    <BmsOverview />
                </div>
                <div className={style.pcs_logo}>
                    <img src={require("./images/gra_pcs.png")} alt="" />
                </div>
            </div>
        );
    }
}
