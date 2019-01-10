package com.etrita.bms.demo.board.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

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
     * 数据失效时间
     */
    @JsonIgnore
    private int timeout;

    /**
     * 最后更新时间
     */
    @JsonIgnore
    private Date lastDate;

    public UpdateableData(int timeout) {
        this.timeout = timeout;
    }

    /**
     * 数据是否有效
     *
     * @return 是否有效
     */
    public boolean isInvalid() {
        return !((lastDate == null) || (new Date().getTime() - lastDate.getTime() > timeout));
    }

    /**
     * 数据有效
     */
    public void valid() {
        lastDate = new Date();
    }
}
