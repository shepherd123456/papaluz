package com.example.j3.product;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {
    private ProductRepository productRepository;

    @Override
    public Product save(Product product) {
        return productRepository.save(product);
    }

    @Override
    public boolean existsByUuid(UUID uuid) {
        return productRepository.existsByUuid(uuid);
    }

    @Override
    public List<Product> getAll() {
        return productRepository.findAll();
    }

    @Override
    public Product getByUuid(UUID uuid) {
        return productRepository.findByUuid(uuid);
    }

    @Override
    public void delete(Product product) {
        productRepository.delete(product);
    }

    @Override
    @Transactional
    public void deleteByIds(List<Long> ids) {
        productRepository.deleteByIdIn(ids);
    }

    @Override
    public void deleteByUuid(UUID uuid) {
        productRepository.deleteByUuid(uuid);
    }
}
