import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '~/components/baseComponent';
import Progress from '~/app/components/progress';
import style from "./index.scss";

/**
 * BMS信息概览组件
 *
 * @export
 * @class BmsOverview
 * @extends {BaseComponent}
 */
export default class BmsOverview extends BaseComponent {
    static propTypes = {
        data1: PropTypes.number,
        data2: PropTypes.number,
        data3: PropTypes.number
    }

    static defaultProps = {
        data1: 87,
        data2: 48,
        data3: 65
    }

    render() {
        return (
            <div className={style.contrainer}>
                <div className={style.background}>
                    <img className={style.background_image} src={require("./images/background.png")} alt="" />
                </div>
                <div className={style.content_flag1}>
                    <img className={style.background_image} src={require("./images/flag.png")} alt="" />
                </div>
                <div className={style.content_logo1}>
                    <img className={style.background_image} src={require("./images/gra_bms.png")} alt="" />
                </div>
                <span className={style.content_title1}>
                    BMS信息概览
                </span>
                <div className={style.content_flag2}>
                    <img className={style.background_image} src={require("./images/flag.png")} alt="" />
                </div>
                <div className={style.content_logo2}>
                    <img className={style.background_image} src={require("./images/gra_dianchi.png")} alt="" />
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
