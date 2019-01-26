import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '~/components/baseComponent';
import Container from '~/app/components/container';

/**
 * 键盘
 *
 * @export
 * @class Keyboard
 * @extends {BaseComponent}
 */
export default class Keyboard extends BaseComponent {
    static propTypes = {
        left: PropTypes.number.isRequired, // 横坐标
        top: PropTypes.number.isRequired, // 纵坐标
        onKeyPress: PropTypes.func // 输入事件处理函数        
    }

    static defaultProps = {
        onKeyPress: null
    }

    keys = []

    keyCodes = [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '0',
        'q',
        'w',
        'e',
        'r',
        't',
        'y',
        'u',
        'i',
        'o',
        'p',
        'a',
        's',
        'd',
        'f',
        'g',
        'h',
        'j',
        'k',
        'l',
        'z',
        'x',
        'c',
        'v',
        'b',
        'n',
        'm'
    ]

    constructor(props) {
        super(props);

        // 1 - 0
        let id = 0;
        for (let i = 0, x = 82; i < 10; i += 1, x += (54 + 5), id += 1) {
            this.keys.push([x, 60, 54, 54, this.keyCodes[id]]);
        }

        // q - p
        for (let i = 0, x = 112; i < 10; i += 1, x += (54 + 5), id += 1) {
            this.keys.push([x, 118, 54, 54, this.keyCodes[id]]);
        }

        // a - l
        for (let i = 0, x = 126; i < 9; i += 1, x += (54 + 5), id += 1) {
            this.keys.push([x, 176, 54, 54, this.keyCodes[id]]);
        }

        // a - l
        for (let i = 0, x = 156; i < 7; i += 1, x += (54 + 5), id += 1) {
            this.keys.push([x, 234, 54, 54, this.keyCodes[id]]);
        }

        // delete
        this.keys.push([792, 60, 84, 54, 'delete']);

        // enter
        this.keys.push([777, 176, 98, 54, 'enter']);

        // caps
        this.keys.push([22, 176, 98, 54, 'caps']);
    }

    _render() {
        const { left, top } = this.getRelativePosition(this.props.left, this.props.top);

        return (
            <Container left={left} top={top} background={require("./keyboard.png")}>
                {this._getKeys()}
            </Container>
        );
    }

    /**
     * 获取按键
     *
     * @memberof Keyboard
     */
    _getKeys() {
        const keys = [];
        for (let i = 0; i < this.keys.length; i += 1) {
            const left = this.keys[i][0];
            const top = this.keys[i][1];
            const width = this.keys[i][2];
            const height = this.keys[i][3];
            const code = this.keys[i][4];
            const key = (
                <div style={{ position: "absolute", left: `${left}px`, top: `${top}px`, width: `${width}px`, height: `${height}px` }} onClick={() => this._onClick(code)} />
            );
            keys.push(key);
        }

        return keys;
    }

    /**
     * 按键点击事件处理函数
     *
     * @param {*} keyCode 按键
     * @memberof Keyboard
     */
    _onClick(keyCode) {
        this.props.onKeyPress && this.props.onKeyPress(keyCode);
    }
}
