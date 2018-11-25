package com.etrita.bms.demo.board.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;

import java.util.LinkedList;
import java.util.List;

/**
 * 图表数据
 *
 * @author Alex
 */
@Getter
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
    @JsonIgnore
    private int maxLength;

    /**
     * 构造函数
     *
     * @param maxLength 数据最大长度
     */
    public ChartData(int maxLength) {
        this.maxLength = maxLength;
    }

    /**
     * 添加数据
     *
     * @param xLabel X轴标签
     * @param data   数据
     */
    public void push(String xLabel, Object data) {
        xLabels.add(xLabel);
        if (xLabels.size() > maxLength) {
            xLabels.remove(0);
        }

        this.data.add(data);
        if (this.data.size() > maxLength) {
            this.data.remove(0);
        }
    }
}
