import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '~/components/baseComponent';
import Text from '~/app/components/text';
import Image from '~/app/components/image';
import Container from '~/app/components/container';
import CircleProgress from '~/app/components/progress';
import { toFixed, pad } from '~/misc/number';
import { getRandom } from '~/misc/random';
import { getBmsData } from '~/api/v1/board';
import style from './index.scss';

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
        健康状态: 50,
        batteries1: [],
        batteries2: [],
        batteries3: [],
        batteries4: [],
        currentBatteryPackId1: 1,
        currentBatteryId1: 0,
        currentBatteryPackId2: 1,
        currentBatteryId2: 0
    }

    sohThreshold1 = 30

    sohThreshold2 = 10

    normalIcon = require("./images/normal.png");

    alarmIcon = require("./images/alarm.png");

    faultIcon = require("./images/fault.png");

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
                <Image left={200} top={173} src={require("../../framework/images/logo.png")} />
                <Image left={902} top={184} src={require("../../framework/images/title.png")} />
                <Image left={3084} top={182} src={require("../../framework/images/back.png")} onClick={() => this.context.router.history.replace('/overview')} />

                <Container left={200} top={393} background={require("./images/box1.png")}>
                    <Text left={278} top={428} value="BMS &amp; 电池" font="SourceHanSansSC-Medium" fontSize={48} />
                    <Image left={280} top={566} src={require("./images/img1.png")} className={style.move} />
                    <Image left={281} top={1247} src={require("./images/img2.png")} className={style.move} />
                </Container>
                <Container left={1084} top={392} background={require("./images/box2.png")}>
                    <Text left={1170} top={481} value="1#" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={1917} top={481} value="2#" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    {this._getCells(1, this.state.batteries1, 1178, 528)}
                    {this._getCells(2, this.state.batteries2, 1924, 528)}

                    <Text left={2685} top={528} value="SOC" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={2685} top={591} value="剩余容量" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={2685} top={658} value="组端电压" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={2908} top={528} value={`${toFixed(this.state.SOC1, 0)}%`} font="SourceHanSansSC-Heavy" fontSize={40} />
                    <Text left={2908} top={590} value={`${toFixed(this.state.剩余容量1, 0)}kWh`} font="SourceHanSansSC-Heavy" fontSize={40} />
                    <Text left={2908} top={664} value={`${toFixed(this.state.组端电压1, 0)}V`} font="SourceHanSansSC-Heavy" fontSize={40} />

                    <Text left={2685} top={772} value={`${this.state.currentBatteryPackId1}# ${this.state.currentBatteryId1 + 1}`} font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Image left={2686} top={811} src={require("./images/line.png")} />

                    <Text left={2686} top={857} value="电池电压" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={2686} top={921} value="电池内阻" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={2686} top={987} value="电池温度" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={2909} top={858} value={`${toFixed(this.state.电池电压1, 1)}V`} font="SourceHanSansSC-Heavy" fontSize={40} />
                    <Text left={2909} top={921} value={`${toFixed(this.state.电池内阻1, 1)}μΩ`} font="SourceHanSansSC-Heavy" fontSize={40} />
                    <Text left={2909} top={991} value={`${toFixed(this.state.电池温度1, 1)}℃`} font="SourceHanSansSC-Heavy" fontSize={40} />
                </Container>
                <Container left={1084} top={1178} background={require("./images/box3.png")}>
                    <Text left={1170} top={1267} value="1#" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={1917} top={1267} value="2#" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    {this._getCells(3, this.state.batteries3, 1178, 1314)}
                    {this._getCells(4, this.state.batteries4, 1924, 1314)}

                    <Text left={2685} top={1317} value="SOC" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={2685} top={1380} value="剩余容量" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={2685} top={1447} value="组端电压" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={2908} top={1317} value={`${toFixed(this.state.SOC2, 0)}%`} font="SourceHanSansSC-Heavy" fontSize={40} />
                    <Text left={2908} top={1379} value={`${toFixed(this.state.剩余容量2, 0)}kWh`} font="SourceHanSansSC-Heavy" fontSize={40} />
                    <Text left={2908} top={1453} value={`${toFixed(this.state.组端电压2, 0)}V`} font="SourceHanSansSC-Heavy" fontSize={40} />

                    <Text left={2683} top={1561} value={`${this.state.currentBatteryPackId2}# ${this.state.currentBatteryId2 + 1}`} font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Image left={2686} top={1611} src={require("./images/line.png")} />

                    <Text left={2686} top={1646} value="电池电压" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={2686} top={1710} value="电池内阻" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={2686} top={1776} value="电池温度" font="SourceHanSansSC-Medium" fontSize={40} color="rgb(60, 211, 238)" />
                    <Text left={2909} top={1647} value={`${toFixed(this.state.电池电压2, 1)}V`} font="SourceHanSansSC-Heavy" fontSize={40} />
                    <Text left={2909} top={1710} value={`${toFixed(this.state.电池内阻2, 1)}μΩ`} font="SourceHanSansSC-Heavy" fontSize={40} />
                    <Text left={2909} top={1780} value={`${toFixed(this.state.电池温度2, 1)}℃`} font="SourceHanSansSC-Heavy" fontSize={40} />
                </Container>
                <Container left={3252} top={393} background={require("./images/box4.png")}>
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
     * 加载数据
     *
     * @memberof Bms
     */
    _loadData() {
        if (process.env.NODE_ENV === 'development') {
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
                健康状态: getRandom(40, 60),
                batteries1: [],
                batteries2: [],
                batteries3: [],
                batteries4: []
            };
            this.setState(data);
        }
        else {
            getBmsData(bms => {
                const data = {};
                data.SOC1 = bms.soc1;
                data.SOC2 = bms.soc2;
                data.剩余容量1 = bms.electricity1;
                data.剩余容量2 = bms.electricity2;
                data.组端电压1 = bms.voltage1;
                data.组端电压2 = bms.voltage2;
                data.热失控 = bms.thermal;
                data.剩余容量 = bms.soc;
                data.健康状态 = bms.soh;
                data.batteries1 = bms.batteries1;
                data.batteries2 = bms.batteries2;
                data.batteries3 = bms.batteries3;
                data.batteries4 = bms.batteries4;
                this.setLoadingState(false);
                this.setState(data);
                this._onCellClick1(this.state.currentBatteryPackId1, this.state.currentBatteryId1);
                this._onCellClick2(this.state.currentBatteryPackId2, this.state.currentBatteryId2);
            });
        }
    }

    /**
     * 获取单元格列表
     *
     * @param {*} batteryPackId 电池组索引
     * @param {*} batteries 电池数据
     * @param {*} startX 横坐标
     * @param {*} startY 纵坐标
     * @returns 单元格列表
     * @memberof Bms
     */
    _getCells(batteryPackId, batteries, startX, startY) {
        const cells = [];
        const width = 33;
        const height = 34;
        let y = startY;
        let id = 1;

        for (let j = 0; j < 15; j += 1, y += height) {            
            for (let i = 0; i < 21; i += 1, id += 1) {
                const left = startX + i * 33;
                const batteryId = id;
                const cell = (
                    <Container left={left} top={y} width={33} height={34} onClick={() => (batteryPackId <= 2) ? this._onCellClick1(batteryPackId, batteryId - 1) : this._onCellClick2(batteryPackId - 2, batteryId - 1)}>
                        <Image left={left} top={y} src={this._getBatteryIcon(batteries, id - 1)} />
                        <Text left={left} top={y + 7} width={width} value={pad(id, 3)} align="center" fontSize={18} />
                    </Container>
                );
                cells.push(cell);
            }
        }

        return cells;
    }

    /**
     * 获取电池图标
     *
     * @param {*} batteries 电池数据
     * @param {*} id 电池索引
     * @returns 电池图标
     * @memberof Bms
     */
    _getBatteryIcon(batteries, id) {
        let icon = this.normalIcon;
        if (batteries.length > id) {
            if (batteries[id].soh < this.sohThreshold1) {
                icon = this.alarmIcon;
            }

            if (batteries[id].soh < this.sohThreshold2) {
                icon = this.faultIcon;
            }
        }

        return icon;
    }

    /**
     * 电池点击事件处理函数
     *
     * @param {*} batteryPackId 电池组索引
     * @param {*} batteryId 电池索引
     * @memberof Bms
     */
    _onCellClick1(batteryPackId, batteryId) {
        const batteries = (batteryPackId === 1) ? this.state.batteries1 : this.state.batteries2;
        const voltage = (batteries.length > batteryId) ? batteries[batteryId].voltage : 0;
        const resistance = (batteries.length > batteryId) ? batteries[batteryId].resistance : 0;
        const temperature = (batteries.length > batteryId) ? batteries[batteryId].temperature : 0;

        this.setState({
            currentBatteryPackId1: batteryPackId,
            currentBatteryId1: batteryId,
            电池电压1: voltage,
            电池内阻1: resistance,
            电池温度1: temperature
        });
    }

    /**
     * 电池点击事件处理函数
     *
     * @param {*} batteryPackId 电池组索引
     * @param {*} batteryId 电池索引
     * @memberof Bms
     */
    _onCellClick2(batteryPackId, batteryId) {
        const batteries = (batteryPackId === 3) ? this.state.batteries3 : this.state.batteries4;
        const voltage = (batteries.length > batteryId) ? batteries[batteryId].voltage : 0;
        const resistance = (batteries.length > batteryId) ? batteries[batteryId].resistance : 0;
        const temperature = (batteries.length > batteryId) ? batteries[batteryId].temperature : 0;

        this.setState({
            currentBatteryPackId2: batteryPackId,
            currentBatteryId2: batteryId,
            电池电压2: voltage,
            电池内阻2: resistance,
            电池温度2: temperature
        });
    }
}
