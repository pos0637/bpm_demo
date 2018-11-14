import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '~/components/baseComponent';
import style from "./index.scss";

/**
 * 电站运行信息组件
 *
 * @export
 * @class RunningInformation
 * @extends {BaseComponent}
 */
export default class RunningInformation extends BaseComponent {
    static propTypes = {
        information: PropTypes.number // 运行信息
    }

    static defaultProps = {
        information: 0 // 正常
    }

    render() {
        let image;
        if (this.props.information === 1)
            image = <img src={require("./images/alarm.png")} alt="" />;
        else if (this.props.information === 2)
            image = <img src={require("./images/fault.png")} alt="" />;
        else
            image = <img src={require("./images/normal.png")} alt="" />;

        return (
            <div className={style.contrainer}>
                <div className={style.background}>
                    <img src={require("./images/background.png")} alt="" />
                </div>
                <span className={style.content_text}>
                    电站运行信息
                </span>
                <div className={style.content_image}>
                    {image}
                </div>
            </div>
        );
    }
}
