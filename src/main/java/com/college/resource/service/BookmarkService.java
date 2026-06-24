package com.college.resource.service;

import com.college.resource.entity.Bookmark;
import com.college.resource.repository.BookmarkRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookmarkService {

    private final BookmarkRepository repository;

    public BookmarkService(BookmarkRepository repository) {
        this.repository = repository;
    }

    public Bookmark save(Bookmark bookmark) {

        Bookmark existing =
                repository.findByUserIdAndResourceId(
                        bookmark.getUser().getId(),
                        bookmark.getResource().getId());

        if (existing != null) {
            return existing;
        }

        return repository.save(bookmark);
    }

    public List<Bookmark> getBookmarksByUser(
            Long userId) {

        return repository.findByUserId(userId);
    }

    public void deleteBookmark(Long id) {
        repository.deleteById(id);
    }
}