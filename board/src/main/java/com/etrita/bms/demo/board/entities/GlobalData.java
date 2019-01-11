package com.etrita.bms.demo.board.entities;

import lombok.Getter;
import lombok.Setter;

/**
 * 全局数据
 *
 * @author Alex
 */
@Getter
@Setter
public class GlobalData extends UpdateableData {
    public GlobalData() {
        super(23);
    }

    /**
     * 1#昨日充电总量
     */
    private float lastChargingElectricity1;

    /**
     * 1#昨日放电总量
     */
    private float lastDischargingElectricity1;

    /**
     * 2#昨日充电总量
     */
    private float lastChargingElectricity2;

    /**
     * 2#昨日放电总量
     */
    private float lastDischargingElectricity2;
}
