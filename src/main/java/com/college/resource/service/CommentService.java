package com.college.resource.service;

import com.college.resource.entity.Comment;
import com.college.resource.entity.Resource;
import com.college.resource.entity.User;
import com.college.resource.repository.CommentRepository;
import com.college.resource.repository.ResourceRepository;
import com.college.resource.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final ResourceRepository resourceRepository;
    private final UserRepository userRepository;

    public CommentService(
            CommentRepository commentRepository,
            ResourceRepository resourceRepository,
            UserRepository userRepository) {

        this.commentRepository = commentRepository;
        this.resourceRepository = resourceRepository;
        this.userRepository = userRepository;
    }

    public Comment addComment(
            Long resourceId,
            Long userId,
            String content) {

        Resource resource =
                resourceRepository.findById(resourceId)
                        .orElse(null);

        User user =
                userRepository.findById(userId)
                        .orElse(null);

        if (resource == null || user == null) {
            return null;
        }

        Comment comment =
                new Comment(
                        content,
                        resource,
                        user);

        return commentRepository.save(comment);
    }

    public List<Comment> getCommentsByResource(
            Long resourceId) {

        Resource resource =
                resourceRepository.findById(resourceId)
                        .orElse(null);

        if (resource == null) {
            return List.of();
        }

        return commentRepository.findByResource(resource);
    }

    public void deleteComment(Long id) {
        commentRepository.deleteById(id);
    }
}