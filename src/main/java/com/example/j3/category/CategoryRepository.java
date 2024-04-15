package com.example.j3.category;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Category findByName(String name);
    @Modifying
    @Query("DELETE FROM Category c WHERE c.name = :categoryName AND c.sellerCategories IS EMPTY")
    void deleteIfNoAssociation(@Param("categoryName") String categoryName);
}
