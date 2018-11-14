import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '~/components/baseComponent';
import Progress from '~/app/components/progress';
import LineChart from '~/app/components/lineChart';
import style from "./index.scss";

/**
 * BMS信息概览组件
 *
 * @export
 * @class BmsOverview
 * @extends {BaseComponent}
 */
export default class BmsOverview extends BaseComponent {
    static contextTypes = {
        router: PropTypes.object // 路由
    }

    static propTypes = {
        data1: PropTypes.number,
        data2: PropTypes.number,
        data3: PropTypes.number,
        power: PropTypes.number
    }

    static defaultProps = {
        data1: 87,
        data2: 48,
        data3: 65,
        power: 50
    }

    render() {
        return (
            <div className={style.contrainer}>
                <div className={style.viewButton} onClick={() => this.context.router.history.replace('/bms')} />
                <div className={style.background}>
                    <img src={require("./images/background.png")} alt="" />
                </div>
                <div className={style.content_flag1}>
                    <img src={require("./images/flag.png")} alt="" />
                </div>
                <div className={style.content_logo1}>
                    <img src={require("./images/gra_bms.png")} alt="" />
                </div>
                <span className={style.content_title1}>
                    BMS信息概览
                </span>
                <div className={style.content_powerData}>
                    <LineChart min={this.props.power - 50} max={this.props.power + 50} color="rgba(68,175,244,0.8)" />
                </div>
                <div className={style.content_flag2}>
                    <img src={require("./images/flag.png")} alt="" />
                </div>
                <div className={style.content_logo2}>
                    <img src={require("./images/gra_dianchi.png")} alt="" />
                </div>
                <span className={style.content_title2}>
                    电池组信息概览
                </span>
                <span className={style.content_data1_title}>
                    热失控
                </span>
                <div className={style.content_progress1}>
                    <Progress width={180} value={this.props.data1} color="#F86E05" onRenderContent={() => <div><img className={style.content_progress1_icon} src={require("./images/icon_reshikong.png")} alt="" /></div>} />
                </div>
                <span className={style.content_data2_title}>
                    剩余容量
                </span>
                <div className={style.content_progress2}>
                    <Progress width={180} value={this.props.data2} color="#FFC208" text1={`${this.props.data2}%`} />
                </div>
                <span className={style.content_data3_title}>
                    健康状态
                </span>
                <div className={style.content_progress3}>
                    <Progress width={180} value={this.props.data3} color="#1BC85D" onRenderContent={() => <div><img className={style.content_progress3_icon} src={require("./images/icon_dianchijiankang.png")} alt="" /></div>} />
                </div>
            </div>
        );
    }
}
