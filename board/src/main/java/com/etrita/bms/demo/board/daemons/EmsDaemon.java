package com.etrita.bms.demo.board.daemons;

import com.etrita.bms.demo.board.communications.IDataReader;
import com.etrita.bms.demo.board.entities.Load;
import com.etrita.bms.demo.board.entities.Main;
import com.etrita.bms.demo.board.entities.Overview;
import com.etrita.bms.demo.board.entities.Transformer;
import com.furongsoft.core.misc.Tracker;
import lombok.Getter;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

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
     * 主视图数据
     */
    private Main main = new Main();

    /**
     * 负载视图数据
     */
    private Load load = new Load();

    /**
     * 变压器视图数据
     */
    private Transformer transformer = new Transformer();

    @Autowired
    public EmsDaemon(IDataReader dataReader) {
        this.dataReader = dataReader;
    }

    @Override
    public void run() {
        try {
            dataReader.reset();
        } catch (Exception e) {
            Tracker.error(e);
        }

        while (true) {
            try {
                overview.readModbusTcpData(dataReader);
                main.readModbusTcpData(dataReader);
                load.readModbusTcpData(dataReader);
                transformer.readModbusTcpData(dataReader);
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
}
