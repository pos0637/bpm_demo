import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '~/components/baseComponent';
import style from "./index.scss";

/**
 * 主框架
 *
 * @export
 * @class MainFrame
 * @extends {BaseComponent}
 */
export default class Framework extends BaseComponent {
    static contextTypes = {
        router: PropTypes.object // 路由
    }

    static propTypes = {
        logout: PropTypes.bool, // 是否允许注销
        back: PropTypes.bool // 是否允许返回
    }

    static defaultProps = {
        logout: false,
        back: false
    }

    render() {
        return (
            <div>
                <img className={style.background} src={require("./images/background.png")} alt="" />
                <div className={style.topbar}>
                    <div className={style.topbar_background}>
                        <img className={style.topbar_background_image} src={require("./images/logo_bar.png")} alt="" />
                    </div>
                    <div className={style.topbar_content}>
                        <table className={style.topbar_content_box}>
                            <tbody>
                                <tr>
                                    <td className={style.topbar_content_box1} />
                                    <td className={style.topbar_content_box_logo}>
                                        <img className={style.topbar_content_box_logo_content} src={require("./images/logo.png")} alt="" />
                                    </td>
                                    <td />
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className={style.topbar_content}>
                        <table className={style.topbar_content_box}>
                            <tbody>
                                <tr>
                                    <td className={style.topbar_content_box2} />
                                    <td className={style.topbar_content_box_app_name}>
                                        <img className={style.topbar_content_box_app_name_content} src={require("./images/app_name.png")} alt="" />
                                    </td>
                                    <td />
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className={style.topbar_content}>
                        <table className={style.topbar_content_box}>
                            <tbody>
                                <tr>
                                    <td className={style.topbar_content_box3} />
                                    <td className={style.topbar_content_box_location}>
                                        <img className={style.topbar_content_box_location_content} src={require("./images/location.png")} alt="" />
                                    </td>
                                    <td />
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className={style.topbar_content} style={{ display: this.props.logout ? 'block' : 'none' }}>
                        <table className={style.topbar_content_box}>
                            <tbody>
                                <tr>
                                    <td className={style.topbar_content_box4} />
                                    <td className={style.topbar_content_box_logout}>
                                        {this.props.logout ? <input type="button" className={style.topbar_content_box_logout_content} onClick={() => this._onLogoutButtonClick()} /> : <div />}
                                    </td>
                                    <td />
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className={style.topbar_content} style={{ display: this.props.back ? 'block' : 'none' }}>
                        <table className={style.topbar_content_box}>
                            <tbody>
                                <tr>
                                    <td className={style.topbar_content_box4} />
                                    <td className={style.topbar_content_box_logout}>
                                        {this.props.back ? <input type="button" className={style.topbar_content_box_back_content} onClick={() => this._onBackButtonClick()} /> : <div />}
                                    </td>
                                    <td />
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={style.content}>
                    <div className={style.content_box}>
                        {this.props.children}
                    </div>
                </div>
                <div className={style.footer}>
                    <div className={style.footer_background}>
                        <img className={style.footer_background_image} src={require("./images/footer.png")} alt="" />
                    </div>
                </div>
            </div>
        );
    }

    /**
     * 注销按钮点击事件
     *
     * @memberof Framework
     */
    _onLogoutButtonClick() {
        this.context.router.history.replace('/');
    }

    /**
     * 返回按钮点击事件
     *
     * @memberof Framework
     */
    _onBackButtonClick() {
        this.context.router.history.replace('/main');
    }
}
