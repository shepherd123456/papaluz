package com.example.j3.product;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ProductRepository extends JpaRepository<Product, Long> {
    boolean existsByUuid(UUID uuid);
    Product findByUuid(UUID uuid);
    void deleteByUuid(UUID uuid);
    void deleteByIdIn(List<Long> ids);
}
