package com.etrita.bms.demo.board.entities;

import com.etrita.bms.demo.board.communications.IDataReader;
import lombok.Getter;
import lombok.Setter;

/**
 * 空调视图数据
 *
 * @author Alex
 */
@Getter
@Setter
public class Air {
    /**
     * 电池室温度
     */
    private float temperature1;

    /**
     * 电气室温度
     */
    private float temperature2;

    /**
     * 安防系统状态： 0正常、1警报、2故障
     */
    private int state1;

    /**
     * 氢气探测器状态： 0正常、1警报
     */
    private int state2;

    /**
     * 读取ModbusTcp数据
     *
     * @param other1Reader 数据读取器
     * @throws Exception
     */
    public void readModbusTcpData(IDataReader other1Reader) throws Exception {
        byte state1 = other1Reader.readByte(4, 2, 19);
        setState1((state1 == 0) ? 0 : 2);

        byte state2 = other1Reader.readByte(4, 2, 23);
        setState2((state2 == 0) ? 0 : 1);
    }
}
