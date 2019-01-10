package com.etrita.bms.demo.board.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Arrays;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

/**
 * 图表数据
 *
 * @author Alex
 */
@Getter
@Setter
@NoArgsConstructor
public class ChartData {
    /**
     * X轴标签列表
     */
    private List<String> xLabels = new LinkedList<>();

    /**
     * 数据列表
     */
    private List<Object> data = new LinkedList<>();

    /**
     * 数据最大长度
     */
    private int maxLength;

    /**
     * 采样时间间隔
     */
    private Integer duration;

    /**
     * 最后采样时间
     */
    @JsonIgnore
    private Date lastDate;

    /**
     * 构造函数
     *
     * @param maxLength 数据最大长度
     */
    public ChartData(int maxLength) {
        this.maxLength = maxLength;
    }

    /**
     * 构造函数
     *
     * @param maxLength 数据最大长度
     * @param xLabels   标签列表
     * @param duration  间隔时间
     */
    public ChartData(int maxLength, String[] xLabels, Integer duration) {
        this.maxLength = maxLength;
        this.duration = duration;
        this.xLabels.addAll(Arrays.asList(xLabels));
        for (int i = 0; i < xLabels.length; ++i) {
            this.data.add(null);
        }
    }

    /**
     * 设置数据
     *
     * @param id   索引
     * @param data 数据
     */
    public void set(int id, Object data) {
        if (this.data.size() > id) {
            this.data.set(id, data);
        }
    }

    /**
     * 添加数据
     *
     * @param xLabel X轴标签
     * @param data   数据
     */
    public void push(String xLabel, Object data) {
        if (duration != null) {
            if ((lastDate == null) || (new Date().getTime() - lastDate.getTime() > duration)) {
                lastDate = new Date();
                pushData(xLabel, data);
            }
        } else {
            pushData(xLabel, data);
        }
    }

    /**
     * 添加数据
     *
     * @param xLabel X轴标签
     * @param data   数据
     */
    private void pushData(String xLabel, Object data) {
        if (xLabel != null) {
            xLabels.add(xLabel);
            if (xLabels.size() > maxLength) {
                xLabels.remove(0);
            }
        } else {
            if (xLabels.size() >= maxLength) {
                xLabel = xLabels.remove(0);
                xLabels.add(xLabel);
            }
        }

        this.data.add(data);
        if (this.data.size() > maxLength) {
            this.data.remove(0);
        }
    }
}
