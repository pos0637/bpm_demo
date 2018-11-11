import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '~/components/baseComponent';
import style from "./index.scss";

/**
 * 电网信息概览组件
 *
 * @export
 * @class PowerGridInformation
 * @extends {BaseComponent}
 */
export default class PowerGridInformation extends BaseComponent {
    static contextTypes = {
        router: PropTypes.object // 路由
    }

    static propTypes = {
        line1Voltage: PropTypes.number, // 线路1电压
        line1Electricity: PropTypes.number, // 线路1总电量
        line1Power: PropTypes.number, // 线路1实际功率
        line1PowerData: PropTypes.array, // 线路1功率数据
        line2Voltage: PropTypes.number, // 线路2电压
        line2Electricity: PropTypes.number, // 线路2总电量
        line2Power: PropTypes.number, // 线路2实际功率
        line2PowerData: PropTypes.array, // 线路2功率数据
        loadPower: PropTypes.number, // 负载实际功率
        loadPowerData: PropTypes.array // 负载功率数据
    }

    static defaultProps = {
        line1Voltage: 220,
        line1Electricity: 911,
        line1Power: 910,
        line1PowerData: [],
        line2Voltage: 220,
        line2Electricity: 911,
        line2Power: 910,
        line2PowerData: [],
        loadPower: 910,
        loadPowerData: []
    }

    render() {
        return (
            <div className={style.contrainer}>
                <div className={style.viewButton} onClick={() => this.context.router.history.replace('/load')} />
                <div className={style.background}>
                    <img className={style.background_image1} src={require("./images/background.png")} alt="" />
                </div>
                <div className={style.content_flag1}>
                    <img className={style.background_image} src={require("./images/flag.png")} alt="" />
                </div>
                <span className={style.content_title1}>
                    电网信息概览
                </span>
                <div className={style.content_logo1}>
                    <img className={style.background_image} src={require("./images/logo1.png")} alt="" />
                </div>
                <span className={style.content_line1_title}>
                    I号母线
                </span>
                <span className={style.content_line1_voltage_title}>
                    电压
                </span>
                <span className={style.content_line1_voltage}>
                    {this.props.line1Voltage}V
                </span>
                <span className={style.content_line1_electricity_title}>
                    总电量
                </span>
                <span className={style.content_line1_electricity}>
                    {this.props.line1Power}kWh
                </span>
                <span className={style.content_line1_power_title}>
                    实时功率
                </span>
                <div className={style.content_line1_power_tip}>
                    <img className={style.background_image} src={require("./images/tooltip.png")} alt="" />
                </div>
                <span className={style.content_line1_power}>
                    {this.props.line1Power}kW
                </span>
                <span className={style.content_line2_title}>
                    II号母线
                </span>
                <span className={style.content_line2_voltage_title}>
                    电压
                </span>
                <span className={style.content_line2_voltage}>
                    {this.props.line2Voltage}V
                </span>
                <span className={style.content_line2_electricity_title}>
                    总电量
                </span>
                <span className={style.content_line2_electricity}>
                    {this.props.line2Power}kWh
                </span>
                <span className={style.content_line2_power_title}>
                    实时功率
                </span>
                <div className={style.content_line2_power_tip}>
                    <img className={style.background_image} src={require("./images/tooltip.png")} alt="" />
                </div>
                <span className={style.content_line2_power}>
                    {this.props.line2Power}kW
                </span>
                <div className={style.content_flag2}>
                    <img className={style.background_image} src={require("./images/flag.png")} alt="" />
                </div>
                <span className={style.content_title2}>
                    负载信息概览
                </span>
                <div className={style.content_logo2}>
                    <img className={style.background_image} src={require("./images/logo2.png")} alt="" />
                </div>
                <span className={style.content_load_power_title}>
                    负载实时功率
                </span>
                <div className={style.content_load_power_tip}>
                    <img className={style.background_image} src={require("./images/tooltip.png")} alt="" />
                </div>
                <span className={style.content_load_power}>
                    {this.props.loadPower}kW
                </span>
            </div>
        );
    }
}
