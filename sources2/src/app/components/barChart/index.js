import React from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import BaseComponent from '~/components/baseComponent';
import { getRandom } from '~/misc/random';

/**
 * 柱状图组件
 *
 * @export
 * @class BarChart
 * @extends {BaseComponent}
 */
export default class BarChart extends BaseComponent {
    static propTypes = {
        left: PropTypes.number.isRequired, // 横坐标
        top: PropTypes.number.isRequired, // 纵坐标
        width: PropTypes.number,
        height: PropTypes.number,
        min: PropTypes.number,
        max: PropTypes.number,
        color: PropTypes.string,
        data: PropTypes.array,
        onClick: PropTypes.func, // 点击事件处理函数
        maxTicksLimitX: PropTypes.number // 横轴最大标记个数
    }

    static defaultProps = {
        width: 100,
        height: 100,
        min: 0,
        max: 1,
        color: 'rgba(251,207,72,0.8)',
        data: { xLabels: null, data: null },
        onClick: null,
        maxTicksLimitX: null
    }

    chartOptions = {
        animation: false,
        responsive: true,
        bezierCurve: true,
        bezierCurveTension: 0.4,
        maintainAspectRatio: false,
        borderWidth: 0,
        legend: {
            display: false
        },
        title: {
            display: false
        },
        elements: {
            point: {
                radius: 0 // 线条上点
            },
            line: {
                borderWidth: 0 // 线条边框宽度
            }
        },
        scales: {
            xAxes: [{
                gridLines: {
                    display: true,
                    color: 'rgba(255, 255, 255, 0.2)'
                },
                ticks: {
                    fontColor: this.props.color,
                    maxTicksLimit: this.props.maxTicksLimitX
                }
            }],
            yAxes: [{
                gridLines: {
                    display: true,
                    color: 'rgba(255, 255, 255, 0.2)'
                },
                ticks: {
                    fontColor: this.props.color
                }
            }]
        }
    }

    render() {
        let xLabels = null;
        let data = null;
        if (this.props.data !== null) {
            if (this.props.data.xLabels) {
                xLabels = this.props.data.xLabels;
            }

            if (this.props.data.data) {
                data = this.props.data.data;
            }
        }

        if (!xLabels || (xLabels.length === 0)) {
            xLabels = ['0:00', '3:00', '6:00', '9:00', '12:00', '15:00', '18:00', '21:00', '23:00'];
        }

        if (!data || (data.length === 0)) {
            data = [];
            xLabels.forEach(() =>
                data.push(getRandom(this.props.min, this.props.max))
            );
        }

        const datasets = [{
            fillColor: this.props.color,
            strokeColor: this.props.color,
            borderColor: this.props.color,
            data: data,
            backgroundColor: this.props.color
        }];

        const { left, top } = this.getRelativePosition(this.props.left, this.props.top);
        const { onClick } = this.props;

        return (
            <div style={{ position: 'absolute', left: `${left}px`, top: `${top}px` }} onClick={onClick}>
                <Bar
                    data={{ labels: xLabels, datasets: datasets }}
                    options={this.chartOptions}
                    width={this.props.width}
                    height={this.props.height}
                />
            </div>
        );
    }
}
