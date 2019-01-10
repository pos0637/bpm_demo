import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '~/components/baseComponent';
import Text from '~/app/components/text';
import Image from '~/app/components/image';
import Container from '~/app/components/container';
import Progress from '~/app/components/lineProgress';
import CircleProgress from '~/app/components/progress';
import BarChart from '~/app/components/barChart';
import LineChart from '~/app/components/lineChart';
import Dialog from '~/app/components/dialog';
import { toFixed } from '~/misc/number';
import { getRandom } from '~/misc/random';
import { getLoadData } from '~/api/v1/board';
import style from './index.scss';

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
        当月能耗: null,
        主楼公共区用电: 910,
        主楼耗能: 2100,
        配楼公共区用电: 910,
        配楼耗能: 2100,
        泵站用电: 910,
        泵站耗能: 2100,
        空调用电: 910,
        空调耗能: 2100,
        showDialog1: false,
        showDialog2: false,
        showDialog3: false,
        showDialog4: false
    }

    componentDidMount() {
        super.componentDidMount();
        this.timer = setInterval(() => {
            let data = {};
            if (process.env.NODE_ENV === 'development') {
                data = {
                    A相电压1: getRandom(200, 230),
                    B相电压1: getRandom(200, 230),
                    C相电压1: getRandom(200, 230),
                    A相电流1: getRandom(30, 60),
                    B相电流1: getRandom(30, 60),
                    C相电流1: getRandom(30, 60),
                    A相电压2: getRandom(200, 230),
                    B相电压2: getRandom(200, 230),
                    C相电压2: getRandom(200, 230),
                    A相电流2: getRandom(30, 60),
                    B相电流2: getRandom(30, 60),
                    C相电流2: getRandom(30, 60),
                    当日能耗: getRandom(1800, 2500),
                    当月能耗: null,
                    主楼公共区用电: getRandom(500, 1000),
                    主楼耗能: getRandom(1800, 2500),
                    配楼公共区用电: getRandom(500, 1000),
                    配楼耗能: getRandom(1800, 2500),
                    泵站用电: getRandom(500, 1000),
                    泵站耗能: getRandom(1800, 2500),
                    空调用电: getRandom(500, 1000),
                    空调耗能: getRandom(1800, 2500)
                };
                this.setState(data);
            }
            else {
                getLoadData(load => {
                    data.A相电压1 = load.voltageA1;
                    data.B相电压1 = load.voltageB1;
                    data.C相电压1 = load.voltageC1;
                    data.A相电流1 = load.currentA1;
                    data.B相电流1 = load.currentB1;
                    data.C相电流1 = load.currentC1;
                    data.A相电压2 = load.voltageA2;
                    data.B相电压2 = load.voltageB2;
                    data.C相电压2 = load.voltageC2;
                    data.A相电流2 = load.currentA2;
                    data.B相电流2 = load.currentB2;
                    data.C相电流2 = load.currentC2;
                    data.当日能耗 = load.power;
                    data.当月能耗 = load.powerData;
                    data.主楼公共区用电 = load.power1;
                    data.配楼公共区用电 = load.power2;
                    data.泵站用电 = load.power3;
                    data.空调用电 = load.power4;
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
        return (
            <Container width={3840} height={2160}>
                <Image left={200} top={173} src={require("../../framework/images/logo.png")} />
                <Image left={902} top={184} src={require("../../framework/images/title.png")} />
                <Image left={3084} top={182} src={require("../../framework/images/back.png")} onClick={() => this.context.router.history.replace('/overview')} />

                <Container left={199} top={393} background={require("./images/box1.png")}>
                    <Text left={280} top={428} value="电网 &amp; 负载" font="SourceHanSansSC-Medium" fontSize={48} />
                    <Image left={281} top={585} src={require("./images/img1.png")} className={style.move} />
                    <Image left={281} top={1264} src={require("./images/img2.png")} className={style.move} />
                </Container>
                <Container left={1111} top={393} background={require("./images/box2.png")}>
                    <Text left={1192} top={428} value="电网数据" font="SourceHanSansSC-Medium" fontSize={48} />

                    <Text left={1191} top={556} value="1#" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={1186} top={634} value="A相电压" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={1395} top={634} value="B相电压" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={1601} top={634} value="C相电压" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={1186} top={873} value="A相电流" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={1395} top={873} value="B相电流" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={1601} top={873} value="C相电流" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />

                    <Text left={1880} top={556} value="2#" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={1877} top={634} value="A相电压" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={2086} top={634} value="B相电压" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={2292} top={634} value="C相电压" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={1877} top={873} value="A相电流" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={2086} top={873} value="B相电流" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={2292} top={873} value="C相电流" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />

                    <CircleProgress left={1209} top={705} width={105} value={this.state.A相电压1 / 230 * 100} colorStart="rgb(244, 138, 62)" colorEnd="rgb(214, 80, 115)">
                        <Text left={1209} top={745} width={105} value={`${toFixed(this.state.A相电压1, 0)}V`} font="SourceHanSansSC-Regular" fontSize={30} align="center" />
                    </CircleProgress>
                    <CircleProgress left={1417} top={705} width={105} value={this.state.B相电压1 / 230 * 100} colorStart="rgb(244, 138, 62)" colorEnd="rgb(214, 80, 115)">
                        <Text left={1417} top={745} width={105} value={`${toFixed(this.state.B相电压1, 0)}V`} font="SourceHanSansSC-Regular" fontSize={30} align="center" />
                    </CircleProgress>
                    <CircleProgress left={1624} top={705} width={105} value={this.state.C相电压1 / 230 * 100} colorStart="rgb(244, 138, 62)" colorEnd="rgb(214, 80, 115)">
                        <Text left={1624} top={745} width={105} value={`${toFixed(this.state.C相电压1, 0)}V`} font="SourceHanSansSC-Regular" fontSize={30} align="center" />
                    </CircleProgress>
                    <CircleProgress left={1209} top={944} width={105} value={this.state.A相电流1 / 60 * 100} colorStart="rgb(49, 218, 225)" colorEnd="rgb(16, 181, 115)">
                        <Text left={1209} top={985} width={105} value={`${toFixed(this.state.A相电流1, 0)}A`} font="SourceHanSansSC-Regular" fontSize={30} align="center" />
                    </CircleProgress>
                    <CircleProgress left={1417} top={944} width={105} value={this.state.B相电流1 / 60 * 100} colorStart="rgb(49, 218, 225)" colorEnd="rgb(16, 181, 115)">
                        <Text left={1417} top={985} width={105} value={`${toFixed(this.state.B相电流1, 0)}A`} font="SourceHanSansSC-Regular" fontSize={30} align="center" />
                    </CircleProgress>
                    <CircleProgress left={1624} top={944} width={105} value={this.state.C相电流1 / 60 * 100} colorStart="rgb(49, 218, 225)" colorEnd="rgb(16, 181, 115)">
                        <Text left={1624} top={985} width={105} value={`${toFixed(this.state.C相电流1, 0)}A`} font="SourceHanSansSC-Regular" fontSize={30} align="center" />
                    </CircleProgress>

                    <CircleProgress left={1900} top={705} width={105} value={this.state.A相电压2 / 230 * 100} colorStart="rgb(244, 138, 62)" colorEnd="rgb(214, 80, 115)">
                        <Text left={1900} top={745} width={105} value={`${toFixed(this.state.A相电压2, 0)}V`} font="SourceHanSansSC-Regular" fontSize={30} align="center" />
                    </CircleProgress>
                    <CircleProgress left={2108} top={705} width={105} value={this.state.B相电压2 / 230 * 100} colorStart="rgb(244, 138, 62)" colorEnd="rgb(214, 80, 115)">
                        <Text left={2108} top={745} width={105} value={`${toFixed(this.state.B相电压2, 0)}V`} font="SourceHanSansSC-Regular" fontSize={30} align="center" />
                    </CircleProgress>
                    <CircleProgress left={2315} top={705} width={105} value={this.state.C相电压2 / 230 * 100} colorStart="rgb(244, 138, 62)" colorEnd="rgb(214, 80, 115)">
                        <Text left={2315} top={745} width={105} value={`${toFixed(this.state.C相电压2, 0)}V`} font="SourceHanSansSC-Regular" fontSize={30} align="center" />
                    </CircleProgress>
                    <CircleProgress left={1900} top={944} width={105} value={this.state.A相电流2 / 60 * 100} colorStart="rgb(49, 218, 225)" colorEnd="rgb(16, 181, 115)">
                        <Text left={1900} top={985} width={105} value={`${toFixed(this.state.A相电流2, 0)}A`} font="SourceHanSansSC-Regular" fontSize={30} align="center" />
                    </CircleProgress>
                    <CircleProgress left={2108} top={944} width={105} value={this.state.B相电流2 / 60 * 100} colorStart="rgb(49, 218, 225)" colorEnd="rgb(16, 181, 115)">
                        <Text left={2108} top={985} width={105} value={`${toFixed(this.state.B相电流2, 0)}A`} font="SourceHanSansSC-Regular" fontSize={30} align="center" />
                    </CircleProgress>
                    <CircleProgress left={2315} top={944} width={105} value={this.state.C相电流2 / 60 * 100} colorStart="rgb(49, 218, 225)" colorEnd="rgb(16, 181, 115)">
                        <Text left={2315} top={985} width={105} value={`${toFixed(this.state.C相电流2, 0)}A`} font="SourceHanSansSC-Regular" fontSize={30} align="center" />
                    </CircleProgress>

                    <Container left={2597} top={634} width={218} height={340} onClick={() => this.setState({ showDialog3: true })}>
                        <Text left={2641} top={634} value="当日能耗" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                        <CircleProgress left={2617} top={756} width={218} value={this.state.当日能耗 / 3000 * 100} colorStart="rgb(244, 138, 62)" colorEnd="rgb(214, 80, 115)">
                            <Text left={2617} top={812} width={218} value={toFixed(this.state.当日能耗, 0)} font="SourceHanSansSC-Bold" fontSize={52} align="center" />
                            <Text left={2617} top={862} width={218} value="kWh" font="SourceHanSansSC-Bold" fontSize={52} align="center" />
                        </CircleProgress>
                    </Container>

                    <Container left={3013} top={634} width={586} height={361} onClick={() => this.setState({ showDialog4: true })}>
                        <Text left={3013} top={634} value="当月能耗" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                        <Container left={3283} top={636} background={require("./images/tip3.png")}>
                            <Text left={3283} top={666} width={300} value={`${toFixed(this.state.当日能耗, 0)}`} suffix="kWh" font="SourceHanSansSC-Bold" fontSize={76} suffixFontSize={45} align="center" />
                        </Container>
                        <BarChart left={3014} top={799} width={585} height={196} color="rgba(68,175,244,0.8)" data={this.state.当月能耗} maxTicksLimitX={7} suggestedMin={330} suggestedMax={400} />
                    </Container>
                </Container>

                <Container left={1111} top={1172} background={require("./images/box3.png")}>
                    <Text left={1188} top={1207} value="负载" font="SourceHanSansSC-Medium" fontSize={48} />

                    <Container left={1191} top={1334} width={1057} height={206} onClick={() => this.setState({ showDialog1: true })}>
                        <Text left={1191} top={1334} value="1#" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                        <Text left={1321} top={1334} value="主楼公共区用电" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                        <Text left={2012} top={1334} value="主楼耗能" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                        <Container left={1320} top={1409} background={require("./images/tip4.png")}>
                            <Text left={1320} top={1426} width={203} value={`${toFixed(this.state.主楼公共区用电, 0)}`} suffix="kW" font="SourceHanSansSC-Bold" fontSize={45} suffixFontSize={30} align="center" />
                        </Container>
                        <Progress left={1320} top={1525} width={516} height={22} value={this.state.主楼公共区用电 / 2000 * 100} colorStart="rgb(244, 138, 62)" colorEnd="rgb(214, 80, 115)" />
                        <CircleProgress left={2035} top={1407} width={133} value={this.state.主楼耗能 / 3000 * 100} colorStart="rgb(244, 138, 62)" colorEnd="rgb(214, 80, 115)">
                            <Text left={2035} top={1434} width={133} value={toFixed(this.state.主楼耗能, 0)} font="SourceHanSansSC-Bold" fontSize={32} align="center" />
                            <Text left={2035} top={1474} width={133} value="kWh" font="SourceHanSansSC-Bold" fontSize={32} align="center" />
                        </CircleProgress>
                    </Container>

                    <Container left={2566} top={1334} width={1057} height={206} onClick={() => this.setState({ showDialog1: true })}>
                        <Text left={2566} top={1334} value="2#" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                        <Text left={2698} top={1334} value="配楼公共区用电" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                        <Text left={3389} top={1334} value="配楼耗能" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                        <Container left={2697} top={1409} background={require("./images/tip4.png")}>
                            <Text left={2697} top={1426} width={203} value={`${toFixed(this.state.配楼公共区用电, 0)}`} suffix="kW" font="SourceHanSansSC-Bold" fontSize={45} suffixFontSize={30} align="center" />
                        </Container>
                        <Progress left={2697} top={1525} width={516} height={22} value={this.state.配楼公共区用电 / 2000 * 100} colorStart="rgb(244, 138, 62)" colorEnd="rgb(214, 80, 115)" />
                        <CircleProgress left={3410} top={1407} width={133} value={this.state.配楼耗能 / 3000 * 100} colorStart="rgb(244, 138, 62)" colorEnd="rgb(214, 80, 115)">
                            <Text left={3410} top={1434} width={133} value={toFixed(this.state.配楼耗能, 0)} font="SourceHanSansSC-Bold" fontSize={32} align="center" />
                            <Text left={3410} top={1474} width={133} value="kWh" font="SourceHanSansSC-Bold" fontSize={32} align="center" />
                        </CircleProgress>
                    </Container>

                    <Container left={1189} top={1615} width={1057} height={206} onClick={() => this.setState({ showDialog2: true })}>
                        <Text left={1189} top={1615} value="3#" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                        <Text left={1320} top={1615} value="泵站用电" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                        <Text left={2011} top={1615} value="泵站耗能" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                        <Container left={1320} top={1690} background={require("./images/tip4.png")}>
                            <Text left={1320} top={1707} width={203} value={`${toFixed(this.state.泵站用电, 0)}`} suffix="kW" font="SourceHanSansSC-Bold" fontSize={45} suffixFontSize={30} align="center" />
                        </Container>
                        <Progress left={1320} top={1806} width={516} height={22} value={this.state.泵站用电 / 2000 * 100} colorStart="rgb(49, 218, 225)" colorEnd="rgb(16, 181, 115)" />
                        <CircleProgress left={2035} top={1688} width={133} value={this.state.泵站耗能 / 3000 * 100} colorStart="rgb(49, 218, 225)" colorEnd="rgb(16, 181, 115)">
                            <Text left={2035} top={1715} width={133} value={toFixed(this.state.泵站耗能, 0)} font="SourceHanSansSC-Bold" fontSize={32} align="center" />
                            <Text left={2035} top={1755} width={133} value="kWh" font="SourceHanSansSC-Bold" fontSize={32} align="center" />
                        </CircleProgress>
                    </Container>

                    <Container left={2544} top={1615} width={1057} height={206} onClick={() => this.setState({ showDialog2: true })}>
                        <Text left={2566} top={1615} value="4#" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                        <Text left={2699} top={1615} value="空调用电" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                        <Text left={3390} top={1615} value="空调耗能" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                        <Container left={2697} top={1690} background={require("./images/tip4.png")}>
                            <Text left={2697} top={1707} width={203} value={`${toFixed(this.state.空调用电, 0)}`} suffix="kW" font="SourceHanSansSC-Bold" fontSize={45} suffixFontSize={30} align="center" />
                        </Container>
                        <Progress left={2697} top={1806} width={516} height={22} value={this.state.空调用电 / 2000 * 100} colorStart="rgb(49, 218, 225)" colorEnd="rgb(16, 181, 115)" />
                        <CircleProgress left={3410} top={1688} width={133} value={this.state.空调耗能 / 3000 * 100} colorStart="rgb(49, 218, 225)" colorEnd="rgb(16, 181, 115)">
                            <Text left={3410} top={1715} width={133} value={toFixed(this.state.空调耗能, 0)} font="SourceHanSansSC-Bold" fontSize={32} align="center" />
                            <Text left={3410} top={1755} width={133} value="kWh" font="SourceHanSansSC-Bold" fontSize={32} align="center" />
                        </CircleProgress>
                    </Container>
                </Container>

                {/*
                {this.state.showDialog1 && this._onDialog1()}
                {this.state.showDialog2 && this._onDialog2()}
                {this.state.showDialog3 && this._onDialog3()}
                */}
                {this.state.showDialog4 && this._onDialog4()}
            </Container>
        );
    }

    /**
     * 获取照明用电详情界面
     *
     * @returns 照明用电详情界面
     * @memberof Load
     */
    _onDialog1() {
        return (
            <Dialog onClick={() => this.setState({ showDialog1: false })}>
                <Container left={1039} top={377} background={require("./images/box4.png")}>
                    <Text left={1787} top={421} value="照明用电" font="SourceHanSansSC-Bold" fontSize={60} />

                    <Text left={2529} top={1054} value="1#" font="SourceHanSansSC-Bold" fontSize={60} />
                    <Container left={2079} top={622} background={require("./images/tip1.png")}>
                        <Text left={2079} top={649} width={341} value={`${toFixed(this.state.主楼公共区用电, 0)}`} suffix="kWh" font="SourceHanSansSC-Heavy" weight="bold" fontSize={79} suffixFontSize={52} align="center" />
                    </Container>
                    <LineChart left={1230} top={786} width={1193} height={356} color="rgba(68,175,244,0.8)" min={this.state.主楼公共区用电 - 30} max={this.state.主楼公共区用电 + 30} />

                    <Text left={2529} top={1672} value="2#" font="SourceHanSansSC-Bold" fontSize={60} />
                    <Container left={2079} top={1246} background={require("./images/tip1.png")}>
                        <Text left={2079} top={1273} width={341} value={`${toFixed(this.state.配楼公共区用电, 0)}`} suffix="kWh" font="SourceHanSansSC-Heavy" weight="bold" fontSize={79} suffixFontSize={52} align="center" />
                    </Container>
                    <LineChart left={1230} top={1410} width={1193} height={356} color="rgba(68,175,244,0.8)" min={this.state.配楼公共区用电 - 30} max={this.state.配楼公共区用电 + 30} />
                </Container>
            </Dialog>
        );
    }

    /**
     * 获取泵站用电详情界面
     *
     * @returns 泵站用电详情界面
     * @memberof Load
     */
    _onDialog2() {
        return (
            <Dialog onClick={() => this.setState({ showDialog2: false })}>
                <Container left={1039} top={377} background={require("./images/box4.png")}>
                    <Text left={1787} top={421} value="泵站用电" font="SourceHanSansSC-Bold" fontSize={60} />

                    <Text left={2529} top={1054} value="1#" font="SourceHanSansSC-Bold" fontSize={60} />
                    <Container left={2079} top={622} background={require("./images/tip1.png")}>
                        <Text left={2079} top={649} width={341} value={`${toFixed(this.state.泵站用电, 0)}`} suffix="kWh" font="SourceHanSansSC-Heavy" weight="bold" fontSize={79} suffixFontSize={52} align="center" />
                    </Container>
                    <LineChart left={1230} top={786} width={1193} height={356} color="rgba(68,175,244,0.8)" min={this.state.泵站用电 - 30} max={this.state.泵站用电 + 30} />

                    <Text left={2529} top={1672} value="2#" font="SourceHanSansSC-Bold" fontSize={60} />
                    <Container left={2079} top={1246} background={require("./images/tip1.png")}>
                        <Text left={2079} top={1273} width={341} value={`${toFixed(this.state.空调用电, 0)}`} suffix="kWh" font="SourceHanSansSC-Heavy" weight="bold" fontSize={79} suffixFontSize={52} align="center" />
                    </Container>
                    <LineChart left={1230} top={1410} width={1193} height={356} color="rgba(68,175,244,0.8)" min={this.state.空调用电 - 30} max={this.state.空调用电 + 30} />
                </Container>
            </Dialog>
        );
    }

    /**
     * 获取当日能耗界面
     *
     * @returns 当日能耗界面
     * @memberof Load
     */
    _onDialog3() {
        return (
            <Dialog onClick={() => this.setState({ showDialog3: false })}>
                <Container left={1039} top={694} background={require("./images/box5.png")}>
                    <Text left={1791} top={745} value="当日能耗" font="SourceHanSansSC-Bold" fontSize={60} />

                    <Container left={2210} top={907} background={require("./images/tip2.png")}>
                        <Text left={2210} top={939} width={373} value={`${toFixed(this.state.当日能耗, 0)}`} suffix="kWh" font="SourceHanSansSC-Heavy" weight="bold" fontSize={94} suffixFontSize={62} align="center" />
                    </Container>
                    <LineChart left={1202} top={1103} width={1417} height={422} color="rgba(68,175,244,0.8)" min={this.state.当日能耗 - 30} max={this.state.当日能耗 + 30} />
                </Container>
            </Dialog>
        );
    }

    /**
     * 获取当月能耗界面
     *
     * @returns 当月能耗界面
     * @memberof Load
     */
    _onDialog4() {
        return (
            <Dialog onClick={() => this.setState({ showDialog4: false })}>
                <Container left={1039} top={694} background={require("./images/box5.png")}>
                    <Text left={1791} top={745} value="当月能耗" font="SourceHanSansSC-Bold" fontSize={60} />

                    <Container left={2210} top={907} background={require("./images/tip2.png")}>
                        <Text left={2210} top={939} width={373} value={`${toFixed(this.state.当日能耗, 0)}`} suffix="kWh" font="SourceHanSansSC-Heavy" weight="bold" fontSize={94} suffixFontSize={62} align="center" />
                    </Container>
                    <BarChart left={1202} top={1103} width={1417} height={422} color="rgba(68,175,244,0.8)" data={this.state.当月能耗} maxTicksLimitX={7} suggestedMin={330} suggestedMax={400} />                    
                </Container>
            </Dialog>
        );
    }
}
