package com.etrita.bms.demo.board.controllers;

import com.etrita.bms.demo.board.daemons.EmsDaemon;
import com.furongsoft.core.entities.RestResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/board")
public class BoardController {
    private EmsDaemon emsDaemon;

    @Autowired
    public BoardController(EmsDaemon emsDaemon) {
        this.emsDaemon = emsDaemon;
    }

    /**
     * 获取预览视图数据
     *
     * @return 预览视图数据
     */
    @GetMapping("/overview")
    public RestResponse overview() {
        return new RestResponse(200, null, this.emsDaemon.getOverview());
    }

    /**
     * 获取PCS视图数据
     *
     * @return PCS视图数据
     */
    @GetMapping("/pcs")
    public RestResponse pcs() {
        return new RestResponse(200, null, this.emsDaemon.getPcs());
    }

    /**
     * 获取负载视图数据
     *
     * @return 负载视图数据
     */
    @GetMapping("/load")
    public RestResponse load() {
        return new RestResponse(200, null, this.emsDaemon.getLoad());
    }

    /**
     * 获取变压器视图数据
     *
     * @return 变压器视图数据
     */
    @GetMapping("/transformer")
    public RestResponse transformer() {
        return new RestResponse(200, null, this.emsDaemon.getTransformer());
    }

    /**
     * 获取BMS视图数据
     *
     * @return BMS视图数据
     */
    @GetMapping("/bms")
    public RestResponse bms() {
        return new RestResponse(200, null, this.emsDaemon.getBms());
    }

    /**
     * 获取空调视图数据
     *
     * @return 空调视图数据
     */
    @GetMapping("/air")
    public RestResponse air() {
        return new RestResponse(200, null, this.emsDaemon.getAir());
    }
}
