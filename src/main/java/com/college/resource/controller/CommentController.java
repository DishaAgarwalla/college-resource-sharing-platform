package com.college.resource.controller;

import com.college.resource.dto.CommentRequest;
import com.college.resource.entity.Comment;
import com.college.resource.service.CommentService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
public class CommentController {

    private final CommentService service;

    public CommentController(
            CommentService service) {

        this.service = service;
    }

    @PostMapping
    public Comment addComment(
            @RequestBody CommentRequest request) {

        return service.addComment(
                request.getResourceId(),
                request.getUserId(),
                request.getContent());
    }

    @GetMapping("/resource/{resourceId}")
    public List<Comment> getComments(
            @PathVariable Long resourceId) {

        return service.getCommentsByResource(
                resourceId);
    }

    @DeleteMapping("/{id}")
    public String deleteComment(
            @PathVariable Long id) {

        service.deleteComment(id);

        return "Comment Deleted Successfully";
    }
}