import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '~/components/baseComponent';
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
        data1: 0,
        data2: 0,
        data3: 0
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
                <span className={style.content_data2_title}>
                    剩余容量
                </span>
                <span className={style.content_data3_title}>
                    健康状态
                </span>
            </div>
        );
    }
}
