import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '~/components/baseComponent';
import style from "./index.scss";

/**
 * 无故障运行时间组件
 *
 * @export
 * @class RunningTime
 * @extends {BaseComponent}
 */
export default class RunningTime extends BaseComponent {
    static propTypes = {
        time: PropTypes.number // 运行事件
    }

    static defaultProps = {
        time: 0
    }

    render() {
        return (
            <div className={style.contrainer}>
                <div className={style.background}>
                    <img className={style.background_image} src={require("./images/background.png")} alt="" />
                </div>
                <span className={style.content_text}>
                    无故障运行
                </span>
                <div className={style.content_time}>
                    {this.props.time}
                </div>
                <span className={style.content_unit}>
                    天
                </span>
            </div>
        );
    }
}
