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
     * 获取主视图数据
     *
     * @return 主视图数据
     */
    @GetMapping("/main")
    public RestResponse main() {
        return new RestResponse(200, null, this.emsDaemon.getMain());
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
}
