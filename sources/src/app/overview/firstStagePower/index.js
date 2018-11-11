import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '~/components/baseComponent';
import LineChart from '~/app/components/lineChart';
import style from "./index.scss";

/**
 * I段实时功率组件
 *
 * @export
 * @class FirstStagePower
 * @extends {BaseComponent}
 */
export default class FirstStagePower extends BaseComponent {
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
                    I段实时功率
                </span>
                <div className={style.content_value}>
                    {this.props.value}
                </div>
                <span className={style.content_unit}>
                    W
                </span>
                <div className={style.content_chart}>
                    <LineChart min={50} max={100} color="rgba(68,175,244,0.8)" />
                </div>
            </div>
        );
    }
}
