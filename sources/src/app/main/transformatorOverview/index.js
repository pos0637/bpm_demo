import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '~/components/baseComponent';
import style from "./index.scss";

/**
 * 变压器信息概览组件
 *
 * @export
 * @class TransformatorOverview
 * @extends {BaseComponent}
 */
export default class TransformatorOverview extends BaseComponent {
    static propTypes = {
        transformator1Temperature: PropTypes.number,
        transformator2Temperature: PropTypes.number,
        transformator1Fan: PropTypes.number,
        transformator2Fan: PropTypes.number,
        chargingElectricity: PropTypes.number,
        dischargingElectricity: PropTypes.number,
        power: PropTypes.number,
        powerData: PropTypes.array,
        link1: PropTypes.number,
        link2: PropTypes.number
    }

    static defaultProps = {
        transformator1Temperature: 50,
        transformator2Temperature: 50,
        transformator1Fan: 0,
        transformator2Fan: 0,
        chargingElectricity: 2100,
        dischargingElectricity: 2100,
        power: 910,
        powerData: [],
        link1: 0,
        link2: 0
    }

    render() {
        let fan1;
        if (this.props.transformator1Fan === 1)
            fan1 = <img className={style.background_image} src={require("./images/close.png")} alt="" />;
        else
            fan1 = <img className={style.background_image} src={require("./images/open.png")} alt="" />;

        let fan2;
        if (this.props.transformator2Fan === 1)
            fan2 = <img className={style.background_image} src={require("./images/close.png")} alt="" />;
        else
            fan2 = <img className={style.background_image} src={require("./images/open.png")} alt="" />;

        let link1;
        if (this.props.link1 === 1)
            link1 = <img className={style.background_image} src={require("./images/detach.png")} alt="" />;
        else
            link1 = <img className={style.background_image} src={require("./images/attach.png")} alt="" />;

        let link2;
        if (this.props.link2 === 1)
            link2 = <img className={style.background_image} src={require("./images/detach.png")} alt="" />;
        else
            link2 = <img className={style.background_image} src={require("./images/attach.png")} alt="" />;

        return (
            <div className={style.contrainer}>
                <div className={style.background}>
                    <img className={style.background_image1} src={require("./images/background.png")} alt="" />
                </div>
                <div className={style.content_flag1}>
                    <img className={style.background_image} src={require("./images/flag.png")} alt="" />
                </div>
                <div className={style.content_logo1}>
                    <img className={style.background_image} src={require("./images/gra_bianya.png")} alt="" />
                </div>
                <span className={style.content_title1}>
                    变压器信息概览
                </span>
                <span className={style.content_transformator1_title}>
                    1#变压器
                </span>
                <span className={style.content_transformator1_temperature_title}>
                    温度
                </span>
                <span className={style.content_transformator1_temperature}>
                    {this.props.transformator1Temperature}
                </span>
                <div className={style.content_transformator1_fan}>
                    {fan1}
                </div>
                <span className={style.content_transformator2_title}>
                    2#变压器
                </span>
                <span className={style.content_transformator2_temperature_title}>
                    温度
                </span>
                <span className={style.content_transformator2_temperature}>
                    {this.props.transformator2Temperature}
                </span>
                <div className={style.content_transformator2_fan}>
                    {fan2}
                </div>
                <div className={style.content_flag2}>
                    <img className={style.background_image} src={require("./images/flag.png")} alt="" />
                </div>
                <div className={style.content_logo2}>
                    <img className={style.background_image} src={require("./images/gra_bingwang.png")} alt="" />
                </div>
                <span className={style.content_title2}>
                    并网柜信息概览
                </span>
                <span className={style.content_charging_title}>
                    总充电电量
                </span>
                <span className={style.content_charging}>
                    {this.props.chargingElectricity}
                </span>
                <span className={style.content_charging_unit}>
                    kWh
                </span>
                <span className={style.content_discharging_title}>
                    总放电电量
                </span>
                <span className={style.content_discharging}>
                    {this.props.dischargingElectricity}
                </span>
                <span className={style.content_discharging_unit}>
                    kWh
                </span>
                <span className={style.content_power_title}>
                    充放电实时功率
                </span>
                <div className={style.content_power_tip}>
                    <img className={style.background_image} src={require("./images/tooltip.png")} alt="" />
                </div>
                <span className={style.content_power}>
                    {this.props.line2Power}kW
                </span>
                <span className={style.content_link1_title}>
                    I段开关
                </span>
                <div className={style.content_link1}>
                    {link1}
                </div>
                <span className={style.content_link2_title}>
                    II段开关
                </span>
                <div className={style.content_link2}>
                    {link2}
                </div>
            </div>
        );
    }
}
