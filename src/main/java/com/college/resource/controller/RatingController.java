package com.college.resource.controller;

import com.college.resource.entity.Rating;
import com.college.resource.service.RatingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ratings")
public class RatingController {

    private final RatingService service;

    public RatingController(
            RatingService service) {

        this.service = service;
    }

    @PostMapping
    public Rating addRating(
            @RequestBody Rating rating) {

        return service.save(rating);
    }

    @GetMapping("/resource/{resourceId}")
    public List<Rating> getRatingsByResource(
            @PathVariable Long resourceId) {

        return service.getRatingsByResource(
                resourceId);
    }

    @GetMapping("/user/{userId}")
    public List<Rating> getRatingsByUser(
            @PathVariable Long userId) {

        return service.getRatingsByUser(
                userId);
    }
}