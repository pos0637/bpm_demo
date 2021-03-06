import React from 'react';
import { getRandom } from '~/misc/random';
import { toFixed } from '~/misc/number';
import { getBmsData } from '~/api/v1/board';
import BaseComponent from '~/components/baseComponent';
import Progress from '~/app/components/progress';
import style from "./index.scss";

/**
 * BMS概览视图
 *
 * @export
 * @class BmsView
 * @extends {BaseComponent}
 */
export default class BmsView extends BaseComponent {
    state = {
        soc1: getRandom(0, 100),
        soc2: getRandom(0, 100),
        rest1: getRandom(0, 200),
        rest2: getRandom(0, 200),
        voltage1: getRandom(0, 220),
        voltage2: getRandom(0, 220),
        voltage3: getRandom(0, 220),
        voltage4: getRandom(0, 220),
        resistance1: getRandom(0, 10),
        resistance2: getRandom(0, 10),
        temperature1: getRandom(0, 40),
        temperature2: getRandom(0, 40),
        data1: getRandom(80, 100),
        data2: getRandom(40, 60),
        data3: getRandom(0, 80)
    }

    componentDidMount() {
        super.componentDidMount();
        this.timer = setInterval(() => {
            const data = {
                soc1: getRandom(0, 100),
                soc2: getRandom(0, 100),
                rest1: getRandom(0, 200),
                rest2: getRandom(0, 200),
                voltage1: getRandom(0, 220),
                voltage2: getRandom(0, 220),
                voltage3: getRandom(0, 220),
                voltage4: getRandom(0, 220),
                resistance1: getRandom(0, 10),
                resistance2: getRandom(0, 10),
                temperature1: getRandom(0, 40),
                temperature2: getRandom(0, 40),
                data1: getRandom(80, 100),
                data2: getRandom(40, 60),
                data3: getRandom(0, 80)
            };

            getBmsData((bms) => {
                data.soc1 = bms.soc1;
                data.voltage1 = bms.voltage1;
                data.soc2 = bms.soc2;
                data.voltage3 = bms.voltage2;
                this.setState(data);
            }, () => {
                this.setState(data);
            });
        }, 2000);
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
        super.componentWillUnmount();
    }

    render() {
        return (
            <div className={style.container}>
                <div className={style.background1}>
                    <img src={require("./images/background1.png")} alt="" />
                </div>
                <div className={style.content_logo}>
                    <img src={require("./images/gra_bms.png")} alt="" />
                </div>
                <span className={style.content_title}>
                    BMS&amp;电池
                </span>
                <div className={style.background2}>
                    <img src={require("./images/background2.png")} alt="" />
                </div>
                <span className={style.content_title2}>
                    1#
                </span>
                <span className={style.content_title3}>
                    2#
                </span>
                <div className={style.content_grid1}>
                    <table className={style.grid}><tbody>{this.generateTableBody(0)}</tbody></table>
                </div>
                <div className={style.content_grid2}>
                    <table className={style.grid}><tbody>{this.generateTableBody(1)}</tbody></table>
                </div>
                <div className={style.background3}>
                    <img src={require("./images/background2.png")} alt="" />
                </div>
                <span className={style.content_title4}>
                    1#
                </span>
                <span className={style.content_title5}>
                    2#
                </span>
                <div className={style.content_grid3}>
                    <table className={style.grid}><tbody>{this.generateTableBody(2)}</tbody></table>
                </div>
                <div className={style.content_grid4}>
                    <table className={style.grid}><tbody>{this.generateTableBody(3)}</tbody></table>
                </div>
                <span className={style.content_title6}>
                    SOC&nbsp;&nbsp;{toFixed(this.state.soc1, 1)}%
                </span>
                <span className={style.content_title7}>
                    剩余容量&nbsp;&nbsp;{this.state.rest1}kWh
                </span>
                <span className={style.content_title8}>
                    组端电压&nbsp;&nbsp;{toFixed(this.state.voltage1, 1)}v
                </span>
                <span className={style.content_title9}>
                    1#194
                </span>
                <span className={style.content_title10}>
                    电池电压&nbsp;&nbsp;{toFixed(this.state.voltage2, 1)}v
                </span>
                <span className={style.content_title11}>
                    电池内阻&nbsp;&nbsp;{this.state.resistance1}
                </span>
                <span className={style.content_title12}>
                    电池温度&nbsp;&nbsp;{this.state.temperature1}
                </span>
                <span className={style.content_title13}>
                    SOC&nbsp;&nbsp;{toFixed(this.state.soc2, 1)}%
                </span>
                <span className={style.content_title14}>
                    剩余容量&nbsp;&nbsp;{this.state.rest2}kWh
                </span>
                <span className={style.content_title15}>
                    组端电压&nbsp;&nbsp;{this.state.voltage3}v
                </span>
                <span className={style.content_title16}>
                    1#194
                </span>
                <span className={style.content_title17}>
                    电池电压&nbsp;&nbsp;{this.state.voltage4}v
                </span>
                <span className={style.content_title18}>
                    电池内阻&nbsp;&nbsp;{this.state.resistance2}
                </span>
                <span className={style.content_title19}>
                    电池温度&nbsp;&nbsp;{this.state.temperature2}
                </span>
                <div className={style.background4}>
                    <img src={require("./images/background3.png")} alt="" />
                </div>
                <span className={style.content_data1_title}>
                    热失控
                </span>
                <div className={style.content_progress1}>
                    <Progress width={180} value={this.state.data1} color="#F86E05" onRenderContent={() => <div><img className={style.content_progress1_icon} src={require("./images/icon_reshikong.png")} alt="" /></div>} />
                </div>
                <span className={style.content_data2_title}>
                    剩余容量
                </span>
                <div className={style.content_progress2}>
                    <Progress width={180} value={this.state.data2} color="#FFC208" text1={`${this.state.data2}%`} />
                </div>
                <span className={style.content_data3_title}>
                    健康状态
                </span>
                <div className={style.content_progress3}>
                    <Progress width={180} value={this.state.data3} color="#1BC85D" onRenderContent={() => <div><img className={style.content_progress3_icon} src={require("./images/icon_dianchijiankang.png")} alt="" /></div>} />
                </div>
            </div>
        );
    }

    /**
     * 生成表格内容
     * 
     * @param {*} tableKey 表格索引
     */
    generateTableBody(tableKey) {
        let i = 1;
        let key = 0;
        const tbody = [];

        for (let y = 0; y < 16; y += 1) {
            const tr = [];
            for (let x = 0; x < 20; x += 1, i += 1, key += 1) {
                tr.push(<td className={style.grid_cell} key={`cell_${tableKey}_${key}`}><div className={style.cell}>{i}</div></td>);
            }
            tbody.push(<tr key={`row_${tableKey}_${key}`}>{tr}</tr>);
        }

        return tbody;
    }
}
