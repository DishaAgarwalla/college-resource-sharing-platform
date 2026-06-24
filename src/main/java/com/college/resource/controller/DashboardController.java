package com.college.resource.controller;

import com.college.resource.dto.DashboardDTO;
import com.college.resource.dto.UserDashboardDTO;
import com.college.resource.service.DashboardService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(
            DashboardService dashboardService) {

        this.dashboardService = dashboardService;
    }

    @GetMapping
    public DashboardDTO getDashboard() {

        return dashboardService.getDashboardData();
    }

    @GetMapping("/user/{userId}")
    public UserDashboardDTO getUserDashboard(
            @PathVariable Long userId) {

        return dashboardService
                .getUserDashboard(userId);
    }
}