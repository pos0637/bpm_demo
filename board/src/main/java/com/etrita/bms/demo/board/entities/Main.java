package com.etrita.bms.demo.board.entities;

import com.etrita.bms.demo.board.communications.IDataReader;
import lombok.Getter;
import lombok.Setter;

/**
 * 主视图数据
 *
 * @author Alex
 */
@Getter
@Setter
public class Main {
    /**
     * I号母线电压
     */
    private int voltage1;

    /**
     * I号母线总电量
     */
    private int electricity1;

    /**
     * I号母线实时功率
     */
    private int power1;

    /**
     * II号母线电压
     */
    private int voltage2;

    /**
     * II号母线总电量
     */
    private int electricity2;

    /**
     * II号母线实时功率
     */
    private int power2;

    /**
     * 负载实时功率
     */
    private int power;

    /**
     * 1号变压器温度
     */
    private int temperature1;

    /**
     * 1号变压器风扇状态
     */
    private int fan1;

    /**
     * 2号变压器温度
     */
    private int temperature2;

    /**
     * 2号变压器风扇状态
     */
    private int fan2;

    /**
     * 并网柜总充电电量
     */
    private int gridConnectedCabinetChargingElectricity;

    /**
     * 并网柜总放电电量
     */
    private int gridConnectedCabinetDischargingElectricity;

    /**
     * 并网柜充放电实时功率
     */
    private int gridConnectedCabinetPower;

    /**
     * 并网柜I段开关
     */
    private int switch1;

    /**
     * 并网柜II段开关
     */
    private int switch2;

    /**
     * PCS有功功率
     */
    private int pcsPower;

    /**
     * PCS直流电压
     */
    private int pcsVoltage1;

    /**
     * PCS直流电流
     */
    private int pcsCurrent;

    /**
     * PCS交流电压
     */
    private int pcsVoltage2;

    /**
     * PCS今日充电总量
     */
    private int pcsChargingElectricity;

    /**
     * PCS今日放电总量
     */
    private int pcsDischargingElectricity;

    /**
     * 读取ModbusTcp数据
     *
     * @param reader 数据读取器
     * @throws Exception
     */
    public void readModbusTcpData(IDataReader reader) throws Exception {
        setGridConnectedCabinetChargingElectricity(reader.readInteger(1, 3, 1));
        setGridConnectedCabinetDischargingElectricity(reader.readInteger(1, 3, 3));
        setGridConnectedCabinetPower(reader.readInteger(1, 3, 29));
        setSwitch1(reader.readByte(1, 2, 1));
        setSwitch2(reader.readByte(1, 2, 2));
        setPcsPower(reader.readInteger(1, 3, 51) + reader.readInteger(1, 3, 79));
        setPcsVoltage1(reader.readInteger(1, 3, 53) + reader.readInteger(1, 3, 81));
        setPcsCurrent(reader.readInteger(1, 3, 55) + reader.readInteger(1, 3, 83));
        setPcsVoltage1(reader.readInteger(1, 3, 57) + reader.readInteger(1, 3, 85));
        setPcsChargingElectricity(reader.readInteger(1, 3, 59) + reader.readInteger(1, 3, 87));
        setPcsDischargingElectricity(reader.readInteger(1, 3, 61) + reader.readInteger(1, 3, 89));
    }
}
