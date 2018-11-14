import React from 'react';
import BaseComponent from '~/components/baseComponent';
import style from "./index.scss";

/**
 * 介绍组件
 *
 * @export
 * @class Introduction
 * @extends {BaseComponent}
 */
export default class Introduction extends BaseComponent {
    render() {
        return (
            <div className={style.contrainer}>
                <div className={style.background}>
                    <img src={require("./images/background.png")} alt="" />
                </div>
                <span className={style.content_text1}>
                    金茂绿建
                </span>
                <span className={style.content_text2}>
                    储能系统
                </span>
                <span className={style.content_text3}>
                    系统介绍系统介绍系统介绍系统介<br />
                    系统介绍系统介绍系统介绍系统介<br />
                    系统介绍系统介绍系统介绍系统介<br />
                    系统介绍系统介绍系统介绍系统介<br />
                    系统介绍系统介绍系统介绍系统介<br />
                    系统介绍系统介绍系统介绍系统介<br />
                    系统介绍系统介绍系统介绍系统介<br />
                    系统介绍系统介绍系统介绍系统介<br />
                    系统介绍系统介绍系统介绍系统介<br />
                    系统介绍系统介绍系统介绍系统介<br />
                    系统介绍系统介绍系统介绍系统介<br />
                    系统介绍系统介绍系统介绍系统介<br />
                    系统介绍系统介绍系统介绍系统介<br />
                </span>
            </div>
        );
    }
}
