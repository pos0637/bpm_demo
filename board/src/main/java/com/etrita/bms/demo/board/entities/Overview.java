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
     * 安防系统状态
     */
    private int securitySystemState;

    /**
     * 总节电费用
     */
    private float bill;

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
    private ChartData electricityData1 = new ChartData(9);

    /**
     * 充放电量2
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

        // setLoadPower1(reader.readFloat(1, 3, 31));
        // setLoadPower2(reader.readFloat(1, 3, 33));
        // setTotalChargingElectricity(reader.readFloat(1, 3, 25));
        // setTotalDischargingElectricity(reader.readFloat(1, 3, 27));
        setChargingElectricity1(pcsReader.readFloat(1, 3, 67));
        setDischargingElectricity1(pcsReader.readFloat(1, 3, 65));
        setChargingElectricity2(pcsReader.readFloat(2, 3, 67));
        setDischargingElectricity2(pcsReader.readFloat(2, 3, 65));

        if ((lastDate == null) || (new Date().getTime() - lastDate.getTime() > 10000)) {
            lastDate = new Date();
            electricityData1.push(dateFormat.format(lastDate), pcsReader.readFloat(1, 3, 31));
            electricityData2.push(dateFormat.format(lastDate), pcsReader.readFloat(2, 3, 31));
        }
    }
}
