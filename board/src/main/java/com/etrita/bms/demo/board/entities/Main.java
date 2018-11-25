package com.etrita.bms.demo.board.entities;

import com.etrita.bms.demo.board.communications.IDataReader;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 主视图数据
 *
 * @author Alex
 */
@Getter
@Setter
public class Main {
    /**
     * I号母线电压
     */
    private float voltage1;

    /**
     * I号母线总电量
     */
    private float electricity1;

    /**
     * I号母线实时功率
     */
    private float power1;

    /**
     * II号母线电压
     */
    private float voltage2;

    /**
     * II号母线总电量
     */
    private float electricity2;

    /**
     * II号母线实时功率
     */
    private float power2;

    /**
     * 负载实时功率
     */
    private float power;

    /**
     * 1号变压器温度
     */
    private float temperature1;

    /**
     * 1号变压器风扇状态
     */
    private int fan1;

    /**
     * 2号变压器温度
     */
    private float temperature2;

    /**
     * 2号变压器风扇状态
     */
    private int fan2;

    /**
     * 并网柜总充电电量
     */
    private float gridConnectedCabinetChargingElectricity;

    /**
     * 并网柜总放电电量
     */
    private float gridConnectedCabinetDischargingElectricity;

    /**
     * 并网柜充放电实时功率
     */
    private float gridConnectedCabinetPower;

    /**
     * 并网柜充放电实时功率图表数据
     */
    private ChartData gridConnectedCabinetPowerData = new ChartData(9);

    /**
     * 并网柜I段开关
     */
    private int switch1;

    /**
     * 并网柜II段开关
     */
    private int switch2;

    /**
     * PCS有功功率
     */
    private float pcsPower;

    /**
     * PCS直流电压
     */
    private float pcsVoltage1;

    /**
     * PCS直流电流
     */
    private float pcsCurrent;

    /**
     * PCS交流电压
     */
    private float pcsVoltage2;

    /**
     * PCS今日充电总量
     */
    private float pcsChargingElectricity;

    /**
     * PCS今日放电总量
     */
    private float pcsDischargingElectricity;

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
        setGridConnectedCabinetChargingElectricity(reader.readFloat(1, 3, 1));
        setGridConnectedCabinetDischargingElectricity(reader.readFloat(1, 3, 3));
        setGridConnectedCabinetPower(reader.readFloat(1, 3, 29));
        setSwitch1(reader.readByte(1, 2, 1));
        setSwitch2(reader.readByte(1, 2, 2));
        setPcsPower(reader.readFloat(1, 3, 51) + reader.readInteger(1, 3, 79));
        setPcsVoltage1(reader.readFloat(1, 3, 53) + reader.readInteger(1, 3, 81));
        setPcsCurrent(reader.readFloat(1, 3, 55) + reader.readInteger(1, 3, 83));
        setPcsVoltage1(reader.readFloat(1, 3, 57) + reader.readInteger(1, 3, 85));
        setPcsChargingElectricity(reader.readFloat(1, 3, 59) + reader.readInteger(1, 3, 87));
        setPcsDischargingElectricity(reader.readFloat(1, 3, 61) + reader.readInteger(1, 3, 89));

        if ((lastDate == null) || (new Date().getTime() - lastDate.getTime() > 10000)) {
            lastDate = new Date();
            gridConnectedCabinetPowerData.push(dateFormat.format(lastDate), getGridConnectedCabinetPower());
        }
    }
}
