package com.college.resource.service;

import com.college.resource.entity.Rating;
import com.college.resource.repository.RatingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RatingService {

    private final RatingRepository repository;
    private final ResourceService resourceService;

    public RatingService(
            RatingRepository repository,
            ResourceService resourceService) {

        this.repository = repository;
        this.resourceService = resourceService;
    }

    public Rating save(Rating rating) {

        Rating existing =
                repository.findByResourceIdAndUserId(
                        rating.getResource().getId(),
                        rating.getUser().getId());

        if (existing != null) {

            existing.setRatingValue(
                    rating.getRatingValue());

            Rating updated =
                    repository.save(existing);

            resourceService.updateRating(
                    rating.getResource().getId());

            return updated;
        }

        Rating saved =
                repository.save(rating);

        resourceService.updateRating(
                rating.getResource().getId());

        return saved;
    }

    public List<Rating> getRatingsByResource(
            Long resourceId) {

        return repository.findByResourceId(
                resourceId);
    }

    public List<Rating> getRatingsByUser(
            Long userId) {

        return repository.findByUserId(
                userId);
    }
}