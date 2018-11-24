package com.etrita.bms.demo.board.entities;

import com.etrita.bms.demo.board.communications.IDataReader;
import lombok.Getter;
import lombok.Setter;

/**
 * 变压器视图数据
 *
 * @author Alex
 */
@Getter
@Setter
public class Transformer {
    /**
     * 1号并网柜总充电电量
     */
    private float chargingElectricity1;

    /**
     * 1号并网柜总放电电量
     */
    private float dischargingElectricity1;

    /**
     * 1号并网柜充放电实时功率
     */
    private float power1;

    /**
     * 读取ModbusTcp数据
     *
     * @param reader 数据读取器
     * @throws Exception
     */
    public void readModbusTcpData(IDataReader reader) throws Exception {
        setChargingElectricity1(reader.readFloat(1, 3, 25));
        setDischargingElectricity1(reader.readFloat(1, 3, 27));
        setPower1(reader.readFloat(1, 3, 29));
    }
}
