import React, { Component } from 'react';
import enhancer from './enhancer';
import { propTypes, defaultProps } from './types';

class Line extends Component {
    render() {
        const {
            className,
            percent,
            prefixCls,
            strokeColor,
            strokeLinecap,
            strokeWidth,
            style,
            trailColor,
            trailWidth,
            ...restProps
        } = this.props;
        const { strokeColorStart, strokeColorEnd } = this.props;
        delete restProps.gapPosition;

        const pathStyle = {
            strokeDasharray: '100px, 100px',
            strokeDashoffset: `${(100 - percent)}px`,
            transition: 'stroke-dashoffset 0.3s ease 0s, stroke 0.3s linear',
        };

        const center = strokeWidth / 2;
        const right = 100 - (strokeWidth / 2);
        const pathString =
            `M ${strokeLinecap === 'round' ? center : 0},${center}
           L ${strokeLinecap === 'round' ? right : 100},${center}`;
        const viewBoxString = `0 0 100 ${strokeWidth}`;

        return (
            <svg
                className={`${prefixCls}-line ${className}`}
                viewBox={viewBoxString}
                preserveAspectRatio="none"
                style={style}
                {...restProps}
            >
                <defs>
                    <linearGradient id="linear-gradient" gradientUnits="userSpaceOnUse" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{ stopColor: strokeColorStart, stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: strokeColorEnd, stopOpacity: 1 }} />
                    </linearGradient>
                </defs>
                <path
                    className={`${prefixCls}-line-trail`}
                    d={pathString}
                    strokeLinecap={strokeLinecap}
                    stroke={trailColor}
                    strokeWidth={trailWidth || strokeWidth}
                    fillOpacity="0"
                />
                <path
                    className={`${prefixCls}-line-path`}
                    d={pathString}
                    strokeLinecap={strokeLinecap}
                    stroke={strokeColor || "url(#linear-gradient)"}
                    strokeWidth={strokeWidth}
                    fillOpacity="0"
                    ref={(path) => { this.path = path; }}
                    style={pathStyle}
                />
            </svg>
        );
    }
}

Line.propTypes = propTypes;

Line.defaultProps = defaultProps;

export default enhancer(Line);