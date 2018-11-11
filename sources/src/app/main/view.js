import React from 'react';
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
import style from "./index.scss";

/**
 * 视图
 *
 * @export
 * @class View
 * @extends {BaseComponent}
 */
export default class View extends BaseComponent {
    render() {
        return (
            <div className={style.container}>
                <div className={style.background}>
                    <img className={style.background_image} src={require("./images/background.png")} alt="" />
                </div>
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
            </div>
        );
    }
}
