package com.etrita.bms.demo.board.communications;

import com.serotonin.modbus4j.ModbusFactory;
import com.serotonin.modbus4j.ModbusMaster;
import com.serotonin.modbus4j.ip.IpParameters;
import com.serotonin.modbus4j.msg.ModbusRequest;
import com.serotonin.modbus4j.msg.ModbusResponse;
import com.serotonin.modbus4j.msg.ReadDiscreteInputsRequest;
import com.serotonin.modbus4j.msg.ReadHoldingRegistersRequest;
import com.serotonin.modbus4j.sero.util.queue.ByteQueue;
import org.apache.commons.lang3.ArrayUtils;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.ByteBuffer;
import java.nio.ByteOrder;

/**
 * ModbusTcp数据读取器
 */
@Component
public class ModbusTcpDataReader implements IDataReader, DisposableBean {
    /**
     * ModbusTcp从站IP地址
     */
    @Value("${bms.modbus.host}")
    private String host;

    /**
     * ModbusTcp从站端口
     */
    @Value("${bms.modbus.port}")
    private int port;

    /**
     * Modbus主站
     */
    private ModbusMaster master;

    @Override
    public void reset() throws Exception {
        if (master != null) {
            master.destroy();
        }

        IpParameters params = new IpParameters();
        params.setHost(host);
        params.setPort(port);
        master = new ModbusFactory().createTcpMaster(params, true);
    }

    @Override
    public byte readByte(int salveId, int functionCode, int start) throws Exception {
        byte[] array = readData(salveId, functionCode, start, 1).peekAll();
        return array[0];
    }

    @Override
    public int readInteger(int salveId, int functionCode, int start) throws Exception {
        byte[] array = readData(salveId, functionCode, start, 2).popAll();
        ArrayUtils.reverse(array);
        return ByteBuffer.wrap(array).order(ByteOrder.LITTLE_ENDIAN).getInt();
    }

    @Override
    public float readFloat(int salveId, int functionCode, int start) throws Exception {
        byte[] array = readData(salveId, functionCode, start, 2).popAll();
        ArrayUtils.reverse(array);
        return ByteBuffer.wrap(array).order(ByteOrder.LITTLE_ENDIAN).getFloat();
    }

    @Override
    public void destroy() throws Exception {
        if (master != null) {
            master.destroy();
        }
    }

    /**
     * 读取数据
     *
     * @param salveId      从站索引
     * @param functionCode 功能码
     * @param start        起始地址
     * @param length       长度
     * @return 数据
     * @throws Exception
     */
    private ByteQueue readData(int salveId, int functionCode, int start, int length) throws Exception {
        if (master == null) {
            reset();
        }

        ModbusRequest request;
        ModbusResponse response;

        switch (functionCode) {
            case 2:
                request = new ReadDiscreteInputsRequest(salveId, start, length);
                response = master.send(request);
                break;
            case 3:
                request = new ReadHoldingRegistersRequest(salveId, start, length);
                response = master.send(request);
                break;
            default:
                throw new UnsupportedOperationException();
        }

        ByteQueue byteQueue = new ByteQueue(3 + length);
        response.write(byteQueue);
        byteQueue.pop(3);

        return byteQueue;
    }
}
