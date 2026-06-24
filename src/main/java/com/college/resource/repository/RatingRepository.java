package com.college.resource.repository;

import com.college.resource.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RatingRepository
        extends JpaRepository<Rating, Long> {

    List<Rating> findByResourceId(Long resourceId);

    List<Rating> findByUserId(Long userId);

    Rating findByResourceIdAndUserId(
            Long resourceId,
            Long userId);

    long countByUserId(Long userId);
}