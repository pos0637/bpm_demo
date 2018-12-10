import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '~/components/baseComponent';
import Text from '~/app/components/text';
import Image from '~/app/components/image';
import Container from '~/app/components/container';
import Progress from '~/app/components/lineProgress';
import LineChart from '~/app/components/lineChart';
import { toFixed } from '~/misc/number';

/**
 * 电网与负载视图
 *
 * @export
 * @class Load
 * @extends {BaseComponent}
 */
export default class Load extends BaseComponent {
    static contextTypes = {
        router: PropTypes.object // 路由
    }

    state = {
        A相电压1: 220,
        B相电压1: 220,
        C相电压1: 220,
        A相电流1: 50,
        B相电流1: 50,
        C相电流1: 50,
        A相电压2: 220,
        B相电压2: 220,
        C相电压2: 220,
        A相电流2: 50,
        B相电流2: 50,
        C相电流2: 50,
        当日能耗: 2100,
        当月能耗: 910,
        照明用电1: 910,
        照明耗能1: 2100,
        照明用电2: 910,
        照明耗能2: 2100,
        泵站用电1: 910,
        泵站耗能1: 2100,
        泵站用电2: 910,
        泵站耗能2: 2100
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
            <Container width={3840} height={2160}>
                <Container left={199} top={393} background={require("./images/box1.png")}>
                    <Text left={280} top={428} value="电网&amp;负载" font="SourceHanSansSC-Medium" fontSize={48} />
                    <Image left={281} top={625} src={require("./images/img1.png")} />
                    <Image left={399} top={1237} src={require("./images/img2.png")} />
                </Container>
                <Container left={1322} top={378} background={require("./images/box1.png")}>
                    <Text left={1430} top={428} value="电网数据" font="SourceHanSansSC-Medium" fontSize={48} />

                    <Text left={1428} top={596} value="1#" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={1542} top={592} value="A相电压" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={1859} top={592} value="B相电压" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={2169} top={592} value="C相电压" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={1542} top={777} value="A相电流" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={1859} top={777} value="B相电流" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={2169} top={777} value="C相电流" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />

                    <Text left={1428} top={1029} value="2#" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={1542} top={1025} value="A相电压" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={1859} top={1025} value="B相电压" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={2169} top={1025} value="C相电压" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={1542} top={1210} value="A相电流" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={1859} top={1210} value="B相电流" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={2169} top={1210} value="C相电流" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />

                    <Text left={1542} top={657} value={`${toFixed(this.state.A相电压1, 1)}V`} font="SourceHanSansSC-Heavy" fontSize={60} />
                    <Text left={1859} top={657} value={`${toFixed(this.state.B相电压1, 1)}V`} font="SourceHanSansSC-Heavy" fontSize={60} />
                    <Text left={2169} top={657} value={`${toFixed(this.state.C相电压1, 1)}V`} font="SourceHanSansSC-Heavy" fontSize={60} />
                    <Text left={1542} top={842} value={`${toFixed(this.state.A相电流1, 1)}A`} font="SourceHanSansSC-Heavy" fontSize={60} />
                    <Text left={1859} top={842} value={`${toFixed(this.state.B相电流1, 1)}A`} font="SourceHanSansSC-Heavy" fontSize={60} />
                    <Text left={2169} top={842} value={`${toFixed(this.state.C相电流1, 1)}A`} font="SourceHanSansSC-Heavy" fontSize={60} />

                    <Text left={1542} top={1090} value={`${toFixed(this.state.A相电压2, 1)}V`} font="SourceHanSansSC-Heavy" fontSize={60} />
                    <Text left={1859} top={1090} value={`${toFixed(this.state.B相电压2, 1)}V`} font="SourceHanSansSC-Heavy" fontSize={60} />
                    <Text left={2169} top={1090} value={`${toFixed(this.state.C相电压2, 1)}V`} font="SourceHanSansSC-Heavy" fontSize={60} />
                    <Text left={1542} top={1275} value={`${toFixed(this.state.A相电流2, 1)}A`} font="SourceHanSansSC-Heavy" fontSize={60} />
                    <Text left={1859} top={1275} value={`${toFixed(this.state.B相电流2, 1)}A`} font="SourceHanSansSC-Heavy" fontSize={60} />
                    <Text left={2169} top={1275} value={`${toFixed(this.state.C相电流2, 1)}A`} font="SourceHanSansSC-Heavy" fontSize={60} />

                    <Text left={1547} top={1493} value="当日能耗" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={1854} top={1493} value="当日能耗" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    {/* TODO: add progress */}
                    <Container left={2145} top={1531} background={require("./images/tip.png")}>
                        <Text left={2145} top={1543} width={179} value={`${toFixed(this.state.当月能耗, 0)}`} suffix="kW" font="Microsoft Yahei" weight="bold" fontSize={45} suffixFontSize={30} align="center" />
                    </Container>
                    <LineChart left={1853} top={1643} width={485} height={160} color="rgba(68,175,244,0.8)" />
                </Container>

                <Container left={2544} top={378} background={require("./images/box1.png")}>
                    <Text left={2648} top={428} value="负载" font="SourceHanSansSC-Medium" fontSize={48} />

                    <Text left={2651} top={596} value="1#" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={2761} top={596} value="照明用电" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={3358} top={596} value="照明耗能" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Container left={2761} top={668} background={require("./images/tip.png")}>
                        <Text left={2761} top={680} width={179} value={`${toFixed(this.state.照明用电1, 0)}`} suffix="kW" font="Microsoft Yahei" weight="bold" fontSize={45} suffixFontSize={30} align="center" />
                    </Container>
                    <Progress left={2761} top={794} width={434} height={22} value={this.state.照明用电1} />
                    {/* TODO: add progress */}

                    <Text left={2651} top={896} value="2#" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={2761} top={896} value="照明用电" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={3358} top={896} value="照明耗能" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Container left={2761} top={971} background={require("./images/tip.png")}>
                        <Text left={2761} top={983} width={179} value={`${toFixed(this.state.照明用电2, 0)}`} suffix="kW" font="Microsoft Yahei" weight="bold" fontSize={45} suffixFontSize={30} align="center" />
                    </Container>
                    <Progress left={2761} top={1097} width={434} height={22} value={this.state.照明用电2} />
                    {/* TODO: add progress */}

                    <Text left={2651} top={1265} value="1#" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={2761} top={1265} value="泵站用电" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={3358} top={1265} value="泵站耗能" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Container left={2761} top={1340} background={require("./images/tip.png")}>
                        <Text left={2761} top={1352} width={179} value={`${toFixed(this.state.泵站用电1, 0)}`} suffix="kW" font="Microsoft Yahei" weight="bold" fontSize={45} suffixFontSize={30} align="center" />
                    </Container>
                    <Progress left={2761} top={1466} width={434} height={22} value={this.state.泵站用电1} />
                    {/* TODO: add progress */}

                    <Text left={2651} top={1570} value="2#" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={2761} top={1570} value="泵站用电" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={3358} top={1570} value="泵站耗能" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Container left={2761} top={1643} background={require("./images/tip.png")}>
                        <Text left={2761} top={1655} width={179} value={`${toFixed(this.state.泵站用电2, 0)}`} suffix="kW" font="Microsoft Yahei" weight="bold" fontSize={45} suffixFontSize={30} align="center" />
                    </Container>
                    <Progress left={2761} top={1769} width={434} height={22} value={this.state.泵站用电2} />
                    {/* TODO: add progress */}
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
