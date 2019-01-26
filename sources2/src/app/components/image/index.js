import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '~/components/baseComponent';

/**
 * 图像
 *
 * @export
 * @class Image
 * @extends {BaseComponent}
 */
export default class Image extends BaseComponent {
    static propTypes = {
        src: PropTypes.any.isRequired, // 图片
        left: PropTypes.number, // 横坐标
        top: PropTypes.number, // 纵坐标
        bottom: PropTypes.number, // 距底部距离
        onClick: PropTypes.func // 点击事件处理函数
    }

    static defaultProps = {
        left: null,
        top: null,
        bottom: null,
        onClick: null
    }

    _render() {
        const { left, top } = this.getRelativePosition(this.props.left, this.props.top);
        const { bottom } = this.props;

        return (
            <div {...this.props} style={{ position: 'absolute', left: `${left}px`, top: `${top}px`, bottom: `${bottom}px` }}>
                <img src={this.props.src} alt="" onClick={(e) => { e.stopPropagation(); this.props.onClick && this.props.onClick(); }} />
            </div>
        );
    }
}
