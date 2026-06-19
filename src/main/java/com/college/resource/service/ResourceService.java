package com.college.resource.service;

import com.college.resource.dto.ResourceUploadRequest;
import com.college.resource.entity.Category;
import com.college.resource.entity.Rating;
import com.college.resource.entity.Resource;
import com.college.resource.entity.User;
import com.college.resource.repository.CategoryRepository;
import com.college.resource.repository.RatingRepository;
import com.college.resource.repository.ResourceRepository;
import com.college.resource.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResourceService {

    private final ResourceRepository repository;
    private final RatingRepository ratingRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    public ResourceService(
            ResourceRepository repository,
            RatingRepository ratingRepository,
            UserRepository userRepository,
            CategoryRepository categoryRepository) {

        this.repository = repository;
        this.ratingRepository = ratingRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<Resource> getAllResources() {
        return repository.findAll();
    }

    public Resource getResourceById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public List<Resource> getResourcesBySubject(String subject) {
        return repository.findBySubjectIgnoreCase(subject);
    }

    public List<Resource> getResourcesByUser(Long userId) {
        return repository.findByUserId(userId);
    }

    public List<Resource> getResourcesByCategory(Long categoryId) {
        return repository.findByCategoryId(categoryId);
    }

    public List<Resource> getApprovedResources() {
        return repository.findByStatus("APPROVED");
    }

    public List<Resource> searchResources(String keyword) {

        return repository
                .findByTitleContainingIgnoreCaseOrSubjectContainingIgnoreCase(
                        keyword,
                        keyword);
    }

    public Resource approveResource(Long id) {

        Resource resource = getResourceById(id);

        if (resource == null) {
            return null;
        }

        resource.setStatus("APPROVED");

        return repository.save(resource);
    }

    public Resource downloadResource(Long id) {

        Resource resource = getResourceById(id);

        if (resource == null) {
            return null;
        }

        if (resource.getDownloadCount() == null) {
            resource.setDownloadCount(0);
        }

        resource.setDownloadCount(
                resource.getDownloadCount() + 1);

        return repository.save(resource);
    }

    public List<Resource> getTopDownloads() {
        return repository.findAllByOrderByDownloadCountDesc();
    }

    public List<Resource> getTopRatedResources() {
        return repository.findAllByOrderByAverageRatingDesc();
    }

    public void updateRating(Long resourceId) {

        Resource resource =
                getResourceById(resourceId);

        if (resource == null) {
            return;
        }

        List<Rating> ratings =
                ratingRepository.findByResourceId(
                        resourceId);

        if (ratings.isEmpty()) {

            resource.setAverageRating(0.0);
            resource.setTotalRatings(0);

            repository.save(resource);
            return;
        }

        double total = 0;

        for (Rating rating : ratings) {
            total += rating.getRatingValue();
        }

        double average =
                total / ratings.size();

        resource.setAverageRating(average);
        resource.setTotalRatings(ratings.size());

        repository.save(resource);
    }

    public Resource createUploadedResource(
            ResourceUploadRequest request,
            String fileUrl) {

        User user =
                userRepository.findById(
                        request.getUserId())
                        .orElse(null);

        Category category =
                categoryRepository.findById(
                        request.getCategoryId())
                        .orElse(null);

        if (user == null || category == null) {
            return null;
        }

        Resource resource = new Resource();

        resource.setTitle(request.getTitle());
        resource.setSubject(request.getSubject());
        resource.setFileUrl(fileUrl);

        resource.setUser(user);
        resource.setCategory(category);

        resource.setStatus("PENDING");
        resource.setDownloadCount(0);
        resource.setAverageRating(0.0);
        resource.setTotalRatings(0);

        return repository.save(resource);
    }

    public Resource save(Resource resource) {

        if (resource.getStatus() == null) {
            resource.setStatus("PENDING");
        }

        if (resource.getDownloadCount() == null) {
            resource.setDownloadCount(0);
        }

        if (resource.getAverageRating() == null) {
            resource.setAverageRating(0.0);
        }

        if (resource.getTotalRatings() == null) {
            resource.setTotalRatings(0);
        }

        return repository.save(resource);
    }

    public void deleteResource(Long id) {
        repository.deleteById(id);
    }
}