import React from 'react';
import PropTypes from 'prop-types';
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
    static propTypes = {
        information1: PropTypes.number,
        information2: PropTypes.number,
        state1: PropTypes.number, // 运行状态
        state2: PropTypes.number, // 运行状态
        chargingElectricity1: PropTypes.number,
        chargingElectricity2: PropTypes.number,
        dischargingElectricity1: PropTypes.number,
        dischargingElectricity2: PropTypes.number,
        chargingPower1: PropTypes.number,
        chargingPower1Data: PropTypes.array,
        chargingPower2: PropTypes.number,
        chargingPower2Data: PropTypes.array,
        dischargingPower1: PropTypes.number,
        dischargingPower1Data: PropTypes.array,
        dischargingPower2: PropTypes.number,
        dischargingPower2Data: PropTypes.array
    }

    static defaultProps = {
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
        if (this.props.information1 === 1) {
            information11 = <img className={style.background_image} src={require("./images/normal2.png")} alt="" />;
            information12 = <img className={style.background_image} src={require("./images/alarm1.png")} alt="" />;
            information13 = <img className={style.background_image} src={require("./images/fault2.png")} alt="" />;
        }
        else if (this.props.information1 === 2) {
            information11 = <img className={style.background_image} src={require("./images/normal2.png")} alt="" />;
            information12 = <img className={style.background_image} src={require("./images/alarm2.png")} alt="" />;
            information13 = <img className={style.background_image} src={require("./images/fault1.png")} alt="" />;
        }
        else {
            information11 = <img className={style.background_image} src={require("./images/normal1.png")} alt="" />;
            information12 = <img className={style.background_image} src={require("./images/alarm2.png")} alt="" />;
            information13 = <img className={style.background_image} src={require("./images/fault2.png")} alt="" />;
        }

        let information21;
        let information22;
        let information23;
        if (this.props.information2 === 1) {
            information21 = <img className={style.background_image} src={require("./images/normal2.png")} alt="" />;
            information22 = <img className={style.background_image} src={require("./images/alarm1.png")} alt="" />;
            information23 = <img className={style.background_image} src={require("./images/fault2.png")} alt="" />;
        }
        else if (this.props.information2 === 2) {
            information21 = <img className={style.background_image} src={require("./images/normal2.png")} alt="" />;
            information22 = <img className={style.background_image} src={require("./images/alarm2.png")} alt="" />;
            information23 = <img className={style.background_image} src={require("./images/fault1.png")} alt="" />;
        }
        else {
            information21 = <img className={style.background_image} src={require("./images/normal1.png")} alt="" />;
            information22 = <img className={style.background_image} src={require("./images/alarm2.png")} alt="" />;
            information23 = <img className={style.background_image} src={require("./images/fault2.png")} alt="" />;
        }

        let state1;
        if (this.props.state1 === 1)
            state1 = <img className={style.background_image} src={require("./images/charging.png")} alt="" />;
        else if (this.props.state === 2)
            state1 = <img className={style.background_image} src={require("./images/discharging.png")} alt="" />;
        else
            state1 = <img className={style.background_image} src={require("./images/standby.png")} alt="" />;

        let state2;
        if (this.props.state2 === 1)
            state2 = <img className={style.background_image} src={require("./images/charging.png")} alt="" />;
        else if (this.props.state === 2)
            state2 = <img className={style.background_image} src={require("./images/discharging.png")} alt="" />;
        else
            state2 = <img className={style.background_image} src={require("./images/standby.png")} alt="" />;

        return (
            <div className={style.container}>
                <div className={style.background1}>
                    <img className={style.background_image} src={require("./images/background1.png")} alt="" />
                </div>
                <div className={style.content_logo1}>
                    <img className={style.background_image} src={require("./images/gra_pcs.png")} alt="" />
                </div>
                <span className={style.content_title1}>
                    PCS 1
                </span>
                <div className={style.background2}>
                    <img className={style.background_image} src={require("./images/background1.png")} alt="" />
                </div>
                <div className={style.content_logo2}>
                    <img className={style.background_image} src={require("./images/gra_pcs.png")} alt="" />
                </div>
                <span className={style.content_title2}>
                    PCS 2
                </span>
                <div className={style.background3}>
                    <img className={style.background_image} src={require("./images/background2.png")} alt="" />
                </div>
                <span className={style.content_title3}>
                    电站运行状态
                </span>
                <div className={style.content_state1}>
                    {state1}
                </div>
                <div className={style.background4}>
                    <img className={style.background_image} src={require("./images/background2.png")} alt="" />
                </div>
                <span className={style.content_title4}>
                    电站运行状态
                </span>
                <div className={style.content_state2}>
                    {state2}
                </div>
                <div className={style.background5}>
                    <img className={style.background_image} src={require("./images/background3.png")} alt="" />
                </div>
                <span className={style.content_title5}>
                    总充电电量
                </span>
                <span className={style.content_value5}>
                    {this.props.chargingElectricity1}
                </span>
                <span className={style.content_value5_unit}>
                    kWh
                </span>
                <div className={style.background6}>
                    <img className={style.background_image} src={require("./images/background3.png")} alt="" />
                </div>
                <span className={style.content_title6}>
                    总放电电量
                </span>
                <span className={style.content_value6}>
                    {this.props.dischargingElectricity1}
                </span>
                <span className={style.content_value6_unit}>
                    kWh
                </span>
                <div className={style.background7}>
                    <img className={style.background_image} src={require("./images/background3.png")} alt="" />
                </div>
                <span className={style.content_title7}>
                    总充电电量
                </span>
                <span className={style.content_value7}>
                    {this.props.chargingElectricity2}
                </span>
                <span className={style.content_value7_unit}>
                    kWh
                </span>
                <div className={style.background8}>
                    <img className={style.background_image} src={require("./images/background3.png")} alt="" />
                </div>
                <span className={style.content_title8}>
                    总放电电量
                </span>
                <span className={style.content_value8}>
                    {this.props.dischargingElectricity2}
                </span>
                <span className={style.content_value8_unit}>
                    kWh
                </span>
                <div className={style.background9}>
                    <img className={style.background_image} src={require("./images/background3.png")} alt="" />
                </div>
                <span className={style.content_value9_title}>
                    充电实时功率
                </span>
                <span className={style.content_value9}>
                    {this.props.chargingPower1}W
                </span>
                <div className={style.content_power1Data}>
                    <LineChart min={this.props.chargingPower1 - 50} max={this.props.chargingPower1 + 50} color="rgba(68,175,244,0.8)" />
                </div>
                <div className={style.background10}>
                    <img className={style.background_image} src={require("./images/background3.png")} alt="" />
                </div>
                <span className={style.content_value10_title}>
                    放电实时功率
                </span>
                <span className={style.content_value10}>
                    {this.props.dischargingPower1}W
                </span>
                <div className={style.content_power2Data}>
                    <LineChart min={this.props.dischargingPower1 - 50} max={this.props.dischargingPower1 + 50} color="rgba(68,175,244,0.8)" />
                </div>
                <div className={style.background11}>
                    <img className={style.background_image} src={require("./images/background3.png")} alt="" />
                </div>
                <span className={style.content_value11_title}>
                    充电实时功率
                </span>
                <span className={style.content_value11}>
                    {this.props.chargingPower2}W
                </span>
                <div className={style.content_power3Data}>
                    <LineChart min={this.props.chargingPower2 - 50} max={this.props.chargingPower2 + 50} color="rgba(68,175,244,0.8)" />
                </div>
                <div className={style.background12}>
                    <img className={style.background_image} src={require("./images/background3.png")} alt="" />
                </div>
                <span className={style.content_value12_title}>
                    放电实时功率
                </span>
                <span className={style.content_value12}>
                    {this.props.dischargingPower2}W
                </span>
                <div className={style.content_power4Data}>
                    <LineChart min={this.props.dischargingPower2 - 50} max={this.props.dischargingPower2 + 50} color="rgba(68,175,244,0.8)" />
                </div>
                <div className={style.background13}>
                    <img className={style.background_image} src={require("./images/background4.png")} alt="" />
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
                    <img className={style.background_image} src={require("./images/background4.png")} alt="" />
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
