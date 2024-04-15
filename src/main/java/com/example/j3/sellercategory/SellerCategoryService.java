package com.example.j3.sellercategory;

public interface SellerCategoryService {
    SellerCategory find(String email, String catName);
    SellerCategory save(SellerCategory sellerCategory);
    void update(String email, String oldName, String newName);
    void delete(String email, String catName);
}
