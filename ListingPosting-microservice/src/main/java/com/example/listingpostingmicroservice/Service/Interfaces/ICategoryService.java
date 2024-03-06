package com.example.listingpostingmicroservice.Service.Interfaces;

import com.example.listingpostingmicroservice.Model.Category;

import java.util.List;
import java.util.Optional;

public interface ICategoryService {
    List<Category> getAllCategories();

    Optional<Category> getCategoryById(String id);

    Category createCategory(Category category);

    void deleteCategory(String id);

    Category updateCategory(String id, Category category);

    List<Category> findCategoryByName(String text);
}
