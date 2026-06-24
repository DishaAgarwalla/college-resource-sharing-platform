package com.college.resource.dto;

public class ResourceUploadResponse {

    private String message;
    private String fileUrl;

    public ResourceUploadResponse() {
    }

    public ResourceUploadResponse(
            String message,
            String fileUrl) {

        this.message = message;
        this.fileUrl = fileUrl;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(
            String message) {
        this.message = message;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public void setFileUrl(
            String fileUrl) {
        this.fileUrl = fileUrl;
    }
}