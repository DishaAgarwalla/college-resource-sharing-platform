package com.college.resource.controller;

import com.college.resource.entity.Bookmark;
import com.college.resource.service.BookmarkService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bookmarks")
public class BookmarkController {

    private final BookmarkService service;

    public BookmarkController(
            BookmarkService service) {

        this.service = service;
    }

    @PostMapping
    public Bookmark addBookmark(
            @RequestBody Bookmark bookmark) {

        return service.save(bookmark);
    }

    @GetMapping("/user/{userId}")
    public List<Bookmark> getBookmarksByUser(
            @PathVariable Long userId) {

        return service.getBookmarksByUser(userId);
    }

    @DeleteMapping("/{id}")
    public String deleteBookmark(
            @PathVariable Long id) {

        service.deleteBookmark(id);

        return "Bookmark Deleted Successfully";
    }
}