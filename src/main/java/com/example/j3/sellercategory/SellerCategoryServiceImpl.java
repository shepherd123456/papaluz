package com.example.j3.sellercategory;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SellerCategoryServiceImpl implements SellerCategoryService {
    @Autowired
    private SellerCategoryRepository sellerCategoryRepository;

    @Override
    public SellerCategory find(String email, String catName) {
        return sellerCategoryRepository.find(email, catName);
    }

    @Override
    public SellerCategory save(SellerCategory sellerCategory) {
        return sellerCategoryRepository.save(sellerCategory);
    }

    @Override
    @Transactional
    public void update(String email, String oldName, String newName) {
        sellerCategoryRepository.update(email, oldName, newName);
    }

    @Override
    @Transactional
    public void delete(String email, String catName) {
        sellerCategoryRepository.delete(email, catName);
    }
}
