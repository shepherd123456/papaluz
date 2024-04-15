package com.example.j3.product;

import lombok.AllArgsConstructor;

import java.math.BigDecimal;

@AllArgsConstructor
public class ProductDtoout {
    public String uuid;
    public String primaryImageFilename;
    public String title;
    public BigDecimal price;
    public String description;
}
