import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '~/components/baseComponent';

/**
 * 对话框
 *
 * @export
 * @class Dialog
 * @extends {BaseComponent}
 */
export default class Dialog extends BaseComponent {
    static propTypes = {
        onClick: PropTypes.func // 点击事件处理函数
    }

    static defaultProps = {
        onClick: null
    }

    render() {
        return (
            <div style={{ position: 'fixed', left: 0, top: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 999 }} onClick={this.props.onClick}>
                <div style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
