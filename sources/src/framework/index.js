import React from 'react';
import BaseComponent from '~/components/baseComponent';
import Iframe from '~/components/iframe';
import './index.scss';

/**
 * 主框架
 *
 * @export
 * @class MainFrame
 * @extends {BaseComponent}
 */
export default class Framework extends BaseComponent {
    render() {
        return (
            <div>
                <img className="background" src={require("./images/background.png")} alt="" />
                <div className="topbar">
                    <div className="topbar_background">
                        <img className="topbar_background_image" src={require("./images/logo_bar.png")} alt="" />
                    </div>
                    <div className="topbar_content">
                        <table className="topbar_content_box">
                            <tbody>
                                <tr>
                                    <td className="topbar_content_box1" />
                                    <td className="topbar_content_box_logo">
                                        <img className="topbar_content_box_logo_content" src={require("./images/logo.png")} alt="" />
                                    </td>
                                    <td />
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="topbar_content">
                        <table className="topbar_content_box">
                            <tbody>
                                <tr>
                                    <td className="topbar_content_box2" />
                                    <td className="topbar_content_box_app_name">
                                        <img className="topbar_content_box_app_name_content" src={require("./images/app_name.png")} alt="" />
                                    </td>
                                    <td />
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="topbar_content">
                        <table className="topbar_content_box">
                            <tbody>
                                <tr>
                                    <td className="topbar_content_box3" />
                                    <td className="topbar_content_box_location">
                                        <img className="topbar_content_box_location_content" src={require("./images/location.png")} alt="" />
                                    </td>
                                    <td />
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="content">
                    <div className="content_box">
                        <Iframe url="./app_main.html" />
                    </div>
                </div>
                <div className="footer">
                    <div className="footer_background">
                        <img className="footer_background_image" src={require("./images/footer.png")} alt="" />
                    </div>
                </div>
            </div>
        );
    }
}
