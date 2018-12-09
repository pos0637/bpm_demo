import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '~/components/baseComponent';
import Text from '~/app/components/text';
import Image from '~/app/components/image';
import Container from '~/app/components/container';
import Progress from '~/app/components/lineProgress';
import Switch from '~/app/components/switch';
import { toFixed } from '~/misc/number';

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
        放电2: 1,
        节能总费用: 26000,
        今日充电总量1: 1660,
        今日放电总量1: 960,
        今日充电总量2: 1660,
        今日放电总量2: 960,
    }

    componentDidMount() {
        super.componentDidMount();
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
        super.componentWillUnmount();
    }

    render() {
        return (
            <div style={{ position: 'absolute', width: '3840px', height: '2160px' }}>
                <Text left={1895} top={194} value="无故障运行&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;天" font="SourceHanSansSC-Light" fontSize={58.39} />
                <Text left={2232} top={174} value={this.state.无故障运行时间} font="SourceHanSansSC-Bold" fontSize={96.43} color="rgb(102, 224, 250)" />

                <Container left={172} top={304} background={require("./images/box1.png")}>
                    <Text left={275} top={354} value="清洁能源微网系统" font="SourceHanSansSC-Bold" fontSize={48} />
                    <Image left={350} top={682} src={require("./images/line.png")} />
                    <Image left={298} top={944} src={require("./images/charging_station.png")} />
                    <Image left={610} top={489} src={require("./images/grid.png")} />
                    <Image left={1295} top={866} src={require("./images/load.png")} />
                    <Image left={1710} top={447} src={require("./images/storage.png")} />
                    <Image left={1963} top={993} src={require("./images/photovoltaic.png")} />
                    <Text left={477} top={1392} value="充电桩" font="SourceHanSansSC-Medium" fontSize={46.24} />
                    <Text left={2117} top={1392} value="光伏发电" font="SourceHanSansSC-Medium" fontSize={46.24} />
                    <Container left={280} top={531} background={require("./images/small_box1.png")}>
                        <Text left={352} top={566} value="电网" font="SourceHanSansSC-Medium" fontSize={46.24} />
                        <Text left={351} top={657} value={`节炭量${toFixed(this.state.节炭量1, 1)}吨`} font="SourceHanSansSC-Light" fontSize={27.69} />
                        <Progress left={351} top={703} width={251} height={9} value={this.state.节炭量1} />
                        <Text left={351} top={732} value={`节炭量${toFixed(this.state.节炭量2, 1)}吨`} font="SourceHanSansSC-Light" fontSize={27.69} />
                        <Progress left={352} top={778} width={251} height={9} value={this.state.节炭量2} />
                    </Container>
                    <Container left={1020} top={1046} background={require("./images/small_box1.png")}>
                        <Text left={1099} top={1081} value="负载" font="SourceHanSansSC-Medium" fontSize={46.24} />
                        <Text left={1099} top={1177} value={`1#母线${toFixed(this.state.母线1, 1)}kW`} font="SourceHanSansSC-Light" fontSize={27.69} />
                        <Progress left={1099} top={1223} width={251} height={9} value={this.state.母线1} />
                        <Text left={1099} top={1253} value={`2#母线${toFixed(this.state.母线2, 1)}KW`} font="SourceHanSansSC-Light" fontSize={27.69} />
                        <Progress left={1099} top={1299} width={251} height={9} value={this.state.母线2} />
                    </Container>
                    <Container left={1979} top={532} background={require("./images/small_box2.png")}>
                        <Text left={2332} top={575} value="负载" font="SourceHanSansSC-Medium" fontSize={46.24} />
                        <Text left={2177} top={664} value={`总充电量${toFixed(this.state.总充电量, 1)}kWh`} font="SourceHanSansSC-Light" fontSize={27.69} align="right" width={246} />
                        <Progress left={2173} top={710} width={251} height={9} value={this.state.总充电量} />
                        <Text left={2177} top={740} value={`总放电量${toFixed(this.state.总放电量, 1)}kWh`} font="SourceHanSansSC-Light" fontSize={27.69} align="right" width={246} />
                        <Progress left={2173} top={786} width={251} height={9} value={this.state.总放电量} />
                    </Container>
                </Container>

                <Container left={172} top={1491} background={require("./images/box2.png")}>
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

                    {/* TODO: animation */}
                    <Image left={372} top={1782} src={require("./images/charging_arrow.png")} />
                    <Image left={372} top={1796} src={require("./images/discharging_arrow.png")} />
                </Container>

                <Container left={2024} top={1491} background={require("./images/box3.png")}>
                    <Text left={2091} top={1543} value="安防系统" font="SourceHanSansSC-Bold" fontSize={48} />
                    <Text left={2091} top={1661} value="状态" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Switch left={2094} top={1756} src1={require("./images/security_system_normal0.png")} src2={require("./images/security_system_normal1.png")} value={this.state.安防系统状态 === 0} />
                    <Switch left={2338} top={1753} src1={require("./images/security_system_alarm0.png")} src2={require("./images/security_system_alarm1.png")} value={this.state.安防系统状态 !== 0} />
                </Container>

                <Container left={2575} top={84} background={require("./images/box4.png")}>
                    <Text left={2677} top={133} value="电站运行状态" font="SourceHanSansSC-Bold" fontSize={48} />
                    <Switch left={2682} top={251} src1={require("./images/charging0.png")} src2={require("./images/charging1.png")} value={this.state.充电1 === 0} />
                    <Switch left={3187} top={251} src1={require("./images/discharging0.png")} src2={require("./images/discharging1.png")} value={this.state.放电2 === 0} />
                </Container>

                <Container left={2575} top={419} background={require("./images/box5.png")}>
                    <Text left={2677} top={470} value="电站节能总费用" font="SourceHanSansSC-Bold" fontSize={48} />
                    <Image left={3341} top={536} src={require("./images/money.gif")} />
                    <Text left={2676} top={600} value={`${toFixed(this.state.节能总费用, 0)}`} font="SourceHanSansSC-Heavy" fontSize={146} />
                    <Text left={3190} top={648} value="元" font="SourceHanSansSC-Regular" fontSize={72} color="rgb(60, 211, 238)" />
                </Container>

                <Container left={2575} top={791} background={require("./images/box6.png")}>
                    <Text left={2677} top={840} value="日充/放电量" font="SourceHanSansSC-Bold" fontSize={48} />
                    <Text left={2679} top={1005} value="1#" font="SourceHanSansSC-Medium" fontSize={40} />
                    <Text left={2776} top={995} value="今日充电总量" font="SourceHanSansSC-Heavy" fontSize={48} />
                    <Text left={2776} top={1055} value={`${toFixed(this.state.今日充电总量1, 1)}kWh`} font="SourceHanSansSC-Heavy" fontSize={48} />
                    <Progress left={2775} top={1131} width={251} height={9} value={this.state.今日充电总量1} />
                    <Text left={3241} top={995} value="今日放电总量" font="SourceHanSansSC-Heavy" fontSize={48} />
                    <Text left={3241} top={1055} value={`${toFixed(this.state.今日放电总量1, 1)}kWh`} font="SourceHanSansSC-Heavy" fontSize={48} />
                    <Progress left={3240} top={1131} width={251} height={9} value={this.state.今日放电总量1} />

                    <Text left={2684} top={1254} value="2#" font="SourceHanSansSC-Medium" fontSize={40} />
                    <Text left={2782} top={1245} value="今日充电总量" font="SourceHanSansSC-Heavy" fontSize={48} />
                    <Text left={2782} top={1305} value={`${toFixed(this.state.今日充电总量2, 1)}kWh`} font="SourceHanSansSC-Heavy" fontSize={48} />
                    <Progress left={2775} top={1381} width={251} height={9} value={this.state.今日充电总量2} />
                    <Text left={3247} top={1245} value="今日放电总量" font="SourceHanSansSC-Heavy" fontSize={48} />
                    <Text left={3247} top={1305} value={`${toFixed(this.state.今日放电总量2, 1)}kWh`} font="SourceHanSansSC-Heavy" fontSize={48} />
                    <Progress left={3240} top={1381} width={251} height={9} value={this.state.今日放电总量2} />
                </Container>

                <Container left={2575} top={1491} background={require("./images/box7.png")}>
                    <Text left={2677} top={1543} value="充放电量曲线" font="SourceHanSansSC-Bold" fontSize={48} />
                    <Text left={2673} top={1665} value="1#系统" font="SourceHanSansSC-Heavy" fontSize={48} />
                    <Text left={3129} top={1665} value="2#系统" font="SourceHanSansSC-Heavy" fontSize={48} />
                </Container>
            </div>
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
