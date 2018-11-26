package com.etrita.bms.demo.board.entities;

import com.etrita.bms.demo.board.communications.IDataReader;
import lombok.Getter;
import lombok.Setter;

/**
 * BMS视图数据
 *
 * @author Alex
 */
@Getter
@Setter
public class Bms {
    /**
     * 1#BMS SOC
     */
    private float soc1;

    /**
     * 1#BMS组端电压
     */
    private float voltage1;

    /**
     * 2#BMS SOC
     */
    private float soc2;

    /**
     * 2#BMS组端电压
     */
    private float voltage2;

    /**
     * 读取ModbusTcp数据
     *
     * @param reader 数据读取器
     * @throws Exception
     */
    public void readModbusTcpData(IDataReader reader) throws Exception {
        setSoc1(reader.readFloat(1, 3, 107));
        setVoltage1(reader.readFloat(1, 3, 119));
        setSoc2(reader.readFloat(1, 3, 141));
        setVoltage2(reader.readFloat(1, 3, 153));
    }
}
