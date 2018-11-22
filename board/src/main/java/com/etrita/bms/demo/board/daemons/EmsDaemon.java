package com.etrita.bms.demo.board.daemons;

import com.etrita.bms.demo.board.communications.IDataReader;
import com.etrita.bms.demo.board.entities.Main;
import com.etrita.bms.demo.board.entities.Overview;
import com.furongsoft.core.misc.Tracker;
import lombok.Getter;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * EMS通讯服务
 *
 * @author Alex
 */
@Component
@Getter
public class EmsDaemon implements Runnable, InitializingBean {
    private IDataReader dataReader;

    /**
     * 预览视图数据
     */
    private Overview overview = new Overview();

    /**
     * 主视图数据
     */
    private Main main = new Main();

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
                Thread.sleep(30000);
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
