package com.etrita.bms.demo.board.entities;

import com.etrita.bms.demo.board.communications.IDataReader;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import java.text.SimpleDateFormat;
import java.util.Date;

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
     * @param other1Reader 数据读取器
     * @param other2Reader 数据读取器
     * @throws Exception
     */
    public void readModbusTcpData(IDataReader other1Reader, IDataReader other2Reader) throws Exception {
        setFan1(other2Reader.readByte(1, 2, 1));
        setFan2(other2Reader.readByte(2, 2, 1));

        byte state11 = other2Reader.readByte(1, 2, 2);
        byte state12 = other2Reader.readByte(2, 2, 2);
        byte state21 = other2Reader.readByte(1, 2, 4);
        byte state22 = other2Reader.readByte(2, 2, 4);
        setState(((state11 == 1) || (state12 == 1)) ? 1 : ((state21 == 1) || (state22 == 1)) ? 2 : 0);

        // setSwitch1(other1Reader.readByte(1, 2, 1));
        // setSwitch2(other1Reader.readByte(1, 2, 2));

        setElectricity1(other1Reader.readFloat(1, 3, 31));
        setElectricity2(other1Reader.readFloat(2, 3, 31));

        if ((lastDate == null) || (new Date().getTime() - lastDate.getTime() > 10000)) {
            lastDate = new Date();
            electricityData1.push(dateFormat.format(lastDate), getElectricity1());
            electricityData2.push(dateFormat.format(lastDate), getElectricity2());
        }
    }
}
