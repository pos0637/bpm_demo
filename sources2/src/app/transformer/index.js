import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '~/components/baseComponent';
import Text from '~/app/components/text';
import Image from '~/app/components/image';
import Container from '~/app/components/container';
import Switch from '~/app/components/switch';
import BarChart from '~/app/components/barChart';
import { toFixed } from '~/misc/number';
import { getRandom } from '~/misc/random';

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
        安防系统状态: 0,
        充放电实时功率1: 910,
        充放电实时功率2: 910,
        合闸1: 0,
        合闸2: 0
    }

    componentDidMount() {
        super.componentDidMount();
        this.timer = setInterval(() => {
            const data = {
                风扇1: getRandom(0, 1) === 0,
                风扇2: getRandom(0, 1) === 0,
                安防系统状态: getRandom(0, 1),
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

                <Container left={173} top={378} background={require("./images/box1.png")}>
                    <Text left={276} top={427} value="变压器" font="SourceHanSansSC-Medium" fontSize={48} />
                    <Image left={316} top={890} src={require("./images/img1.png")} />
                </Container>
                <Container left={2932} top={378} background={require("./images/box1.png")}>
                    <Text left={3036} top={427} value="并网柜" font="SourceHanSansSC-Medium" fontSize={48} />
                    <Image left={3026} top={846} src={require("./images/img2.png")} />
                </Container>
                <Container left={939} top={378} background={require("./images/box2.png")}>
                    <Text left={1041} top={550} value="1#变压器" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={1342} top={550} value="2#变压器" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Image left={999} top={606} src={require("./images/line1.png")} />
                    <Image left={1300} top={606} src={require("./images/line1.png")} />
                    {/* TODO: add charts */}
                    <Text left={1052} top={1023} value="风扇" font="SourceHanSansSC-Medium" fontSize={40} color={this.state.风扇1 ? "rgb(60, 211, 238)" : "rgb(137, 149, 165)"} />
                    <Text left={1052} top={1191} value="风扇" font="SourceHanSansSC-Medium" fontSize={40} color={this.state.风扇2 ? "rgb(60, 211, 238)" : "rgb(137, 149, 165)"} />
                    <Switch left={1251} top={986} src1={require("./images/fan_on.png")} src2={require("./images/fan_off.png")} value={this.state.风扇1} />
                    <Switch left={1251} top={1154} src1={require("./images/fan_on.png")} src2={require("./images/fan_off.png")} value={this.state.风扇2} />
                </Container>
                <Container left={939} top={1459} background={require("./images/box3.png")}>
                    <Switch left={1021} top={1593} src1={require("./images/security_system_normal0.png")} src2={require("./images/security_system_normal1.png")} value={this.state.安防系统状态 === 0} />
                    <Switch left={1224} top={1593} src1={require("./images/security_system_alarm0.png")} src2={require("./images/security_system_alarm1.png")} value={this.state.安防系统状态 === 1} />
                    <Switch left={1446} top={1593} src1={require("./images/security_system_fault0.png")} src2={require("./images/security_system_fault1.png")} value={this.state.安防系统状态 === 2} />
                </Container>
                <Container left={1680} top={378} background={require("./images/box4.png")}>
                    <Text left={1909} top={550} value="1#并网柜" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={2483} top={550} value="2#并网柜" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Image left={1751} top={606} src={require("./images/line2.png")} />
                    <Image left={2336} top={606} src={require("./images/line2.png")} />

                    <Text left={1750} top={670} value="总充电电量" font="SourceHanSansSC-Light" fontSize={36} />
                    <Text left={2060} top={670} value="总放电电量" font="SourceHanSansSC-Light" fontSize={36} />
                    <Text left={2334} top={670} value="总充电电量" font="SourceHanSansSC-Light" fontSize={36} />
                    <Text left={2644} top={670} value="总放电电量" font="SourceHanSansSC-Light" fontSize={36} />
                    {/* TODO: add charts */}

                    <Text left={1750} top={1071} value="充放电实时功率" font="SourceHanSansSC-Regular" fontSize={36} />
                    <Text left={2337} top={1071} value="充放电实时功率" font="SourceHanSansSC-Regular" fontSize={36} />

                    <Container left={2044} top={1043} background={require("./images/tip.png")}>
                        <Text left={2044} top={1058} width={180} value={`${toFixed(this.state.充放电实时功率1, 0)}`} suffix="kW" font="Microsoft Yahei" weight="bold" fontSize={45} suffixFontSize={30} align="center" />
                    </Container>
                    <Container left={2628} top={1043} background={require("./images/tip.png")}>
                        <Text left={2628} top={1058} width={180} value={`${toFixed(this.state.充放电实时功率2, 0)}`} suffix="kW" font="Microsoft Yahei" weight="bold" fontSize={45} suffixFontSize={30} align="center" />
                    </Container>

                    <BarChart left={1751} top={1135} width={487} height={130} color="rgba(68,175,244,0.8)" min={this.state.充放电实时功率1 - 30} max={this.state.充放电实时功率1 + 30} />
                    <BarChart left={2335} top={1135} width={487} height={130} color="rgba(68,175,244,0.8)" min={this.state.充放电实时功率2 - 30} max={this.state.充放电实时功率2 + 30} />
                </Container>
                <Container left={1680} top={1459} background={require("./images/box5.png")}>
                    <Text left={1790} top={1664} value="I段开关" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(7, 229, 255)" />
                    <Text left={2382} top={1664} value="I段开关" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(7, 229, 255)" />
                    <Switch left={2012} top={1660} src1={require("./images/link_on.png")} src2={require("./images/link_off.png")} value={this.state.合闸1 === 0} />
                    <Switch left={2604} top={1660} src1={require("./images/link_on.png")} src2={require("./images/link_off.png")} value={this.state.合闸1 === 0} />
                </Container>
            </Container>
        );
    }

    /**
     * 登录按钮点击事件
     *
     * @memberof Load
     */
    _onLoginButtonClick() {
        this.context.router.history.replace('/overview');
    }
}
