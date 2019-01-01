package com.etrita.bms.demo.board.entities;

import com.etrita.bms.demo.board.communications.IDataReader;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import java.text.SimpleDateFormat;
import java.util.Date;

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
    private ChartData chargingElectricityData1 = new ChartData(9);

    /**
     * 1#日放电电量
     */
    private ChartData dischargingElectricityData1 = new ChartData(9);

    /**
     * 2#日充电电量
     */
    private ChartData chargingElectricityData2 = new ChartData(9);

    /**
     * 2#日放电电量
     */
    private ChartData dischargingElectricityData2 = new ChartData(9);

    /**
     * 充放电量曲线1
     */
    private ChartData electricityData1 = new ChartData(9);

    /**
     * 充放电量曲线2
     */
    private ChartData electricityData2 = new ChartData(9);

    /**
     * 最后采样时间
     */
    @JsonIgnore
    private Date lastDate;

    /**
     * 时间格式
     */
    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("mm:ss");

    /**
     * 读取ModbusTcp数据
     *
     * @param reader 数据读取器
     * @throws Exception
     */
    public void readModbusTcpData(IDataReader reader) throws Exception {
        byte state11 = reader.readByte(1, 2, 5);
        byte state12 = reader.readByte(1, 2, 6);
        // byte state13 = reader.readByte(1, 2, 7);
        setState1((state11 == 1) ? 0 : (state12 == 1) ? 1 : 2);

        byte state21 = reader.readByte(1, 2, 15);
        byte state22 = reader.readByte(1, 2, 16);
        // byte state23 = reader.readByte(1, 2, 17);
        setState2((state21 == 1) ? 0 : (state22 == 1) ? 1 : 2);

        byte state31 = reader.readByte(1, 2, 11);
        byte state32 = reader.readByte(1, 2, 12);
        setGridState1((state31 == 1) ? 2 : (state32 == 1) ? 1 : 0);

        byte state41 = reader.readByte(1, 2, 11);
        byte state42 = reader.readByte(1, 2, 12);
        setGridState1((state41 == 1) ? 2 : (state42 == 1) ? 1 : 0);

        setVoltage11(reader.readFloat(1, 3, 53));
        setCurrent1(reader.readFloat(1, 3, 55));
        setVoltage11(reader.readFloat(1, 3, 57));
        setVoltage21(reader.readFloat(1, 3, 81));
        setCurrent2(reader.readFloat(1, 3, 83));
        setVoltage21(reader.readFloat(1, 3, 85));

        setChargingElectricity1(reader.readFloat(1, 3, 59));
        setDischargingElectricity1(reader.readFloat(1, 3, 61));
        setChargingElectricity2(reader.readFloat(1, 3, 87));
        setDischargingElectricity2(reader.readFloat(1, 3, 89));
        setElectricity1(reader.readFloat(1, 3, 51));
        setElectricity2(reader.readFloat(1, 3, 79));

        if ((lastDate == null) || (new Date().getTime() - lastDate.getTime() > 10000)) {
            lastDate = new Date();
            chargingElectricityData1.push(dateFormat.format(lastDate), getChargingElectricity1());
            dischargingElectricityData1.push(dateFormat.format(lastDate), getDischargingElectricity1());
            chargingElectricityData2.push(dateFormat.format(lastDate), getChargingElectricity2());
            dischargingElectricityData2.push(dateFormat.format(lastDate), getDischargingElectricity2());
            electricityData1.push(dateFormat.format(lastDate), getElectricity1());
            electricityData2.push(dateFormat.format(lastDate), getElectricity2());
        }
    }
}
