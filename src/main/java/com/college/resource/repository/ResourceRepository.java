package com.college.resource.repository;

import com.college.resource.entity.Resource;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResourceRepository
        extends JpaRepository<Resource, Long> {

    List<Resource> findBySubjectIgnoreCase(String subject);

    List<Resource> findByUserId(Long userId);

    long countByUserId(Long userId);

    List<Resource> findByCategoryId(Long categoryId);

    List<Resource> findByStatus(String status);

    List<Resource> findAllByOrderByDownloadCountDesc();

    List<Resource> findAllByOrderByAverageRatingDesc();

    List<Resource> findByTitleContainingIgnoreCaseOrSubjectContainingIgnoreCase(
            String title,
            String subject
    );
}