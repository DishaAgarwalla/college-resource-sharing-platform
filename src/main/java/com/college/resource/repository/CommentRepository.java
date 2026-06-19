package com.college.resource.repository;

import com.college.resource.entity.Comment;
import com.college.resource.entity.Resource;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository
        extends JpaRepository<Comment, Long> {

    List<Comment> findByResource(Resource resource);
}