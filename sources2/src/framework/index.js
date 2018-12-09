import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '~/components/baseComponent';
import style from './index.scss';
import Image from '~/app/components/image';
import Text from '~/app/components/text';

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
                <img className={style.background} src={require("./images/bg.png")} alt="" />
                <Image left={199} top={96} src={require("./images/logo.png")} />
                <Image left={3270} top={2026} src={require("./images/logo2.png")} />
                <Image left={199} top={198} src={require("./images/title.png")} />
                <Text left={1895} top={194} value="无故障运行" font="SourceHanSansSC-Light" fontSize={58.39} />
                <div className={style.content}>
                    <div className={style.content_box}>
                        {this.props.children}
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
