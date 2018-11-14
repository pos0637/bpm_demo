import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '~/components/baseComponent';
import Progress from '~/app/components/progress';
import LineChart from '~/app/components/lineChart';
import style from "./index.scss";

/**
 * 变压器信息概览组件
 *
 * @export
 * @class TransformatorOverview
 * @extends {BaseComponent}
 */
export default class TransformatorOverview extends BaseComponent {
    static contextTypes = {
        router: PropTypes.object // 路由
    }

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
        chargingElectricity: 360,
        dischargingElectricity: 240,
        power: 910,
        powerData: [],
        link1: 0,
        link2: 0
    }

    render() {
        let fan1;
        if (this.props.transformator1Fan === 1)
            fan1 = <img src={require("./images/close.png")} alt="" />;
        else
            fan1 = <img src={require("./images/open.png")} alt="" />;

        let fan2;
        if (this.props.transformator2Fan === 1)
            fan2 = <img src={require("./images/close.png")} alt="" />;
        else
            fan2 = <img src={require("./images/open.png")} alt="" />;

        let link1;
        if (this.props.link1 === 1)
            link1 = <img src={require("./images/detach.png")} alt="" />;
        else
            link1 = <img src={require("./images/attach.png")} alt="" />;

        let link2;
        if (this.props.link2 === 1)
            link2 = <img src={require("./images/detach.png")} alt="" />;
        else
            link2 = <img src={require("./images/attach.png")} alt="" />;

        return (
            <div className={style.contrainer}>
                <div className={style.viewButton} onClick={() => this.context.router.history.replace('/transformator')} />
                <div className={style.background}>
                    <img src={require("./images/background.png")} alt="" />
                </div>
                <div className={style.content_flag1}>
                    <img src={require("./images/flag.png")} alt="" />
                </div>
                <div className={style.content_logo1}>
                    <img src={require("./images/gra_bianya.png")} alt="" />
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
                <div className={style.content_progress3}>
                    <Progress width={120} value={this.props.transformator1Temperature} color="#F86E05" text1={this.props.transformator1Temperature} text1Top={22} />
                </div>
                <div className={style.content_transformator1_fan}>
                    {fan1}
                </div>
                <span className={style.content_transformator2_title}>
                    2#变压器
                </span>
                <span className={style.content_transformator2_temperature_title}>
                    温度
                </span>
                <div className={style.content_progress4}>
                    <Progress width={120} value={this.props.transformator2Temperature} color="#F86E05" text1={this.props.transformator2Temperature} text1Top={22} />
                </div>
                <div className={style.content_transformator2_fan}>
                    {fan2}
                </div>
                <div className={style.content_flag2}>
                    <img src={require("./images/flag.png")} alt="" />
                </div>
                <div className={style.content_logo2}>
                    <img src={require("./images/gra_bingwang.png")} alt="" />
                </div>
                <span className={style.content_title2}>
                    并网柜信息概览
                </span>
                <span className={style.content_charging_title}>
                    总充电电量
                </span>
                <div className={style.content_progress1}>
                    <Progress width={180} value={this.props.chargingElectricity / 10} color="#1BC85D" text1={this.props.chargingElectricity} text2="kWh" />
                </div>
                <span className={style.content_discharging_title}>
                    总放电电量
                </span>
                <div className={style.content_progress2}>
                    <Progress width={180} value={this.props.dischargingElectricity / 10} color="#F86E05" text1={this.props.dischargingElectricity} text2="kWh" />
                </div>
                <span className={style.content_power_title}>
                    充放电实时功率
                </span>
                <div className={style.content_power_tip}>
                    <img src={require("./images/tooltip.png")} alt="" />
                </div>
                <span className={style.content_power}>
                    {this.props.power}kW
                </span>
                <div className={style.content_powerData}>
                    <LineChart min={this.props.power - 50} max={this.props.power + 50} color="rgba(68,175,244,0.8)" />
                </div>
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
