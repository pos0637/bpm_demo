package com.etrita.bms.demo.board.entities;

import com.etrita.bms.demo.board.communications.IDataReader;
import lombok.Getter;
import lombok.Setter;

/**
 * 预览视图数据
 *
 * @author Alex
 */
@Getter
@Setter
public class Overview {
    /**
     * 电站运行信息
     */
    private int information;

    /**
     * 电站运行状态
     */
    private int state;

    /**
     * 无故障运行时间
     */
    private int runningTime;

    /**
     * 安防系统状态
     */
    private int securitySystemState;

    /**
     * 总充电电量
     */
    private int chargingElectricity;

    /**
     * 总放电电量
     */
    private int dischargingElectricity;

    /**
     * 系统站用电量
     */
    private int usingElectricity;

    /**
     * 总节电费用
     */
    private int bill;

    /**
     * 读取ModbusTcp数据
     *
     * @param reader 数据读取器
     * @throws Exception
     */
    public void readModbusTcpData(IDataReader reader) throws Exception {
        setChargingElectricity(reader.readInteger(1, 3, 1));
        setDischargingElectricity(reader.readInteger(1, 3, 3));
        setUsingElectricity(reader.readInteger(1, 3, 5));
    }
}
