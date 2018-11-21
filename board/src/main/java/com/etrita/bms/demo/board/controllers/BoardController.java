package com.etrita.bms.demo.board.controllers;

import com.etrita.bms.demo.board.daemons.EmsDaemon;
import com.etrita.bms.demo.board.entities.Overview;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
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
    public Overview overview() {
        return this.emsDaemon.getOverview();
    }
}
