import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '~/components/baseComponent';
import Text from '~/app/components/text';
import Image from '~/app/components/image';
import Container from '~/app/components/container';
import Switch from '~/app/components/switch';
import Progress from '~/app/components/lineProgress';
import BarChart from '~/app/components/barChart';
import LineChart from '~/app/components/lineChart';
import Dialog from '~/app/components/dialog';
import { toFixed } from '~/misc/number';
import { getRandom } from '~/misc/random';
import { getPcsData } from '~/api/v1/board';
import style from './index.scss';

/**
 * PCS视图
 *
 * @export
 * @class Pcs
 * @extends {BaseComponent}
 */
export default class Pcs extends BaseComponent {
    static contextTypes = {
        router: PropTypes.object // 路由
    }

    state = {
        PCS1状态: 0,
        PCS2状态: 0,
        电站运行状态1: 0,
        电站运行状态2: 0,
        日充电电量1: 3600,
        日放电电量1: 3600,
        日充电电量2: 3600,
        日放电电量2: 3600,
        日充放电功率1: 360,
        日充放电功率2: 360,
        日充电电量曲线1: null,
        日放电电量曲线1: null,
        日充电电量曲线2: null,
        日放电电量曲线2: null,
        日充放电功率曲线1: null,
        日充放电功率曲线2: null,
        直流电压1: 220,
        直流电压2: 220,
        直流电流1: 50,
        直流电流2: 50,
        交流电压1: 50,
        交流电压2: 50,
        showDialog1: false,
        showDialog2: false,
        showDialog3: false,
        showDialog4: false,
        showDialog5: false,
        showDialog6: false
    }

    constructor(props) {
        super(props);
        this.setLoadingState(true);
        this._loadData();
    }

    componentDidMount() {
        super.componentDidMount();
        this.timer = setInterval(() => {
            this._loadData();
        }, 2000);
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
        super.componentWillUnmount();
    }

    _render() {
        return (
            <Container width={3840} height={2160}>
                {/* 
                <Image left={200} top={173} src={require("../../framework/images/logo.png")} />
                <Image left={902} top={184} src={require("../../framework/images/title.png")} />
                */}
                <Image left={3070} top={2026} src={require("../../framework/images/logo.png")} />
                <Image left={200} top={184} src={require("../../framework/images/title.png")} />
                <Image left={3084} top={182} src={require("../../framework/images/back.png")} onClick={() => this.context.router.history.replace('/overview')} />

                <Container left={200} top={393} background={require("./images/box1.png")}>
                    <Text left={279} top={433} value="PCS&nbsp;1" font="SourceHanSansSC-Medium" fontSize={48} />
                    <Image left={281} top={707} src={require("./images/img1.png")} className={style.move} />
                </Container>
                <Container left={3003} top={393} background={require("./images/box1.png")}>
                    <Text left={3085} top={433} value="PCS&nbsp;2" font="SourceHanSansSC-Medium" fontSize={48} />
                    <Image left={3086} top={707} src={require("./images/img1.png")} className={style.move} />
                </Container>
                <Container left={200} top={1500} background={require("./images/box2.png")}>
                    <Text left={281} top={1535} value="PCS1状态" font="SourceHanSansSC-Medium" fontSize={48} />
                    <Switch left={281} top={1673} src1={require("./images/grid_state_normal0.png")} src2={require("./images/grid_state_normal1.png")} value={this.state.PCS1状态 === 0} />
                    <Switch left={476} top={1674} src1={require("./images/grid_state_alarm0.png")} src2={require("./images/grid_state_alarm1.png")} value={this.state.PCS1状态 === 1} />
                    <Switch left={663} top={1675} src1={require("./images/grid_state_fault0.png")} src2={require("./images/grid_state_fault1.png")} value={this.state.PCS1状态 === 2} />
                </Container>
                <Container left={3006} top={1500} background={require("./images/box2.png")}>
                    <Text left={3097} top={1535} value="PCS2状态" font="SourceHanSansSC-Medium" fontSize={48} />
                    <Switch left={3086} top={1673} src1={require("./images/grid_state_normal0.png")} src2={require("./images/grid_state_normal1.png")} value={this.state.PCS2状态 === 0} />
                    <Switch left={3284} top={1674} src1={require("./images/grid_state_alarm0.png")} src2={require("./images/grid_state_alarm1.png")} value={this.state.PCS2状态 === 1} />
                    <Switch left={3479} top={1675} src1={require("./images/grid_state_fault0.png")} src2={require("./images/grid_state_fault1.png")} value={this.state.PCS2状态 === 2} />
                </Container>

                <Container left={943} top={393} background={require("./images/box3.png")}>
                    <Text left={1022} top={428} value="1#储能电站" font="SourceHanSansSC-Medium" fontSize={48} />
                    <Switch left={1024} top={547} src1={require("./images/charging0.png")} src2={require("./images/charging1.png")} value={this.state.电站运行状态1 === 0} />
                    <Text left={1223} top={575} value={this.state.电站运行状态1 !== 2 ? '充电' : '待机'} font="SourceHanSansSC-Medium" fontSize={40} color={this.state.电站运行状态1 === 0 ? 'rgb(210, 86, 107)' : 'rgb(65, 82, 98)'} />
                    <Switch left={1474} top={547} src1={require("./images/discharging0.png")} src2={require("./images/discharging1.png")} value={this.state.电站运行状态1 === 1} />
                    <Text left={1671} top={575} value={this.state.电站运行状态1 !== 2 ? '放电' : '待机'} font="SourceHanSansSC-Medium" fontSize={40} color={this.state.电站运行状态1 === 1 ? 'rgb(68, 205, 103)' : 'rgb(65, 82, 98)'} />
                </Container>
                <Container left={1960} top={393} background={require("./images/box3.png")}>
                    <Text left={2037} top={428} value="2#储能电站" font="SourceHanSansSC-Medium" fontSize={48} />
                    <Switch left={2029} top={547} src1={require("./images/charging0.png")} src2={require("./images/charging1.png")} value={this.state.电站运行状态2 === 0} />
                    <Text left={2226} top={575} value={this.state.电站运行状态2 !== 2 ? '充电' : '待机'} font="SourceHanSansSC-Medium" fontSize={40} color={this.state.电站运行状态2 === 0 ? 'rgb(210, 86, 107)' : 'rgb(65, 82, 98)'} />
                    <Switch left={2479} top={547} src1={require("./images/discharging0.png")} src2={require("./images/discharging1.png")} value={this.state.电站运行状态2 === 1} />
                    <Text left={2676} top={575} value={this.state.电站运行状态2 !== 2 ? '放电' : '待机'} font="SourceHanSansSC-Medium" fontSize={40} color={this.state.电站运行状态2 === 1 ? 'rgb(68, 205, 103)' : 'rgb(65, 82, 98)'} />
                </Container>

                <Container left={943} top={707} background={require("./images/box3.png")} onClick={() => this.setState({ showDialog1: true })}>
                    <Text left={1022} top={742} value="日充电电量" font="SourceHanSansSC-Medium" fontSize={48} />
                    <Text left={1700} top={866} value={`${toFixed(this.state.日充电电量1, 0)}`} font="SourceHanSansSC-Heavy" fontSize={45} />
                    <Text left={1700} top={918} value="kWh" font="SourceHanSansSC-Heavy" fontSize={45} />
                    <BarChart left={1026} top={861} width={637} height={115} color="rgba(184,87,100,0.8)" data={this.state.日充电电量曲线1} maxTicksLimitX={7} />
                </Container>
                <Container left={1960} top={707} background={require("./images/box3.png")} onClick={() => this.setState({ showDialog2: true })}>
                    <Text left={2043} top={742} value="日充电电量" font="SourceHanSansSC-Medium" fontSize={48} />
                    <Text left={2717} top={866} value={`${toFixed(this.state.日充电电量2, 0)}`} font="SourceHanSansSC-Heavy" fontSize={45} />
                    <Text left={2717} top={918} value="kWh" font="SourceHanSansSC-Heavy" fontSize={45} />
                    <BarChart left={2043} top={861} width={637} height={115} color="rgba(184,87,100,0.8)" data={this.state.日充电电量曲线2} maxTicksLimitX={7} />
                </Container>

                <Container left={943} top={1019} background={require("./images/box3.png")} onClick={() => this.setState({ showDialog3: true })}>
                    <Text left={1022} top={1054} value="日放电电量" font="SourceHanSansSC-Medium" fontSize={48} />
                    <Text left={1700} top={1179} value={`${toFixed(this.state.日放电电量1, 0)}`} font="SourceHanSansSC-Heavy" fontSize={45} />
                    <Text left={1700} top={1229} value="kWh" font="SourceHanSansSC-Heavy" fontSize={45} />
                    <BarChart left={1026} top={1173} width={637} height={115} color="rgba(221,178,38,0.8)" data={this.state.日放电电量曲线1} maxTicksLimitX={7} />
                </Container>
                <Container left={1960} top={1019} background={require("./images/box3.png")} onClick={() => this.setState({ showDialog4: true })}>
                    <Text left={2043} top={1054} value="日放电电量" font="SourceHanSansSC-Medium" fontSize={48} />
                    <Text left={2717} top={1179} value={`${toFixed(this.state.日放电电量2, 0)}`} font="SourceHanSansSC-Heavy" fontSize={45} />
                    <Text left={2717} top={1229} value="kWh" font="SourceHanSansSC-Heavy" fontSize={45} />
                    <BarChart left={2043} top={1173} width={637} height={115} color="rgba(221,178,38,0.8)" data={this.state.日放电电量曲线2} maxTicksLimitX={7} />
                </Container>

                <Container left={943} top={1334} background={require("./images/box3.png")} onClick={() => this.setState({ showDialog5: true })}>
                    <Text left={1022} top={1369} value="日充/放电功率" font="SourceHanSansSC-Medium" fontSize={48} />
                    <Text left={1700} top={1494} value={`${toFixed(this.state.日充放电功率1, 0)}`} font="SourceHanSansSC-Heavy" fontSize={45} />
                    <Text left={1700} top={1553} value="kW" font="SourceHanSansSC-Heavy" fontSize={45} />
                    <LineChart left={1026} top={1488} width={637} height={115} color="rgba(31,210,169,0.8)" data={this.state.日充放电功率曲线1} maxTicksLimitX={12} suggestedMin={-250} suggestedMax={250} />
                </Container>
                <Container left={1960} top={1334} background={require("./images/box3.png")} onClick={() => this.setState({ showDialog6: true })}>
                    <Text left={2043} top={1369} value="日充/放电功率" font="SourceHanSansSC-Medium" fontSize={48} />
                    <Text left={2717} top={1494} value={`${toFixed(this.state.日充放电功率2, 0)}`} font="SourceHanSansSC-Heavy" fontSize={45} />
                    <Text left={2717} top={1553} value="kW" font="SourceHanSansSC-Heavy" fontSize={45} />
                    <LineChart left={2043} top={1488} width={637} height={115} color="rgba(31,210,169,0.8)" data={this.state.日充放电功率曲线2} maxTicksLimitX={12} suggestedMin={-250} suggestedMax={250} />
                </Container>

                <Container left={943} top={1646} background={require("./images/box4.png")}>
                    <Text left={1024} top={1690} value="直流电压" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={1299} top={1690} value="直流电流" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={1588} top={1690} value="交流电流" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Container left={1024} top={1771} background={require("./images/tip.png")}>
                        <Text left={1024} top={1783} width={150} value={`${toFixed(this.state.直流电压1, 0)}V`} font="SourceHanSansSC-Bold" fontSize={41} align="center" />
                    </Container>
                    <Container left={1299} top={1771} background={require("./images/tip.png")}>
                        <Text left={1299} top={1783} width={150} value={`${toFixed(this.state.直流电流1, 0)}A`} font="SourceHanSansSC-Bold" fontSize={41} align="center" />
                    </Container>
                    <Container left={1588} top={1771} background={require("./images/tip.png")}>
                        <Text left={1588} top={1783} width={150} value={`${toFixed(this.state.交流电压1, 0)}A`} font="SourceHanSansSC-Bold" fontSize={41} align="center" />
                    </Container>
                    <Progress left={1024} top={1850} width={221} height={14} value={this.state.直流电压1 / 400 * 100} colorStart="rgb(244, 138, 62)" colorEnd="rgb(214, 80, 115)" />
                    <Progress left={1299} top={1850} width={221} height={14} value={this.state.直流电流1 / 200 * 100} colorStart="rgb(244, 138, 62)" colorEnd="rgb(214, 80, 115)" />
                    <Progress left={1588} top={1850} width={221} height={14} value={this.state.交流电压1 / 200 * 100} colorStart="rgb(244, 138, 62)" colorEnd="rgb(214, 80, 115)" />
                </Container>
                <Container left={1960} top={1646} background={require("./images/box4.png")}>
                    <Text left={2041} top={1690} value="直流电压" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={2316} top={1690} value="直流电流" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={2605} top={1690} value="交流电流" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Container left={2041} top={1771} background={require("./images/tip.png")}>
                        <Text left={2041} top={1783} width={150} value={`${toFixed(this.state.直流电压2, 0)}V`} font="SourceHanSansSC-Bold" fontSize={41} align="center" />
                    </Container>
                    <Container left={2316} top={1771} background={require("./images/tip.png")}>
                        <Text left={2316} top={1783} width={150} value={`${toFixed(this.state.直流电流2, 0)}A`} font="SourceHanSansSC-Bold" fontSize={41} align="center" />
                    </Container>
                    <Container left={2605} top={1771} background={require("./images/tip.png")}>
                        <Text left={2605} top={1783} width={150} value={`${toFixed(this.state.交流电压2, 0)}A`} font="SourceHanSansSC-Bold" fontSize={41} align="center" />
                    </Container>
                    <Progress left={2041} top={1850} width={221} height={14} value={this.state.直流电压2 / 400 * 100} colorStart="rgb(244, 138, 62)" colorEnd="rgb(214, 80, 115)" />
                    <Progress left={2316} top={1850} width={221} height={14} value={this.state.直流电流2 / 200 * 100} colorStart="rgb(244, 138, 62)" colorEnd="rgb(214, 80, 115)" />
                    <Progress left={2605} top={1850} width={221} height={14} value={this.state.交流电压2 / 200 * 100} colorStart="rgb(244, 138, 62)" colorEnd="rgb(214, 80, 115)" />
                </Container>

                {this.state.showDialog1 && this._onDialog1()}
                {this.state.showDialog2 && this._onDialog2()}
                {this.state.showDialog3 && this._onDialog3()}
                {this.state.showDialog4 && this._onDialog4()}
                {this.state.showDialog5 && this._onDialog5()}
                {this.state.showDialog6 && this._onDialog6()}
            </Container>
        );
    }

    /**
     * 加载数据
     *
     * @memberof Pcs
     */
    _loadData() {
        if (process.env.NODE_ENV === 'development') {
            const data = {
                PCS1状态: getRandom(0, 1),
                PCS2状态: getRandom(0, 1),
                电站运行状态1: getRandom(0, 1),
                电站运行状态2: getRandom(0, 1),
                日充电电量1: getRandom(3000, 4000),
                日放电电量1: getRandom(3000, 4000),
                日充电电量2: getRandom(3000, 4000),
                日放电电量2: getRandom(3000, 4000),
                日充放电功率1: getRandom(200, 400),
                日充放电功率2: getRandom(200, 400),
                日充电电量曲线1: null,
                日放电电量曲线1: null,
                日充电电量曲线2: null,
                日放电电量曲线2: null,
                日充放电功率曲线1: null,
                日充放电功率曲线2: null,
                直流电压1: getRandom(200, 230),
                直流电压2: getRandom(200, 230),
                直流电流1: getRandom(30, 60),
                直流电流2: getRandom(30, 60),
                交流电压1: getRandom(30, 60),
                交流电压2: getRandom(30, 60)
            };
            this.setLoadingState(false);
            this.setState(data);
        }
        else {
            getPcsData(pcs => {
                const data = {};
                data.电站运行状态1 = pcs.state1;
                data.电站运行状态2 = pcs.state2;
                data.PCS1状态 = pcs.gridState1;
                data.PCS2状态 = pcs.gridState2;
                data.日充电电量1 = pcs.chargingElectricity1;
                data.日放电电量1 = pcs.dischargingElectricity1;
                data.日充电电量2 = pcs.chargingElectricity2;
                data.日放电电量2 = pcs.dischargingElectricity2;
                data.日充放电功率1 = pcs.electricity1;
                data.日充放电功率2 = pcs.electricity2;
                data.日充电电量曲线1 = pcs.chargingElectricityData1;
                data.日放电电量曲线1 = pcs.dischargingElectricityData1;
                data.日充电电量曲线2 = pcs.chargingElectricityData2;
                data.日放电电量曲线2 = pcs.dischargingElectricityData2;
                data.日充放电功率曲线1 = pcs.electricityData1;
                data.日充放电功率曲线2 = pcs.electricityData2;
                data.直流电压1 = pcs.voltage11;
                data.直流电压2 = pcs.voltage21;
                data.直流电流1 = pcs.current1;
                data.直流电流2 = pcs.current2;
                data.交流电压1 = pcs.voltage21;
                data.交流电压2 = pcs.voltage22;
                this.setLoadingState(false);
                this.setState(data);
            });
        }
    }

    /**
     * 获取日充电电量界面
     *
     * @returns 日充电电量界面
     * @memberof Pcs
     */
    _onDialog1() {
        return (
            <Dialog onClick={() => this.setState({ showDialog1: false })}>
                <Container left={1039} top={694} background={require("./images/box5.png")}>
                    <Text left={1791} top={745} value="日充电电量" font="SourceHanSansSC-Bold" fontSize={60} />

                    <Container left={2210} top={907} background={require("./images/tip1.png")}>
                        <Text left={2210} top={939} width={373} value={`${toFixed(this.state.日充电电量1, 0)}`} suffix="kWh" font="SourceHanSansSC-Heavy" weight="bold" fontSize={94} suffixFontSize={62} align="center" />
                    </Container>
                    <BarChart left={1202} top={1103} width={1417} height={422} color="rgba(68,175,244,0.8)" data={this.state.日充电电量曲线1} maxTicksLimitX={7} />
                </Container>
            </Dialog>
        );
    }

    /**
     * 获取日充电电量界面
     *
     * @returns 日充电电量界面
     * @memberof Pcs
     */
    _onDialog2() {
        return (
            <Dialog onClick={() => this.setState({ showDialog2: false })}>
                <Container left={1039} top={694} background={require("./images/box5.png")}>
                    <Text left={1791} top={745} value="日充电电量" font="SourceHanSansSC-Bold" fontSize={60} />

                    <Container left={2210} top={907} background={require("./images/tip1.png")}>
                        <Text left={2210} top={939} width={373} value={`${toFixed(this.state.日充电电量2, 0)}`} suffix="kWh" font="SourceHanSansSC-Heavy" weight="bold" fontSize={94} suffixFontSize={62} align="center" />
                    </Container>
                    <BarChart left={1202} top={1103} width={1417} height={422} color="rgba(68,175,244,0.8)" data={this.state.日充电电量曲线2} maxTicksLimitX={7} />
                </Container>
            </Dialog>
        );
    }

    /**
     * 获取日放电电量界面
     *
     * @returns 日放电电量界面
     * @memberof Pcs
     */
    _onDialog3() {
        return (
            <Dialog onClick={() => this.setState({ showDialog3: false })}>
                <Container left={1039} top={694} background={require("./images/box5.png")}>
                    <Text left={1791} top={745} value="日放电电量" font="SourceHanSansSC-Bold" fontSize={60} />

                    <Container left={2210} top={907} background={require("./images/tip1.png")}>
                        <Text left={2210} top={939} width={373} value={`${toFixed(this.state.日放电电量1, 0)}`} suffix="kWh" font="SourceHanSansSC-Heavy" weight="bold" fontSize={94} suffixFontSize={62} align="center" />
                    </Container>
                    <BarChart left={1202} top={1103} width={1417} height={422} color="rgba(68,175,244,0.8)" data={this.state.日放电电量曲线1} maxTicksLimitX={7} />
                </Container>
            </Dialog>
        );
    }

    /**
     * 获取日放电电量界面
     *
     * @returns 日放电电量界面
     * @memberof Pcs
     */
    _onDialog4() {
        return (
            <Dialog onClick={() => this.setState({ showDialog4: false })}>
                <Container left={1039} top={694} background={require("./images/box5.png")}>
                    <Text left={1791} top={745} value="日放电电量" font="SourceHanSansSC-Bold" fontSize={60} />

                    <Container left={2210} top={907} background={require("./images/tip1.png")}>
                        <Text left={2210} top={939} width={373} value={`${toFixed(this.state.日放电电量2, 0)}`} suffix="kWh" font="SourceHanSansSC-Heavy" weight="bold" fontSize={94} suffixFontSize={62} align="center" />
                    </Container>
                    <BarChart left={1202} top={1103} width={1417} height={422} color="rgba(68,175,244,0.8)" data={this.state.日放电电量曲线2} maxTicksLimitX={7} />
                </Container>
            </Dialog>
        );
    }

    /**
     * 获取日放电功率界面
     *
     * @returns 日放电功率界面
     * @memberof Pcs
     */
    _onDialog5() {
        return (
            <Dialog onClick={() => this.setState({ showDialog5: false })}>
                <Container left={1039} top={694} background={require("./images/box5.png")}>
                    <Text left={1791} top={745} value="日放电功率" font="SourceHanSansSC-Bold" fontSize={60} />

                    <Container left={2210} top={907} background={require("./images/tip1.png")}>
                        <Text left={2210} top={939} width={373} value={`${toFixed(this.state.日充放电功率1, 0)}`} suffix="kWh" font="SourceHanSansSC-Heavy" weight="bold" fontSize={94} suffixFontSize={62} align="center" />
                    </Container>
                    <LineChart left={1202} top={1103} width={1417} height={422} color="rgba(68,175,244,0.8)" data={this.state.日充放电功率曲线1} maxTicksLimitX={12} suggestedMin={-250} suggestedMax={250} />
                </Container>
            </Dialog>
        );
    }

    /**
     * 获取日放电功率界面
     *
     * @returns 日放电功率界面
     * @memberof Pcs
     */
    _onDialog6() {
        return (
            <Dialog onClick={() => this.setState({ showDialog6: false })}>
                <Container left={1039} top={694} background={require("./images/box5.png")}>
                    <Text left={1791} top={745} value="日放电功率" font="SourceHanSansSC-Bold" fontSize={60} />

                    <Container left={2210} top={907} background={require("./images/tip1.png")}>
                        <Text left={2210} top={939} width={373} value={`${toFixed(this.state.日充放电功率2, 0)}`} suffix="kWh" font="SourceHanSansSC-Heavy" weight="bold" fontSize={94} suffixFontSize={62} align="center" />
                    </Container>
                    <LineChart left={1202} top={1103} width={1417} height={422} color="rgba(68,175,244,0.8)" data={this.state.日充放电功率曲线2} maxTicksLimitX={12} suggestedMin={-250} suggestedMax={250} />
                </Container>
            </Dialog>
        );
    }
}
