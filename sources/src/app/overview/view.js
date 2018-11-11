import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '~/components/baseComponent';
import RunningInformation from './runningInformation';
import RunningState from './runningState';
import RunningTime from './runningTime';
import SecuritySystemState from './securitySystemState';
import Introduction from './introduction';
import ChargingPower from './chargingPower';
import DischargingPower from './dischargingPower';
import UsingPower from './usingPower';
import ElectricityBills from './electricityBills';
import ChargingDischargingData from './chargingDischargingData';
import FirstStagePower from './firstStagePower';
import SecondStagePower from './secondStagePower';
import LoginForm from './loginForm';
import style from "./index.scss";

/**
 * 视图
 *
 * @export
 * @class View
 * @extends {BaseComponent}
 */
export default class View extends BaseComponent {
    static contextTypes = {
        router: PropTypes.object // 路由
    }

    state = {
        showLoginForm: false // 显示登录窗口
    }

    render() {
        return (
            <div className={style.container}>
                <div className={style.background}>
                    <img className={style.background_image} src={require("./images/background.png")} alt="" />
                </div>
                <div className={style.login_button}>
                    <input type="button" className={style.login_button_image} onClick={() => this._onLoginButtonClick()} />
                </div>
                {this.state.showLoginForm ? <div className={style.login_form}><LoginForm onLogin={() => this._onLogin()} /></div> : <div />}
                <div className={style.running_information}>
                    <RunningInformation information={1} />
                </div>
                <div className={style.running_state}>
                    <RunningState state={1} />
                </div>
                <div className={style.running_time}>
                    <RunningTime time={1} />
                </div>
                <div className={style.security_system_state}>
                    <SecuritySystemState state={0} />
                </div>
                <div className={style.introduction}>
                    <Introduction />
                </div>
                <div className={style.chargingPower}>
                    <ChargingPower value={123} />
                </div>
                <div className={style.dischargingPower}>
                    <DischargingPower value={123} />
                </div>
                <div className={style.usingPower}>
                    <UsingPower value={123} />
                </div>
                <div className={style.electricityBills}>
                    <ElectricityBills value={123} />
                </div>
                <div className={style.chargingDischargingData}>
                    <ChargingDischargingData value={65} />
                </div>
                <div className={style.firstStagePower}>
                    <FirstStagePower value={300} />
                </div>
                <div className={style.secondStagePower}>
                    <SecondStagePower value={300} />
                </div>
            </div>
        );
    }

    /**
     * 登录按钮点击事件处理函数
     *
     * @memberof View
     */
    _onLoginButtonClick() {
        this.setState({ showLoginForm: true });
    }

    /**
     * 登录事件处理函数
     *
     * @memberof View
     */
    _onLogin() {
        this.setState({ showLoginForm: false });
        this.context.router.history.replace('/main');
    }
}
