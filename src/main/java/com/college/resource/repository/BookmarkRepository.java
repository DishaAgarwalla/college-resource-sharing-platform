package com.college.resource.repository;

import com.college.resource.entity.Bookmark;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookmarkRepository
        extends JpaRepository<Bookmark, Long> {

    List<Bookmark> findByUserId(Long userId);

    Bookmark findByUserIdAndResourceId(
            Long userId,
            Long resourceId);

    long countByUserId(Long userId);
}