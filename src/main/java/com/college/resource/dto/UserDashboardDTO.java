package com.college.resource.dto;

public class UserDashboardDTO {

    private Long myUploads;
    private Long myBookmarks;
    private Long myRatings;
    private Long myDownloads;

    public UserDashboardDTO() {
    }

    public Long getMyUploads() {
        return myUploads;
    }

    public void setMyUploads(Long myUploads) {
        this.myUploads = myUploads;
    }

    public Long getMyBookmarks() {
        return myBookmarks;
    }

    public void setMyBookmarks(Long myBookmarks) {
        this.myBookmarks = myBookmarks;
    }

    public Long getMyRatings() {
        return myRatings;
    }

    public void setMyRatings(Long myRatings) {
        this.myRatings = myRatings;
    }

    public Long getMyDownloads() {
        return myDownloads;
    }

    public void setMyDownloads(Long myDownloads) {
        this.myDownloads = myDownloads;
    }
}