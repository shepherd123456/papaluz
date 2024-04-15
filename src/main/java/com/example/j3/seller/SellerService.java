package com.example.j3.seller;

import com.example.j3.product.Product;

import java.util.List;
import java.util.UUID;

public interface SellerService {
    Seller save(Seller seller);

    Seller getByEmail(String email);

    List<Product> getProducts(String email);

    List<Product> getProductsByCategory(String email, String category);
}
