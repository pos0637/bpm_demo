import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '~/components/baseComponent';
import style from "./index.scss";

/**
 * 系统状态组件
 *
 * @export
 * @class SystemState
 * @extends {BaseComponent}
 */
export default class SystemState extends BaseComponent {
    static propTypes = {
        securitySystemState: PropTypes.number, // 消防系统状态
        airConditionerState: PropTypes.number // 空调运行状态
    }

    static defaultProps = {
        securitySystemState: 0,
        airConditionerState: 0
    }

    render() {
        let state1;
        if (this.props.securitySystemState === 1)
            state1 = <img className={style.background_image} src={require("./images/security_system_alarm.png")} alt="" />;
        else
            state1 = <img className={style.background_image} src={require("./images/security_system_normal.png")} alt="" />;

        let state2;
        if (this.props.airConditionerState === 1)
            state2 = <img className={style.background_image} src={require("./images/air_conditioner_alarm.png")} alt="" />;
        else
            state2 = <img className={style.background_image} src={require("./images/air_conditioner_normal.png")} alt="" />;

        return (
            <div className={style.contrainer}>
                <div className={style.background}>
                    <img className={style.background_image} src={require("./images/background.png")} alt="" />
                </div>
                <div className={style.content_flag1}>
                    <img className={style.background_image} src={require("./images/flag.png")} alt="" />
                </div>
                <span className={style.content_title1}>
                    消防系统状态
                </span>
                <div className={style.content_state1}>
                    {state1}
                </div>
                <div className={style.content_logo1}>
                    <img className={style.background_image} src={require("./images/security_system.png")} alt="" />
                </div>
                <div className={style.content_flag2}>
                    <img className={style.background_image} src={require("./images/flag.png")} alt="" />
                </div>
                <span className={style.content_title2}>
                    空调运行状态
                </span>
                <div className={style.content_state2}>
                    {state2}
                </div>
                <div className={style.content_logo2}>
                    <img className={style.background_image} src={require("./images/air_conditioner.png")} alt="" />
                </div>
            </div>
        );
    }
}
