import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '~/components/baseComponent';
import style from "./index.scss";

/**
 * 负载概览视图
 *
 * @export
 * @class LoadView
 * @extends {BaseComponent}
 */
export default class LoadView extends BaseComponent {
    static propTypes = {
        state: PropTypes.number, // 运行状态
        chargingElectricity: PropTypes.number,
        dischargingElectricity: PropTypes.number,
        voltage1: PropTypes.number,
        voltage2: PropTypes.number,
        voltage3: PropTypes.number,
        current1: PropTypes.number,
        current2: PropTypes.number,
        current3: PropTypes.number,
        value1: PropTypes.number,
        value2: PropTypes.number,
        power1: PropTypes.number,
        power1Data: PropTypes.array,
        power2: PropTypes.number,
        power2Data: PropTypes.array
    }

    static defaultProps = {
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
        }, 2000);
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
        super.componentWillUnmount();
    }

    render() {
        let state1;
        if (this.props.state === 1)
            state1 = <img className={style.background_image} src={require("./images/charging.png")} alt="" />;
        else if (this.props.state === 2)
            state1 = <img className={style.background_image} src={require("./images/discharging.png")} alt="" />;
        else
            state1 = <img className={style.background_image} src={require("./images/standby.png")} alt="" />;

        return (
            <div className={style.container}>
                <div className={style.background1}>
                    <img className={style.background_image} src={require("./images/background1.png")} alt="" />
                </div>
                <div className={style.content_logo1}>
                    <img className={style.background_image} src={require("./images/gra_dianwang.png")} alt="" />
                </div>
                <span className={style.content_title1}>
                    电网&amp;负载
                </span>
                <div className={style.background2}>
                    <img className={style.background_image} src={require("./images/background2.png")} alt="" />
                </div>
                <span className={style.content_title2}>
                    电站运行状态
                </span>
                <div className={style.content_state1}>
                    {state1}
                </div>
                <div className={style.background3}>
                    <img className={style.background_image} src={require("./images/background3.png")} alt="" />
                </div>
                <span className={style.content_title3}>
                    总充电电量
                </span>
                <span className={style.content_value3}>
                    {this.props.chargingElectricity}
                </span>
                <span className={style.content_value3_unit}>
                    kWh
                </span>
                <div className={style.background4}>
                    <img className={style.background_image} src={require("./images/background3.png")} alt="" />
                </div>
                <span className={style.content_title4}>
                    总放电电量
                </span>
                <span className={style.content_value4}>
                    {this.props.dischargingElectricity}
                </span>
                <span className={style.content_value4_unit}>
                    kWh
                </span>
                <div className={style.background5}>
                    <img className={style.background_image} src={require("./images/background4.png")} alt="" />
                </div>
                <span className={style.content_value5_title}>
                    A相电网
                </span>
                <span className={style.content_value5_title1}>
                    电网电压
                </span>
                <span className={style.content_value5_voltage}>
                    {this.props.voltage1}V
                </span>
                <span className={style.content_value5_title2}>
                    电网电流
                </span>
                <span className={style.content_value5_current}>
                    {this.props.current1}A
                </span>
                <span className={style.content_value6_title}>
                    B相电网
                </span>
                <span className={style.content_value6_title1}>
                    电网电压
                </span>
                <span className={style.content_value6_voltage}>
                    {this.props.voltage2}V
                </span>
                <span className={style.content_value6_title2}>
                    电网电流
                </span>
                <span className={style.content_value6_current}>
                    {this.props.current2}A
                </span>
                <span className={style.content_value7_title}>
                    C相电网
                </span>
                <span className={style.content_value7_title1}>
                    电网电压
                </span>
                <span className={style.content_value7_voltage}>
                    {this.props.voltage3}V
                </span>
                <span className={style.content_value7_title2}>
                    电网电流
                </span>
                <span className={style.content_value7_current}>
                    {this.props.current3}A
                </span>
                <div className={style.background6}>
                    <img className={style.background_image} src={require("./images/background5.png")} alt="" />
                </div>
                <span className={style.content_value8_title}>
                    I段母线功率因数
                </span>
                <span className={style.content_value8}>
                    {this.props.value1}
                </span>
                <span className={style.content_value9_title}>
                    II段母线功率因数
                </span>
                <span className={style.content_value9}>
                    {this.props.value2}
                </span>
                <div className={style.background7}>
                    <img className={style.background_image} src={require("./images/background6.png")} alt="" />
                </div>
                <span className={style.content_value10_title}>
                    I段负载实时功率
                </span>
                <span className={style.content_value10}>
                    {this.props.power1}W
                </span>
                <div className={style.background8}>
                    <img className={style.background_image} src={require("./images/background6.png")} alt="" />
                </div>
                <span className={style.content_value11_title}>
                    II段负载实时功率
                </span>
                <span className={style.content_value11}>
                    {this.props.power2}W
                </span>
            </div>
        );
    }
}
