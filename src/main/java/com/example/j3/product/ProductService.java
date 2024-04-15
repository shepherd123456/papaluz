package com.example.j3.product;

import java.util.List;
import java.util.UUID;

public interface ProductService {
    Product save(Product product);
    boolean existsByUuid(UUID uuid);
    List<Product> getAll();
    Product getByUuid(UUID uuid);
    void delete(Product product);
    void deleteByIds(List<Long> ids);
    void deleteByUuid(UUID uuid);
}
