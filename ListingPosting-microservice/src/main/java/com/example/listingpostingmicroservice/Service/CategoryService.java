package com.example.listingpostingmicroservice.Service;

import com.example.listingpostingmicroservice.Model.Category;
import com.example.listingpostingmicroservice.Repository.CategoryRepository;
import com.example.listingpostingmicroservice.Service.Interfaces.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryService implements ICategoryService {


    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Optional<Category> getCategoryById(String id) {
        return categoryRepository.findById(id);
    }

    @Override
    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public void deleteCategory(String id) {
        categoryRepository.deleteById(id);
    }

    @Override
    public Category updateCategory(String id, Category updatedCategory) {
        Optional<Category> optionalCategory = categoryRepository.findById(id);
        if (optionalCategory.isPresent()) {
            Category existingCategory = optionalCategory.get();
            // Update only the fields that are not null in the updatedCategory
            if (updatedCategory.getName() != null && !updatedCategory.getName().equals(existingCategory.getName())) {
                existingCategory.setName(updatedCategory.getName());
            }
            if (updatedCategory.getDescription() != null && !updatedCategory.getDescription().equals(existingCategory.getDescription())) {
                existingCategory.setDescription(updatedCategory.getDescription());
            }
            return categoryRepository.save(existingCategory);
        }
        return null; // Or handle however you want if category doesn't exist
    }

    @Override
    public List<Category> findCategoryByName(String text) {
        List<Category> categories = categoryRepository.findCategoriesByNameContaining(text);
        // Sort the categories by name in ascending order
        categories.sort(Comparator.comparing(Category::getName));
        return categories;
    }
}
