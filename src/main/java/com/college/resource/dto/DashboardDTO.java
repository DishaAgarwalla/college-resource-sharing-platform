package com.college.resource.dto;

public class DashboardDTO {

    private Long totalUsers;
    private Long totalResources;
    private Long totalCategories;
    private Long totalBookmarks;

    public Long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(Long totalUsers) {
        this.totalUsers = totalUsers;
    }

    public Long getTotalResources() {
        return totalResources;
    }

    public void setTotalResources(Long totalResources) {
        this.totalResources = totalResources;
    }

    public Long getTotalCategories() {
        return totalCategories;
    }

    public void setTotalCategories(Long totalCategories) {
        this.totalCategories = totalCategories;
    }

    public Long getTotalBookmarks() {
        return totalBookmarks;
    }

    public void setTotalBookmarks(Long totalBookmarks) {
        this.totalBookmarks = totalBookmarks;
    }
}