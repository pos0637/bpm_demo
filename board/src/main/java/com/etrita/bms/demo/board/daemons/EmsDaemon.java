package com.etrita.bms.demo.board.daemons;

import com.etrita.bms.demo.board.communications.IDataReader;
import com.etrita.bms.demo.board.communications.ModbusTcpDataReader;
import com.etrita.bms.demo.board.entities.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.furongsoft.core.misc.Tracker;
import lombok.Getter;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.File;

/**
 * EMS通讯服务
 *
 * @author Alex
 */
@Component
@Getter
public class EmsDaemon implements Runnable, InitializingBean {
    /**
     * ModbusTcp从站IP地址
     */
    @Value("${bms.modbus.host}")
    private String host;

    /**
     * ModbusTcp从站端口
     */
    @Value("${bms.modbus.pcs_port}")
    private int pcsPort;

    /**
     * ModbusTcp从站端口
     */
    @Value("${bms.modbus.other1_port}")
    private int other1Port;

    /**
     * ModbusTcp从站端口
     */
    @Value("${bms.modbus.other2_port}")
    private int other2Port;

    /**
     * ModbusTcp从站端口
     */
    @Value("${bms.modbus.bms1_port}")
    private int bms1Port;

    /**
     * ModbusTcp从站端口
     */
    @Value("${bms.modbus.bms2_port}")
    private int bms2Port;

    /**
     * 更新时间间隔
     */
    @Value("${bms.update.interval}")
    private int interval;

    /**
     * 数据读取器
     */
    private IDataReader pcsDataReader;

    /**
     * 数据读取器
     */
    private IDataReader other1DataReader;

    /**
     * 数据读取器
     */
    private IDataReader other2DataReader;

    /**
     * 数据读取器
     */
    private IDataReader bms1DataReader;

    /**
     * 数据读取器
     */
    private IDataReader bms2DataReader;

    /**
     * 预览视图数据
     */
    private Overview overview = new Overview();

    /**
     * PCS视图数据
     */
    private Pcs pcs = new Pcs();

    /**
     * 负载视图数据
     */
    private Load load = new Load();

    /**
     * 变压器视图数据
     */
    private Transformer transformer = new Transformer();

    /**
     * 空调视图数据
     */
    private Air air = new Air();

    /**
     * BMS视图数据
     */
    private Bms bms = new Bms();

    /**
     * 全局数据
     */
    private GlobalData globalData = new GlobalData();

    @Override
    public void run() {
        try {
            pcsDataReader = new ModbusTcpDataReader(host, pcsPort);
            other1DataReader = new ModbusTcpDataReader(host, other1Port);
            other2DataReader = new ModbusTcpDataReader(host, other2Port);
            bms1DataReader = new ModbusTcpDataReader(host, bms1Port);
            bms2DataReader = new ModbusTcpDataReader(host, bms2Port);
            pcsDataReader.reset();
            other1DataReader.reset();
            other2DataReader.reset();
            bms1DataReader.reset();
            bms2DataReader.reset();
            load();
        } catch (Exception e) {
            Tracker.error(e);
        }

        while (true) {
            try {
                overview.readModbusTcpData(pcsDataReader, other1DataReader, other2DataReader, globalData);
            } catch (Exception e) {
                Tracker.error(e);
                try {
                    pcsDataReader.reset();
                    other1DataReader.reset();
                    Thread.sleep(1000);
                } catch (Exception e1) {
                    Tracker.error(e1);
                }
            }

            try {
                load.readModbusTcpData(other1DataReader);
            } catch (Exception e) {
                Tracker.error(e);
                try {
                    other1DataReader.reset();
                    Thread.sleep(1000);
                } catch (Exception e1) {
                    Tracker.error(e1);
                }
            }

            try {
                pcs.readModbusTcpData(pcsDataReader, other2DataReader, globalData);
            } catch (Exception e) {
                Tracker.error(e);
                try {
                    pcsDataReader.reset();
                    other2DataReader.reset();
                    Thread.sleep(1000);
                } catch (Exception e1) {
                    Tracker.error(e1);
                }
            }

            try {
                transformer.readModbusTcpData(pcsDataReader, other1DataReader, other2DataReader);
            } catch (Exception e) {
                Tracker.error(e);
                try {
                    pcsDataReader.reset();
                    other1DataReader.reset();
                    other2DataReader.reset();
                    Thread.sleep(1000);
                } catch (Exception e1) {
                    Tracker.error(e1);
                }
            }

            try {
                bms.readModbusTcpData(bms1DataReader, bms1DataReader);
            } catch (Exception e) {
                Tracker.error(e);
                try {
                    bms1DataReader.reset();
                    bms2DataReader.reset();
                    Thread.sleep(1000);
                } catch (Exception e1) {
                    Tracker.error(e1);
                }
            }

            try {
                air.readModbusTcpData(other1DataReader);
            } catch (Exception e) {
                Tracker.error(e);
                try {
                    other1DataReader.reset();
                    Thread.sleep(1000);
                } catch (Exception e1) {
                    Tracker.error(e1);
                }
            }

            try {
                save();
                Thread.sleep(interval);
            } catch (Exception e) {
                Tracker.error(e);
            }
        }
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        new Thread(this).start();
    }

    private void load() throws Exception {
        File file = new File("./data");
        if (!file.exists()) {
            return;
        }

        ObjectMapper mapper = new ObjectMapper();
        overview = mapper.readValue(new File(file.getAbsolutePath() + "/overview"), Overview.class);
        load = mapper.readValue(new File(file.getAbsolutePath() + "/load"), Load.class);
        pcs = mapper.readValue(new File(file.getAbsolutePath() + "/pcs"), Pcs.class);
        transformer = mapper.readValue(new File(file.getAbsolutePath() + "/transformer"), Transformer.class);
        bms = mapper.readValue(new File(file.getAbsolutePath() + "/bms"), Bms.class);
        air = mapper.readValue(new File(file.getAbsolutePath() + "/air"), Air.class);
        globalData = mapper.readValue(new File(file.getAbsolutePath() + "/global"), GlobalData.class);
        globalData.valid();
    }

    private void save() throws Exception {
        File file = new File("./data");
        if (!file.exists()) {
            file.mkdirs();
        }

        ObjectMapper mapper = new ObjectMapper();
        mapper.writeValue(new File(file.getAbsolutePath() + "/overview"), overview);
        mapper.writeValue(new File(file.getAbsolutePath() + "/load"), load);
        mapper.writeValue(new File(file.getAbsolutePath() + "/pcs"), pcs);
        mapper.writeValue(new File(file.getAbsolutePath() + "/transformer"), transformer);
        mapper.writeValue(new File(file.getAbsolutePath() + "/bms"), bms);
        mapper.writeValue(new File(file.getAbsolutePath() + "/air"), air);
        mapper.writeValue(new File(file.getAbsolutePath() + "/global"), globalData);
    }
}
