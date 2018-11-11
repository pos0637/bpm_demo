import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '~/components/baseComponent';
import { getRandomValue, getRandom } from '~/misc/random';
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

        // power: PropTypes.number,
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
        // power: PropTypes.number,
        link1: getRandom(0, 220),
        link2: getRandom(0, 220),

        data1: getRandom(0, 220),
        data2: getRandom(0, 220),
        data3: getRandom(0, 220),
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

                // power: PropTypes.number,
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
                // power: PropTypes.number,
                link1: getRandom(0, 1),
                link2: getRandom(0, 1),

                data1: getRandom(0, 220),
                data2: getRandom(0, 220),
                data3: getRandom(0, 220),
                power: getRandom(0, 220),

                securitySystemState: getRandom(0, 1),
                airConditionerState: getRandom(0, 1)
            };

            this.setState(data);
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
                        link1={this.state.link1}
                        link2={this.state.link2}
                    />
                </div>
                <div className={style.pcsOverview}>
                    <PcsOverview
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
            </div>
        );
    }
}
