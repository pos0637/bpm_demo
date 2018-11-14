import React from 'react';
import { getRandom } from '~/misc/random';
import BaseComponent from '~/components/baseComponent';
import LineChart from '~/app/components/lineChart';
import style from "./index.scss";

/**
 * 负载概览视图
 *
 * @export
 * @class LoadView
 * @extends {BaseComponent}
 */
export default class LoadView extends BaseComponent {
    state = {
        state: 0, // 待机
        chargingElectricity: 36000,
        dischargingElectricity: 24006,
        voltage1: 220,
        voltage2: 220,
        voltage3: 220,
        current1: 50,
        current2: 50,
        current3: 50,
        value1: 0.9,
        value2: 0.9,
        power1: 300,
        power1Data: [],
        power2: 300,
        power2Data: []
    }

    componentDidMount() {
        super.componentDidMount();
        this.timer = setInterval(() => {
            this.setState({
                state: getRandom(0, 1),
                chargingElectricity: getRandom(0, 3900),
                dischargingElectricity: getRandom(0, 2400),
                voltage1: getRandom(180, 220),
                voltage2: getRandom(180, 220),
                voltage3: getRandom(180, 220),
                current1: getRandom(180, 220),
                current2: getRandom(180, 220),
                current3: getRandom(180, 220),
                value1: 0.9,
                value2: 0.9,
                power1: getRandom(180, 220),
                power1Data: [],
                power2: getRandom(180, 220),
                power2Data: []
            });
        }, 2000);
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
        super.componentWillUnmount();
    }

    render() {
        let state1;
        if (this.state.state === 1)
            state1 = <img src={require("./images/charging.png")} alt="" />;
        else if (this.state.state === 2)
            state1 = <img src={require("./images/discharging.png")} alt="" />;
        else
            state1 = <img src={require("./images/standby.png")} alt="" />;

        return (
            <div className={style.container}>
                <div className={style.background1}>
                    <img src={require("./images/background1.png")} alt="" />
                </div>
                <div className={style.content_logo1}>
                    <img src={require("./images/gra_dianwang.png")} alt="" />
                </div>
                <span className={style.content_title1}>
                    电网&amp;负载
                </span>
                <div className={style.background2}>
                    <img src={require("./images/background2.png")} alt="" />
                </div>
                <span className={style.content_title2}>
                    电站运行状态
                </span>
                <div className={style.content_state1}>
                    {state1}
                </div>
                <div className={style.background3}>
                    <img src={require("./images/background3.png")} alt="" />
                </div>
                <span className={style.content_title3}>
                    总充电电量
                </span>
                <span className={style.content_value3}>
                    {this.state.chargingElectricity}
                </span>
                <span className={style.content_value3_unit}>
                    kWh
                </span>
                <div className={style.background4}>
                    <img src={require("./images/background3.png")} alt="" />
                </div>
                <span className={style.content_title4}>
                    总放电电量
                </span>
                <span className={style.content_value4}>
                    {this.state.dischargingElectricity}
                </span>
                <span className={style.content_value4_unit}>
                    kWh
                </span>
                <div className={style.background5}>
                    <img src={require("./images/background4.png")} alt="" />
                </div>
                <span className={style.content_value5_title}>
                    A相电网
                </span>
                <span className={style.content_value5_title1}>
                    电网电压
                </span>
                <span className={style.content_value5_voltage}>
                    {this.state.voltage1}V
                </span>
                <span className={style.content_value5_title2}>
                    电网电流
                </span>
                <span className={style.content_value5_current}>
                    {this.state.current1}A
                </span>
                <span className={style.content_value6_title}>
                    B相电网
                </span>
                <span className={style.content_value6_title1}>
                    电网电压
                </span>
                <span className={style.content_value6_voltage}>
                    {this.state.voltage2}V
                </span>
                <span className={style.content_value6_title2}>
                    电网电流
                </span>
                <span className={style.content_value6_current}>
                    {this.state.current2}A
                </span>
                <span className={style.content_value7_title}>
                    C相电网
                </span>
                <span className={style.content_value7_title1}>
                    电网电压
                </span>
                <span className={style.content_value7_voltage}>
                    {this.state.voltage3}V
                </span>
                <span className={style.content_value7_title2}>
                    电网电流
                </span>
                <span className={style.content_value7_current}>
                    {this.state.current3}A
                </span>
                <div className={style.background6}>
                    <img src={require("./images/background5.png")} alt="" />
                </div>
                <span className={style.content_value8_title}>
                    I段母线功率因数
                </span>
                <span className={style.content_value8}>
                    {this.state.value1}
                </span>
                <span className={style.content_value9_title}>
                    II段母线功率因数
                </span>
                <span className={style.content_value9}>
                    {this.state.value2}
                </span>
                <div className={style.background7}>
                    <img src={require("./images/background6.png")} alt="" />
                </div>
                <span className={style.content_value10_title}>
                    I段负载实时功率
                </span>
                <span className={style.content_value10}>
                    {this.state.power1}W
                </span>
                <div className={style.content_power1Data}>
                    <LineChart min={this.state.power1 - 50} max={this.state.power1 + 50} color="rgba(68,175,244,0.8)" />
                </div>
                <div className={style.background8}>
                    <img src={require("./images/background6.png")} alt="" />
                </div>
                <span className={style.content_value11_title}>
                    II段负载实时功率
                </span>
                <span className={style.content_value11}>
                    {this.state.power2}W
                </span>
                <div className={style.content_power2Data}>
                    <LineChart min={this.state.power2 - 50} max={this.state.power2 + 50} color="rgba(68,175,244,0.8)" />
                </div>
            </div>
        );
    }
}
