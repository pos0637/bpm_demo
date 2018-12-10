import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '~/components/baseComponent';
import Text from '~/app/components/text';
import Image from '~/app/components/image';
import Container from '~/app/components/container';
import Switch from '~/app/components/switch';
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
        电网状态2: 0
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
                    <Text left={1022} top={428} value="储能电站" font="SourceHanSansSC-Medium" fontSize={48} />                    
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
