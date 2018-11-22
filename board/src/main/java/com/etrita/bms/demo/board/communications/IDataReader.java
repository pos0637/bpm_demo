package com.etrita.bms.demo.board.communications;

/**
 * 数据读取器接口
 *
 * @author Alex
 */
public interface IDataReader {
    /**
     * 重置
     *
     * @throws Exception
     */
    void reset() throws Exception;

    /**
     * 读取数据
     *
     * @param salveId      从站索引
     * @param functionCode 功能码
     * @param start        起始地址
     * @return 数据
     * @throws Exception
     */
    byte readByte(int salveId, int functionCode, int start) throws Exception;

    /**
     * 读取数据
     *
     * @param salveId      从站索引
     * @param functionCode 功能码
     * @param start        起始地址
     * @return 数据
     * @throws Exception
     */
    int readInteger(int salveId, int functionCode, int start) throws Exception;

    /**
     * 读取数据
     *
     * @param salveId      从站索引
     * @param functionCode 功能码
     * @param start        起始地址
     * @return 数据
     * @throws Exception
     */
    float readFloat(int salveId, int functionCode, int start) throws Exception;
}
