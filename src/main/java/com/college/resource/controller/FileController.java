package com.college.resource.controller;

import com.college.resource.service.FileStorageService;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/files")
public class FileController {

    private final FileStorageService fileStorageService;

    public FileController(
            FileStorageService fileStorageService) {

        this.fileStorageService =
                fileStorageService;
    }

    @GetMapping("/view/{fileName:.+}")
    public ResponseEntity<Resource> viewFile(
            @PathVariable String fileName)
            throws Exception {

        Resource resource =
                fileStorageService
                        .loadFileAsResource(
                                fileName);

        return ResponseEntity.ok()
                .contentType(
                        MediaType.APPLICATION_PDF)
                .body(resource);
    }

    @GetMapping("/download/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(
            @PathVariable String fileName)
            throws Exception {

        Resource resource =
                fileStorageService
                        .loadFileAsResource(
                                fileName);

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\""
                                + resource.getFilename()
                                + "\"")
                .contentType(
                        MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);
    }
}