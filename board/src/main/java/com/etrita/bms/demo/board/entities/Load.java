package com.etrita.bms.demo.board.entities;

import com.etrita.bms.demo.board.communications.IDataReader;
import lombok.Getter;
import lombok.Setter;

/**
 * 负载视图数据
 *
 * @author Alex
 */
@Getter
@Setter
public class Load {
    /**
     * I段负载实时功率
     */
    private float power1;

    /**
     * II段负载实时功率
     */
    private float power2;

    /**
     * I段母线功率因数
     */
    private float factor1;

    /**
     * II段母线功率因数
     */
    private float factor2;

    /**
     * A相电网电压
     */
    private float voltage1;

    /**
     * A相电网电流
     */
    private float current1;

    /**
     * B相电网电压
     */
    private float voltage2;

    /**
     * B相电网电流
     */
    private float current2;

    /**
     * C相电网电压
     */
    private float voltage3;

    /**
     * C相电网电流
     */
    private float current3;

    /**
     * 读取ModbusTcp数据
     *
     * @param reader 数据读取器
     * @throws Exception
     */
    public void readModbusTcpData(IDataReader reader) throws Exception {
        setPower1(reader.readFloat(1, 3, 31));
        setPower2(reader.readFloat(1, 3, 33));
    }
}
