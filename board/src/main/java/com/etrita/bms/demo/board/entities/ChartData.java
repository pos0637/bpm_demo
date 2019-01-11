package com.etrita.bms.demo.board.entities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.text.SimpleDateFormat;
import java.util.*;

/**
 * 图表数据
 *
 * @author Alex
 */
@Getter
@Setter
@NoArgsConstructor
public class ChartData {
    private static final SimpleDateFormat df = new SimpleDateFormat("HH:mm:ss");

    /**
     * 图表数据列表
     */
    private LinkedList<ChartItem> list = new LinkedList<>();

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
     */
    public ChartData(int maxLength, String[] xLabels) {
        this.maxLength = maxLength;
        this.xLabels.addAll(Arrays.asList(xLabels));
        for (int i = 0; i < xLabels.length; ++i) {
            this.data.add(null);
        }
    }

    /**
     * 构造函数
     *
     * @param maxLength 数据最大长度
     * @param duration  采样间隔时间
     */
    public ChartData(int maxLength, int duration) {
        this.maxLength = maxLength;
        this.duration = duration;
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

    /**
     * 添加数据
     *
     * @param data 数据
     */
    public void push(Object data) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        long date = calendar.getTimeInMillis();
        date = (date / duration) * duration;

        if (list.isEmpty()) {
            list.add(new ChartItem(date, data));
            if (list.size() > maxLength) {
                list.remove(0);
            }
            generate();
            return;
        }

        long lastDate = list.getLast().getDate();
        long diff = (date - lastDate) / duration;
        if (diff < 0) {
            return;
        } else if (diff == 0) {
            list.getLast().setData(data);
            generate();
            return;
        }

        for (long i = 1; i < diff; ++i) {
            list.add(new ChartItem(date + duration * i, null));
            if (list.size() > maxLength) {
                list.remove(0);
            }
        }

        list.add(new ChartItem(date + duration * diff, data));
        if (list.size() > maxLength) {
            list.remove(0);
        }

        generate();
    }

    /**
     * 生成结果
     */
    private void generate() {
        xLabels.clear();
        data.clear();

        for (ChartItem item : list) {
            xLabels.add(item.getXLabel());
            data.add(item.data);
        }

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        long date = list.isEmpty() ? calendar.getTimeInMillis() : list.getLast().getDate();
        date = (date / duration) * duration;

        for (int i = list.size(); i < maxLength; ++i) {
            date += duration;
            calendar = Calendar.getInstance();
            calendar.setTimeInMillis(date);
            xLabels.add(df.format(calendar.getTime()));
            data.add(null);
        }
    }

    @Getter
    @Setter
    class ChartItem {
        private String xLabel;
        private long date;
        private Object data;

        ChartItem(long date, Object data) {
            this.date = date;
            this.data = data;

            Calendar calendar = Calendar.getInstance();
            calendar.setTimeInMillis(date);
            xLabel = df.format(calendar.getTime());
        }
    }
}
