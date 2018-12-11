import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '~/components/baseComponent';
import Text from '~/app/components/text';
import Image from '~/app/components/image';
import Container from '~/app/components/container';
import CircleProgress from '~/app/components/progress';
import { toFixed, pad } from '~/misc/number';
import { getRandom } from '~/misc/random';

/**
 * BMS&电池视图
 *
 * @export
 * @class Bms
 * @extends {BaseComponent}
 */
export default class Bms extends BaseComponent {
    static contextTypes = {
        router: PropTypes.object // 路由
    }

    state = {
        SOC1: 99,
        SOC2: 99,
        剩余容量1: 345,
        剩余容量2: 345,
        组端电压1: 220,
        组端电压2: 220,
        电池电压1: 35,
        电池电压2: 35,
        电池内阻1: 35,
        电池内阻2: 35,
        电池温度1: 25,
        电池温度2: 25,
        热失控: 70,
        剩余容量: 56,
        健康状态: 50
    }

    componentDidMount() {
        super.componentDidMount();
        this.timer = setInterval(() => {
            const data = {
                SOC1: getRandom(50, 99),
                SOC2: getRandom(50, 99),
                剩余容量1: getRandom(200, 500),
                剩余容量2: getRandom(200, 500),
                组端电压1: getRandom(200, 230),
                组端电压2: getRandom(200, 230),
                电池电压1: getRandom(200, 230),
                电池电压2: getRandom(200, 230),
                电池内阻1: getRandom(20, 35),
                电池内阻2: getRandom(20, 35),
                电池温度1: getRandom(20, 30),
                电池温度2: getRandom(20, 30),
                热失控: getRandom(70, 80),
                剩余容量: getRandom(40, 60),
                健康状态: getRandom(40, 60)
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
                    <Text left={278} top={428} value="BMS&amp;电池" font="SourceHanSansSC-Medium" fontSize={48} />
                    <Image left={275} top={629} src={require("./images/img1.png")} />
                    <Image left={371} top={1285} src={require("./images/img2.png")} />
                </Container>
                <Container left={1084} top={392} background={require("./images/box2.png")}>
                    <Text left={1170} top={515} value="1#" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={1917} top={515} value="2#" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    {this._getCells(1343, 528, 1178)}
                    {this._getCells(2089, 528, 1924)}

                    <Text left={2686} top={528} value="SOC" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={2686} top={589} value="剩余容量" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={2686} top={658} value="组端电压" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={2872} top={498} value={`${toFixed(this.state.SOC1, 0)}%`} font="SourceHanSansSC-Heavy" fontSize={74} />
                    <Text left={2872} top={578} value={`${toFixed(this.state.剩余容量1, 0)}kWh`} font="SourceHanSansSC-Heavy" fontSize={74} />
                    <Text left={2872} top={645} value={`${toFixed(this.state.组端电压1, 0)}V`} font="SourceHanSansSC-Heavy" fontSize={74} />

                    <Text left={2686} top={761} value="1# 194" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Image left={2686} top={811} src={require("./images/line.png")} />

                    <Text left={2686} top={844} value="电池电压" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={2686} top={920} value="电池内阻" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={2686} top={985} value="电池温度" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={2872} top={844} value={`${toFixed(this.state.电池电压1, 0)}V`} font="SourceHanSansSC-Heavy" fontSize={74} />
                    <Text left={2872} top={908} value={`${toFixed(this.state.电池内阻1, 0)}Ω`} font="SourceHanSansSC-Heavy" fontSize={74} />
                    <Text left={2872} top={971} value={`${toFixed(this.state.电池温度1, 0)}℃`} font="SourceHanSansSC-Heavy" fontSize={74} />
                </Container>
                <Container left={1084} top={1178} background={require("./images/box2.png")}>
                    <Text left={1170} top={1301} value="1#" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={1917} top={1301} value="2#" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    {this._getCells(1343, 1314, 1178)}
                    {this._getCells(2089, 1314, 1924)}

                    <Text left={2686} top={1314} value="SOC" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={2686} top={1375} value="剩余容量" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={2686} top={1444} value="组端电压" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={2872} top={1284} value={`${toFixed(this.state.SOC2, 0)}%`} font="SourceHanSansSC-Heavy" fontSize={74} />
                    <Text left={2872} top={1364} value={`${toFixed(this.state.剩余容量2, 0)}kWh`} font="SourceHanSansSC-Heavy" fontSize={74} />
                    <Text left={2872} top={1431} value={`${toFixed(this.state.组端电压2, 0)}V`} font="SourceHanSansSC-Heavy" fontSize={74} />

                    <Text left={2686} top={1547} value="1#  194" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Image left={2686} top={1597} src={require("./images/line.png")} />

                    <Text left={2686} top={1630} value="电池电压" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={2686} top={1706} value="电池内阻" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={2686} top={1771} value="电池温度" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={2872} top={1630} value={`${toFixed(this.state.电池电压2, 0)}V`} font="SourceHanSansSC-Heavy" fontSize={74} />
                    <Text left={2872} top={1694} value={`${toFixed(this.state.电池内阻2, 0)}Ω`} font="SourceHanSansSC-Heavy" fontSize={74} />
                    <Text left={2872} top={1757} value={`${toFixed(this.state.电池温度2, 0)}℃`} font="SourceHanSansSC-Heavy" fontSize={74} />
                </Container>
                <Container left={3252} top={393} background={require("./images/box3.png")}>
                    <Text left={3376} top={554} value="热失控" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={3362} top={976} value="剩余容量" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={3362} top={1405} value="健康状态" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />

                    <CircleProgress left={3322} top={614} width={222} value={this.state.热失控} colorStart="rgb(244, 138, 62)" colorEnd="rgb(214, 80, 115)">
                        <Image left={3403} top={655} src={require("./images/icon1.png")} />
                        <Text left={3415} top={778} value="高危" font="SourceHanSansSC-Normal" fontSize={24} />
                    </CircleProgress>
                    <CircleProgress left={3322} top={1036} width={222} value={this.state.剩余容量} colorStart="rgb(244, 192, 57)" colorEnd="rgb(246, 140, 61)">
                        <Text left={3384} top={1113} value={`${toFixed(this.state.剩余容量, 0)}%`} font="SourceHanSansSC-Medium" fontSize={48} />
                        <Text left={3412} top={1191} value="较高" font="SourceHanSansSC-Normal" fontSize={24} />
                    </CircleProgress>
                    <CircleProgress left={3322} top={1465} width={222} value={this.state.健康状态} colorStart="rgb(49, 218, 225)" colorEnd="rgb(16, 181, 115)">
                        <Image left={3401} top={1527} src={require("./images/icon2.png")} />
                        <Text left={3410} top={1625} value="健康" font="SourceHanSansSC-Normal" fontSize={24} />
                    </CircleProgress>
                </Container>
            </Container>
        );
    }

    /**
     * 获取单元格列表
     *
     * @param {*} startX1 横坐标
     * @param {*} startY1 纵坐标
     * @param {*} startX2 横坐标
     * @returns 单元格列表
     * @memberof Bms
     */
    _getCells(startX1, startY1, startX2) {
        const cells = [];
        const width = 33;
        const height = 34;
        let y = startY1;
        let id = 1;

        const normal = require("./images/normal.png");
        const alarm = require("./images/alarm.png");
        const fault = require("./images/fault.png");
        const images = [normal, normal, normal, normal, normal, normal, normal, normal, alarm, fault];

        for (let i = 0; i < 16; i += 1, id += 1) {
            const left = startX1 + i * 33;
            const cell = (
                <Container left={left} top={y}>
                    <Image left={left} top={y} src={images[getRandom(0, images.length - 1)]} />
                    <Text left={left} top={y + 7} width={width} value={pad(id, 3)} align="center" fontSize={18} />
                </Container>
            );
            cells.push(cell);
        }

        for (let j = 0; j < 13; j += 1) {
            y += height;
            for (let i = 0; i < 21; i += 1, id += 1) {
                const left = startX2 + i * 33;
                const cell = (
                    <Container left={left} top={y}>
                        <Image left={left} top={y} src={images[getRandom(0, images.length - 1)]} />
                        <Text left={left} top={y + 7} width={width} value={pad(id, 3)} align="center" fontSize={18} />
                    </Container>
                );
                cells.push(cell);
            }
        }

        return cells;
    }
}
