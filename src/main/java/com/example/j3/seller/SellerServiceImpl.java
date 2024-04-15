package com.example.j3.seller;

import com.example.j3.product.Product;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class SellerServiceImpl implements SellerService {
    private SellerRepository sellerRepository;
    @Override
    public Seller save(Seller seller) {
        return sellerRepository.save(seller);
    }

    @Override
    public Seller getByEmail(String email) {
        return sellerRepository.getByEmail(email);
    }

    @Override
    public List<Product> getProducts(String email) {
        return sellerRepository.getProductsBySeller(email);
    }

    @Override
    public List<Product> getProductsByCategory(String email, String category) {
        return sellerRepository.getProductsBySellerAndCategory(email, category);
    }
}
