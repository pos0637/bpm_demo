import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '~/components/baseComponent';
import Text from '~/app/components/text';
import Image from '~/app/components/image';
import Container from '~/app/components/container';
import Progress from '~/app/components/lineProgress';
import Switch from '~/app/components/switch';
import BarChart from '~/app/components/barChart';
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
        节炭量1: 567,
        节炭量2: 567,
        母线1: 678,
        母线2: 678,
        总充电量: 1669,
        总放电量: 669,
        安防系统状态: 0,
        充电1: 0,
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
        并网点需求1: 960,
        并网点需求2: 960,
        并网点需求曲线1: null,
        并网点需求曲线2: null
    }

    componentDidMount() {
        super.componentDidMount();
        this.timer = setInterval(() => {
            let data = {};
            if (process.env.NODE_ENV === 'development') {
                data = {
                    无故障运行时间: getRandom(10, 100),
                    节炭量1: getRandom(200, 700),
                    节炭量2: getRandom(200, 700),
                    母线1: getRandom(200, 700),
                    母线2: getRandom(200, 700),
                    总充电量: getRandom(1000, 2000),
                    总放电量: getRandom(1000, 2000),
                    安防系统状态: getRandom(0, 1),
                    充电1: getRandom(0, 1),
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
                    并网点需求1: getRandom(500, 1000),
                    并网点需求2: getRandom(500, 1000),
                    并网点需求曲线1: null,
                    并网点需求曲线2: null
                };
                this.setState(data);
            }
            else {
                getOverviewData(overview => {
                    data.电站运行状态1 = overview.state1;
                    data.电站运行状态2 = overview.state2;
                    data.母线1 = overview.loadPower1;
                    data.母线2 = overview.loadPower2;
                    data.总充电量 = overview.totalChargingElectricity;
                    data.总放电量 = overview.totalDischargingElectricity;
                    data.今日充电总量1 = overview.chargingElectricity1;
                    data.今日放电总量1 = overview.dischargingElectricity1;
                    data.今日充电总量2 = overview.chargingElectricity2;
                    data.今日放电总量2 = overview.dischargingElectricity2;
                });
                this.setState(data);
            }
        }, 2000);
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
        super.componentWillUnmount();
    }

    render() {
        return (
            <Container width={3840} height={2160}>
                <Image left={199} top={96} src={require("../../framework/images/logo.png")} />
                <Image left={3270} top={2026} src={require("../../framework/images/logo2.png")} />
                <Image left={199} top={198} src={require("../../framework/images/title.png")} />

                <Text left={1895} top={194} value="无故障运行" font="SourceHanSansSC-Light" fontSize={58.39} />
                <Text left={2232} top={174} value={pad(this.state.无故障运行时间, 4)} font="SourceHanSansSC-Bold" fontSize={96.43} color="rgb(102, 224, 250)" />
                <Text left={2494} top={194} value="天" font="SourceHanSansSC-Light" fontSize={58.39} />

                <Container left={199} top={319} background={require("./images/box1.png")} onClick={() => this.context.router.history.replace('/login')}>
                    <Text left={275} top={354} value="清洁能源微网系统" font="SourceHanSansSC-Bold" fontSize={48} />
                    <Image left={859} top={718} src={require("./images/line.gif")} />
                    <Image left={639} top={976} src={require("./images/charging_station.png")} className={style.move} />
                    <Image left={643} top={478} src={require("./images/grid.png")} className={style.move} />
                    <Image left={1675} top={979} src={require("./images/load.png")} className={style.move} />
                    <Image left={1675} top={477} src={require("./images/storage.png")} className={style.move} />
                    <Image left={1159} top={978} src={require("./images/photovoltaic.png")} className={style.move} />
                    <Text left={793} top={1391} value="充电桩" font="SourceHanSansSC-Medium" fontSize={46.24} />
                    <Text left={1277} top={1391} value="光伏发电" font="SourceHanSansSC-Medium" fontSize={46.24} />
                    <Container left={283} top={538} background={require("./images/small_box1.png")}>
                        <Text left={355} top={573} value="电网" font="SourceHanSansSC-Medium" fontSize={46.24} />
                        <Text left={355} top={664} value={`节炭量${toFixed(this.state.节炭量1, 1)}吨`} font="SourceHanSansSC-Light" fontSize={27.69} />
                        <Progress left={355} top={710} width={251} height={9} value={this.state.节炭量1 / 1000 * 100} colorStart="rgb(49, 218, 225)" colorEnd="rgb(16, 181, 115)" />
                        <Text left={355} top={739} value={`节炭量${toFixed(this.state.节炭量2, 1)}吨`} font="SourceHanSansSC-Light" fontSize={27.69} />
                        <Progress left={355} top={785} width={251} height={9} value={this.state.节炭量2 / 1000 * 100} colorStart="rgb(244, 138, 62)" colorEnd="rgb(214, 80, 115)" />
                    </Container>
                    <Container left={1962} top={1059} background={require("./images/small_box2.png")}>
                        <Text left={2296} top={1108} value="负载" font="SourceHanSansSC-Medium" fontSize={46.24} />
                        <Text left={2136} top={1199} value={`1#母线${toFixed(this.state.母线1, 1)}kW`} font="SourceHanSansSC-Light" fontSize={27.69} align="right" width={250} />
                        <Progress left={2136} top={1245} width={251} height={9} value={this.state.母线1 / 1000 * 100} colorStart="rgb(49, 218, 225)" colorEnd="rgb(16, 181, 115)" />
                        <Text left={2136} top={1275} value={`2#母线${toFixed(this.state.母线2, 1)}KW`} font="SourceHanSansSC-Light" fontSize={27.69} align="right" width={250} />
                        <Progress left={2136} top={1322} width={251} height={9} value={this.state.母线2 / 1000 * 100} colorStart="rgb(244, 138, 62)" colorEnd="rgb(214, 80, 115)" />
                    </Container>
                    <Container left={1946} top={540} background={require("./images/small_box2.png")}>
                        <Text left={2299} top={583} value="储能" font="SourceHanSansSC-Medium" fontSize={46.24} />
                        <Text left={2140} top={672} value={`总充电量${toFixed(this.state.总充电量, 1)}kWh`} font="SourceHanSansSC-Light" fontSize={27.69} align="right" width={250} />
                        <Progress left={2140} top={718} width={251} height={9} value={this.state.总充电量 / 2000 * 100} colorStart="rgb(49, 218, 225)" colorEnd="rgb(16, 181, 115)" />
                        <Text left={2140} top={748} value={`总放电量${toFixed(this.state.总放电量, 1)}kWh`} font="SourceHanSansSC-Light" fontSize={27.69} align="right" width={250} />
                        <Progress left={2140} top={794} width={251} height={9} value={this.state.总放电量 / 2000 * 100} colorStart="rgb(244, 138, 62)" colorEnd="rgb(214, 80, 115)" />
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

                    {/* TODO: 修正运行状态错误 */}
                    {this.state.充电1 === 0 ? <Image left={372} top={1782} src={require("./images/charging_arrow.gif")} /> : <Image left={372} top={1796} src={require("./images/discharging_arrow.gif")} />}
                </Container>

                <Container left={2023} top={1506} background={require("./images/box3.png")} onClick={() => window.login && this.context.router.history.replace('/air')}>
                    <Text left={2091} top={1543} value="安防系统" font="SourceHanSansSC-Bold" fontSize={48} />
                    <Text left={2091} top={1661} value="状态" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Switch left={2094} top={1756} src1={require("./images/security_system_normal0.png")} src2={require("./images/security_system_normal1.png")} value={this.state.安防系统状态 === 0} />
                    <Switch left={2338} top={1753} src1={require("./images/security_system_alarm0.png")} src2={require("./images/security_system_alarm1.png")} value={this.state.安防系统状态 !== 0} />
                </Container>

                <Container left={2600} top={99} background={require("./images/box4.png")}>
                    <Text left={2677} top={133} value="电站运行状态" font="SourceHanSansSC-Bold" fontSize={48} />
                    <Switch left={2682} top={251} src1={require("./images/charging.png")} src2={require("./images/discharging.png")} value={this.state.电站运行状态1 === 0} />
                    <Text left={2923} top={287} value={`1# ${this.state.电站运行状态1 === 0 ? '充电' : '放电'}`} font="SourceHanSansSC-Medium" fontSize={40} color={this.state.电站运行状态1 === 0 ? 'rgb(210, 86, 107)' : 'rgb(79, 146, 180)'} />
                    <Switch left={3186} top={251} src1={require("./images/charging.png")} src2={require("./images/discharging.png")} value={this.state.电站运行状态2 === 0} />
                    <Text left={3426} top={287} value={`2# ${this.state.电站运行状态2 === 0 ? '充电' : '放电'}`} font="SourceHanSansSC-Medium" fontSize={40} color={this.state.电站运行状态2 === 0 ? 'rgb(210, 86, 107)' : 'rgb(79, 146, 180)'} />
                </Container>

                <Container left={2600} top={429} background={require("./images/box5.png")}>
                    <Text left={2677} top={470} value="电站节能总费用" font="SourceHanSansSC-Bold" fontSize={48} />
                    <Image left={3341} top={536} src={require("./images/money.gif")} />
                    <Text left={2676} top={600} value={`${toFixed(this.state.节能总费用, 0)}`} font="SourceHanSansSC-Heavy" fontSize={146} />
                    <Text left={3190} top={648} value="元" font="SourceHanSansSC-Regular" fontSize={72} color="rgb(60, 211, 238)" />
                </Container>

                <Container left={2600} top={802} background={require("./images/box6.png")}>
                    <Text left={2678} top={840} value="日充/放功率" font="SourceHanSansSC-Bold" fontSize={48} />
                    <Text left={2678} top={993} value="1#充/放电功率" font="SourceHanSansSC-Regular" fontSize={32} />
                    <Container left={2936} top={969} background={require("./images/tip.png")}>
                        <Text left={2936} top={983} width={158} value={`${toFixed(this.state.充放电功率1, 0)}kW`} font="SourceHanSansSC-Bold" fontSize={41} align="center" />
                    </Container>
                    <BarChart left={2678} top={1050} width={429} height={120} color="rgba(68,175,244,0.8)" data={this.state.充放电功率曲线1} />

                    <Text left={2678} top={1224} value="2#充/放电功率" font="SourceHanSansSC-Regular" fontSize={32} />
                    <Container left={2936} top={1203} background={require("./images/tip.png")}>
                        <Text left={2936} top={1217} width={158} value={`${toFixed(this.state.充放电功率2, 0)}kW`} font="SourceHanSansSC-Bold" fontSize={41} align="center" />
                    </Container>
                    <BarChart left={2678} top={1284} width={429} height={120} color="rgba(68,175,244,0.8)" data={this.state.充放电功率曲线2} />

                    <Text left={3146} top={993} value="1#并网点需求" font="SourceHanSansSC-Regular" fontSize={32} />
                    <Container left={3405} top={969} background={require("./images/tip.png")}>
                        <Text left={3405} top={983} width={158} value={`${toFixed(this.state.并网点需求1, 0)}kW`} font="SourceHanSansSC-Bold" fontSize={41} align="center" />
                    </Container>
                    <BarChart left={3146} top={1050} width={429} height={120} color="rgba(68,175,244,0.8)" data={this.state.并网点需求曲线1} />

                    <Text left={3146} top={1224} value="2#并网点需求" font="SourceHanSansSC-Regular" fontSize={32} />
                    <Container left={3405} top={1203} background={require("./images/tip.png")}>
                        <Text left={3405} top={1217} width={158} value={`${toFixed(this.state.并网点需求2, 0)}kW`} font="SourceHanSansSC-Bold" fontSize={41} align="center" />
                    </Container>
                    <BarChart left={3146} top={1284} width={429} height={120} color="rgba(68,175,244,0.8)" data={this.state.并网点需求曲线2} />
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
