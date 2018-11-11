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
        width: PropTypes.number,
        height: PropTypes.number,
        min: PropTypes.number,
        max: PropTypes.number,
        color: PropTypes.string
    }

    static defaultProps = {
        width: 100,
        height: 100,
        min: 0,
        max: 1,
        color: 'rgba(251,207,72,0.8)'
    }

    state = {
        xlabels: ['0:00', '3:00', '6:00', '9:00', '12:00', '15:00', '18:00', '21:00', '23:00'],
        datasets: [{
            fillColor: this.props.color,
            strokeColor: this.props.color,
            data: [getRandom(this.props.min, this.props.max), getRandom(this.props.min, this.props.max), getRandom(this.props.min, this.props.max), getRandom(this.props.min, this.props.max), getRandom(this.props.min, this.props.max), getRandom(this.props.min, this.props.max), getRandom(this.props.min, this.props.max), getRandom(this.props.min, this.props.max), getRandom(this.props.min, this.props.max)],
            backgroundColor: [this.props.color]
        }]
    }

    chartOptions = {
        animation: false,
        responsive: true,
        pointDot: false,
        scaleShowLabels: false,
        scaleShowHorizontalLines: false,
        scaleShowVerticalLines: false,
        scaleGridLineColor: 'rgba(255,255,255,.05)',
        bezierCurve: true,
        bezierCurveTension: 0.4,
        maintainAspectRatio: false,
        borderWidth: 0,
        legend: {
            display: false
        },
        title: {
            display: false
        }
    }

    componentDidMount() {
        super.componentDidMount();
        // TODO: delete it
        this.timer = setInterval(() => {
            this.setData();
        }, 2000);
    }

    componentWillUnmount() {
        // TODO: delete it
        this.timer && clearTimeout(this.timer);
        super.componentWillUnmount();
    }

    render() {
        return (
            <Line
                data={{ labels: this.state.xlabels, datasets: this.state.datasets }}
                options={this.chartOptions}
                width={this.props.width}
                height={this.props.height}
            />
        );
    }

    /**
     * 设置数据
     *
     * @memberof LineChart
     */
    setData() {
        this.setState({
            datasets: [{
                fillColor: this.props.color,
                strokeColor: this.props.color,
                data: [getRandom(this.props.min, this.props.max), getRandom(this.props.min, this.props.max), getRandom(this.props.min, this.props.max), getRandom(this.props.min, this.props.max), getRandom(this.props.min, this.props.max), getRandom(this.props.min, this.props.max), getRandom(this.props.min, this.props.max), getRandom(this.props.min, this.props.max), getRandom(this.props.min, this.props.max)],
                backgroundColor: [this.props.color]
            }]
        });
    }
}
