import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '~/components/baseComponent';
import Text from '~/app/components/text';
import Image from '~/app/components/image';
import Container from '~/app/components/container';
import Switch from '~/app/components/switch';
import CircleProgress from '~/app/components/progress';
import BarChart from '~/app/components/barChart';
import Gauge from '~/app/components/gauge';
import Dialog from '~/app/components/dialog';
import { toFixed } from '~/misc/number';
import { getRandom } from '~/misc/random';
import style from './index.scss';

/**
 * 变压器视图
 *
 * @export
 * @class Transformer
 * @extends {BaseComponent}
 */
export default class Transformer extends BaseComponent {
    static contextTypes = {
        router: PropTypes.object // 路由
    }

    state = {
        风扇1: true,
        风扇2: true,
        温度1: 40,
        温度2: 40,
        变压器状态: 0,
        总充电电量1: 2100,
        总放电电量1: 2100,
        总充电电量2: 2100,
        总放电电量2: 2100,
        充放电实时功率1: 910,
        充放电实时功率2: 910,
        合闸1: 0,
        合闸2: 0,
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
                风扇1: getRandom(0, 1) === 0,
                风扇2: getRandom(0, 1) === 0,
                温度1: getRandom(20, 50),
                温度2: getRandom(20, 50),
                变压器状态: getRandom(0, 1),
                总充电电量1: getRandom(1800, 2500),
                总放电电量1: getRandom(1800, 2500),
                总充电电量2: getRandom(1800, 2500),
                总放电电量2: getRandom(1800, 2500),
                充放电实时功率1: getRandom(500, 1000),
                充放电实时功率2: getRandom(500, 1000),
                合闸1: getRandom(0, 1),
                合闸2: getRandom(0, 1)
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

                <Container left={199} top={393} background={require("./images/box1.png")}>
                    <Text left={276} top={427} value="变压器" font="SourceHanSansSC-Medium" fontSize={48} />
                    <Image left={316} top={890} src={require("./images/img1.png")} className={style.move} />
                </Container>
                <Container left={2959} top={393} background={require("./images/box6.png")}>
                    <Text left={3036} top={427} value="并网柜" font="SourceHanSansSC-Medium" fontSize={48} />
                    <Image left={3026} top={846} src={require("./images/img2.png")} className={style.move} />
                </Container>
                <Container left={939} top={393} background={require("./images/box2.png")}>
                    <Text left={1041} top={550} value="1#变压器" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={1342} top={550} value="2#变压器" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Image left={999} top={606} src={require("./images/line1.png")} />
                    <Image left={1300} top={606} src={require("./images/line1.png")} />

                    <Gauge left={1040} top={701} width={164} value={this.state.温度1 / 100 * 100} content={`${toFixed(this.state.温度1, 0)}℃`} fontSize={32} />
                    <Gauge left={1341} top={701} width={164} value={this.state.温度2 / 100 * 100} content={`${toFixed(this.state.温度2, 0)}℃`} fontSize={32} />

                    <Text left={1052} top={1023} value="风扇" font="SourceHanSansSC-Medium" fontSize={40} color={this.state.风扇1 ? "rgb(60, 211, 238)" : "rgb(137, 149, 165)"} />
                    <Text left={1052} top={1191} value="风扇" font="SourceHanSansSC-Medium" fontSize={40} color={this.state.风扇2 ? "rgb(60, 211, 238)" : "rgb(137, 149, 165)"} />
                    <Switch left={1251} top={986} src1={require("./images/fan_on.png")} src2={require("./images/fan_off.png")} value={this.state.风扇1} />
                    <Switch left={1251} top={1154} src1={require("./images/fan_on.png")} src2={require("./images/fan_off.png")} value={this.state.风扇2} />
                </Container>
                <Container left={939} top={1459} background={require("./images/box5.png")}>
                    <Switch left={1021} top={1593} src1={require("./images/security_system_normal0.png")} src2={require("./images/security_system_normal1.png")} value={this.state.变压器状态 === 0} />
                    <Switch left={1224} top={1593} src1={require("./images/security_system_alarm0.png")} src2={require("./images/security_system_alarm1.png")} value={this.state.变压器状态 === 1} />
                    <Switch left={1446} top={1593} src1={require("./images/security_system_fault0.png")} src2={require("./images/security_system_fault1.png")} value={this.state.变压器状态 === 2} />
                </Container>
                <Container left={1680} top={393} background={require("./images/box3.png")}>
                    <Text left={1909} top={550} value="1#并网柜" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={2483} top={550} value="2#并网柜" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Image left={1751} top={606} src={require("./images/line2.png")} />
                    <Image left={2336} top={606} src={require("./images/line2.png")} />

                    <Text left={1750} top={670} value="总充电电量" font="SourceHanSansSC-Light" fontSize={36} />
                    <Text left={2060} top={670} value="总放电电量" font="SourceHanSansSC-Light" fontSize={36} />
                    <Text left={2334} top={670} value="总充电电量" font="SourceHanSansSC-Light" fontSize={36} />
                    <Text left={2644} top={670} value="总放电电量" font="SourceHanSansSC-Light" fontSize={36} />

                    <CircleProgress left={1746} top={762} width={187} value={this.state.总充电电量1 / 3000 * 100} colorStart="rgb(244, 138, 62)" colorEnd="rgb(214, 80, 115)" onClick={() => this.setState({ showDialog1: true })}>
                        <Text left={1746} top={819} width={187} value={toFixed(this.state.总充电电量1, 0)} font="SourceHanSansSC-Bold" fontSize={39} align="center" />
                        <Text left={1746} top={860} width={187} value="kWh" font="SourceHanSansSC-Bold" fontSize={39} align="center" />
                    </CircleProgress>
                    <CircleProgress left={2053} top={762} width={187} value={this.state.总放电电量1 / 3000 * 100} colorStart="rgb(49, 218, 225)" colorEnd="rgb(16, 181, 115)" onClick={() => this.setState({ showDialog2: true })}>
                        <Text left={2053} top={819} width={187} value={toFixed(this.state.总放电电量1, 0)} font="SourceHanSansSC-Bold" fontSize={39} align="center" />
                        <Text left={2053} top={860} width={187} value="kWh" font="SourceHanSansSC-Bold" fontSize={39} align="center" />
                    </CircleProgress>
                    <CircleProgress left={2335} top={762} width={187} value={this.state.总充电电量2 / 3000 * 100} colorStart="rgb(244, 138, 62)" colorEnd="rgb(214, 80, 115)" onClick={() => this.setState({ showDialog3: true })}>
                        <Text left={2335} top={819} width={187} value={toFixed(this.state.总充电电量2, 0)} font="SourceHanSansSC-Bold" fontSize={39} align="center" />
                        <Text left={2335} top={860} width={187} value="kWh" font="SourceHanSansSC-Bold" fontSize={39} align="center" />
                    </CircleProgress>
                    <CircleProgress left={2642} top={762} width={187} value={this.state.总放电电量2 / 3000 * 100} colorStart="rgb(49, 218, 225)" colorEnd="rgb(16, 181, 115)" onClick={() => this.setState({ showDialog4: true })}>
                        <Text left={2642} top={819} width={187} value={toFixed(this.state.总放电电量2, 0)} font="SourceHanSansSC-Bold" fontSize={39} align="center" />
                        <Text left={2642} top={860} width={187} value="kWh" font="SourceHanSansSC-Bold" fontSize={39} align="center" />
                    </CircleProgress>

                    <Text left={1750} top={1071} value="充放电实时功率" font="SourceHanSansSC-Regular" fontSize={36} />
                    <Text left={2337} top={1071} value="充放电实时功率" font="SourceHanSansSC-Regular" fontSize={36} />

                    <Container left={2044} top={1043} background={require("./images/tip.png")}>
                        <Text left={2044} top={1058} width={180} value={`${toFixed(this.state.充放电实时功率1, 0)}`} suffix="kW" font="Microsoft Yahei" weight="bold" fontSize={45} suffixFontSize={30} align="center" />
                    </Container>
                    <Container left={2628} top={1043} background={require("./images/tip.png")}>
                        <Text left={2628} top={1058} width={180} value={`${toFixed(this.state.充放电实时功率2, 0)}`} suffix="kW" font="Microsoft Yahei" weight="bold" fontSize={45} suffixFontSize={30} align="center" />
                    </Container>

                    <BarChart left={1751} top={1135} width={487} height={130} color="rgba(68,175,244,0.8)" min={this.state.充放电实时功率1 - 30} max={this.state.充放电实时功率1 + 30} onClick={() => this.setState({ showDialog5: true })} />
                    <BarChart left={2335} top={1135} width={487} height={130} color="rgba(68,175,244,0.8)" min={this.state.充放电实时功率2 - 30} max={this.state.充放电实时功率2 + 30} onClick={() => this.setState({ showDialog6: true })} />
                </Container>
                <Container left={1680} top={1459} background={require("./images/box4.png")}>
                    <Text left={1790} top={1664} value="I段开关" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(7, 229, 255)" />
                    <Text left={2382} top={1664} value="I段开关" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(7, 229, 255)" />
                    <Switch left={2012} top={1660} src1={require("./images/link_on.png")} src2={require("./images/link_off.png")} value={this.state.合闸1 === 0} />
                    <Switch left={2604} top={1660} src1={require("./images/link_on.png")} src2={require("./images/link_off.png")} value={this.state.合闸1 === 0} />
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
     * 获取总充电电量界面
     *
     * @returns 总充电电量界面
     * @memberof Transformer
     */
    _onDialog1() {
        return (
            <Dialog onClick={() => this.setState({ showDialog1: false })}>
                <Container left={1039} top={694} background={require("./images/box7.png")}>
                    <Text left={1791} top={745} value="总充电电量" font="SourceHanSansSC-Bold" fontSize={60} />

                    <Container left={2210} top={907} background={require("./images/tip1.png")}>
                        <Text left={2210} top={939} width={373} value={`${toFixed(this.state.总充电电量1, 0)}`} suffix="kWh" font="SourceHanSansSC-Heavy" weight="bold" fontSize={94} suffixFontSize={62} align="center" />
                    </Container>
                    <BarChart left={1202} top={1103} width={1417} height={422} color="rgba(68,175,244,0.8)" min={this.state.总充电电量1 - 30} max={this.state.总充电电量1 + 30} />
                </Container>
            </Dialog>
        );
    }

    /**
     * 获取总放电电量界面
     *
     * @returns 总放电电量界面
     * @memberof Transformer
     */
    _onDialog2() {
        return (
            <Dialog onClick={() => this.setState({ showDialog2: false })}>
                <Container left={1039} top={694} background={require("./images/box7.png")}>
                    <Text left={1791} top={745} value="总放电电量" font="SourceHanSansSC-Bold" fontSize={60} />

                    <Container left={2210} top={907} background={require("./images/tip1.png")}>
                        <Text left={2210} top={939} width={373} value={`${toFixed(this.state.总放电电量1, 0)}`} suffix="kWh" font="SourceHanSansSC-Heavy" weight="bold" fontSize={94} suffixFontSize={62} align="center" />
                    </Container>
                    <BarChart left={1202} top={1103} width={1417} height={422} color="rgba(68,175,244,0.8)" min={this.state.总放电电量1 - 30} max={this.state.总放电电量1 + 30} />
                </Container>
            </Dialog>
        );
    }

    /**
     * 获取总充电电量界面
     *
     * @returns 总充电电量界面
     * @memberof Transformer
     */
    _onDialog3() {
        return (
            <Dialog onClick={() => this.setState({ showDialog3: false })}>
                <Container left={1039} top={694} background={require("./images/box7.png")}>
                    <Text left={1791} top={745} value="总充电电量" font="SourceHanSansSC-Bold" fontSize={60} />

                    <Container left={2210} top={907} background={require("./images/tip1.png")}>
                        <Text left={2210} top={939} width={373} value={`${toFixed(this.state.总充电电量2, 0)}`} suffix="kWh" font="SourceHanSansSC-Heavy" weight="bold" fontSize={94} suffixFontSize={62} align="center" />
                    </Container>
                    <BarChart left={1202} top={1103} width={1417} height={422} color="rgba(68,175,244,0.8)" min={this.state.总充电电量2 - 30} max={this.state.总充电电量2 + 30} />
                </Container>
            </Dialog>
        );
    }

    /**
     * 获取总放电电量界面
     *
     * @returns 总放电电量界面
     * @memberof Transformer
     */
    _onDialog4() {
        return (
            <Dialog onClick={() => this.setState({ showDialog4: false })}>
                <Container left={1039} top={694} background={require("./images/box7.png")}>
                    <Text left={1791} top={745} value="总放电电量" font="SourceHanSansSC-Bold" fontSize={60} />

                    <Container left={2210} top={907} background={require("./images/tip1.png")}>
                        <Text left={2210} top={939} width={373} value={`${toFixed(this.state.总放电电量2, 0)}`} suffix="kWh" font="SourceHanSansSC-Heavy" weight="bold" fontSize={94} suffixFontSize={62} align="center" />
                    </Container>
                    <BarChart left={1202} top={1103} width={1417} height={422} color="rgba(68,175,244,0.8)" min={this.state.总放电电量2 - 30} max={this.state.总放电电量2 + 30} />
                </Container>
            </Dialog>
        );
    }

    /**
     * 获取充放电实时功率界面
     *
     * @returns 充放电实时功率界面
     * @memberof Transformer
     */
    _onDialog5() {
        return (
            <Dialog onClick={() => this.setState({ showDialog5: false })}>
                <Container left={1039} top={694} background={require("./images/box7.png")}>
                    <Text left={1791} top={745} value="充放电实时功率" font="SourceHanSansSC-Bold" fontSize={60} />

                    <Container left={2210} top={907} background={require("./images/tip1.png")}>
                        <Text left={2210} top={939} width={373} value={`${toFixed(this.state.充放电实时功率1, 0)}`} suffix="kW" font="SourceHanSansSC-Heavy" weight="bold" fontSize={94} suffixFontSize={62} align="center" />
                    </Container>
                    <BarChart left={1202} top={1103} width={1417} height={422} color="rgba(68,175,244,0.8)" min={this.state.充放电实时功率1 - 30} max={this.state.充放电实时功率1 + 30} />
                </Container>
            </Dialog>
        );
    }

    /**
     * 获取充放电实时功率界面
     *
     * @returns 充放电实时功率界面
     * @memberof Transformer
     */
    _onDialog6() {
        return (
            <Dialog onClick={() => this.setState({ showDialog6: false })}>
                <Container left={1039} top={694} background={require("./images/box7.png")}>
                    <Text left={1791} top={745} value="充放电实时功率" font="SourceHanSansSC-Bold" fontSize={60} />

                    <Container left={2210} top={907} background={require("./images/tip1.png")}>
                        <Text left={2210} top={939} width={373} value={`${toFixed(this.state.充放电实时功率2, 0)}`} suffix="kW" font="SourceHanSansSC-Heavy" weight="bold" fontSize={94} suffixFontSize={62} align="center" />
                    </Container>
                    <BarChart left={1202} top={1103} width={1417} height={422} color="rgba(68,175,244,0.8)" min={this.state.充放电实时功率2 - 30} max={this.state.充放电实时功率2 + 30} />
                </Container>
            </Dialog>
        );
    }
}
