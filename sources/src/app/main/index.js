import React from 'react';
import BaseComponent from '~/components/baseComponent';
import { getRandom } from '~/misc/random';
import { getMainData } from '~/api/v1/board';
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
        showLoginForm: false, // 显示登录窗口

        line1Voltage: getRandom(0, 220),
        line1Electricity: getRandom(0, 220),
        line1Power: getRandom(0, 220),
        line2Voltage: getRandom(0, 220),
        line2Electricity: getRandom(0, 220),
        line2Power: getRandom(0, 220),
        loadPower: getRandom(0, 220),

        power1: getRandom(0, 220),
        voltage: getRandom(200, 220),
        current: getRandom(0, 220),
        voltage2: getRandom(0, 220),
        charging: getRandom(0, 220),
        discharging: getRandom(0, 220),

        transformator1Temperature: getRandom(0, 220),
        transformator2Temperature: getRandom(0, 220),
        transformator1Fan: getRandom(0, 1),
        transformator2Fan: getRandom(0, 1),
        chargingElectricity: getRandom(0, 220),
        dischargingElectricity: getRandom(0, 220),
        power2: getRandom(0, 220),
        link1: getRandom(0, 220),
        link2: getRandom(0, 220),

        data1: getRandom(0, 100),
        data2: getRandom(0, 100),
        data3: getRandom(0, 100),
        power: getRandom(0, 220),

        securitySystemState: getRandom(0, 1),
        airConditionerState: getRandom(0, 1)
    }

    componentDidMount() {
        super.componentDidMount();
        this.timer = setInterval(() => {
            const data = {
                line1Voltage: getRandom(0, 220),
                line1Electricity: getRandom(0, 220),
                line1Power: getRandom(0, 220),
                line2Voltage: getRandom(0, 220),
                line2Electricity: getRandom(0, 220),
                line2Power: getRandom(0, 220),
                loadPower: getRandom(0, 220),

                power1: getRandom(0, 220),
                voltage: getRandom(200, 220),
                current: getRandom(0, 220),
                voltage2: getRandom(0, 220),
                charging: getRandom(0, 220),
                discharging: getRandom(0, 220),

                transformator1Temperature: getRandom(0, 220),
                transformator2Temperature: getRandom(0, 220),
                transformator1Fan: getRandom(0, 1),
                transformator2Fan: getRandom(0, 1),
                chargingElectricity: getRandom(0, 220),
                dischargingElectricity: getRandom(0, 220),
                power2: getRandom(0, 220),
                link1: getRandom(0, 1),
                link2: getRandom(0, 1),

                data1: getRandom(0, 100),
                data2: getRandom(0, 100),
                data3: getRandom(0, 100),
                power: getRandom(0, 220),

                securitySystemState: getRandom(0, 1),
                airConditionerState: getRandom(0, 1)
            };

            getMainData((main) => {
                data.chargingElectricity = main.gridConnectedCabinetChargingElectricity;
                data.dischargingElectricity = main.gridConnectedCabinetDischargingElectricity;
                data.power2 = main.gridConnectedCabinetPower;
                data.link1 = main.switch1;
                data.link2 = main.switch2;
                data.power1 = main.pcsPower;
                data.voltage = main.pcsVoltage1;
                data.current = main.pcsCurrent;
                data.voltage2 = main.pcsVoltage2;
                data.charging = main.pcsChargingElectricity;
                data.discharging = main.pcsDischargingElectricity;
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
                <div className={style.powerGridInformation}>
                    <PowerGridInformation
                        line1Voltage={this.state.line1Voltage}
                        line1Electricity={this.state.line1Electricity}
                        line1Power={this.state.line1Power}
                        line1PowerData={this.state.line1PowerData}
                        line2Voltage={this.state.line2Voltage}
                        line2Electricity={this.state.line2Electricity}
                        line2Power={this.state.line2Power}
                        line2PowerData={this.state.line2PowerData}
                        loadPower={this.state.loadPower}
                        loadPowerData={this.state.loadPowerData}
                    />
                </div>
                <div className={style.systemState}>
                    <SystemState
                        securitySystemState={this.state.securitySystemState}
                        airConditionerState={this.state.airConditionerState}
                    />
                </div>
                <div className={style.transformatorOverview}>
                    <TransformatorOverview
                        transformator1Temperature={this.state.transformator1Temperature}
                        transformator2Temperature={this.state.transformator2Temperature}
                        transformator1Fan={this.state.transformator1Fan}
                        transformator2Fan={this.state.transformator2Fan}
                        chargingElectricity={this.state.chargingElectricity}
                        dischargingElectricity={this.state.dischargingElectricity}
                        power={this.state.power2}
                        link1={this.state.link1}
                        link2={this.state.link2}
                    />
                </div>
                <div className={style.pcsOverview}>
                    <PcsOverview
                        power={this.state.power1}
                        voltage={this.state.voltage}
                        current={this.state.current}
                        voltage2={this.state.voltage2}
                        charging={this.state.charging}
                        discharging={this.state.discharging}
                    />
                </div>
                <div className={style.bmsOverview}>
                    <BmsOverview
                        data1={this.state.data1}
                        data2={this.state.data2}
                        data3={this.state.data3}
                        power={this.state.power}
                    />
                </div>
                <div className={style.pcs_logo}>
                    <img src={require("./images/gra_pcs.png")} alt="" />
                </div>
                <div className={style.arrow1}>
                    <img src={require("./images/arrow3.png")} alt="" />
                </div>
                <div className={style.arrow2}>
                    <img src={require("./images/arrow1.png")} alt="" />
                </div>
                <div className={style.arrow3}>
                    <img src={require("./images/arrow2.png")} alt="" />
                </div>
                <div className={style.arrow4}>
                    <img src={require("./images/arrow1.png")} alt="" />
                </div>
            </div>
        );
    }
}
