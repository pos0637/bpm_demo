package com.etrita.bms.demo.board.entities;

import com.etrita.bms.demo.board.communications.IDataReader;
import lombok.Getter;
import lombok.Setter;

/**
 * 变压器视图数据
 *
 * @author Alex
 */
@Getter
@Setter
public class Transformer {
    /**
     * 1#变压器温度
     */
    private float temperature1;

    /**
     * 2#变压器温度
     */
    private float temperature2;

    /**
     * 1#变压器风机输出
     */
    private int fan1;

    /**
     * 2#变压器风机输出
     */
    private int fan2;

    /**
     * 变压器状态： 0正常、1故障、2告警
     */
    private int state;

    /**
     * I段开关
     */
    private int switch1;

    /**
     * II段开关
     */
    private int switch2;

    /**
     * 总充电电量1
     */
    private float totalChargingElectricity1;

    /**
     * 总放电电量1
     */
    private float totalDischargingElectricity1;

    /**
     * 总充电电量2
     */
    private float totalChargingElectricity2;

    /**
     * 总放电电量2
     */
    private float totalDischargingElectricity2;

    /**
     * 充放电量1
     */
    private float electricity1;

    /**
     * 充放电量2
     */
    private float electricity2;

    /**
     * 充放电量曲线1
     */
    private ChartData electricityData1;

    /**
     * 充放电量曲线2
     */
    private ChartData electricityData2;

    public Transformer() {
        electricityData1 = new ChartData(24 * 6, 10 * 60 * 1000);
        electricityData2 = new ChartData(24 * 6, 10 * 60 * 1000);
    }

    /**
     * 读取ModbusTcp数据
     *
     * @param pcsReader    数据读取器
     * @param other1Reader 数据读取器
     * @param other2Reader 数据读取器
     * @throws Exception
     */
    public void readModbusTcpData(IDataReader pcsReader, IDataReader other1Reader, IDataReader other2Reader) throws Exception {
        float temperature11 = other2Reader.readFloat(1, 3, 1);
        float temperature12 = other2Reader.readFloat(1, 3, 3);
        float temperature13 = other2Reader.readFloat(1, 3, 5);
        setTemperature1((temperature11 + temperature12 + temperature13) / 3);

        float temperature21 = other2Reader.readFloat(2, 3, 1);
        float temperature22 = other2Reader.readFloat(2, 3, 3);
        float temperature23 = other2Reader.readFloat(2, 3, 5);
        setTemperature2((temperature21 + temperature22 + temperature23) / 3);

        setFan1(other2Reader.readByte(1, 2, 1));
        setFan2(other2Reader.readByte(2, 2, 1));

        byte state11 = other2Reader.readByte(1, 2, 2);
        byte state12 = other2Reader.readByte(2, 2, 2);
        byte state21 = other2Reader.readByte(1, 2, 4);
        byte state22 = other2Reader.readByte(2, 2, 4);
        setState(((state11 == 1) || (state12 == 1)) ? 1 : ((state21 == 1) || (state22 == 1)) ? 2 : 0);

        setSwitch1(other1Reader.readByte(4, 2, 19));
        setSwitch2(other1Reader.readByte(4, 2, 19));

        setTotalChargingElectricity1(other2Reader.readFloat(3, 3, 1));
        setTotalDischargingElectricity1(other2Reader.readFloat(3, 3, 11));
        setTotalChargingElectricity2(other2Reader.readFloat(4, 3, 1));
        setTotalDischargingElectricity2(other2Reader.readFloat(4, 3, 11));

        setElectricity1(pcsReader.readFloat(1, 3, 31));
        setElectricity2(pcsReader.readFloat(2, 3, 31));

        electricityData1.push(getElectricity1());
        electricityData2.push(getElectricity2());
    }
}
