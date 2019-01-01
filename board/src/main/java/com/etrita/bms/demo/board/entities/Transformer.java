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
     * @param reader 数据读取器
     * @throws Exception
     */
    public void readModbusTcpData(IDataReader reader) throws Exception {
        byte state11 = reader.readByte(1, 2, 32);
        byte state12 = reader.readByte(1, 2, 36);
        byte state21 = reader.readByte(1, 2, 34);
        byte state22 = reader.readByte(1, 2, 38);
        setState(((state11 == 1) || (state12 == 1)) ? 1 : ((state21 == 1) || (state22 == 1)) ? 2 : 0);

        setSwitch1(reader.readByte(1, 2, 1));
        setSwitch2(reader.readByte(1, 2, 2));

        if ((lastDate == null) || (new Date().getTime() - lastDate.getTime() > 10000)) {
            lastDate = new Date();
            electricityData1.push(dateFormat.format(lastDate), reader.readFloat(1, 3, 51));
            electricityData2.push(dateFormat.format(lastDate), reader.readFloat(1, 3, 79));
        }
    }
}
