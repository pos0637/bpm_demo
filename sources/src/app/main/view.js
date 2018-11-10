import React from 'react';
import BaseComponent from '~/components/baseComponent';
import RunningInformation from './runningInformation';
import RunningState from './runningState';
import RunningTime from './runningTime';
import SecuritySystemState from './securitySystemState';
import style from "./index.scss";

/**
 * 视图
 *
 * @export
 * @class View
 * @extends {BaseComponent}
 */
export default class View extends BaseComponent {
    render() {
        return (
            <div className={style.container}>
                <div className={style.running_information}>
                    <RunningInformation information={1} />
                </div>
                <div className={style.running_state}>
                    <RunningState state={1} />
                </div>
                <div className={style.running_time}>
                    <RunningTime time={1} />
                </div>
                <div className={style.security_system_state}>
                    <SecuritySystemState state={0} />
                </div>
            </div>
        );
    }
}
