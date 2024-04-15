package com.example.j3.productimage;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {
    boolean existsByFilename(String filename);
    void deleteByFilename(String filename);
    void deleteByIdIn(List<Long> ids);
    @Query("SELECT pi.filename FROM ProductImage pi WHERE pi.filename LIKE CONCAT(:uuidStr, '_', :primeMark, '%')")
    String selectPrimaryFilename(@Param("uuidStr") String uuidStr, @Param("primeMark") String primeMark);
    @Modifying
    @Query("INSERT INTO ProductImage (filename, product) SELECT :imgFilename, p FROM Product p WHERE p.uuid = :uuid")
    void saveByProduct(@Param("imgFilename") String imgFilename, @Param("uuid") UUID uuid);
    @Query("SELECT MAX(pi.id) FROM ProductImage pi WHERE pi.product.uuid = :uuid")
    Long getLatestIdByProduct(@Param("uuid") UUID uuid);
}
