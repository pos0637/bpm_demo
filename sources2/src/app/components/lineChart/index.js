import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import BaseComponent from '~/components/baseComponent';
import { getRandom } from '~/misc/random';

/**
 * 折线图组件
 *
 * @export
 * @class LineChart
 * @extends {BaseComponent}
 */
export default class LineChart extends BaseComponent {
    static propTypes = {
        left: PropTypes.number.isRequired, // 横坐标
        top: PropTypes.number.isRequired, // 纵坐标
        width: PropTypes.number,
        height: PropTypes.number,
        min: PropTypes.number,
        max: PropTypes.number,
        color: PropTypes.string,
        xLabels: PropTypes.array,
        data: PropTypes.array
    }

    static defaultProps = {
        width: 100,
        height: 100,
        min: 0,
        max: 1,
        color: 'rgba(251,207,72,0.8)',
        xLabels: null,
        data: null
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
                    fontColor: this.props.color
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
        let { xLabels, data } = this.props;
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
            backgroundColor: [this.props.color]
        }];

        const { left, top } = this.getRelativePosition(this.props.left, this.props.top);

        return (
            <div style={{ position: 'absolute', left: `${left}px`, top: `${top}px` }}>
                <Line
                    data={{ labels: xLabels, datasets: datasets }}
                    options={this.chartOptions}
                    width={this.props.width}
                    height={this.props.height}
                />
            </div>
        );
    }
}
