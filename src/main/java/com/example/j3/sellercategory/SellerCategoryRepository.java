package com.example.j3.sellercategory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SellerCategoryRepository extends JpaRepository<SellerCategory, SellerCategoryPK> {

    @Query("SELECT sc FROM SellerCategory sc WHERE sc.seller.user.email = :email AND sc.category.name = :categoryName")
    SellerCategory find(@Param("email") String email, @Param("categoryName") String categoryName);

    @Modifying
    @Query(nativeQuery = true,
            value = "UPDATE category " +
                    "SET name = :newName " +
                    "WHERE id IN (SELECT sc.category_id " +
                    "FROM seller_categories sc " +
                    "JOIN seller s ON s.id = sc.seller_id " +
                    "JOIN app_user u ON u.id = s.id " +
                    "WHERE u.email = :email AND sc.category_id = category.id AND category.name = :oldName)")
    void update(@Param("email") String email, @Param("oldName") String oldName, @Param("newName") String newName);

    @Modifying
    @Query("DELETE FROM SellerCategory sc WHERE sc.category.name = :categoryName AND sc.seller.user.email = :email")
    void delete(@Param("email") String email, @Param("categoryName") String categoryName);
}
