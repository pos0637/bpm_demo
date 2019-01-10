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
     * 电站运行状态1： 0充电、1放电、2待机
     */
    private int state1;

    /**
     * 电站运行状态2： 0充电、1放电、2待机
     */
    private int state2;

    /**
     * 充电状态： 0充电、1放电
     */
    private int chargingState;

    /**
     * 安防系统状态
     */
    private int securitySystemState;

    /**
     * 总节电费用
     */
    private float bill;

    /**
     * 节煤量
     */
    private float saveCost1;

    /**
     * 节碳量
     */
    private float saveCost2;

    /**
     * 需求 1#需求功率： 1#变压器功率
     */
    private float transformerPower1;

    /**
     * 需求 2#需求功率： 2#变压器功率
     */
    private float transformerPower2;

    /**
     * 负载 1#母线： I段负载实时功率
     */
    private float loadPower1;

    /**
     * 负载 2#母线： II段负载实时功率
     */
    private float loadPower2;

    /**
     * 储能 总充电量
     */
    private float totalChargingElectricity;

    /**
     * 储能 总放电量
     */
    private float totalDischargingElectricity;

    /**
     * 1#今日充电总量
     */
    private float chargingElectricity1;

    /**
     * 1#今日放电总量
     */
    private float dischargingElectricity1;

    /**
     * 2#今日充电总量
     */
    private float chargingElectricity2;

    /**
     * 2#今日放电总量
     */
    private float dischargingElectricity2;

    /**
     * 充放电功率1
     */
    private float electricity1;

    /**
     * 充放电功率2
     */
    private float electricity2;

    /**
     * 充放电功率曲线1
     */
    private ChartData electricityData1;

    /**
     * 充放电功率曲线2
     */
    private ChartData electricityData2;

    /**
     * 变压器功率曲线1
     */
    private ChartData transformerPowerData1;

    /**
     * 变压器功率曲线2
     */
    private ChartData transformerPowerData2;

    /**
     * 需求功率曲线1
     */
    private ChartData loadPowerData1;

    /**
     * 需求功率曲线2
     */
    private ChartData loadPowerData2;

    public Overview() {
        String[] xLabels = new String[24 * 6];
        for (int i = 0, id = 0; i < 24; ++i) {
            for (int j = 0; j < 6; ++j, ++id) {
                xLabels[id] = String.format("%d:%d0", i, j);
            }
        }

        electricityData1 = new ChartData(xLabels.length, xLabels, 10 * 60 * 1000);
        electricityData2 = new ChartData(xLabels.length, xLabels, 10 * 60 * 1000);
        transformerPowerData1 = new ChartData(xLabels.length, xLabels, 10 * 60 * 1000);
        transformerPowerData2 = new ChartData(xLabels.length, xLabels, 10 * 60 * 1000);
        loadPowerData1 = new ChartData(xLabels.length, xLabels, 10 * 60 * 1000);
        loadPowerData2 = new ChartData(xLabels.length, xLabels, 10 * 60 * 1000);
    }

    /**
     * 读取ModbusTcp数据
     *
     * @param pcsReader    数据读取器
     * @param other1Reader 数据读取器
     * @param other2Reader 数据读取器
     * @param globalData   全局数据
     * @throws Exception
     */
    public void readModbusTcpData(IDataReader pcsReader, IDataReader other1Reader, IDataReader other2Reader, GlobalData globalData) throws Exception {
        if (!globalData.isInvalid()) {
            globalData.setLastChargingElectricity1(other2Reader.readFloat(3, 3, 1));
            globalData.setLastDischargingElectricity1(other2Reader.readFloat(3, 3, 11));
            globalData.setLastChargingElectricity2(other2Reader.readFloat(4, 3, 1));
            globalData.setLastDischargingElectricity2(other2Reader.readFloat(4, 3, 11));
            globalData.valid();
        }

        byte state11 = pcsReader.readByte(1, 2, 24);
        byte state12 = pcsReader.readByte(1, 2, 25);
        // byte state13 = reader.readByte(1, 2, 26);
        setState1((state11 == 1) ? 0 : (state12 == 1) ? 1 : 2);

        byte state21 = pcsReader.readByte(2, 2, 24);
        byte state22 = pcsReader.readByte(2, 2, 25);
        // byte state23 = reader.readByte(2, 2, 26);
        setState2((state21 == 1) ? 0 : (state22 == 1) ? 1 : 2);

        setChargingState((getState1() == 2) && (getState2() == 2) ? 2 : (getState1() == 0) || (getState2() == 0) ? 0 : 1);
        setSecuritySystemState(other1Reader.readByte(4, 2, 19));

        float data11 = other2Reader.readFloat(3, 3, 7);
        float data12 = other2Reader.readFloat(3, 3, 9);
        float data13 = other2Reader.readFloat(3, 3, 13);
        float data14 = other2Reader.readFloat(3, 3, 15);
        float data21 = other2Reader.readFloat(4, 3, 7);
        float data22 = other2Reader.readFloat(4, 3, 9);
        float data23 = other2Reader.readFloat(4, 3, 13);
        float data24 = other2Reader.readFloat(4, 3, 15);
        setBill((float) ((data13 * 1.4523 + data14 * 1.3240 - data11 * 0.8053 - data12 * 0.3116) + (data23 * 1.4523 + data24 * 1.3240 - data21 * 0.8053 - data22 * 0.3116)));

        float pcsPower1 = pcsReader.readFloat(1, 3, 31);
        float pcsPower2 = pcsReader.readFloat(2, 3, 31);
        setElectricity1(pcsPower1);
        setElectricity2(pcsPower2);
        setTransformerPower1(other1Reader.readFloat(3, 3, 1));
        setTransformerPower2(other1Reader.readFloat(3, 3, 37));
        setLoadPower1(getTransformerPower1() - pcsPower1);
        setLoadPower2(getTransformerPower2() - pcsPower2);
        setTotalChargingElectricity(other2Reader.readFloat(3, 3, 1) + other2Reader.readFloat(4, 3, 1));
        setTotalDischargingElectricity(other2Reader.readFloat(3, 3, 11) + other2Reader.readFloat(4, 3, 11));
        setChargingElectricity1(other2Reader.readFloat(3, 3, 1) - globalData.getLastChargingElectricity1());
        setDischargingElectricity1(other2Reader.readFloat(3, 3, 11) - globalData.getLastDischargingElectricity1());
        setChargingElectricity2(other2Reader.readFloat(4, 3, 1) - globalData.getLastChargingElectricity2());
        setDischargingElectricity2(other2Reader.readFloat(4, 3, 11) - globalData.getLastDischargingElectricity2());

        electricityData1.push(null, pcsPower1);
        electricityData2.push(null, pcsPower2);
        transformerPowerData1.push(null, getTransformerPower1());
        transformerPowerData2.push(null, getTransformerPower2());
        loadPowerData1.push(null, getTransformerPower1() - pcsPower1);
        loadPowerData2.push(null, getTransformerPower2() - pcsPower1);

        setSaveCost1((float) ((2 * getTotalDischargingElectricity() - getTotalChargingElectricity()) * 0.028));
        setSaveCost2((float) (getSaveCost1() * 2.77));
    }
}
