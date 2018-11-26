import React from 'react';
import PropTypes from 'prop-types';
import { toFixed } from '~/misc/number';
import BaseComponent from '~/components/baseComponent';
import Progress from '~/app/components/lineProgress';
import style from "./index.scss";

/**
 * PCS信息概览组件
 *
 * @export
 * @class PcsOverview
 * @extends {BaseComponent}
 */
export default class PcsOverview extends BaseComponent {
    static contextTypes = {
        router: PropTypes.object // 路由
    }

    static propTypes = {
        power: PropTypes.number,
        voltage: PropTypes.number,
        current: PropTypes.number,
        voltage2: PropTypes.number,
        charging: PropTypes.number,
        discharging: PropTypes.number
    }

    static defaultProps = {
        power: 50,
        voltage: 50,
        current: 50,
        voltage2: 50,
        charging: 1600,
        discharging: 960
    }

    render() {
        return (
            <div className={style.contrainer}>
                <div className={style.viewButton} onClick={() => this.context.router.history.replace('/pcs')} />
                <div className={style.background}>
                    <img src={require("./images/background.png")} alt="" />
                </div>
                <div className={style.content_flag}>
                    <img src={require("./images/flag.png")} alt="" />
                </div>
                <span className={style.content_title}>
                    PCS信息概览
                </span>
                <div className={style.content_state}>
                    <img src={require("./images/charging.png")} alt="" />
                </div>
                <div className={style.content_power_title}>
                    有功功率
                </div>
                <div className={style.content_power_container}>
                    <img src={require("./images/container.png")} alt="" />
                </div>
                <span className={style.content_power}>
                    {toFixed(this.props.power, 1)}
                </span>
                <span className={style.content_power_unit}>
                    kW
                </span>
                <div className={style.content_voltage_title}>
                    直流电压
                </div>
                <div className={style.content_voltage_container}>
                    <img src={require("./images/container.png")} alt="" />
                </div>
                <span className={style.content_voltage}>
                    {toFixed(this.props.voltage, 1)}
                </span>
                <span className={style.content_voltage_unit}>
                    V
                </span>
                <div className={style.content_current_title}>
                    直流电流
                </div>
                <div className={style.content_current_container}>
                    <img src={require("./images/container.png")} alt="" />
                </div>
                <span className={style.content_current}>
                    {toFixed(this.props.current, 1)}
                </span>
                <span className={style.content_current_unit}>
                    A
                </span>
                <div className={style.content_voltage2_title}>
                    交流电压
                </div>
                <div className={style.content_voltage2_container}>
                    <img src={require("./images/container.png")} alt="" />
                </div>
                <span className={style.content_voltage2}>
                    {toFixed(this.props.voltage2, 1)}
                </span>
                <span className={style.content_voltage2_unit}>
                    V
                </span>
                <div className={style.content_charging_title}>
                    今日充电总量
                </div>
                <div className={style.content_charging}>
                    {toFixed(this.props.charging, 1)}kWh
                </div>
                <div className={style.content_charging_progress}>
                    <Progress width={500} value={this.props.charging / 100} color="#FFC208" />
                </div>
                <div className={style.content_discharging_title}>
                    今日放电总量
                </div>
                <div className={style.content_discharging}>
                    {toFixed(this.props.discharging, 1)}kWh
                </div>
                <div className={style.content_discharging_progress}>
                    <Progress width={500} value={this.props.discharging / 100} color="#1BC85D" />
                </div>
            </div>
        );
    }
}
