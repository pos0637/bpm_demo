import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '~/components/baseComponent';
import style from "./index.scss";

/**
 * 总节电费用组件
 *
 * @export
 * @class ElectricityBills
 * @extends {BaseComponent}
 */
export default class ElectricityBills extends BaseComponent {
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
                    总节电费用
                </span>
                <div className={style.content_value}>
                    {this.props.value}
                </div>
                <span className={style.content_unit}>
                    元
                </span>
            </div>
        );
    }
}
