package com.example.j3.productimage;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ProductImageServiceImpl implements ProductImageService{
    @Autowired
    private ProductImageRepository productImageRepository;

    @Override
    public boolean existsByFilename(String filename) {
        return productImageRepository.existsByFilename(filename);
    }

    @Override
    @Transactional
    public void deleteByFilename(String filename) {
        productImageRepository.deleteByFilename(filename);
    }

    @Override
    @Transactional
    public void deleteByIds(List<Long> ids) {
        productImageRepository.deleteByIdIn(ids);
    }

    @Override
    public String selectPrimaryFilename(String uuidStr, String primeMark) {
        return productImageRepository.selectPrimaryFilename(uuidStr, primeMark);
    }

    @Override
    @Transactional
    public void saveByProduct(String imgFilename, UUID uuid) {
        productImageRepository.saveByProduct(imgFilename, uuid);
    }

    @Override
    public Long getLatestIdByProduct(UUID uuid) {
        return productImageRepository.getLatestIdByProduct(uuid);
    }
}
