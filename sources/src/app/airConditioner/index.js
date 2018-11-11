import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '~/components/baseComponent';
import style from "./index.scss";

/**
 * 空调概览视图
 *
 * @export
 * @class AirConditionerView
 * @extends {BaseComponent}
 */
export default class AirConditionerView extends BaseComponent {
    static propTypes = {
        information1: PropTypes.number,
        information2: PropTypes.number,
        temperature1: PropTypes.number,
        temperature2: PropTypes.number
    }

    static defaultProps = {
        information1: 0,
        information2: 0,
        temperature1: 40,
        temperature2: 40
    }

    componentDidMount() {
        super.componentDidMount();
        this.timer = setInterval(() => {
        }, 2000);
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
        super.componentWillUnmount();
    }

    render() {
        let information11;
        let information12;
        let information13;
        if (this.props.information1 === 1) {
            information11 = <img className={style.background_image} src={require("./images/normal2.png")} alt="" />;
            information12 = <img className={style.background_image} src={require("./images/alarm1.png")} alt="" />;
            information13 = <img className={style.background_image} src={require("./images/fault2.png")} alt="" />;
        }
        else if (this.props.information1 === 2) {
            information11 = <img className={style.background_image} src={require("./images/normal2.png")} alt="" />;
            information12 = <img className={style.background_image} src={require("./images/alarm2.png")} alt="" />;
            information13 = <img className={style.background_image} src={require("./images/fault1.png")} alt="" />;
        }
        else {
            information11 = <img className={style.background_image} src={require("./images/normal1.png")} alt="" />;
            information12 = <img className={style.background_image} src={require("./images/alarm2.png")} alt="" />;
            information13 = <img className={style.background_image} src={require("./images/fault2.png")} alt="" />;
        }

        let information21;
        let information22;
        if (this.props.information2 === 1) {
            information21 = <img className={style.background_image} src={require("./images/normal2.png")} alt="" />;
            information22 = <img className={style.background_image} src={require("./images/alarm1.png")} alt="" />;
        }
        else {
            information21 = <img className={style.background_image} src={require("./images/normal1.png")} alt="" />;
            information22 = <img className={style.background_image} src={require("./images/alarm2.png")} alt="" />;
        }

        return (
            <div className={style.container}>
                <div className={style.background1}>
                    <img className={style.background_image} src={require("./images/background1.png")} alt="" />
                </div>
                <div className={style.content_logo}>
                    <img className={style.background_image} src={require("./images/gra_kongtiao.png")} alt="" />
                </div>
                <span className={style.content_title}>
                    空调&amp;灭火器
                </span>
                <div className={style.background2}>
                    <img className={style.background_image} src={require("./images/background3.png")} alt="" />
                </div>
                <span className={style.content_title2}>
                    电气室温度
                </span>
                <div className={style.content_value2}>
                    {this.props.temperature1}
                </div>
                <span className={style.content_title3}>
                    电池室温度
                </span>
                <div className={style.content_value3}>
                    {this.props.temperature2}
                </div>
                <div className={style.background3}>
                    <img className={style.background_image} src={require("./images/background4.png")} alt="" />
                </div>
                <span className={style.content_title4}>
                    气体灭火器状态
                </span>
                <div className={style.content_information11}>
                    {information11}
                </div>
                <div className={style.content_information12}>
                    {information12}
                </div>
                <div className={style.content_information13}>
                    {information13}
                </div>
                <div className={style.background4}>
                    <img className={style.background_image} src={require("./images/background2.png")} alt="" />
                </div>
                <span className={style.content_title5}>
                    氢气探测器状态
                </span>
                <div className={style.content_information21}>
                    {information21}
                </div>
                <div className={style.content_information22}>
                    {information22}
                </div>
            </div>
        );
    }
}
