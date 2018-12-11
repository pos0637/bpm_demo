import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '~/components/baseComponent';
import Text from '~/app/components/text';
import Image from '~/app/components/image';
import Container from '~/app/components/container';
import Switch from '~/app/components/switch';
import Progress from '~/app/components/lineProgress';
import BarChart from '~/app/components/barChart';
import Dialog from '~/app/components/dialog';
import { toFixed } from '~/misc/number';
import { getRandom } from '~/misc/random';
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
        电网状态1: 0,
        电网状态2: 0,
        充电1: 0,
        充电2: 0,
        日充电电量1: 3600,
        日放电电量1: 3600,
        日充电电量2: 3600,
        日放电电量2: 3600,
        日放电功率1: 360,
        日放电功率2: 360,
        直流电压1: 220,
        直流电压2: 220,
        直流电流1: 50,
        直流电流2: 50,
        逆变电流1: 50,
        逆变电流2: 50,
        showDialog1: false,
        showDialog2: false,
        showDialog3: false,
        showDialog4: false,
        showDialog5: false,
        showDialog6: false
    }

    componentDidMount() {
        super.componentDidMount();
        this.timer = setInterval(() => {
            const data = {
                电网状态1: getRandom(0, 1),
                电网状态2: getRandom(0, 1),
                充电1: getRandom(0, 1),
                充电2: getRandom(0, 1),
                日充电电量1: getRandom(3000, 4000),
                日放电电量1: getRandom(3000, 4000),
                日充电电量2: getRandom(3000, 4000),
                日放电电量2: getRandom(3000, 4000),
                日放电功率1: getRandom(200, 400),
                日放电功率2: getRandom(200, 400),
                直流电压1: getRandom(200, 230),
                直流电压2: getRandom(200, 230),
                直流电流1: getRandom(30, 60),
                直流电流2: getRandom(30, 60),
                逆变电流1: getRandom(30, 60),
                逆变电流2: getRandom(30, 60)
            };

            this.setState(data);
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
                <Image left={3084} top={182} src={require("../../framework/images/back.png")} onClick={() => this.context.router.history.replace('/overview')} />

                <Container left={173} top={378} background={require("./images/box1.png")}>
                    <Text left={279} top={433} value="PCS&nbsp;1" font="SourceHanSansSC-Medium" fontSize={48} />
                    <Image left={251} top={726} src={require("./images/img1.png")} className={style.move} />
                </Container>
                <Container left={3003} top={378} background={require("./images/box1.png")}>
                    <Text left={3085} top={433} value="PCS&nbsp;2" font="SourceHanSansSC-Medium" fontSize={48} />
                    <Image left={3053} top={726} src={require("./images/img1.png")} className={style.move} />
                </Container>
                <Container left={173} top={1485} background={require("./images/box2.png")}>
                    <Text left={281} top={1535} value="电网数据" font="SourceHanSansSC-Medium" fontSize={48} />
                    <Switch left={281} top={1673} src1={require("./images/grid_state_normal0.png")} src2={require("./images/grid_state_normal1.png")} value={this.state.电网状态1 === 0} />
                    <Switch left={476} top={1674} src1={require("./images/grid_state_alarm0.png")} src2={require("./images/grid_state_alarm1.png")} value={this.state.电网状态1 === 1} />
                    <Switch left={663} top={1675} src1={require("./images/grid_state_fault0.png")} src2={require("./images/grid_state_fault1.png")} value={this.state.电网状态1 === 2} />
                </Container>
                <Container left={3006} top={1485} background={require("./images/box2.png")}>
                    <Text left={3097} top={1535} value="电网数据" font="SourceHanSansSC-Medium" fontSize={48} />
                    <Switch left={3086} top={1673} src1={require("./images/grid_state_normal0.png")} src2={require("./images/grid_state_normal1.png")} value={this.state.电网状态2 === 0} />
                    <Switch left={3284} top={1674} src1={require("./images/grid_state_alarm0.png")} src2={require("./images/grid_state_alarm1.png")} value={this.state.电网状态2 === 1} />
                    <Switch left={3479} top={1675} src1={require("./images/grid_state_fault0.png")} src2={require("./images/grid_state_fault1.png")} value={this.state.电网状态2 === 2} />
                </Container>

                <Container left={916} top={378} background={require("./images/box3.png")}>
                    <Text left={1022} top={428} value="1#储能电站" font="SourceHanSansSC-Medium" fontSize={48} />
                    <Switch left={1024} top={550} src1={require("./images/charging0.png")} src2={require("./images/charging1.png")} value={this.state.充电1 === 0} />
                    <Switch left={1474} top={550} src1={require("./images/discharging0.png")} src2={require("./images/discharging1.png")} value={this.state.充电1 !== 0} />
                </Container>
                <Container left={1933} top={378} background={require("./images/box3.png")}>
                    <Text left={2037} top={428} value="2#储能电站" font="SourceHanSansSC-Medium" fontSize={48} />
                    <Switch left={2041} top={550} src1={require("./images/charging0.png")} src2={require("./images/charging1.png")} value={this.state.充电2 === 0} />
                    <Switch left={2491} top={550} src1={require("./images/discharging0.png")} src2={require("./images/discharging1.png")} value={this.state.充电2 !== 0} />
                </Container>

                <Container left={916} top={692} background={require("./images/box3.png")} onClick={() => this.setState({ showDialog1: true })}>
                    <Text left={1022} top={742} value="日充电电量" font="SourceHanSansSC-Medium" fontSize={48} />
                    <Text left={1700} top={866} value={`${toFixed(this.state.日充电电量1, 0)}`} font="SourceHanSansSC-Heavy" fontSize={45} />
                    <Text left={1700} top={918} value="kWh" font="SourceHanSansSC-Heavy" fontSize={45} />
                    <BarChart left={1026} top={861} width={637} height={115} color="rgba(68,175,244,0.8)" min={this.state.日充电电量1 - 30} max={this.state.日充电电量1 + 30} />
                </Container>
                <Container left={1933} top={692} background={require("./images/box3.png")} onClick={() => this.setState({ showDialog2: true })}>
                    <Text left={2043} top={742} value="日充电电量" font="SourceHanSansSC-Medium" fontSize={48} />
                    <Text left={2717} top={866} value={`${toFixed(this.state.日充电电量2, 0)}`} font="SourceHanSansSC-Heavy" fontSize={45} />
                    <Text left={2717} top={918} value="kWh" font="SourceHanSansSC-Heavy" fontSize={45} />
                    <BarChart left={2043} top={861} width={637} height={115} color="rgba(68,175,244,0.8)" min={this.state.日充电电量2 - 30} max={this.state.日充电电量2 + 30} />
                </Container>

                <Container left={916} top={1004} background={require("./images/box3.png")} onClick={() => this.setState({ showDialog3: true })}>
                    <Text left={1022} top={1054} value="日放电电量" font="SourceHanSansSC-Medium" fontSize={48} />
                    <Text left={1700} top={1179} value={`${toFixed(this.state.日放电电量1, 0)}`} font="SourceHanSansSC-Heavy" fontSize={45} />
                    <Text left={1700} top={1229} value="kWh" font="SourceHanSansSC-Heavy" fontSize={45} />
                    <BarChart left={1026} top={1173} width={637} height={115} color="rgba(68,175,244,0.8)" min={this.state.日放电电量1 - 30} max={this.state.日放电电量1 + 30} />
                </Container>
                <Container left={1933} top={1004} background={require("./images/box3.png")} onClick={() => this.setState({ showDialog4: true })}>
                    <Text left={2043} top={1054} value="日放电电量" font="SourceHanSansSC-Medium" fontSize={48} />
                    <Text left={2717} top={1179} value={`${toFixed(this.state.日放电电量2, 0)}`} font="SourceHanSansSC-Heavy" fontSize={45} />
                    <Text left={2717} top={1229} value="kWh" font="SourceHanSansSC-Heavy" fontSize={45} />
                    <BarChart left={2043} top={1173} width={637} height={115} color="rgba(68,175,244,0.8)" min={this.state.日放电电量2 - 30} max={this.state.日放电电量2 + 30} />
                </Container>

                <Container left={916} top={1316} background={require("./images/box3.png")} onClick={() => this.setState({ showDialog5: true })}>
                    <Text left={1022} top={1369} value="日放电电量" font="SourceHanSansSC-Medium" fontSize={48} />
                    <Text left={1700} top={1494} value={`${toFixed(this.state.日放电功率1, 0)}`} font="SourceHanSansSC-Heavy" fontSize={45} />
                    <Text left={1700} top={1553} value="w" font="SourceHanSansSC-Heavy" fontSize={45} />
                    <BarChart left={1026} top={1488} width={637} height={115} color="rgba(68,175,244,0.8)" min={this.state.日放电功率1 - 30} max={this.state.日放电功率1 + 30} />
                </Container>
                <Container left={1933} top={1316} background={require("./images/box3.png")} onClick={() => this.setState({ showDialog6: true })}>
                    <Text left={2043} top={1369} value="日放电电量" font="SourceHanSansSC-Medium" fontSize={48} />
                    <Text left={2717} top={1494} value={`${toFixed(this.state.日放电功率2, 0)}`} font="SourceHanSansSC-Heavy" fontSize={45} />
                    <Text left={2717} top={1553} value="w" font="SourceHanSansSC-Heavy" fontSize={45} />
                    <BarChart left={2043} top={1488} width={637} height={115} color="rgba(68,175,244,0.8)" min={this.state.日放电功率2 - 30} max={this.state.日放电功率2 + 30} />
                </Container>

                <Container left={943} top={1646} background={require("./images/box4.png")}>
                    <Text left={1024} top={1690} value="直流电压" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={1299} top={1690} value="直流电流" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={1588} top={1690} value="逆变电流" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Container left={1024} top={1771} background={require("./images/tip.png")}>
                        <Text left={1024} top={1783} width={150} value={`${toFixed(this.state.直流电压1, 0)}V`} font="SourceHanSansSC-Bold" fontSize={41} align="center" />
                    </Container>
                    <Container left={1299} top={1771} background={require("./images/tip.png")}>
                        <Text left={1299} top={1783} width={150} value={`${toFixed(this.state.直流电流1, 0)}A`} font="SourceHanSansSC-Bold" fontSize={41} align="center" />
                    </Container>
                    <Container left={1588} top={1771} background={require("./images/tip.png")}>
                        <Text left={1588} top={1783} width={150} value={`${toFixed(this.state.逆变电流1, 0)}A`} font="SourceHanSansSC-Bold" fontSize={41} align="center" />
                    </Container>
                    <Progress left={1024} top={1850} width={221} height={14} value={this.state.直流电压1 / 400 * 100} colorStart="rgb(244, 138, 62)" colorEnd="rgb(214, 80, 115)" />
                    <Progress left={1299} top={1850} width={221} height={14} value={this.state.直流电流1 / 200 * 100} colorStart="rgb(244, 138, 62)" colorEnd="rgb(214, 80, 115)" />
                    <Progress left={1588} top={1850} width={221} height={14} value={this.state.逆变电流1 / 200 * 100} colorStart="rgb(244, 138, 62)" colorEnd="rgb(214, 80, 115)" />
                </Container>
                <Container left={1960} top={1646} background={require("./images/box4.png")}>
                    <Text left={2041} top={1690} value="直流电压" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={2316} top={1690} value="直流电流" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={2605} top={1690} value="逆变电流" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Container left={2041} top={1771} background={require("./images/tip.png")}>
                        <Text left={2041} top={1783} width={150} value={`${toFixed(this.state.直流电压1, 0)}V`} font="SourceHanSansSC-Bold" fontSize={41} align="center" />
                    </Container>
                    <Container left={2316} top={1771} background={require("./images/tip.png")}>
                        <Text left={2316} top={1783} width={150} value={`${toFixed(this.state.直流电流1, 0)}A`} font="SourceHanSansSC-Bold" fontSize={41} align="center" />
                    </Container>
                    <Container left={2605} top={1771} background={require("./images/tip.png")}>
                        <Text left={2605} top={1783} width={150} value={`${toFixed(this.state.逆变电流1, 0)}A`} font="SourceHanSansSC-Bold" fontSize={41} align="center" />
                    </Container>
                    <Progress left={2041} top={1850} width={221} height={14} value={this.state.直流电压1 / 400 * 100} colorStart="rgb(244, 138, 62)" colorEnd="rgb(214, 80, 115)" />
                    <Progress left={2316} top={1850} width={221} height={14} value={this.state.直流电流1 / 200 * 100} colorStart="rgb(244, 138, 62)" colorEnd="rgb(214, 80, 115)" />
                    <Progress left={2605} top={1850} width={221} height={14} value={this.state.逆变电流1 / 200 * 100} colorStart="rgb(244, 138, 62)" colorEnd="rgb(214, 80, 115)" />
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
                    <BarChart left={1202} top={1103} width={1417} height={422} color="rgba(68,175,244,0.8)" min={this.state.日充电电量1 - 30} max={this.state.日充电电量1 + 30} />
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
                    <BarChart left={1202} top={1103} width={1417} height={422} color="rgba(68,175,244,0.8)" min={this.state.日充电电量2 - 30} max={this.state.日充电电量2 + 30} />
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
                    <BarChart left={1202} top={1103} width={1417} height={422} color="rgba(68,175,244,0.8)" min={this.state.日放电电量1 - 30} max={this.state.日放电电量1 + 30} />
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
                    <BarChart left={1202} top={1103} width={1417} height={422} color="rgba(68,175,244,0.8)" min={this.state.日放电电量2 - 30} max={this.state.日放电电量2 + 30} />
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
                        <Text left={2210} top={939} width={373} value={`${toFixed(this.state.日放电功率1, 0)}`} suffix="kWh" font="SourceHanSansSC-Heavy" weight="bold" fontSize={94} suffixFontSize={62} align="center" />
                    </Container>
                    <BarChart left={1202} top={1103} width={1417} height={422} color="rgba(68,175,244,0.8)" min={this.state.日放电功率1 - 30} max={this.state.日放电功率1 + 30} />
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
                        <Text left={2210} top={939} width={373} value={`${toFixed(this.state.日放电功率2, 0)}`} suffix="kWh" font="SourceHanSansSC-Heavy" weight="bold" fontSize={94} suffixFontSize={62} align="center" />
                    </Container>
                    <BarChart left={1202} top={1103} width={1417} height={422} color="rgba(68,175,244,0.8)" min={this.state.日放电功率2 - 30} max={this.state.日放电功率2 + 30} />
                </Container>
            </Dialog>
        );
    }
}
