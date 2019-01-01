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
     * 最大电池数量
     */
    private final static int MAX_BATTERIES = 315;

    /**
     * 1#BMS SOC
     */
    private float soc1;

    /**
     * 剩余容量1
     */
    private float electricity1;

    /**
     * 1#BMS组端电压
     */
    private float voltage1;

    /**
     * 2#BMS SOC
     */
    private float soc2;

    /**
     * 剩余容量2
     */
    private float electricity2;

    /**
     * 2#BMS组端电压
     */
    private float voltage2;

    /**
     * 电池信息1
     */
    private Battery[] batteries1 = new Battery[MAX_BATTERIES];

    /**
     * 电池信息2
     */
    private Battery[] batteries2 = new Battery[MAX_BATTERIES];

    /**
     * 电池信息3
     */
    private Battery[] batteries3 = new Battery[MAX_BATTERIES];

    /**
     * 电池信息4
     */
    private Battery[] batteries4 = new Battery[MAX_BATTERIES];

    public Bms() {
        for (int i = 0; i < MAX_BATTERIES; ++i) {
            batteries1[i] = new Battery();
            batteries2[i] = new Battery();
            batteries3[i] = new Battery();
            batteries4[i] = new Battery();
        }
    }

    /**
     * 读取ModbusTcp数据
     *
     * @param reader 数据读取器
     * @throws Exception
     */
    public void readModbusTcpData(IDataReader reader) throws Exception {
        setSoc1(reader.readFloat(1, 3, 107));
        setElectricity1(reader.readFloat(1, 3, 113));
        setVoltage1(reader.readFloat(1, 3, 119));
        setSoc2(reader.readFloat(1, 3, 141));
        setElectricity2(reader.readFloat(1, 3, 147));
        setVoltage2(reader.readFloat(1, 3, 153));
        // TODO: 热失控、剩余容量、SOH

        for (int i = 0; i < MAX_BATTERIES; ++i) {
            batteries1[i] = new Battery(
                    reader.readFloat(1, 3, 97 + i * 2),
                    reader.readFloat(1, 3, 727 + i * 2),
                    reader.readFloat(1, 3, 1357 + i * 2),
                    reader.readFloat(1, 3, 1987 + i * 2),
                    reader.readFloat(1, 3, 2617 + i * 2)
            );

            batteries2[i] = new Battery(
                    reader.readFloat(1, 3, 97 + i * 2),
                    reader.readFloat(1, 3, 727 + i * 2),
                    reader.readFloat(1, 3, 1357 + i * 2),
                    reader.readFloat(1, 3, 1987 + i * 2),
                    reader.readFloat(1, 3, 2617 + i * 2)
            );

            batteries3[i] = new Battery(
                    reader.readFloat(1, 3, 97 + i * 2),
                    reader.readFloat(1, 3, 727 + i * 2),
                    reader.readFloat(1, 3, 1357 + i * 2),
                    reader.readFloat(1, 3, 1987 + i * 2),
                    reader.readFloat(1, 3, 2617 + i * 2)
            );

            batteries4[i] = new Battery(
                    reader.readFloat(1, 3, 97 + i * 2),
                    reader.readFloat(1, 3, 727 + i * 2),
                    reader.readFloat(1, 3, 1357 + i * 2),
                    reader.readFloat(1, 3, 1987 + i * 2),
                    reader.readFloat(1, 3, 2617 + i * 2)
            );
        }
    }
}
