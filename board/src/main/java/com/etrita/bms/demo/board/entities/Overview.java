package com.etrita.bms.demo.board.entities;

import com.etrita.bms.demo.board.communications.IDataReader;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import java.text.SimpleDateFormat;
import java.util.Date;

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
     * 储能 总充电量：并网柜总充电电量
     */
    private float totalChargingElectricity;

    /**
     * 储能 总放电量：并网柜总放电电量
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
     * 1#昨日充电总量
     */
    private float lastChargingElectricity1;

    /**
     * 1#昨日放电总量
     */
    private float lastDischargingElectricity1;

    /**
     * 2#昨日充电总量
     */
    private float lastChargingElectricity2;

    /**
     * 2#昨日放电总量
     */
    private float lastDischargingElectricity2;

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
    private ChartData electricityData1 = new ChartData(9);

    /**
     * 充放电功率曲线2
     */
    private ChartData electricityData2 = new ChartData(9);

    /**
     * 变压器功率曲线1
     */
    private ChartData transformerPowerData1 = new ChartData(9);

    /**
     * 变压器功率曲线2
     */
    private ChartData transformerPowerData2 = new ChartData(9);

    /**
     * 需求功率曲线1
     */
    private ChartData loadPowerData1 = new ChartData(9);

    /**
     * 需求功率曲线2
     */
    private ChartData loadPowerData2 = new ChartData(9);

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
     * @param pcsReader    数据读取器
     * @param other1Reader 数据读取器
     * @param other2Reader 数据读取器
     * @throws Exception
     */
    public void readModbusTcpData(IDataReader pcsReader, IDataReader other1Reader, IDataReader other2Reader) throws Exception {
        byte state11 = pcsReader.readByte(1, 2, 24);
        byte state12 = pcsReader.readByte(1, 2, 25);
        // byte state13 = reader.readByte(1, 2, 26);
        setState1((state11 == 1) ? 0 : (state12 == 1) ? 1 : 2);

        byte state21 = pcsReader.readByte(2, 2, 24);
        byte state22 = pcsReader.readByte(2, 2, 25);
        // byte state23 = reader.readByte(2, 2, 26);
        setState2((state21 == 1) ? 0 : (state22 == 1) ? 1 : 2);

        setChargingState((getState1() == 0) && (getState2() == 0) ? 0 : 1);
        setSecuritySystemState(other1Reader.readByte(4, 2, 19));

        float pcsPower1 = pcsReader.readFloat(1, 3, 31);
        float pcsPower2 = pcsReader.readFloat(2, 3, 31);
        setTransformerPower1(other1Reader.readFloat(4, 3, 1));
        setTransformerPower2(other1Reader.readFloat(4, 3, 37));
        setLoadPower1(getTransformerPower1() - pcsPower1);
        setLoadPower2(getTransformerPower2() - pcsPower2);
        setTotalChargingElectricity(other2Reader.readFloat(5, 3, 1));
        setTotalDischargingElectricity(other2Reader.readFloat(5, 3, 11));
        setChargingElectricity1(pcsReader.readFloat(3, 3, 1) - lastChargingElectricity1);
        setDischargingElectricity1(pcsReader.readFloat(3, 3, 11) - lastDischargingElectricity1);
        setChargingElectricity2(pcsReader.readFloat(4, 3, 1) - lastChargingElectricity2);
        setDischargingElectricity2(pcsReader.readFloat(4, 3, 11) - lastDischargingElectricity2);

        if ((lastDate == null) || (new Date().getTime() - lastDate.getTime() > 10000)) {
            lastDate = new Date();
            electricityData1.push(dateFormat.format(lastDate), pcsPower1);
            electricityData2.push(dateFormat.format(lastDate), pcsPower2);
            transformerPowerData1.push(dateFormat.format(lastDate), getTransformerPower1());
            transformerPowerData2.push(dateFormat.format(lastDate), getTransformerPower2());
            loadPowerData1.push(dateFormat.format(lastDate), getTransformerPower1() - pcsPower1);
            loadPowerData2.push(dateFormat.format(lastDate), getTransformerPower2() - pcsPower1);
        }
    }
}
