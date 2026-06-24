package com.college.resource.service;

import com.college.resource.dto.DashboardDTO;
import com.college.resource.dto.UserDashboardDTO;
import com.college.resource.entity.Resource;
import com.college.resource.repository.BookmarkRepository;
import com.college.resource.repository.CategoryRepository;
import com.college.resource.repository.RatingRepository;
import com.college.resource.repository.ResourceRepository;
import com.college.resource.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DashboardService {

    private final UserRepository userRepository;
    private final ResourceRepository resourceRepository;
    private final CategoryRepository categoryRepository;
    private final BookmarkRepository bookmarkRepository;
    private final RatingRepository ratingRepository;

    public DashboardService(
            UserRepository userRepository,
            ResourceRepository resourceRepository,
            CategoryRepository categoryRepository,
            BookmarkRepository bookmarkRepository,
            RatingRepository ratingRepository) {

        this.userRepository = userRepository;
        this.resourceRepository = resourceRepository;
        this.categoryRepository = categoryRepository;
        this.bookmarkRepository = bookmarkRepository;
        this.ratingRepository = ratingRepository;
    }

    public DashboardDTO getDashboardData() {

        DashboardDTO dashboard = new DashboardDTO();

        dashboard.setTotalUsers(
                userRepository.count());

        dashboard.setTotalResources(
                resourceRepository.count());

        dashboard.setTotalCategories(
                categoryRepository.count());

        dashboard.setTotalBookmarks(
                bookmarkRepository.count());

        return dashboard;
    }

    public UserDashboardDTO getUserDashboard(
            Long userId) {

        UserDashboardDTO dashboard =
                new UserDashboardDTO();

        dashboard.setMyUploads(
                resourceRepository.countByUserId(
                        userId));

        dashboard.setMyBookmarks(
                bookmarkRepository.countByUserId(
                        userId));

        dashboard.setMyRatings(
                ratingRepository.countByUserId(
                        userId));

        List<Resource> resources =
                resourceRepository.findByUserId(
                        userId);

        long totalDownloads = 0;

        for (Resource resource : resources) {

            if (resource.getDownloadCount()
                    != null) {

                totalDownloads +=
                        resource.getDownloadCount();
            }
        }

        dashboard.setMyDownloads(
                totalDownloads);

        return dashboard;
    }
}