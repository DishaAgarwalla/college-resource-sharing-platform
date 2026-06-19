package com.college.resource.service;

import com.college.resource.entity.Category;
import com.college.resource.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository repository;

    public CategoryService(CategoryRepository repository) {
        this.repository = repository;
    }

    public List<Category> getAllCategories() {
        return repository.findAll();
    }

    public Category save(Category category) {
        return repository.save(category);
    }

    public Category getCategoryById(Long id) {
        return repository.findById(id).orElse(null);
    }
}