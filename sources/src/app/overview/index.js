import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '~/components/baseComponent';
import { getRandomValue, getRandom } from '~/misc/random';
import { getOverviewData } from '~/api/v1/board';
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
        runningInformation: 0,
        runningState: 0,
        runningTime: 0,
        securitySystemState: 0,
        chargingPower: getRandom(50, 100),
        dischargingPower: getRandom(50, 100),
        usingPower: getRandom(50, 100),
        electricityBills: getRandom(50, 100),
        chargingDischargingData: getRandom(50, 100),
        firstStagePower: getRandom(50, 300),
        secondStagePower: getRandom(50, 300)
    }

    runningInformation = [0, 1]

    runningState = [0, 1, 2]

    runningTime = [10, 11, 12, 13, 14, 15, 16, 17]

    securitySystemState = [0, 1]

    componentDidMount() {
        super.componentDidMount();
        this.timer = setInterval(() => {
            const data = {
                runningInformation: getRandomValue(this.runningInformation),
                runningState: getRandomValue(this.runningState),
                runningTime: getRandomValue(this.runningTime),
                securitySystemState: getRandomValue(this.securitySystemState),
                chargingPower: getRandom(50, 100),
                dischargingPower: getRandom(50, 100),
                usingPower: getRandom(50, 100),
                electricityBills: getRandom(50, 100),
                chargingDischargingData: getRandom(50, 100),
                firstStagePower: getRandom(50, 300),
                secondStagePower: getRandom(50, 300)
            };

            getOverviewData((overview) => {
                data.chargingPower = overview.chargingElectricity;
                data.dischargingPower = overview.dischargingElectricity;
                data.usingPower = overview.usingElectricity;
                this.setState(data);
            }, () => {
                this.setState(data);
            });
        }, 2000);
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
        super.componentWillUnmount();
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
                    <RunningInformation information={this.state.runningInformation} />
                </div>
                <div className={style.running_state}>
                    <RunningState state={this.state.runningState} />
                </div>
                <div className={style.running_time}>
                    <RunningTime time={this.state.runningTime} />
                </div>
                <div className={style.security_system_state}>
                    <SecuritySystemState state={this.state.securitySystemState} />
                </div>
                <div className={style.introduction}>
                    <Introduction />
                </div>
                <div className={style.chargingPower}>
                    <ChargingPower value={this.state.chargingPower} />
                </div>
                <div className={style.dischargingPower}>
                    <DischargingPower value={this.state.dischargingPower} />
                </div>
                <div className={style.usingPower}>
                    <UsingPower value={this.state.usingPower} />
                </div>
                <div className={style.electricityBills}>
                    <ElectricityBills value={this.state.electricityBills} />
                </div>
                <div className={style.chargingDischargingData}>
                    <ChargingDischargingData value={this.state.chargingDischargingData} />
                </div>
                <div className={style.firstStagePower}>
                    <FirstStagePower value={this.state.firstStagePower} />
                </div>
                <div className={style.secondStagePower}>
                    <SecondStagePower value={this.state.secondStagePower} />
                </div>
            </div>
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
