package com.etrita.bms.demo.board.entities;

import com.etrita.bms.demo.board.communications.IDataReader;
import lombok.Getter;
import lombok.Setter;

import java.nio.ByteBuffer;
import java.nio.ByteOrder;

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
     * 热失控
     */
    private float thermal;

    /**
     * SOC
     */
    private float soc;

    /**
     * 健康状态
     */
    private float soh;

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
     * @param bms1Reader 数据读取器
     * @param bms2Reader 数据读取器
     * @throws Exception
     */
    public void readModbusTcpData(IDataReader bms1Reader, IDataReader bms2Reader) throws Exception {
        setSoc1(bms1Reader.readFloat(1, 3, 3));
        setElectricity1(bms1Reader.readFloat(1, 3, 9));
        setVoltage1(bms1Reader.readFloat(1, 3, 15));
        setSoc2(bms2Reader.readFloat(1, 3, 3));
        setElectricity2(bms2Reader.readFloat(1, 3, 9));
        setVoltage2(bms2Reader.readFloat(1, 3, 15));

        // TODO: 热失控
        setSoc((getSoc1() + getSoc2()) / 2);
        float soh1 = bms1Reader.readFloat(1, 3, 5);
        float soh2 = bms2Reader.readFloat(1, 3, 5);
        setSoh((soh1 + soh2) / 2);

        byte[] data1 = bms1Reader.read(2, 3, 97, 5 * MAX_BATTERIES * 2);
        byte[] data2 = bms1Reader.read(3, 3, 97, 5 * MAX_BATTERIES * 2);
        byte[] data3 = bms2Reader.read(2, 3, 97, 5 * MAX_BATTERIES * 2);
        byte[] data4 = bms2Reader.read(3, 3, 97, 5 * MAX_BATTERIES * 2);

        for (int i = 0, j = 0; i < MAX_BATTERIES; ++i, j += 4) {
            batteries1[i] = new Battery(
                    readFloat(data1, j),
                    readFloat(data1, j + (315 * 4)),
                    readFloat(data1, j + (315 * 4 * 2)),
                    readFloat(data1, j + (315 * 4 * 3)),
                    readFloat(data1, j + (315 * 4 * 4))
            );

            batteries2[i] = new Battery(
                    readFloat(data2, j),
                    readFloat(data2, j + (315 * 4)),
                    readFloat(data2, j + (315 * 4 * 2)),
                    readFloat(data2, j + (315 * 4 * 3)),
                    readFloat(data2, j + (315 * 4 * 4))
            );

            batteries3[i] = new Battery(
                    readFloat(data3, j),
                    readFloat(data3, j + (315 * 4)),
                    readFloat(data3, j + (315 * 4 * 2)),
                    readFloat(data3, j + (315 * 4 * 3)),
                    readFloat(data3, j + (315 * 4 * 4))
            );

            batteries4[i] = new Battery(
                    readFloat(data4, j),
                    readFloat(data4, j + (315 * 4)),
                    readFloat(data4, j + (315 * 4 * 2)),
                    readFloat(data4, j + (315 * 4 * 3)),
                    readFloat(data4, j + (315 * 4 * 4))
            );
        }
    }

    /**
     * 读取数据
     *
     * @param data   数据
     * @param offset 起始地址
     * @return 数据
     */
    private float readFloat(byte[] data, int offset) {
        return ByteBuffer.wrap(data, offset, 4).order(ByteOrder.BIG_ENDIAN).getFloat();
    }
}
