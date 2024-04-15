package com.example.j3.product;

import com.example.j3.productimage.ProductImageService;
import lombok.AllArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Path;
import java.util.*;
import java.util.stream.Collectors;

import static com.example.j3.JavaStarterApplication.PRODUCT_IMAGE_ROOT;
import static com.example.j3.JavaStarterApplication.PRIMARY_PRODUCT_IMAGE_MARK;

@RestController
@RequestMapping("/products")
@AllArgsConstructor
public class ProductController {
    private ProductService productService;
    private ProductImageService productImageService;

    @GetMapping
    public ResponseEntity<Map<String, List<ProductDtoout>>> getAllProducts() {
        List<Product> products = productService.getAll();
        Map<String, List<ProductDtoout>> ret = products.stream()
                .collect(Collectors.groupingBy(
                        product -> product.getCategory().getName(),
                        Collectors.mapping(this::mapToDto, Collectors.toList())
                ));
        return ResponseEntity.ok(ret);
    }

    @GetMapping("{uuid}/images/{filename}")
    public ResponseEntity<?> getProductImage(@PathVariable("uuid") UUID uuid, @PathVariable("filename") String filename) {
        if (productImageService.existsByFilename(filename)) {
            Path imagePath = PRODUCT_IMAGE_ROOT.resolve(uuid.toString()).resolve(filename);
            Resource imageResource = new FileSystemResource(imagePath);
            return ResponseEntity.ok()
                    .header("Content-Type", "image/jpeg")
                    .body(imageResource);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

        @DeleteMapping("{uuid}")
    public ResponseEntity<?> deleteProduct(@PathVariable("uuid") String uuid) {
        productService.deleteByUuid(UUID.fromString(uuid));
        return ResponseEntity.ok().build();
    }

    private ProductDtoout mapToDto(Product product) {
        String uuidStr = product.getUuid().toString();
        return new ProductDtoout(uuidStr, productImageService.selectPrimaryFilename(uuidStr, PRIMARY_PRODUCT_IMAGE_MARK), product.getTitle(), product.getPrice(), product.getDescription());
    }
}
