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
     * @param pcsReader 数据读取器
     * @throws Exception
     */
    public void readModbusTcpData(IDataReader pcsReader) throws Exception {
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
        setVoltage12(pcsReader.readFloat(1, 3, 25));
        setVoltage21(pcsReader.readFloat(2, 3, 23));
        setCurrent2(pcsReader.readFloat(2, 3, 21));
        setVoltage22(pcsReader.readFloat(2, 3, 25));

        setChargingElectricity1(pcsReader.readFloat(1, 3, 67));
        setDischargingElectricity1(pcsReader.readFloat(1, 3, 65));
        setChargingElectricity2(pcsReader.readFloat(2, 3, 67));
        setDischargingElectricity2(pcsReader.readFloat(2, 3, 65));
        setElectricity1(pcsReader.readFloat(1, 3, 31));
        setElectricity2(pcsReader.readFloat(2, 3, 31));

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
