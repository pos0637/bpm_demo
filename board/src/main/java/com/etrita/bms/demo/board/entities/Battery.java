package com.etrita.bms.demo.board.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 电池信息
 *
 * @author Alex
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Battery {
    /**
     * 电压
     */
    private float voltage;

    /**
     * 温度
     */
    private float temperature;

    /**
     * SOC
     */
    private float soc;

    /**
     * 内阻
     */
    private float resistance;

    /**
     * SOH
     */
    private float soh;
}
