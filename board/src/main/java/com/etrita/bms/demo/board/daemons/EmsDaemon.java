package com.etrita.bms.demo.board.daemons;

import com.etrita.bms.demo.board.entities.Overview;
import com.furongsoft.core.misc.Tracker;
import com.serotonin.modbus4j.ModbusFactory;
import com.serotonin.modbus4j.ModbusMaster;
import com.serotonin.modbus4j.ip.IpParameters;
import com.serotonin.modbus4j.msg.ModbusRequest;
import com.serotonin.modbus4j.msg.ModbusResponse;
import com.serotonin.modbus4j.msg.ReadHoldingRegistersRequest;
import com.serotonin.modbus4j.sero.util.queue.ByteQueue;
import lombok.Getter;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.ByteBuffer;
import java.nio.ByteOrder;

/**
 * EMS通讯服务
 *
 * @author Alex
 */
@Component
@Getter
public class EmsDaemon implements Runnable, InitializingBean, DisposableBean {
    /**
     * Modbus主站
     */
    ModbusMaster master;

    /**
     * ModbusTCP从站IP地址
     */
    @Value("${bms.modbus.host}")
    private String host;

    /**
     * ModbusTCP从站端口
     */
    @Value("${bms.modbus.port}")
    private int port;

    /**
     * 预览视图数据
     */
    private Overview overview;

    @Override
    public void run() {
        try {
            reset();
        } catch (Exception e) {
            Tracker.error(e);
        }

        while (true) {
            try {
                readOverviewViewData();
                Thread.sleep(30000);
            } catch (Exception e) {
                try {
                    reset();
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

    @Override
    public void destroy() throws Exception {
        if (master != null) {
            master.destroy();
        }
    }

    private void reset() throws Exception {
        if (master != null) {
            master.destroy();
        }

        IpParameters params = new IpParameters();
        params.setHost(host);
        params.setPort(port);
        master = new ModbusFactory().createTcpMaster(params, true);
    }

    private void readOverviewViewData() throws Exception {
        overview.setInformation(readInteger(1, 1));
        overview.setState(readInteger(1, 2));
    }

    private int readInteger(int address, int offset) throws Exception {
        byte[] array = readData(address, offset, 2).popAll();
        return ByteBuffer.wrap(array).order(ByteOrder.LITTLE_ENDIAN).getInt();
    }

    private float readFloat(int address, int offset) throws Exception {
        byte[] array = readData(address, offset, 2).popAll();
        return ByteBuffer.wrap(array).order(ByteOrder.LITTLE_ENDIAN).getFloat();
    }

    private ByteQueue readData(int address, int offset, int length) throws Exception {
        if (master == null) {
            reset();
        }

        ModbusRequest request = new ReadHoldingRegistersRequest(address, offset, length);
        ModbusResponse response = master.send(request);
        ByteQueue byteQueue = new ByteQueue(length);
        response.write(byteQueue);

        return byteQueue;
    }
}
