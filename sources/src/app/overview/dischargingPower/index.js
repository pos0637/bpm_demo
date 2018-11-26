import React from 'react';
import PropTypes from 'prop-types';
import { toFixed } from '~/misc/number';
import BaseComponent from '~/components/baseComponent';
import style from "./index.scss";

/**
 * 总放电电量组件
 *
 * @export
 * @class DischargingPower
 * @extends {BaseComponent}
 */
export default class DischargingPower extends BaseComponent {
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
                    <img src={require("./images/background.png")} alt="" />
                </div>
                <span className={style.content_text}>
                    总放电电量
                </span>
                <div className={style.content_value}>
                    {toFixed(this.props.value, 1)}
                </div>
                <span className={style.content_unit}>
                    kWh
                </span>
            </div>
        );
    }
}
