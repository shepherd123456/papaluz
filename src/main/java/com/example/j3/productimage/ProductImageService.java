package com.example.j3.productimage;

import java.util.List;
import java.util.UUID;

public interface ProductImageService {
    boolean existsByFilename(String filename);
    void deleteByFilename(String filename);
    void deleteByIds(List<Long> ids);
    String selectPrimaryFilename(String uuidStr, String primeMark);
    void saveByProduct(String imgFilename, UUID uuid);
    Long getLatestIdByProduct(UUID uuid);
}
