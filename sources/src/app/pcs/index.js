import React from 'react';
import { getRandom } from '~/misc/random';
import BaseComponent from '~/components/baseComponent';
import LineChart from '~/app/components/lineChart';
import style from "./index.scss";

/**
 * PCS概览视图
 *
 * @export
 * @class PcsView
 * @extends {BaseComponent}
 */
export default class PcsView extends BaseComponent {
    state = {
        information1: 0,
        information2: 0,
        state1: 0, // 运行状态
        state2: 0, // 运行状态
        chargingElectricity1: 36000,
        chargingElectricity2: 36000,
        dischargingElectricity1: 24006,
        dischargingElectricity2: 24006,
        chargingPower1: 300,
        chargingPower1Data: [],
        chargingPower2: 300,
        chargingPower2Data: [],
        dischargingPower1: 300,
        dischargingPower1Data: [],
        dischargingPower2: 300,
        dischargingPower2Data: []
    }

    componentDidMount() {
        super.componentDidMount();
        this.timer = setInterval(() => {
            this.setState({
                information1: getRandom(0, 2),
                information2: getRandom(0, 2),
                state1: getRandom(0, 1),
                state2: getRandom(0, 1),
                chargingElectricity1: getRandom(0, 3600),
                chargingElectricity2: getRandom(0, 3600),
                dischargingElectricity1: getRandom(0, 3600),
                dischargingElectricity2: getRandom(0, 3600),
                chargingPower1: getRandom(180, 300),
                chargingPower1Data: [],
                chargingPower2: getRandom(180, 300),
                chargingPower2Data: [],
                dischargingPower1: getRandom(180, 300),
                dischargingPower1Data: [],
                dischargingPower2: getRandom(180, 300),
                dischargingPower2Data: []
            });
        }, 2000);
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
        super.componentWillUnmount();
    }

    render() {
        let information11;
        let information12;
        let information13;
        if (this.state.information1 === 1) {
            information11 = <img src={require("./images/normal2.png")} alt="" />;
            information12 = <img src={require("./images/alarm1.png")} alt="" />;
            information13 = <img src={require("./images/fault2.png")} alt="" />;
        }
        else if (this.state.information1 === 2) {
            information11 = <img src={require("./images/normal2.png")} alt="" />;
            information12 = <img src={require("./images/alarm2.png")} alt="" />;
            information13 = <img src={require("./images/fault1.png")} alt="" />;
        }
        else {
            information11 = <img src={require("./images/normal1.png")} alt="" />;
            information12 = <img src={require("./images/alarm2.png")} alt="" />;
            information13 = <img src={require("./images/fault2.png")} alt="" />;
        }

        let information21;
        let information22;
        let information23;
        if (this.state.information2 === 1) {
            information21 = <img src={require("./images/normal2.png")} alt="" />;
            information22 = <img src={require("./images/alarm1.png")} alt="" />;
            information23 = <img src={require("./images/fault2.png")} alt="" />;
        }
        else if (this.state.information2 === 2) {
            information21 = <img src={require("./images/normal2.png")} alt="" />;
            information22 = <img src={require("./images/alarm2.png")} alt="" />;
            information23 = <img src={require("./images/fault1.png")} alt="" />;
        }
        else {
            information21 = <img src={require("./images/normal1.png")} alt="" />;
            information22 = <img src={require("./images/alarm2.png")} alt="" />;
            information23 = <img src={require("./images/fault2.png")} alt="" />;
        }

        let state1;
        if (this.state.state1 === 1)
            state1 = <img src={require("./images/charging.png")} alt="" />;
        else if (this.state.state === 2)
            state1 = <img src={require("./images/discharging.png")} alt="" />;
        else
            state1 = <img src={require("./images/standby.png")} alt="" />;

        let state2;
        if (this.state.state2 === 1)
            state2 = <img src={require("./images/charging.png")} alt="" />;
        else if (this.state.state === 2)
            state2 = <img src={require("./images/discharging.png")} alt="" />;
        else
            state2 = <img src={require("./images/standby.png")} alt="" />;

        return (
            <div className={style.container}>
                <div className={style.background1}>
                    <img src={require("./images/background1.png")} alt="" />
                </div>
                <div className={style.content_logo1}>
                    <img src={require("./images/gra_pcs.png")} alt="" />
                </div>
                <span className={style.content_title1}>
                    PCS 1
                </span>
                <div className={style.background2}>
                    <img src={require("./images/background1.png")} alt="" />
                </div>
                <div className={style.content_logo2}>
                    <img src={require("./images/gra_pcs.png")} alt="" />
                </div>
                <span className={style.content_title2}>
                    PCS 2
                </span>
                <div className={style.background3}>
                    <img src={require("./images/background2.png")} alt="" />
                </div>
                <span className={style.content_title3}>
                    电站运行状态
                </span>
                <div className={style.content_state1}>
                    {state1}
                </div>
                <div className={style.background4}>
                    <img src={require("./images/background2.png")} alt="" />
                </div>
                <span className={style.content_title4}>
                    电站运行状态
                </span>
                <div className={style.content_state2}>
                    {state2}
                </div>
                <div className={style.background5}>
                    <img src={require("./images/background3.png")} alt="" />
                </div>
                <span className={style.content_title5}>
                    总充电电量
                </span>
                <span className={style.content_value5}>
                    {this.state.chargingElectricity1}
                </span>
                <span className={style.content_value5_unit}>
                    kWh
                </span>
                <div className={style.background6}>
                    <img src={require("./images/background3.png")} alt="" />
                </div>
                <span className={style.content_title6}>
                    总放电电量
                </span>
                <span className={style.content_value6}>
                    {this.state.dischargingElectricity1}
                </span>
                <span className={style.content_value6_unit}>
                    kWh
                </span>
                <div className={style.background7}>
                    <img src={require("./images/background3.png")} alt="" />
                </div>
                <span className={style.content_title7}>
                    总充电电量
                </span>
                <span className={style.content_value7}>
                    {this.state.chargingElectricity2}
                </span>
                <span className={style.content_value7_unit}>
                    kWh
                </span>
                <div className={style.background8}>
                    <img src={require("./images/background3.png")} alt="" />
                </div>
                <span className={style.content_title8}>
                    总放电电量
                </span>
                <span className={style.content_value8}>
                    {this.state.dischargingElectricity2}
                </span>
                <span className={style.content_value8_unit}>
                    kWh
                </span>
                <div className={style.background9}>
                    <img src={require("./images/background3.png")} alt="" />
                </div>
                <span className={style.content_value9_title}>
                    充电实时功率
                </span>
                <span className={style.content_value9}>
                    {this.state.chargingPower1}W
                </span>
                <div className={style.content_power1Data}>
                    <LineChart min={this.state.chargingPower1 - 50} max={this.state.chargingPower1 + 50} color="rgba(68,175,244,0.8)" />
                </div>
                <div className={style.background10}>
                    <img src={require("./images/background3.png")} alt="" />
                </div>
                <span className={style.content_value10_title}>
                    放电实时功率
                </span>
                <span className={style.content_value10}>
                    {this.state.dischargingPower1}W
                </span>
                <div className={style.content_power2Data}>
                    <LineChart min={this.state.dischargingPower1 - 50} max={this.state.dischargingPower1 + 50} color="rgba(68,175,244,0.8)" />
                </div>
                <div className={style.background11}>
                    <img src={require("./images/background3.png")} alt="" />
                </div>
                <span className={style.content_value11_title}>
                    充电实时功率
                </span>
                <span className={style.content_value11}>
                    {this.state.chargingPower2}W
                </span>
                <div className={style.content_power3Data}>
                    <LineChart min={this.state.chargingPower2 - 50} max={this.state.chargingPower2 + 50} color="rgba(68,175,244,0.8)" />
                </div>
                <div className={style.background12}>
                    <img src={require("./images/background3.png")} alt="" />
                </div>
                <span className={style.content_value12_title}>
                    放电实时功率
                </span>
                <span className={style.content_value12}>
                    {this.state.dischargingPower2}W
                </span>
                <div className={style.content_power4Data}>
                    <LineChart min={this.state.dischargingPower2 - 50} max={this.state.dischargingPower2 + 50} color="rgba(68,175,244,0.8)" />
                </div>
                <div className={style.background13}>
                    <img src={require("./images/background4.png")} alt="" />
                </div>
                <div className={style.content_information11}>
                    {information11}
                </div>
                <div className={style.content_information12}>
                    {information12}
                </div>
                <div className={style.content_information13}>
                    {information13}
                </div>
                <div className={style.background14}>
                    <img src={require("./images/background4.png")} alt="" />
                </div>
                <div className={style.content_information21}>
                    {information21}
                </div>
                <div className={style.content_information22}>
                    {information22}
                </div>
                <div className={style.content_information23}>
                    {information23}
                </div>
            </div>
        );
    }
}
