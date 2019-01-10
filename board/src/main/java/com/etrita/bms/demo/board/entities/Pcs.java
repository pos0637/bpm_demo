package com.etrita.bms.demo.board.entities;

import com.etrita.bms.demo.board.communications.IDataReader;
import lombok.Getter;
import lombok.Setter;

/**
 * PCS视图数据
 *
 * @author Alex
 */
@Getter
@Setter
public class Pcs {
    /**
     * 电站运行状态1： 0充电、1放电、2：待机
     */
    private int state1;

    /**
     * 电站运行状态2： 0充电、1放电、2：待机
     */
    private int state2;

    /**
     * 1#日充电电量
     */
    private float chargingElectricity1;

    /**
     * 1#日放电电量
     */
    private float dischargingElectricity1;

    /**
     * 2#日充电电量
     */
    private float chargingElectricity2;

    /**
     * 2#日放电电量
     */
    private float dischargingElectricity2;

    /**
     * 充放电量1
     */
    private float electricity1;

    /**
     * 充放电量2
     */
    private float electricity2;

    /**
     * 直流电压1
     */
    private float voltage11;

    /**
     * 直流电流
     */
    private float current1;

    /**
     * 交流电压1
     */
    private float voltage12;

    /**
     * 直流电压1
     */
    private float voltage21;

    /**
     * 直流电流
     */
    private float current2;

    /**
     * 交流电压2
     */
    private float voltage22;

    /**
     * 电网运行状态1： 0正常、1故障、2告警
     */
    private int gridState1;

    /**
     * 电网运行状态2： 0正常、1故障、2告警
     */
    private int gridState2;

    /**
     * 1#日充电电量
     */
    private ChartData chargingElectricityData1;

    /**
     * 1#日放电电量
     */
    private ChartData dischargingElectricityData1;

    /**
     * 2#日充电电量
     */
    private ChartData chargingElectricityData2;

    /**
     * 2#日放电电量
     */
    private ChartData dischargingElectricityData2;

    /**
     * 充放电量曲线1
     */
    private ChartData electricityData1;

    /**
     * 充放电量曲线2
     */
    private ChartData electricityData2;

    public Pcs() {
        String[] xLabels = new String[7];
        for (int i = 0; i < xLabels.length; ++i) {
            xLabels[i] = String.format("Day%d", i + 1);
        }

        chargingElectricityData1 = new ChartData(xLabels.length, xLabels, null);
        dischargingElectricityData1 = new ChartData(xLabels.length, xLabels, null);
        chargingElectricityData2 = new ChartData(xLabels.length, xLabels, null);
        dischargingElectricityData2 = new ChartData(xLabels.length, xLabels, null);

        // TODO: fix it
        chargingElectricityData1.push(null, 798);
        chargingElectricityData1.push(null, 982);
        chargingElectricityData1.push(null, 884);
        chargingElectricityData1.push(null, 746);
        chargingElectricityData1.push(null, 789);
        chargingElectricityData1.push(null, 812);
        chargingElectricityData1.push(null, 941);

        dischargingElectricityData1.push(null, 887);
        dischargingElectricityData1.push(null, 952);
        dischargingElectricityData1.push(null, 814);
        dischargingElectricityData1.push(null, 776);
        dischargingElectricityData1.push(null, 739);
        dischargingElectricityData1.push(null, 802);
        dischargingElectricityData1.push(null, 741);

        chargingElectricityData2.push(null, 738);
        chargingElectricityData2.push(null, 912);
        chargingElectricityData2.push(null, 854);
        chargingElectricityData2.push(null, 716);
        chargingElectricityData2.push(null, 779);
        chargingElectricityData2.push(null, 862);
        chargingElectricityData2.push(null, 841);

        dischargingElectricityData2.push(null, 787);
        dischargingElectricityData2.push(null, 852);
        dischargingElectricityData2.push(null, 714);
        dischargingElectricityData2.push(null, 716);
        dischargingElectricityData2.push(null, 839);
        dischargingElectricityData2.push(null, 902);
        dischargingElectricityData2.push(null, 741);

        xLabels = new String[24 * 6];
        for (int i = 0, id = 0; i < 24; ++i) {
            for (int j = 0; j < 6; ++j, ++id) {
                xLabels[id] = String.format("%d:%d0", i, j);
            }
        }

        electricityData1 = new ChartData(xLabels.length, xLabels, 10 * 60 * 1000);
        electricityData2 = new ChartData(xLabels.length, xLabels, 10 * 60 * 1000);
    }

    /**
     * 读取ModbusTcp数据
     *
     * @param pcsReader    数据读取器
     * @param other2Reader 数据读取器
     * @param globalData   全局数据
     * @throws Exception
     */
    public void readModbusTcpData(IDataReader pcsReader, IDataReader other2Reader, GlobalData globalData) throws Exception {
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

        byte state31 = pcsReader.readByte(1, 2, 35);
        byte state32 = pcsReader.readByte(1, 2, 36);
        setGridState1((state31 == 1) ? 2 : (state32 == 1) ? 1 : 0);

        byte state41 = pcsReader.readByte(2, 2, 35);
        byte state42 = pcsReader.readByte(2, 2, 36);
        setGridState1((state41 == 1) ? 2 : (state42 == 1) ? 1 : 0);

        setVoltage11(pcsReader.readFloat(1, 3, 23));
        setCurrent1(pcsReader.readFloat(1, 3, 21));
        setVoltage12(pcsReader.readFloat(1, 3, 29));
        setVoltage21(pcsReader.readFloat(2, 3, 23));
        setCurrent2(pcsReader.readFloat(2, 3, 21));
        setVoltage22(pcsReader.readFloat(2, 3, 29));

        setChargingElectricity1(other2Reader.readFloat(3, 3, 1) - globalData.getLastChargingElectricity1());
        setDischargingElectricity1(other2Reader.readFloat(3, 3, 11) - globalData.getLastDischargingElectricity1());
        setChargingElectricity2(other2Reader.readFloat(4, 3, 1) - globalData.getLastChargingElectricity2());
        setDischargingElectricity2(other2Reader.readFloat(4, 3, 11) - globalData.getLastDischargingElectricity2());

        setElectricity1(pcsReader.readFloat(1, 3, 31));
        setElectricity2(pcsReader.readFloat(2, 3, 31));

        chargingElectricityData1.set(6, getChargingElectricity1());
        dischargingElectricityData1.set(6, getDischargingElectricity1());
        chargingElectricityData2.set(6, getChargingElectricity2());
        dischargingElectricityData2.set(6, getDischargingElectricity2());
        electricityData1.push(null, getElectricity1());
        electricityData2.push(null, getElectricity2());
    }
}
