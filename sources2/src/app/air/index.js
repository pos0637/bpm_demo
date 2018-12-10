import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '~/components/baseComponent';
import Text from '~/app/components/text';
import Image from '~/app/components/image';
import Container from '~/app/components/container';
import Switch from '~/app/components/switch';

/**
 * 空调&灭火器视图
 *
 * @export
 * @class Air
 * @extends {BaseComponent}
 */
export default class Air extends BaseComponent {
    static contextTypes = {
        router: PropTypes.object // 路由
    }

    state = {
        电气室温度1: 40,
        电气室温度2: 40,
        安防系统状态: 0,
        氢气探测器状态: 0
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
                    <Text left={278} top={428} value="空调&amp;灭火器" font="SourceHanSansSC-Medium" fontSize={48} />                    
                    <Image left={248} top={632} src={require("./images/img1.png")} />                   
                    <Image left={663} top={1092} src={require("./images/img2.png")} />   
                </Container>
                <Container left={1323} top={378} background={require("./images/box2.png")}>                    
                    <Text left={1427} top={428} value="环境温度状态" font="SourceHanSansSC-Medium" fontSize={48} />  
                    {/* TODO: add charts */}                  
                    <Text left={1770} top={960} value="电气室温度" font="SourceHanSansSC-Medium" fontSize={48} />     
                    <Text left={2408} top={960} value="电气室温度" font="SourceHanSansSC-Medium" fontSize={48} />     
                </Container>
                <Container left={1323} top={1147} background={require("./images/box3.png")}>                    
                    <Text left={1428} top={1197} value="安防系统状态" font="SourceHanSansSC-Medium" fontSize={48} />  
                    <Switch left={1605} top={1406} src1={require("./images/security_system_normal0.png")} src2={require("./images/security_system_normal1.png")} value={this.state.安防系统状态 === 0} />
                    <Switch left={2087} top={1413} src1={require("./images/security_system_alarm0.png")} src2={require("./images/security_system_alarm1.png")} value={this.state.安防系统状态 === 1} />
                    <Switch left={2581} top={1403} src1={require("./images/security_system_fault0.png")} src2={require("./images/security_system_fault1.png")} value={this.state.安防系统状态 === 2} />
                </Container>
                <Container left={3084} top={378} background={require("./images/box4.png")}>                    
                    <Text left={3186} top={428} value="氢气探测器状态" font="SourceHanSansSC-Medium" fontSize={48} />  
                    <Switch left={3254} top={736} src1={require("./images/security_system_normal0.png")} src2={require("./images/security_system_normal1.png")} value={this.state.氢气探测器状态 === 0} />
                    <Switch left={3263} top={1266} src1={require("./images/security_system_alarm0.png")} src2={require("./images/security_system_alarm1.png")} value={this.state.氢气探测器状态 === 1} />                    
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