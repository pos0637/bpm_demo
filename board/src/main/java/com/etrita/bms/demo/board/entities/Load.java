package com.etrita.bms.demo.board.entities;

import com.etrita.bms.demo.board.communications.IDataReader;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import java.text.SimpleDateFormat;
import java.util.Date;

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
     * I段负载实时功率图表数据
     */
    private ChartData power1Data = new ChartData(9);

    /**
     * II段负载实时功率
     */
    private float power2;

    /**
     * II段负载实时功率图表数据
     */
    private ChartData power2Data = new ChartData(9);

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
     * 时间格式
     */
    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("mm:ss");

    /**
     * 最后采样时间
     */
    @JsonIgnore
    private Date lastDate;

    /**
     * 读取ModbusTcp数据
     *
     * @param reader 数据读取器
     * @throws Exception
     */
    public void readModbusTcpData(IDataReader reader) throws Exception {
        setPower1(reader.readFloat(1, 3, 31));
        setPower2(reader.readFloat(1, 3, 33));

        if ((lastDate == null) || (new Date().getTime() - lastDate.getTime() > 10000)) {
            lastDate = new Date();
            power1Data.push(dateFormat.format(lastDate), getPower1());
            power2Data.push(dateFormat.format(lastDate), getPower2());
        }
    }
}
