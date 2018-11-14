import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '~/components/baseComponent';
import style from "./index.scss";

/**
 * 电站运行状态组件
 *
 * @export
 * @class RunningState
 * @extends {BaseComponent}
 */
export default class RunningState extends BaseComponent {
    static propTypes = {
        state: PropTypes.number // 运行状态
    }

    static defaultProps = {
        state: 0 // 待机
    }

    render() {
        let image;
        if (this.props.state === 1)
            image = <img src={require("./images/charging.png")} alt="" />;
        else if (this.props.state === 2)
            image = <img src={require("./images/discharging.png")} alt="" />;
        else
            image = <img src={require("./images/standby.png")} alt="" />;

        return (
            <div className={style.contrainer}>
                <div className={style.background}>
                    <img src={require("./images/background.png")} alt="" />
                </div>
                <span className={style.content_text}>
                    电站运行状态
                </span>
                <div className={style.content_image}>
                    {image}
                </div>
            </div>
        );
    }
}
