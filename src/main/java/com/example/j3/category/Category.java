package com.example.j3.category;

import com.example.j3.product.Product;
import com.example.j3.sellercategory.SellerCategory;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private List<Product> products;
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private List<SellerCategory> sellerCategories;
}
