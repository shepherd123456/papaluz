package com.example.j3.seller;

import com.example.j3.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface SellerRepository extends JpaRepository<Seller, Long> {
    @Query("SELECT s FROM Seller s where s.user.email = :email")
    Seller getByEmail(@Param("email") String email);

    @Query("SELECT s.products FROM Seller s JOIN s.user u WHERE u.email = :email")
    List<Product> getProductsBySeller(@Param("email") String email);

    @Query("SELECT p FROM Product p WHERE p.category.name = :categoryName AND p.seller.user.email = :email")
    List<Product> getProductsBySellerAndCategory(@Param("email") String email, @Param("categoryName") String categoryName);
}
