import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '~/components/baseComponent';
import style from "./index.scss";

/**
 * 充放电曲线组件
 *
 * @export
 * @class ChargingDischargingData
 * @extends {BaseComponent}
 */
export default class ChargingDischargingData extends BaseComponent {
    static propTypes = {
        value: PropTypes.number // 值
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
                    充放电曲线
                </span>
                <div className={style.content_value}>
                    {this.props.value}%
                </div>
            </div>
        );
    }
}
