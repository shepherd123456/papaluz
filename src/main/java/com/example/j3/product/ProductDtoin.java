package com.example.j3.product;

import lombok.AllArgsConstructor;

import java.math.BigDecimal;
import java.util.UUID;

@AllArgsConstructor
public class ProductDtoin {
    public String category;
    public UUID uuid;
    public String title;
    public BigDecimal price;
    public String description;
}
