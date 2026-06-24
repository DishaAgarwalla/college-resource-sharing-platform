package com.college.resource.controller;

import com.college.resource.dto.ResourceUploadRequest;
import com.college.resource.dto.ResourceUploadResponse;
import com.college.resource.entity.Resource;
import com.college.resource.service.FileStorageService;
import com.college.resource.service.ResourceService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/resources")
public class ResourceController {

    private final ResourceService service;
    private final FileStorageService fileStorageService;

    public ResourceController(
            ResourceService service,
            FileStorageService fileStorageService) {

        this.service = service;
        this.fileStorageService = fileStorageService;
    }

    @GetMapping("/test")
    public String test() {
        return "RESOURCE API WORKING";
    }

    @GetMapping
    public List<Resource> getAllResources() {
        return service.getAllResources();
    }

    @GetMapping("/{id}")
    public Resource getResourceById(
            @PathVariable Long id) {

        return service.getResourceById(id);
    }

    @GetMapping("/search")
    public List<Resource> searchResources(
            @RequestParam String keyword) {

        return service.searchResources(keyword);
    }

    @GetMapping("/subject/{subject}")
    public List<Resource> getResourcesBySubject(
            @PathVariable String subject) {

        return service.getResourcesBySubject(subject);
    }

    @GetMapping("/user/{userId}")
    public List<Resource> getResourcesByUser(
            @PathVariable Long userId) {

        return service.getResourcesByUser(userId);
    }

    @GetMapping("/category/{categoryId}")
    public List<Resource> getResourcesByCategory(
            @PathVariable Long categoryId) {

        return service.getResourcesByCategory(categoryId);
    }

    @GetMapping("/approved")
    public List<Resource> getApprovedResources() {

        return service.getApprovedResources();
    }

    @GetMapping("/top-downloads")
    public List<Resource> getTopDownloads() {

        return service.getTopDownloads();
    }

    @PutMapping("/approve/{id}")
    public Resource approveResource(
            @PathVariable Long id) {

        return service.approveResource(id);
    }

    @PostMapping("/download/{id}")
    public Resource downloadResource(
            @PathVariable Long id) {

        return service.downloadResource(id);
    }

    @PostMapping
    public Resource addResource(
            @RequestBody Resource resource) {

        return service.save(resource);
    }

    @PostMapping("/upload")
    public ResourceUploadResponse uploadFile(

            @RequestParam("file")
            MultipartFile file,

            @RequestParam("title")
            String title,

            @RequestParam("subject")
            String subject,

            @RequestParam("categoryId")
            Long categoryId,

            @RequestParam("userId")
            Long userId) {

        try {

            String fileName =
                    fileStorageService.storeFile(file);

            String fileUrl =
                    "/uploads/" + fileName;

            ResourceUploadRequest request =
                    new ResourceUploadRequest();

            request.setTitle(title);
            request.setSubject(subject);
            request.setCategoryId(categoryId);
            request.setUserId(userId);

            Resource resource =
                    service.createUploadedResource(
                            request,
                            fileUrl);

            if (resource == null) {

                return new ResourceUploadResponse(
                        "Invalid User Or Category",
                        null);
            }

            return new ResourceUploadResponse(
                    "File Uploaded Successfully",
                    fileUrl);

        } catch (Exception e) {

            return new ResourceUploadResponse(
                    "Upload Failed",
                    null);
        }
    }

    @PutMapping("/{id}")
    public Resource updateResource(
            @PathVariable Long id,
            @RequestBody Resource updatedResource) {

        Resource resource =
                service.getResourceById(id);

        if (resource == null) {
            return null;
        }

        resource.setTitle(updatedResource.getTitle());
        resource.setSubject(updatedResource.getSubject());
        resource.setFileUrl(updatedResource.getFileUrl());
        resource.setCategory(updatedResource.getCategory());
        resource.setUser(updatedResource.getUser());
        resource.setStatus(updatedResource.getStatus());
        resource.setDownloadCount(updatedResource.getDownloadCount());
        resource.setAverageRating(updatedResource.getAverageRating());
        resource.setTotalRatings(updatedResource.getTotalRatings());

        return service.save(resource);
    }

    @DeleteMapping("/{id}")
    public String deleteResource(
            @PathVariable Long id) {

        Resource resource =
                service.getResourceById(id);

        if (resource == null) {
            return "Resource Not Found";
        }

        service.deleteResource(id);

        return "Resource Deleted Successfully";
    }
}