package com.etrita.bms.demo.board.communications;

import com.furongsoft.core.misc.Tracker;
import com.serotonin.modbus4j.ModbusFactory;
import com.serotonin.modbus4j.ModbusMaster;
import com.serotonin.modbus4j.ip.IpParameters;
import com.serotonin.modbus4j.msg.ModbusRequest;
import com.serotonin.modbus4j.msg.ModbusResponse;
import com.serotonin.modbus4j.msg.ReadDiscreteInputsRequest;
import com.serotonin.modbus4j.msg.ReadHoldingRegistersRequest;
import com.serotonin.modbus4j.sero.util.queue.ByteQueue;
import org.apache.commons.codec.binary.Hex;
import org.apache.commons.lang3.ArrayUtils;
import org.springframework.beans.factory.DisposableBean;

import java.nio.ByteBuffer;
import java.nio.ByteOrder;

/**
 * ModbusTcp数据读取器
 */
public class ModbusTcpDataReader implements IDataReader, DisposableBean {
    /**
     * ModbusTcp从站IP地址
     */
    private String host;

    /**
     * ModbusTcp从站端口
     */
    private int port;

    /**
     * Modbus主站
     */
    private ModbusMaster master;

    public ModbusTcpDataReader(String host, int port) {
        this.host = host;
        this.port = port;
    }

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
        byte[] data = readData(salveId, functionCode, start, 1).peekAll();
        Tracker.info(String.format("[%s:%d] %d, %d, %d: %s", host, port, salveId, functionCode, start, Hex.encodeHexString(data)));

        return data[0];
    }

    @Override
    public int readInteger(int salveId, int functionCode, int start) throws Exception {
        byte[] data = readData(salveId, functionCode, start, 2).popAll();
        ArrayUtils.reverse(data);
        Tracker.info(String.format("[%s:%d] %d, %d, %d: %s", host, port, salveId, functionCode, start, Hex.encodeHexString(data)));

        return ByteBuffer.wrap(data).order(ByteOrder.LITTLE_ENDIAN).getInt();
    }

    @Override
    public float readFloat(int salveId, int functionCode, int start) throws Exception {
        byte[] data = readData(salveId, functionCode, start, 2).popAll();
        ArrayUtils.reverse(data);
        Tracker.info(String.format("[%s:%d] %d, %d, %d: %s", host, port, salveId, functionCode, start, Hex.encodeHexString(data)));

        return ByteBuffer.wrap(data).order(ByteOrder.LITTLE_ENDIAN).getFloat();
    }

    @Override
    public byte[] read(int salveId, int functionCode, int start, int length) throws Exception {
        ByteBuffer buffer = ByteBuffer.allocate(length * 2);
        while (length > 120) {
            int count = Math.min(length, 120);
            byte[] data = readData(salveId, functionCode, start, count).popAll();
            buffer.put(data);

            start += count;
            length -= count;
        }

        buffer.flip();
        return buffer.array();
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
