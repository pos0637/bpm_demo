import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '~/components/baseComponent';
import Text from '~/app/components/text';
import Image from '~/app/components/image';
import Container from '~/app/components/container';
import Switch from '~/app/components/switch';
import Progress from '~/app/components/lineProgress';
import LineChart from '~/app/components/lineChart';
import { toFixed } from '~/misc/number';

/**
 * PCS视图
 *
 * @export
 * @class Pcs
 * @extends {BaseComponent}
 */
export default class Pcs extends BaseComponent {
    static contextTypes = {
        router: PropTypes.object // 路由
    }

    state = {
        电网状态1: 0,
        电网状态2: 0,
        充电1: 0,
        放电1: 0,
        充电2: 0,
        放电2: 0,
        日充电电量1: 36000,
        日放电电量1: 36000,        
        日充电电量2: 36000,
        日放电电量2: 36000,
        日放电功率1: 360,        
        日放电功率2: 360,
        直流电压1: 220,
        直流电压2: 220,
        直流电流1: 50,
        直流电流2: 50,
        逆变电流1: 50,
        逆变电流2: 50
    }

    componentDidMount() {
        super.componentDidMount();
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
        super.componentWillUnmount();
    }

    render() {
        return (
            <Container width={3840} height={2160}>               
                <Container left={173} top={378} background={require("./images/box1.png")}>
                    <Text left={279} top={433} value="PCS&nbsp;1" font="SourceHanSansSC-Medium" fontSize={48} />                    
                    <Image left={251} top={726} src={require("./images/img1.png")} />                   
                </Container>
                <Container left={3003} top={378} background={require("./images/box1.png")}>                    
                    <Text left={3085} top={433} value="PCS&nbsp;2" font="SourceHanSansSC-Medium" fontSize={48} />                    
                    <Image left={3053} top={726} src={require("./images/img1.png")} />                   
                </Container>
                <Container left={173} top={1485} background={require("./images/box2.png")}>
                    <Text left={281} top={1535} value="电网数据" font="SourceHanSansSC-Medium" fontSize={48} />
                    <Switch left={281} top={1673} src1={require("./images/grid_state_normal0.png")} src2={require("./images/grid_state_normal1.png")} value={this.state.电网状态1 === 0} />
                    <Switch left={476} top={1674} src1={require("./images/grid_state_alarm0.png")} src2={require("./images/grid_state_alarm1.png")} value={this.state.电网状态1 === 1} />
                    <Switch left={663} top={1675} src1={require("./images/grid_state_fault0.png")} src2={require("./images/grid_state_fault1.png")} value={this.state.电网状态1 === 2} />
                </Container>
                <Container left={3006} top={1485} background={require("./images/box2.png")}>
                    <Text left={3097} top={1535} value="电网数据" font="SourceHanSansSC-Medium" fontSize={48} />
                    <Switch left={3086} top={1673} src1={require("./images/grid_state_normal0.png")} src2={require("./images/grid_state_normal1.png")} value={this.state.电网状态2 === 0} />
                    <Switch left={3284} top={1674} src1={require("./images/grid_state_alarm0.png")} src2={require("./images/grid_state_alarm1.png")} value={this.state.电网状态2 === 1} />
                    <Switch left={3479} top={1675} src1={require("./images/grid_state_fault0.png")} src2={require("./images/grid_state_fault1.png")} value={this.state.电网状态2 === 2} />
                </Container>

                <Container left={916} top={378} background={require("./images/box3.png")}>
                    <Text left={1022} top={428} value="1#储能电站" font="SourceHanSansSC-Medium" fontSize={48} />    
                    <Switch left={1024} top={550} src1={require("./images/charging0.png")} src2={require("./images/charging1.png")} value={this.state.充电1 === 0} />
                    <Switch left={1474} top={550} src1={require("./images/discharging0.png")} src2={require("./images/discharging1.png")} value={this.state.放电1 === 0} />
                </Container>
                <Container left={1933} top={378} background={require("./images/box3.png")}>
                    <Text left={2037} top={428} value="2#储能电站" font="SourceHanSansSC-Medium" fontSize={48} />    
                    <Switch left={2041} top={550} src1={require("./images/charging0.png")} src2={require("./images/charging1.png")} value={this.state.充电2 === 0} />
                    <Switch left={2491} top={550} src1={require("./images/discharging0.png")} src2={require("./images/discharging1.png")} value={this.state.放电2 === 0} />
                </Container>

                <Container left={916} top={692} background={require("./images/box3.png")}>
                    <Text left={1022} top={742} value="日充电电量" font="SourceHanSansSC-Medium" fontSize={48} />    
                    <Text left={1700} top={866} value={`${toFixed(this.state.日充电电量1, 0)}`} font="SourceHanSansSC-Medium" fontSize={48} />    
                    <Text left={1700} top={918} value="kWh" font="SourceHanSansSC-Medium" fontSize={48} />    
                    <LineChart left={1026} top={861} width={637} height={115} color="rgba(68,175,244,0.8)" />
                </Container>
                <Container left={1933} top={692} background={require("./images/box3.png")}>
                    <Text left={2043} top={742} value="日充电电量" font="SourceHanSansSC-Medium" fontSize={48} />    
                    <Text left={2717} top={866} value={`${toFixed(this.state.日充电电量2, 0)}`} font="SourceHanSansSC-Medium" fontSize={48} />    
                    <Text left={2717} top={918} value="kWh" font="SourceHanSansSC-Medium" fontSize={48} />    
                    <LineChart left={2043} top={861} width={637} height={115} color="rgba(68,175,244,0.8)" />
                </Container>

                <Container left={916} top={1004} background={require("./images/box3.png")}>
                    <Text left={1022} top={1054} value="日放电电量" font="SourceHanSansSC-Medium" fontSize={48} />    
                    <Text left={1700} top={1179} value={`${toFixed(this.state.日放电电量1, 0)}`} font="SourceHanSansSC-Medium" fontSize={48} />    
                    <Text left={1700} top={1229} value="kWh" font="SourceHanSansSC-Medium" fontSize={48} />    
                    <LineChart left={1026} top={1173} width={637} height={115} color="rgba(68,175,244,0.8)" />
                </Container>
                <Container left={1933} top={1004} background={require("./images/box3.png")}>
                    <Text left={2043} top={1054} value="日放电电量" font="SourceHanSansSC-Medium" fontSize={48} />    
                    <Text left={2717} top={1179} value={`${toFixed(this.state.日放电电量2, 0)}`} font="SourceHanSansSC-Medium" fontSize={48} />    
                    <Text left={2717} top={1229} value="kWh" font="SourceHanSansSC-Medium" fontSize={48} />    
                    <LineChart left={2043} top={1173} width={637} height={115} color="rgba(68,175,244,0.8)" />
                </Container>

                <Container left={916} top={1316} background={require("./images/box3.png")}>
                    <Text left={1022} top={1369} value="日放电电量" font="SourceHanSansSC-Medium" fontSize={48} />    
                    <Text left={1700} top={1494} value={`${toFixed(this.state.日放电功率1, 0)}`} font="SourceHanSansSC-Medium" fontSize={48} />    
                    <Text left={1700} top={1553} value="w" font="SourceHanSansSC-Medium" fontSize={48} />    
                    <LineChart left={1026} top={1488} width={637} height={115} color="rgba(68,175,244,0.8)" />
                </Container>
                <Container left={1933} top={1316} background={require("./images/box3.png")}>
                    <Text left={2043} top={1369} value="日放电电量" font="SourceHanSansSC-Medium" fontSize={48} />    
                    <Text left={2717} top={1494} value={`${toFixed(this.state.日放电功率2, 0)}`} font="SourceHanSansSC-Medium" fontSize={48} />    
                    <Text left={2717} top={1553} value="w" font="SourceHanSansSC-Medium" fontSize={48} />    
                    <LineChart left={2043} top={1488} width={637} height={115} color="rgba(68,175,244,0.8)" />
                </Container>

                <Container left={916} top={1628} background={require("./images/box4.png")}>
                    <Text left={1024} top={1690} value="直流电压" font="SourceHanSansSC-Medium" fontSize={48} color="rgb(60, 211, 238)" />    
                    <Text left={1299} top={1690} value="直流电流" font="SourceHanSansSC-Medium" fontSize={48} color="rgb(60, 211, 238)" />    
                    <Text left={1588} top={1690} value="逆变电流" font="SourceHanSansSC-Medium" fontSize={48} color="rgb(60, 211, 238)" />    
                    <Container left={1024} top={1771} background={require("./images/tip.png")}>    
                        <Text left={1024} top={1783} width={150} value={`${toFixed(this.state.直流电压1, 0)}V`} font="SourceHanSansSC-Bold" fontSize={41} align="center" />
                    </Container>
                    <Container left={1299} top={1771} background={require("./images/tip.png")}>    
                        <Text left={1299} top={1783} width={150} value={`${toFixed(this.state.直流电流1, 0)}A`} font="SourceHanSansSC-Bold" fontSize={41} align="center" />
                    </Container>
                    <Container left={1588} top={1771} background={require("./images/tip.png")}>    
                        <Text left={1588} top={1783} width={150} value={`${toFixed(this.state.逆变电流1, 0)}A`} font="SourceHanSansSC-Bold" fontSize={41} align="center" />
                    </Container>
                    <Progress left={1024} top={1850} width={221} height={14} value={this.state.直流电压1} />
                    <Progress left={1299} top={1850} width={221} height={14} value={this.state.直流电流1} />
                    <Progress left={1588} top={1850} width={221} height={14} value={this.state.逆变电流1} />
                </Container>
                <Container left={1933} top={1628} background={require("./images/box4.png")}>
                    <Text left={2041} top={1690} value="直流电压" font="SourceHanSansSC-Medium" fontSize={48} color="rgb(60, 211, 238)" />    
                    <Text left={2316} top={1690} value="直流电流" font="SourceHanSansSC-Medium" fontSize={48} color="rgb(60, 211, 238)" />    
                    <Text left={2605} top={1690} value="逆变电流" font="SourceHanSansSC-Medium" fontSize={48} color="rgb(60, 211, 238)" />    
                    <Container left={2041} top={1771} background={require("./images/tip.png")}>    
                        <Text left={2041} top={1783} width={150} value={`${toFixed(this.state.直流电压1, 0)}V`} font="SourceHanSansSC-Bold" fontSize={41} align="center" />
                    </Container>
                    <Container left={2316} top={1771} background={require("./images/tip.png")}>    
                        <Text left={2316} top={1783} width={150} value={`${toFixed(this.state.直流电流1, 0)}A`} font="SourceHanSansSC-Bold" fontSize={41} align="center" />
                    </Container>
                    <Container left={2605} top={1771} background={require("./images/tip.png")}>    
                        <Text left={2605} top={1783} width={150} value={`${toFixed(this.state.逆变电流1, 0)}A`} font="SourceHanSansSC-Bold" fontSize={41} align="center" />
                    </Container>
                    <Progress left={2041} top={1850} width={221} height={14} value={this.state.直流电压1} />
                    <Progress left={2316} top={1850} width={221} height={14} value={this.state.直流电流1} />
                    <Progress left={2605} top={1850} width={221} height={14} value={this.state.逆变电流1} />
                </Container>
            </Container>
        );
    }

    /**
     * 登录按钮点击事件
     *
     * @memberof Load
     */
    _onLoginButtonClick() {
        this.context.router.history.replace('/overview');
    }
}
