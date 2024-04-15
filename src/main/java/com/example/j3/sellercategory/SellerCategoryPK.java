package com.example.j3.sellercategory;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Embeddable
public class SellerCategoryPK implements Serializable {
    @Column(name = "seller_id")
    private Long sellerId;
    @Column(name = "category_id")
    private Long categoryId;
}
