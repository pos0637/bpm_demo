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
     * 1# A相电压
     */
    private float voltageA1;

    /**
     * 1# B相电压
     */
    private float voltageB1;

    /**
     * 1# C相电压
     */
    private float voltageC1;

    /**
     * 1# A相电流
     */
    private float currentA1;

    /**
     * 1# B相电流
     */
    private float currentB1;

    /**
     * 1# C相电流
     */
    private float currentC1;


    /**
     * 2# A相电压
     */
    private float voltageA2;

    /**
     * 2# B相电压
     */
    private float voltageB2;

    /**
     * 2# C相电压
     */
    private float voltageC2;

    /**
     * 2# A相电流
     */
    private float currentA2;

    /**
     * 2# B相电流
     */
    private float currentB2;

    /**
     * 2# C相电流
     */
    private float currentC2;

    /**
     * 当日能耗
     */
    private float power;

    /**
     * 主楼公共区用电功率
     */
    private float power1;

    /**
     * 配楼公共区用电功率
     */
    private float power2;

    /**
     * 泵站能耗功率
     */
    private float power3;

    /**
     * 空调用电功率
     */
    private float power4;

    /**
     * 当月能耗曲线
     */
    private ChartData powerData;

    public Load() {
        String[] xLabels = new String[7];
        for (int i = 0; i < xLabels.length; ++i) {
            xLabels[i] = String.format("Day%d", i + 1);
        }

        // TODO: fix it
        powerData = new ChartData(xLabels.length, xLabels);
        powerData.push(null, 487);
        powerData.push(null, 498);
        powerData.push(null, 501);
        powerData.push(null, 475);
        powerData.push(null, 483);
        powerData.push(null, 492);
        powerData.push(null, 488);
    }

    /**
     * 读取ModbusTcp数据
     *
     * @param other1Reader 数据读取器
     * @throws Exception
     */
    public void readModbusTcpData(IDataReader other1Reader) throws Exception {
        setVoltageA1(other1Reader.readFloat(3, 3, 5));
        setVoltageB1(other1Reader.readFloat(3, 3, 7));
        setVoltageC1(other1Reader.readFloat(3, 3, 9));
        setCurrentA1(other1Reader.readFloat(3, 3, 11));
        setCurrentB1(other1Reader.readFloat(3, 3, 13));
        setCurrentC1(other1Reader.readFloat(3, 3, 15));
        setVoltageA2(other1Reader.readFloat(3, 3, 41));
        setVoltageB2(other1Reader.readFloat(3, 3, 43));
        setVoltageC2(other1Reader.readFloat(3, 3, 45));
        setCurrentA2(other1Reader.readFloat(3, 3, 47));
        setCurrentB2(other1Reader.readFloat(3, 3, 49));
        setCurrentC2(other1Reader.readFloat(3, 3, 51));
        setPower(other1Reader.readFloat(3, 3, 289));
        // TODO: fix it
        powerData.set(6, getPower());
        setPower1(other1Reader.readFloat(3, 3, 73));
        // TODO: check it
        setPower2(Math.abs(other1Reader.readFloat(3, 3, 109)));
        setPower3(other1Reader.readFloat(3, 3, 145) + other1Reader.readFloat(3, 3, 181));
        setPower4(other1Reader.readFloat(3, 3, 217) + other1Reader.readFloat(3, 3, 253));
    }
}
