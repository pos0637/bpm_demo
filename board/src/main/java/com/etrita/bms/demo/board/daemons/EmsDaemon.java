package com.etrita.bms.demo.board.daemons;

import com.etrita.bms.demo.board.communications.IDataReader;
import com.etrita.bms.demo.board.entities.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.furongsoft.core.misc.Tracker;
import lombok.Getter;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
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
     * 更新时间间隔
     */
    @Value("${bms.update.interval}")
    private int interval;

    /**
     * 数据读取器
     */
    private IDataReader dataReader;

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
     * BMS视图数据
     */
    private Bms bms = new Bms();

    @Autowired
    public EmsDaemon(IDataReader dataReader) {
        this.dataReader = dataReader;
    }

    @Override
    public void run() {
        try {
            dataReader.reset();
            load();
        } catch (Exception e) {
            Tracker.error(e);
        }

        while (true) {
            try {
                overview.readModbusTcpData(dataReader);
                pcs.readModbusTcpData(dataReader);
                load.readModbusTcpData(dataReader);
                transformer.readModbusTcpData(dataReader);
                bms.readModbusTcpData(dataReader);

                save();
                Thread.sleep(interval);
            } catch (Exception e) {
                try {
                    dataReader.reset();
                    Thread.sleep(1000);
                } catch (Exception e1) {
                    Tracker.error(e1);
                }

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
        pcs = mapper.readValue(new File(file.getAbsolutePath() + "/pcs"), Pcs.class);
        transformer = mapper.readValue(new File(file.getAbsolutePath() + "/transformer"), Transformer.class);
        bms = mapper.readValue(new File(file.getAbsolutePath() + "/bms"), Bms.class);
    }

    private void save() throws Exception {
        File file = new File("./data");
        if (!file.exists()) {
            file.mkdirs();
        }

        ObjectMapper mapper = new ObjectMapper();
        mapper.writeValue(new File(file.getAbsolutePath() + "/overview"), overview);
        mapper.writeValue(new File(file.getAbsolutePath() + "/pcs"), pcs);
        mapper.writeValue(new File(file.getAbsolutePath() + "/transformer"), transformer);
        mapper.writeValue(new File(file.getAbsolutePath() + "/bms"), bms);
    }
}
