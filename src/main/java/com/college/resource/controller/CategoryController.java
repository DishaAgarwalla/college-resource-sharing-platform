package com.college.resource.controller;

import com.college.resource.entity.Category;
import com.college.resource.service.CategoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    private final CategoryService service;

    public CategoryController(CategoryService service) {
        this.service = service;
    }

    @GetMapping
    public List<Category> getAllCategories() {
        return service.getAllCategories();
    }

    @PostMapping
    public Category addCategory(
            @RequestBody Category category) {

        return service.save(category);
    }
}