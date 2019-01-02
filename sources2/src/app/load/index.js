import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '~/components/baseComponent';
import Text from '~/app/components/text';
import Image from '~/app/components/image';
import Container from '~/app/components/container';
import Progress from '~/app/components/lineProgress';
import CircleProgress from '~/app/components/progress';
import BarChart from '~/app/components/barChart';
import Dialog from '~/app/components/dialog';
import { toFixed } from '~/misc/number';
import { getRandom } from '~/misc/random';
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
        当月能耗: 910,
        照明用电1: 910,
        照明耗能1: 2100,
        照明用电2: 910,
        照明耗能2: 2100,
        泵站用电1: 910,
        泵站耗能1: 2100,
        泵站用电2: 910,
        泵站耗能2: 2100,
        showDialog1: false,
        showDialog2: false,
        showDialog3: false,
        showDialog4: false
    }

    componentDidMount() {
        super.componentDidMount();
        this.timer = setInterval(() => {
            const data = {
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
                当月能耗: getRandom(500, 1000),
                照明用电1: getRandom(500, 1000),
                照明耗能1: getRandom(1800, 2500),
                照明用电2: getRandom(500, 1000),
                照明耗能2: getRandom(1800, 2500),
                泵站用电1: getRandom(500, 1000),
                泵站耗能1: getRandom(1800, 2500),
                泵站用电2: getRandom(500, 1000),
                泵站耗能2: getRandom(1800, 2500)
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
                    <Text left={280} top={428} value="电网 &amp; 负载" font="SourceHanSansSC-Medium" fontSize={48} />
                    <Image left={281} top={625} src={require("./images/img1.png")} className={style.move} />
                    <Image left={399} top={1237} src={require("./images/img2.png")} className={style.move} />
                </Container>
                <Container left={1349} top={393} background={require("./images/box2.png")}>
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

                    <Container left={1543} top={1493} width={180} height={300} onClick={() => this.setState({ showDialog3: true })}>
                        <Text left={1547} top={1493} value="当日能耗" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                        <CircleProgress left={1543} top={1618} width={161} value={this.state.当日能耗 / 3000 * 100} colorStart="rgb(244, 138, 62)" colorEnd="rgb(214, 80, 115)">
                            <Text left={1543} top={1668} width={161} value={toFixed(this.state.当日能耗, 0)} font="SourceHanSansSC-Bold" fontSize={34} align="center" />
                            <Text left={1543} top={1707} width={161} value="kWh" font="SourceHanSansSC-Bold" fontSize={34} align="center" />
                        </CircleProgress>
                    </Container>

                    <Container left={1853} top={1493} width={500} height={300} onClick={() => this.setState({ showDialog4: true })}>
                        <Text left={1854} top={1493} value="当月能耗" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                        <Container left={2145} top={1531} background={require("./images/tip.png")}>
                            <Text left={2145} top={1543} width={179} value={`${toFixed(this.state.当月能耗, 0)}`} suffix="kW" font="Microsoft Yahei" weight="bold" fontSize={45} suffixFontSize={30} align="center" />
                        </Container>
                        <BarChart left={1853} top={1643} width={485} height={160} color="rgba(68,175,244,0.8)" data={{xLabels: ['Week1', 'Week2', 'Week3', 'Week4']}} min={this.state.当月能耗 - 30} max={this.state.当月能耗 + 30} />
                    </Container>
                </Container>

                <Container left={2571} top={393} background={require("./images/box3.png")}>
                    <Text left={2648} top={428} value="负载" font="SourceHanSansSC-Medium" fontSize={48} />

                    <Container left={2544} top={596} width={1121} height={600} onClick={() => this.setState({ showDialog1: true })}>
                        <Text left={2651} top={596} value="1#" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                        <Text left={2761} top={596} value="照明用电" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                        <Text left={3358} top={596} value="照明耗能" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                        <Container left={2761} top={668} background={require("./images/tip.png")}>
                            <Text left={2761} top={680} width={179} value={`${toFixed(this.state.照明用电1, 0)}`} suffix="kW" font="Microsoft Yahei" weight="bold" fontSize={45} suffixFontSize={30} align="center" />
                        </Container>
                        <Progress left={2761} top={794} width={434} height={22} value={this.state.照明用电1 / 2000 * 100} colorStart="rgb(244, 138, 62)" colorEnd="rgb(214, 80, 115)" />
                        <CircleProgress left={3361} top={667} width={161} value={this.state.照明耗能1 / 3000 * 100} colorStart="rgb(244, 138, 62)" colorEnd="rgb(214, 80, 115)">
                            <Text left={3361} top={717} width={161} value={toFixed(this.state.照明耗能1, 0)} font="SourceHanSansSC-Bold" fontSize={34} align="center" />
                            <Text left={3361} top={756} width={161} value="kWh" font="SourceHanSansSC-Bold" fontSize={34} align="center" />
                        </CircleProgress>

                        <Text left={2651} top={896} value="2#" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                        <Text left={2761} top={896} value="照明用电" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                        <Text left={3358} top={896} value="照明耗能" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                        <Container left={2761} top={971} background={require("./images/tip.png")}>
                            <Text left={2761} top={983} width={179} value={`${toFixed(this.state.照明用电2, 0)}`} suffix="kW" font="Microsoft Yahei" weight="bold" fontSize={45} suffixFontSize={30} align="center" />
                        </Container>
                        <Progress left={2761} top={1097} width={434} height={22} value={this.state.照明用电2 / 2000 * 100} colorStart="rgb(244, 138, 62)" colorEnd="rgb(214, 80, 115)" />
                        <CircleProgress left={3361} top={970} width={161} value={this.state.照明耗能2 / 3000 * 100} colorStart="rgb(244, 138, 62)" colorEnd="rgb(214, 80, 115)">
                            <Text left={3361} top={1020} width={161} value={toFixed(this.state.照明耗能2, 0)} font="SourceHanSansSC-Bold" fontSize={34} align="center" />
                            <Text left={3361} top={1059} width={161} value="kWh" font="SourceHanSansSC-Bold" fontSize={34} align="center" />
                        </CircleProgress>
                    </Container>

                    <Container left={2544} top={1265} width={1121} height={600} onClick={() => this.setState({ showDialog2: true })}>
                        <Text left={2651} top={1265} value="1#" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                        <Text left={2761} top={1265} value="泵站用电" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                        <Text left={3358} top={1265} value="泵站耗能" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                        <Container left={2761} top={1340} background={require("./images/tip.png")}>
                            <Text left={2761} top={1352} width={179} value={`${toFixed(this.state.泵站用电1, 0)}`} suffix="kW" font="Microsoft Yahei" weight="bold" fontSize={45} suffixFontSize={30} align="center" />
                        </Container>
                        <Progress left={2761} top={1466} width={434} height={22} value={this.state.泵站用电1 / 2000 * 100} colorStart="rgb(49, 218, 225)" colorEnd="rgb(16, 181, 115)" />
                        <CircleProgress left={3361} top={1339} width={161} value={this.state.泵站耗能1 / 3000 * 100} colorStart="rgb(49, 218, 225)" colorEnd="rgb(16, 181, 115)">
                            <Text left={3361} top={1389} width={161} value={toFixed(this.state.泵站耗能1, 0)} font="SourceHanSansSC-Bold" fontSize={34} align="center" />
                            <Text left={3361} top={1428} width={161} value="kWh" font="SourceHanSansSC-Bold" fontSize={34} align="center" />
                        </CircleProgress>

                        <Text left={2651} top={1570} value="2#" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                        <Text left={2761} top={1570} value="泵站用电" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                        <Text left={3358} top={1570} value="泵站耗能" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                        <Container left={2761} top={1643} background={require("./images/tip.png")}>
                            <Text left={2761} top={1655} width={179} value={`${toFixed(this.state.泵站用电2, 0)}`} suffix="kW" font="Microsoft Yahei" weight="bold" fontSize={45} suffixFontSize={30} align="center" />
                        </Container>
                        <Progress left={2761} top={1769} width={434} height={22} value={this.state.泵站用电2 / 2000 * 100} colorStart="rgb(49, 218, 225)" colorEnd="rgb(16, 181, 115)" />
                        <CircleProgress left={3361} top={1642} width={161} value={this.state.泵站耗能2 / 3000 * 100} colorStart="rgb(49, 218, 225)" colorEnd="rgb(16, 181, 115)">
                            <Text left={3361} top={1692} width={161} value={toFixed(this.state.泵站耗能2, 0)} font="SourceHanSansSC-Bold" fontSize={34} align="center" />
                            <Text left={3361} top={1731} width={161} value="kWh" font="SourceHanSansSC-Bold" fontSize={34} align="center" />
                        </CircleProgress>
                    </Container>
                </Container>

                {this.state.showDialog1 && this._onDialog1()}
                {this.state.showDialog2 && this._onDialog2()}
                {this.state.showDialog3 && this._onDialog3()}
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
                        <Text left={2079} top={649} width={341} value={`${toFixed(this.state.照明用电1, 0)}`} suffix="kWh" font="SourceHanSansSC-Heavy" weight="bold" fontSize={79} suffixFontSize={52} align="center" />
                    </Container>
                    <BarChart left={1230} top={786} width={1193} height={356} color="rgba(68,175,244,0.8)" min={this.state.照明用电1 - 30} max={this.state.照明用电1 + 30} />

                    <Text left={2529} top={1672} value="2#" font="SourceHanSansSC-Bold" fontSize={60} />
                    <Container left={2079} top={1246} background={require("./images/tip1.png")}>
                        <Text left={2079} top={1273} width={341} value={`${toFixed(this.state.照明用电2, 0)}`} suffix="kWh" font="SourceHanSansSC-Heavy" weight="bold" fontSize={79} suffixFontSize={52} align="center" />
                    </Container>
                    <BarChart left={1230} top={1410} width={1193} height={356} color="rgba(68,175,244,0.8)" min={this.state.照明用电2 - 30} max={this.state.照明用电2 + 30} />
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
                        <Text left={2079} top={649} width={341} value={`${toFixed(this.state.泵站用电1, 0)}`} suffix="kWh" font="SourceHanSansSC-Heavy" weight="bold" fontSize={79} suffixFontSize={52} align="center" />
                    </Container>
                    <BarChart left={1230} top={786} width={1193} height={356} color="rgba(68,175,244,0.8)" min={this.state.泵站用电1 - 30} max={this.state.泵站用电1 + 30} />

                    <Text left={2529} top={1672} value="2#" font="SourceHanSansSC-Bold" fontSize={60} />
                    <Container left={2079} top={1246} background={require("./images/tip1.png")}>
                        <Text left={2079} top={1273} width={341} value={`${toFixed(this.state.泵站用电2, 0)}`} suffix="kWh" font="SourceHanSansSC-Heavy" weight="bold" fontSize={79} suffixFontSize={52} align="center" />
                    </Container>
                    <BarChart left={1230} top={1410} width={1193} height={356} color="rgba(68,175,244,0.8)" min={this.state.泵站用电2 - 30} max={this.state.泵站用电2 + 30} />
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
                    <BarChart left={1202} top={1103} width={1417} height={422} color="rgba(68,175,244,0.8)" min={this.state.当日能耗 - 30} max={this.state.当日能耗 + 30} />
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
                        <Text left={2210} top={939} width={373} value={`${toFixed(this.state.当月能耗, 0)}`} suffix="kW" font="SourceHanSansSC-Heavy" weight="bold" fontSize={94} suffixFontSize={62} align="center" />
                    </Container>
                    <BarChart left={1202} top={1103} width={1417} height={422} color="rgba(68,175,244,0.8)" data={{ xLabels: ['Week1', 'Week2', 'Week3', 'Week4'] }} min={this.state.当月能耗 - 30} max={this.state.当月能耗 + 30} />
                </Container>
            </Dialog>
        );
    }
}
