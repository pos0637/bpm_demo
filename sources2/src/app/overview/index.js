import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '~/components/baseComponent';
import Text from '~/app/components/text';
import Image from '~/app/components/image';
import Container from '~/app/components/container';
import Progress from '~/app/components/lineProgress';
import Switch from '~/app/components/switch';
import Switch2 from '~/app/components/switch2';
import LineChart from '~/app/components/lineChart';
import { toFixed, pad } from '~/misc/number';
import { getRandom } from '~/misc/random';
import { getOverviewData } from '~/api/v1/board';
import style from './index.scss';

/**
 * 概览视图
 *
 * @export
 * @class Overview
 * @extends {BaseComponent}
 */
export default class Overview extends BaseComponent {
    static contextTypes = {
        router: PropTypes.object // 路由
    }

    state = {
        showLoginForm: false, // 显示登录窗口
        无故障运行时间: 27,
        节煤量: 567,
        节碳量: 567,
        母线1: 678,
        母线2: 678,
        总充电量: 1669,
        总放电量: 669,
        安防系统状态: 0,
        充电状态: 0,
        电站运行状态1: 0,
        电站运行状态2: 0,
        节能总费用: 26000,
        今日充电总量1: 1660,
        今日放电总量1: 960,
        今日充电总量2: 1660,
        今日放电总量2: 960,
        充放电功率1: 960,
        充放电功率2: 960,
        充放电量曲线1: null,
        充放电量曲线2: null,
        变压器功率1: 960,
        变压器功率2: 960,
        变压器功率曲线1: null,
        变压器功率曲线2: null,
        需求功率1: 960,
        需求功率2: 960,
        需求功率曲线1: null,
        需求功率曲线2: null
    }

    componentDidMount() {
        super.componentDidMount();
        this.timer = setInterval(() => {
            let data = {};
            if (process.env.NODE_ENV === 'development') {
                data = {
                    无故障运行时间: getRandom(10, 100),
                    节煤量: getRandom(200, 700),
                    节碳量: getRandom(200, 700),
                    母线1: getRandom(200, 700),
                    母线2: getRandom(200, 700),
                    总充电量: getRandom(1000, 2000),
                    总放电量: getRandom(1000, 2000),
                    安防系统状态: getRandom(0, 1),
                    充电状态: getRandom(0, 1),
                    电站运行状态1: getRandom(0, 2),
                    电站运行状态2: getRandom(0, 2),
                    节能总费用: getRandom(10000, 27000),
                    今日充电总量1: getRandom(1000, 2000),
                    今日放电总量1: getRandom(500, 1000),
                    今日充电总量2: getRandom(1000, 2000),
                    今日放电总量2: getRandom(500, 1000),
                    充放电功率1: getRandom(500, 1000),
                    充放电功率2: getRandom(500, 1000),
                    充放电功率曲线1: null,
                    充放电功率曲线2: null,
                    变压器功率1: getRandom(500, 1000),
                    变压器功率2: getRandom(500, 1000),
                    变压器功率曲线1: null,
                    变压器功率曲线2: null,
                    需求功率1: getRandom(500, 1000),
                    需求功率2: getRandom(500, 1000),
                    需求功率曲线1: null,
                    需求功率曲线2: null
                };
                this.setState(data);
            }
            else {
                getOverviewData(overview => {
                    data.无故障运行时间 = Math.ceil((new Date().getTime() - new Date('2019-01-01').getTime()) / (1000 * 60 * 60 * 24));
                    data.电站运行状态1 = overview.state1;
                    data.电站运行状态2 = overview.state2;
                    data.节能总费用 = overview.bill;
                    data.节煤量 = overview.saveCost1;
                    data.节碳量 = overview.saveCost2;
                    data.母线1 = overview.loadPower1;
                    data.母线2 = overview.loadPower2;
                    data.总充电量 = overview.totalChargingElectricity;
                    data.总放电量 = overview.totalDischargingElectricity;
                    data.安防系统状态 = overview.securitySystemState;
                    data.充电状态 = overview.chargingState;
                    data.今日充电总量1 = overview.chargingElectricity1;
                    data.今日放电总量1 = overview.dischargingElectricity1;
                    data.今日充电总量2 = overview.chargingElectricity2;
                    data.今日放电总量2 = overview.dischargingElectricity2;
                    data.充放电功率1 = overview.electricity1;
                    data.充放电功率2 = overview.electricity2;
                    data.充放电功率曲线1 = overview.electricityData1;
                    data.充放电功率曲线2 = overview.electricityData2;
                    data.变压器功率1 = overview.loadPower1;
                    data.变压器功率2 = overview.loadPower2;
                    data.变压器功率曲线1 = overview.loadPowerData1;
                    data.变压器功率曲线2 = overview.loadPowerData2;
                    data.需求功率1 = overview.transformerPower1;
                    data.需求功率2 = overview.transformerPower2;
                    data.需求功率曲线1 = overview.transformerPowerData1;
                    data.需求功率曲线2 = overview.transformerPowerData2;
                    this.setState(data);
                });
            }
        }, 2000);
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
        super.componentWillUnmount();
    }

    render() {
        let arrow = <div />;
        if (this.state.充电状态 === 0) {
            arrow = <Image left={372} top={1782} src={require("./images/charging_arrow.gif")} />;
        }
        else if (this.state.充电状态 === 1) {
            arrow = <Image left={372} top={1796} src={require("./images/discharging_arrow.gif")} />
        }

        const statesText = ['充电', '放电', '待机'];
        const statesColor = ['rgb(210, 86, 107)', 'rgb(68, 205, 103)', 'rgb(79, 146, 180)'];

        return (
            <Container width={3840} height={2160}>
                <Image left={200} top={173} src={require("../../framework/images/logo.png")} />
                <Image left={902} top={184} src={require("../../framework/images/title.png")} />

                <Text left={2891} top={185} value="无故障运行" font="SourceHanSansSC-Light" fontSize={58.39} />
                <Text left={3274} top={164} value={pad(this.state.无故障运行时间, 4)} font="SourceHanSansSC-Bold" fontSize={96.43} color="rgb(102, 224, 250)" />
                <Text left={3545} top={188} value="天" font="SourceHanSansSC-Light" fontSize={58.39} />

                <Container left={199} top={319} background={require("./images/box1.png")} onClick={() => this.context.router.history.replace('/login')}>
                    <Text left={275} top={354} value="清洁能源微网系统" font="SourceHanSansSC-Bold" fontSize={48} />
                    <Image left={726} top={566} src={require("./images/line.gif")} />
                    <Image left={616} top={891} src={require("./images/charging_station.png")} className={style.move} />
                    <Image left={712} top={519} src={require("./images/grid.png")} className={style.move} />
                    <Image left={1291} top={891} src={require("./images/load.png")} className={style.move} />
                    <Image left={1200} top={519} src={require("./images/storage.png")} className={style.move} />
                    <Image left={955} top={1130} src={require("./images/photovoltaic.png")} />
                    <Image left={992} top={871} src={require("./images/cloud.png")} />
                    <Text left={1085} top={935} value="ESS" font="SourceHanSansSC-Heavy" fontSize={34} color="rgb(22, 38, 60)" />
                    <Text left={1002} top={1390} value="光伏发电" font="SourceHanSansSC-Medium" fontSize={46.24} />
                    <Container left={279} top={519} background={require("./images/small_box1.png")}>
                        <Text left={351} top={554} value="电网" font="SourceHanSansSC-Medium" fontSize={46.24} />
                        <Text left={351} top={645} value={`节煤量${toFixed(this.state.节煤量, 1)}吨`} font="SourceHanSansSC-Light" fontSize={27.69} />
                        <Progress left={351} top={690} width={251} height={9} value={this.state.节煤量 / 1000 * 100} colorStart="rgb(49, 218, 225)" colorEnd="rgb(16, 181, 115)" />
                        <Text left={351} top={720} value={`节碳量${toFixed(this.state.节碳量, 1)}吨`} font="SourceHanSansSC-Light" fontSize={27.69} />
                        <Progress left={351} top={766} width={251} height={9} value={this.state.节碳量 / 1000 * 100} colorStart="rgb(244, 138, 62)" colorEnd="rgb(214, 80, 115)" />
                    </Container>
                    <Container left={279} top={948} background={require("./images/small_box1.png")}>
                        <Text left={351} top={983} value="需求" font="SourceHanSansSC-Medium" fontSize={46.24} />
                        <Text left={351} top={1074} value={`1#功率需求${toFixed(this.state.需求功率1, 1)}kW`} font="SourceHanSansSC-Light" fontSize={27.69} />
                        <Progress left={351} top={1120} width={251} height={9} value={this.state.需求功率1 / 1000 * 100} colorStart="rgb(49, 218, 225)" colorEnd="rgb(16, 181, 115)" />
                        <Text left={351} top={1156} value={`2#功率需求${toFixed(this.state.需求功率2, 1)}kW`} font="SourceHanSansSC-Light" fontSize={27.69} />
                        <Progress left={351} top={1195} width={251} height={9} value={this.state.需求功率2 / 1000 * 100} colorStart="rgb(244, 138, 62)" colorEnd="rgb(214, 80, 115)" />
                    </Container>
                    <Container left={1370} top={524} background={require("./images/small_box2.png")}>
                        <Text left={1743} top={567} value="储能" font="SourceHanSansSC-Medium" fontSize={46.24} />
                        <Text left={1534} top={656} value={`总充电量${toFixed(this.state.总充电量, 1)}kWh`} font="SourceHanSansSC-Light" fontSize={27.69} align="right" width={250} />
                        <Progress left={1584} top={702} width={251} height={9} value={this.state.总充电量 / 2000 * 100} colorStart="rgb(49, 218, 225)" colorEnd="rgb(16, 181, 115)" />
                        <Text left={1534} top={732} value={`总放电量${toFixed(this.state.总放电量, 1)}kWh`} font="SourceHanSansSC-Light" fontSize={27.69} align="right" width={250} />
                        <Progress left={1584} top={778} width={251} height={9} value={this.state.总放电量 / 2000 * 100} colorStart="rgb(244, 138, 62)" colorEnd="rgb(214, 80, 115)" />
                    </Container>
                    <Container left={1370} top={950} background={require("./images/small_box2.png")}>
                        <Text left={1724} top={999} value="负载" font="SourceHanSansSC-Medium" fontSize={46.24} />
                        <Text left={1564} top={1090} value={`1#母线${toFixed(this.state.母线1, 1)}kW`} font="SourceHanSansSC-Light" fontSize={27.69} align="right" width={250} />
                        <Progress left={1564} top={1136} width={251} height={9} value={this.state.母线1 / 1000 * 100} colorStart="rgb(49, 218, 225)" colorEnd="rgb(16, 181, 115)" />
                        <Text left={1564} top={1166} value={`2#母线${toFixed(this.state.母线2, 1)}KW`} font="SourceHanSansSC-Light" fontSize={27.69} align="right" width={250} />
                        <Progress left={1564} top={1213} width={251} height={9} value={this.state.母线2 / 1000 * 100} colorStart="rgb(244, 138, 62)" colorEnd="rgb(214, 80, 115)" />
                    </Container>
                </Container>

                <Container left={199} top={1506} background={require("./images/box2.png")}>
                    <Text left={275} top={1543} value="储能系统" font="SourceHanSansSC-Bold" fontSize={48} />
                    <Image left={233} top={1654} src={require("./images/grid_icon.png")} />
                    <Image left={233} top={1841} src={require("./images/load_icon.png")} />
                    <Image left={616} top={1749} src={require("./images/cabinet_icon.png")} />
                    <Image left={905} top={1749} src={require("./images/transformer_icon.png")} />
                    <Image left={1194} top={1749} src={require("./images/pcs_icon.png")} />
                    <Image left={1483} top={1749} src={require("./images/bms_icon.png")} />
                    <Image left={1773} top={1749} src={require("./images/battery_icon.png")} />

                    <Image left={293} top={1758} src={require("./images/link.png")} />
                    <Image left={700} top={1645} src={require("./images/ems_icon.png")} />

                    {arrow}
                </Container>

                <Container left={2023} top={1506} background={require("./images/box3.png")} onClick={() => window.login && this.context.router.history.replace('/air')}>
                    <Text left={2091} top={1543} value="安防系统" font="SourceHanSansSC-Bold" fontSize={48} />
                    <Text left={2091} top={1661} value="状态" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Switch left={2094} top={1756} src1={require("./images/security_system_normal0.png")} src2={require("./images/security_system_normal1.png")} value={this.state.安防系统状态 === 0} />
                    <Switch left={2338} top={1753} src1={require("./images/security_system_alarm0.png")} src2={require("./images/security_system_alarm1.png")} value={this.state.安防系统状态 !== 0} />
                </Container>

                <Container left={2024} top={319} background={require("./images/box4.png")}>
                    <Text left={2093} top={358} value="电站运行状态" font="SourceHanSansSC-Bold" fontSize={48} />
                    <Switch2 left={2090} top={501} src={[require("./images/charging.png"), require("./images/discharging.png"), require("./images/standby.png")]} value={this.state.电站运行状态1} />
                    <Text left={2279} top={532} value={`1# ${statesText[this.state.电站运行状态1]}`} font="SourceHanSansSC-Medium" fontSize={40} color={statesColor[this.state.电站运行状态1]} />
                    <Switch2 left={2460} top={501} src={[require("./images/charging.png"), require("./images/discharging.png"), require("./images/standby.png")]} value={this.state.电站运行状态2} />
                    <Text left={2646} top={532} value={`2# ${statesText[this.state.电站运行状态2]}`} font="SourceHanSansSC-Medium" fontSize={40} color={statesColor[this.state.电站运行状态2]} />
                </Container>

                <Container left={2843} top={319} background={require("./images/box5.png")}>
                    <Text left={2910} top={358} value="电站节能总费用" font="SourceHanSansSC-Bold" fontSize={48} />
                    <Image left={3432} top={454} src={require("./images/money.gif")} />
                    <Text left={2910} top={500} value={`${toFixed(this.state.节能总费用, 0)}`} font="SourceHanSansSC-Heavy" fontSize={120} />
                    <Text left={3315} top={533} value="元" font="SourceHanSansSC-Regular" fontSize={72} color="rgb(60, 211, 238)" />
                </Container>

                <Container left={2023} top={698} background={require("./images/box6.png")}>
                    <Text left={2094} top={734} value="日充/放功率" font="SourceHanSansSC-Bold" fontSize={48} />
                    <Text left={2094} top={906} value="1#充/放电功率" font="SourceHanSansSC-Regular" fontSize={32} />
                    <Container left={2353} top={882} background={require("./images/tip.png")}>
                        <Text left={2353} top={896} width={158} value={`${toFixed(this.state.充放电功率1, 0)}kW`} font="SourceHanSansSC-Bold" fontSize={41} align="center" />
                    </Container>
                    <LineChart left={2094} top={963} width={429} height={120} color="rgba(184,87,100,0.8)" data={this.state.充放电功率曲线1} maxTicksLimitX={12} suggestedMin={-250} suggestedMax={250} />

                    <Text left={2094} top={1212} value="2#充/放电功率" font="SourceHanSansSC-Regular" fontSize={32} />
                    <Container left={2353} top={1188} background={require("./images/tip.png")}>
                        <Text left={2353} top={1202} width={158} value={`${toFixed(this.state.充放电功率2, 0)}kW`} font="SourceHanSansSC-Bold" fontSize={41} align="center" />
                    </Container>
                    <LineChart left={2094} top={1269} width={429} height={120} color="rgba(184,87,100,0.8)" data={this.state.充放电功率曲线2} maxTicksLimitX={12} suggestedMin={-250} suggestedMax={250} />

                    <Text left={2619} top={906} value="1#变压器功率" font="SourceHanSansSC-Regular" fontSize={32} />
                    <Container left={2879} top={882} background={require("./images/tip.png")}>
                        <Text left={2879} top={896} width={158} value={`${toFixed(this.state.变压器功率1, 0)}kW`} font="SourceHanSansSC-Bold" fontSize={41} align="center" />
                    </Container>
                    <LineChart left={2619} top={963} width={429} height={120} color="rgba(221,178,38,0.8)" data={this.state.变压器功率曲线1} maxTicksLimitX={12} suggestedMin={-250} suggestedMax={250} />

                    <Text left={2619} top={1212} value="2#变压器功率" font="SourceHanSansSC-Regular" fontSize={32} />
                    <Container left={2879} top={1188} background={require("./images/tip.png")}>
                        <Text left={2879} top={1202} width={158} value={`${toFixed(this.state.变压器功率2, 0)}kW`} font="SourceHanSansSC-Bold" fontSize={41} align="center" />
                    </Container>
                    <LineChart left={2619} top={1269} width={429} height={120} color="rgba(221,178,38,0.8)" data={this.state.变压器功率曲线2} maxTicksLimitX={12} suggestedMin={-250} suggestedMax={250} />

                    <Text left={3140} top={906} value="1#需求功率" font="SourceHanSansSC-Regular" fontSize={32} />
                    <Container left={3399} top={882} background={require("./images/tip.png")}>
                        <Text left={3399} top={896} width={158} value={`${toFixed(this.state.需求功率1, 0)}kW`} font="SourceHanSansSC-Bold" fontSize={41} align="center" />
                    </Container>
                    <LineChart left={3140} top={963} width={429} height={120} color="rgba(31,210,169,0.8)" data={this.state.需求功率曲线1} maxTicksLimitX={12} suggestedMin={-250} suggestedMax={250} />

                    <Text left={3140} top={1212} value="2#需求功率" font="SourceHanSansSC-Regular" fontSize={32} />
                    <Container left={3399} top={1188} background={require("./images/tip.png")}>
                        <Text left={3399} top={1202} width={158} value={`${toFixed(this.state.需求功率2, 0)}kW`} font="SourceHanSansSC-Bold" fontSize={41} align="center" />
                    </Container>
                    <LineChart left={3140} top={1269} width={429} height={120} color="rgba(31,210,169,0.8)" data={this.state.需求功率曲线2} maxTicksLimitX={12} suggestedMin={-250} suggestedMax={250} />
                </Container>

                <Container left={2600} top={1502} background={require("./images/box7.png")}>
                    <Text left={2676} top={1543} value="日充/放电量" font="SourceHanSansSC-Bold" fontSize={48} />
                    <Text left={2675} top={1666} value="1#" font="SourceHanSansSC-Medium" fontSize={32} />
                    <Text left={2748} top={1663} value="今日充电总量" font="SourceHanSansSC-Heavy" fontSize={32} />
                    <Text left={2747} top={1710} value={`${toFixed(this.state.今日充电总量1, 1)}kWh`} font="SourceHanSansSC-Heavy" fontSize={32} />
                    <Progress left={2748} top={1765} width={251} height={9} value={this.state.今日充电总量1 / 2000 * 100} colorStart="rgb(244, 138, 62)" colorEnd="rgb(214, 80, 115)" />
                    <Text left={3193} top={1663} value="今日放电总量" font="SourceHanSansSC-Heavy" fontSize={32} />
                    <Text left={3193} top={1710} value={`${toFixed(this.state.今日放电总量1, 1)}kWh`} font="SourceHanSansSC-Heavy" fontSize={32} />
                    <Progress left={3192} top={1765} width={251} height={9} value={this.state.今日放电总量1 / 2000 * 100} colorStart="rgb(244, 138, 62)" colorEnd="rgb(214, 80, 115)" />

                    <Text left={2679} top={1837} value="2#" font="SourceHanSansSC-Medium" fontSize={32} />
                    <Text left={2753} top={1834} value="今日充电总量" font="SourceHanSansSC-Heavy" fontSize={32} />
                    <Text left={2752} top={1880} value={`${toFixed(this.state.今日充电总量2, 1)}kWh`} font="SourceHanSansSC-Heavy" fontSize={32} />
                    <Progress left={2751} top={1938} width={251} height={9} value={this.state.今日充电总量2 / 2000 * 100} colorStart="rgb(49, 218, 225)" colorEnd="rgb(16, 181, 115)" />
                    <Text left={3193} top={1834} value="今日放电总量" font="SourceHanSansSC-Heavy" fontSize={32} />
                    <Text left={3193} top={1880} value={`${toFixed(this.state.今日放电总量2, 1)}kWh`} font="SourceHanSansSC-Heavy" fontSize={32} />
                    <Progress left={3192} top={1938} width={251} height={9} value={this.state.今日放电总量2 / 2000 * 100} colorStart="rgb(49, 218, 225)" colorEnd="rgb(16, 181, 115)" />
                </Container>

                <Container left={228} top={1641} width={306} height={333} onClick={() => window.login && this.context.router.history.replace('/load')} />
                <Container left={567} top={1641} width={534} height={333} onClick={() => window.login && this.context.router.history.replace('/transformer')} />
                <Container left={1131} top={1641} width={291} height={333} onClick={() => window.login && this.context.router.history.replace('/pcs')} />
                <Container left={1431} top={1641} width={500} height={333} onClick={() => window.login && this.context.router.history.replace('/bms')} />
            </Container>
        );
    }

    /**
     * 登录按钮点击事件处理函数
     *
     * @memberof Overview
     */
    _onLoginButtonClick() {
        this.setState({ showLoginForm: true });
    }

    /**
     * 登录事件处理函数
     *
     * @memberof Overview
     */
    _onLogin() {
        this.setState({ showLoginForm: false });
        this.context.router.history.replace('/main');
    }
}
