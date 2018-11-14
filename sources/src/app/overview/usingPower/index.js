import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '~/components/baseComponent';
import style from "./index.scss";

/**
 * 系统站用电量组件
 *
 * @export
 * @class UsingPower
 * @extends {BaseComponent}
 */
export default class UsingPower extends BaseComponent {
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
                    系统站用电量
                </span>
                <div className={style.content_value}>
                    {this.props.value}
                </div>
                <span className={style.content_unit}>
                    kWh
                </span>
            </div>
        );
    }
}
