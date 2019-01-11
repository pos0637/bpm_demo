package com.etrita.bms.demo.board.entities;

import lombok.Getter;
import lombok.Setter;

import java.util.Calendar;
import java.util.Date;

/**
 * 可更新数据
 *
 * @author Alex
 */
@Getter
@Setter
public class UpdateableData {
    /**
     * 数据更新时间
     */
    private int triggerTime;

    /**
     * 是否更新
     */
    private boolean updated;

    public UpdateableData(int triggerTime) {
        this.triggerTime = triggerTime;
    }

    /**
     * 数据是否有效
     *
     * @return 是否有效
     */
    public boolean isValid() {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        int hour = calendar.get(Calendar.HOUR_OF_DAY);
        if (hour < triggerTime) {
            updated = false;
            return true;
        } else {
            return updated;
        }
    }

    /**
     * 设置数据更新
     */
    public void setUpdated() {
        updated = true;
    }
}
