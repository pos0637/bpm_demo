import React from 'react';
import { getRandom } from '~/misc/random';
import BaseComponent from '~/components/baseComponent';
import Progress from '~/app/components/progress';
import LineChart from '~/app/components/lineChart';
import style from "./index.scss";

/**
 * 变压器概览视图
 *
 * @export
 * @class TransformatorView
 * @extends {BaseComponent}
 */
export default class TransformatorView extends BaseComponent {
    state = {
        information1: 0,
        temperature1: 40,
        temperature2: 40,
        chargingElectricity1: 360,
        chargingElectricity2: 360,
        dischargingElectricity1: 246,
        dischargingElectricity2: 246,
        switch1: 0,
        switch2: 0,
        fan1: 0,
        fan2: 0,
        power1: 910,
        power1Data: [],
        power2: 910,
        power2Data: []
    }

    componentDidMount() {
        super.componentDidMount();
        this.timer = setInterval(() => {
            this.setState({
                information1: getRandom(0, 2),
                temperature1: getRandom(0, 40),
                temperature2: getRandom(0, 40),
                chargingElectricity1: getRandom(0, 360),
                chargingElectricity2: getRandom(0, 360),
                dischargingElectricity1: getRandom(0, 360),
                dischargingElectricity2: getRandom(0, 360),
                switch1: getRandom(0, 1),
                switch2: getRandom(0, 1),
                fan1: getRandom(0, 1),
                fan2: getRandom(0, 1),
                power1: getRandom(0, 900),
                power1Data: [],
                power2: getRandom(0, 900),
                power2Data: []
            });
        }, 2000);
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
        super.componentWillUnmount();
    }

    render() {
        let information1;
        let information2;
        let information3;
        if (this.state.information1 === 1) {
            information1 = <img className={style.background_image} src={require("./images/normal2.png")} alt="" />;
            information2 = <img className={style.background_image} src={require("./images/alarm1.png")} alt="" />;
            information3 = <img className={style.background_image} src={require("./images/fault2.png")} alt="" />;
        }
        else if (this.state.information1 === 2) {
            information1 = <img className={style.background_image} src={require("./images/normal2.png")} alt="" />;
            information2 = <img className={style.background_image} src={require("./images/alarm2.png")} alt="" />;
            information3 = <img className={style.background_image} src={require("./images/fault1.png")} alt="" />;
        }
        else {
            information1 = <img className={style.background_image} src={require("./images/normal1.png")} alt="" />;
            information2 = <img className={style.background_image} src={require("./images/alarm2.png")} alt="" />;
            information3 = <img className={style.background_image} src={require("./images/fault2.png")} alt="" />;
        }

        let switch1;
        if (this.state.switch1 === 1)
            switch1 = <img className={style.background_image} src={require("./images/detach.png")} alt="" />;
        else
            switch1 = <img className={style.background_image} src={require("./images/attach.png")} alt="" />;

        let switch2;
        if (this.state.switch2 === 1)
            switch2 = <img className={style.background_image} src={require("./images/detach.png")} alt="" />;
        else
            switch2 = <img className={style.background_image} src={require("./images/attach.png")} alt="" />;

        let fan1;
        if (this.state.fan1 === 1)
            fan1 = <img className={style.background_image} src={require("./images/close.png")} alt="" />;
        else
            fan1 = <img className={style.background_image} src={require("./images/open.png")} alt="" />;

        let fan2;
        if (this.state.fan2 === 1)
            fan2 = <img className={style.background_image} src={require("./images/close.png")} alt="" />;
        else
            fan2 = <img className={style.background_image} src={require("./images/open.png")} alt="" />;

        return (
            <div className={style.container}>
                <div className={style.background1}>
                    <img className={style.background_image} src={require("./images/background1.png")} alt="" />
                </div>
                <div className={style.content_logo1}>
                    <img className={style.background_image} src={require("./images/gra_bianyaqi.png")} alt="" />
                </div>
                <span className={style.content_title1}>
                    变压器
                </span>
                <div className={style.background2}>
                    <img className={style.background_image} src={require("./images/background1.png")} alt="" />
                </div>
                <div className={style.content_logo2}>
                    <img className={style.background_image} src={require("./images/gra_bingwang.png")} alt="" />
                </div>
                <span className={style.content_title2}>
                    并网柜
                </span>
                <div className={style.background3}>
                    <img className={style.background_image} src={require("./images/background3.png")} alt="" />
                </div>
                <div className={style.content_information1}>
                    {information1}
                </div>
                <div className={style.content_information2}>
                    {information2}
                </div>
                <div className={style.content_information3}>
                    {information3}
                </div>
                <div className={style.background4}>
                    <img className={style.background_image} src={require("./images/background4.png")} alt="" />
                </div>
                <span className={style.content_title3}>
                    I段开关
                </span>
                <span className={style.content_title4}>
                    II段开关
                </span>
                <div className={style.content_switch1}>
                    {switch1}
                </div>
                <div className={style.content_switch2}>
                    {switch2}
                </div>
                <div className={style.background5}>
                    <img className={style.background_image} src={require("./images/background2.png")} alt="" />
                </div>
                <span className={style.content_title5}>
                    1#变压器
                </span>
                <span className={style.content_title6}>
                    2#变压器
                </span>
                <span className={style.content_value5}>
                    {this.state.temperature1}
                </span>
                <span className={style.content_value6}>
                    {this.state.temperature2}
                </span>
                <div className={style.content_fan1}>
                    {fan1}
                </div>
                <div className={style.content_fan2}>
                    {fan2}
                </div>
                <div className={style.background6}>
                    <img className={style.background_image} src={require("./images/background5.png")} alt="" />
                </div>
                <span className={style.content_title7}>
                    1#并网柜
                </span>
                <span className={style.content_title8}>
                    2#并网柜
                </span>
                <span className={style.content_title9}>
                    总充电电量
                </span>
                <div className={style.content_progress1}>
                    <Progress width={180} value={this.state.chargingElectricity1 / 10} color="#1BC85D" text1={this.state.chargingElectricity1} text2="kWh" />
                </div>
                <span className={style.content_title10}>
                    总放电电量
                </span>
                <div className={style.content_progress2}>
                    <Progress width={180} value={this.state.dischargingElectricity1 / 10} color="#F86E05" text1={this.state.dischargingElectricity1} text2="kWh" />
                </div>
                <span className={style.content_title11}>
                    总充电电量
                </span>
                <div className={style.content_progress3}>
                    <Progress width={180} value={this.state.chargingElectricity2 / 10} color="#1BC85D" text1={this.state.chargingElectricity2} text2="kWh" />
                </div>
                <span className={style.content_title12}>
                    总放电电量
                </span>
                <div className={style.content_progress4}>
                    <Progress width={180} value={this.state.dischargingElectricity2 / 10} color="#F86E05" text1={this.state.dischargingElectricity2} text2="kWh" />
                </div>
                <span className={style.content_title13}>
                    充放电实时功率
                </span>
                <span className={style.content_title14}>
                    充放电实时功率
                </span>
                <div className={style.content_tip1}>
                    <img className={style.background_image} src={require("./images/tooltip.png")} alt="" />
                </div>
                <span className={style.content_power1}>
                    {this.state.power1}kW
                </span>
                <div className={style.content_power1Data}>
                    <LineChart min={this.state.power1 - 50} max={this.state.power1 + 50} color="rgba(251,207,72,0.8)" />
                </div>
                <div className={style.content_tip2}>
                    <img className={style.background_image} src={require("./images/tooltip.png")} alt="" />
                </div>
                <span className={style.content_power2}>
                    {this.state.power2}kW
                </span>
                <div className={style.content_power2Data}>
                    <LineChart min={this.state.power2 - 50} max={this.state.power2 + 50} color="rgba(251,207,72,0.8)" />
                </div>
            </div>
        );
    }
}
