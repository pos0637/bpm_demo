import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '~/components/baseComponent';
import style from "./index.scss";

/**
 * 安防系统状态组件
 *
 * @export
 * @class SecuritySystemState
 * @extends {BaseComponent}
 */
export default class SecuritySystemState extends BaseComponent {
    static propTypes = {
        state: PropTypes.number // 状态
    }

    static defaultProps = {
        state: 0 // 正常
    }

    render() {
        let image;
        if (this.props.state === 1)
            image = <img className={style.background_image} src={require("./images/alarm.png")} alt="" />;
        else
            image = <img className={style.background_image} src={require("./images/normal.png")} alt="" />;

        return (
            <div className={style.contrainer}>
                <div className={style.background}>
                    <img className={style.background_image} src={require("./images/background.png")} alt="" />
                </div>
                <span className={style.content_text}>
                    安防系统状态
                </span>
                <div className={style.content_image}>
                    {image}
                </div>
            </div>
        );
    }
}
