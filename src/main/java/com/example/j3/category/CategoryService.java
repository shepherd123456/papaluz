package com.example.j3.category;

public interface CategoryService {
    Category save(Category category);

    Category getByName(String name);

    void deleteIfNoAssociation(String catName);
}
