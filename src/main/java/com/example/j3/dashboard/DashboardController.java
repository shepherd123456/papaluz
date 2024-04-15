package com.example.j3.dashboard;

import com.example.j3.category.Category;
import com.example.j3.category.CategoryService;
import com.example.j3.product.Product;
import com.example.j3.product.ProductDtoin;
import com.example.j3.product.ProductDtoout;
import com.example.j3.product.ProductService;
import com.example.j3.productimage.ProductImage;
import com.example.j3.productimage.ProductImageService;
import com.example.j3.seller.Seller;
import com.example.j3.seller.SellerService;
import com.example.j3.sellercategory.SellerCategory;
import com.example.j3.sellercategory.SellerCategoryPK;
import com.example.j3.sellercategory.SellerCategoryService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import static com.example.j3.JavaStarterApplication.PRIMARY_PRODUCT_IMAGE_MARK;
import static com.example.j3.JavaStarterApplication.PRODUCT_IMAGE_ROOT;

@RestController
@RequestMapping("/dashboard")
@AllArgsConstructor
public class DashboardController {
    private SellerCategoryService sellerCategoryService;
    private SellerService sellerService;
    private CategoryService categoryService;
    private ProductService productService;
    private ProductImageService productImageService;

    @PostMapping("products")
    public ResponseEntity<ProductDtoout> saveProduct(@AuthenticationPrincipal UserDetails u, @RequestBody ProductDtoin p) {
        return ResponseEntity.status(HttpStatus.CREATED).body(mapToDto(createProductDependencies(u.getUsername(), p)));
    }

    @PostMapping("products/{uuid}/images")
    public ResponseEntity<String> uploadImage(
            @PathVariable("uuid") UUID uuid,
            @RequestParam(name = "isPrimary", required = false) boolean isPrimary,
            @RequestPart("image") MultipartFile image
    ) throws IOException {
        String uuidStr = uuid.toString();
        Path root = Files.createDirectories(PRODUCT_IMAGE_ROOT.resolve(uuidStr));
        if (!productService.existsByUuid(uuid)) {
            Product p = new Product();
            p.setUuid(uuid);
            productService.save(p);
        }
        String imgOriginalFilename = image.getOriginalFilename();
        String imgExtension = imgOriginalFilename.substring(imgOriginalFilename.lastIndexOf(".") + 1);
        String filename;
        if (isPrimary) {
            String primaryFilename = productImageService.selectPrimaryFilename(uuidStr, PRIMARY_PRODUCT_IMAGE_MARK);
            if (primaryFilename != null) {
                productImageService.deleteByFilename(primaryFilename);
                Files.delete(root.resolve(Path.of(primaryFilename)));
            }
            filename = uuid + "_" + PRIMARY_PRODUCT_IMAGE_MARK + "." + imgExtension;
        } else {
            Long latestId = productImageService.getLatestIdByProduct(uuid);
            filename = uuid + "_" + (latestId != null ? latestId + 1 : 1) + "." + imgExtension;
        }
        image.transferTo(root.resolve(filename));
        productImageService.saveByProduct(filename, uuid);
        return ResponseEntity.ok(filename);
    }

    @GetMapping("products")
    public ResponseEntity<Map<String, List<ProductDtoout>>> getAllProductsOfSeller(@AuthenticationPrincipal UserDetails u) {
        List<Product> products = sellerService.getProducts(u.getUsername());
        Map<String, List<ProductDtoout>> ret = products.stream()
                .collect(Collectors.groupingBy(
                        product -> product.getCategory().getName(),
                        Collectors.mapping(this::mapToDto, Collectors.toList())
                ));
        return ResponseEntity.ok(ret);
    }

    @PutMapping("categories/{oldName}")
    public ResponseEntity<?> updateCategoryByName(
            @AuthenticationPrincipal UserDetails u,
            @PathVariable("oldName") String oldName,
            @RequestBody String newName
    ) {
        String email = u.getUsername();
        sellerCategoryService.update(email, oldName, newName);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("categories/{name}")
    public ResponseEntity<?> deleteCategoryByName(
            @AuthenticationPrincipal UserDetails u,
            @PathVariable(value = "name", required = false) String catName
    ) throws IOException {
        if(catName == null || catName.isEmpty() || catName.equals("undefined")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        String email = u.getUsername();
        List<Long> imageIds = new ArrayList<>();
        List<Long> productIds = new ArrayList<>();
        List<Product> productsToDelete = sellerService.getProductsByCategory(email, catName);
        for (Product product : productsToDelete) {
            Path productRoot = PRODUCT_IMAGE_ROOT.resolve(product.getUuid().toString());
            for(ProductImage productImage : product.getImages()) {
                Files.delete(productRoot.resolve(productImage.getFilename()));
                imageIds.add(productImage.getId());
            }
            Files.delete(productRoot);
            productIds.add(product.getId());
        }
        productImageService.deleteByIds(imageIds);
        productService.deleteByIds(productIds);
        sellerCategoryService.delete(email, catName);
        categoryService.deleteIfNoAssociation(catName);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("products/{uuid}")
    public ResponseEntity<?> deleteProductByUuid(
            @AuthenticationPrincipal UserDetails u,
            @PathVariable("uuid") UUID uuid
    ) throws IOException {
        String email = u.getUsername();
        List<Long> imageIds = new ArrayList<>();
        Product product = productService.getByUuid(uuid);
        Path productRoot = PRODUCT_IMAGE_ROOT.resolve(product.getUuid().toString());
        for(ProductImage productImage : product.getImages()) {
            imageIds.add(productImage.getId());
            Files.delete(productRoot.resolve(productImage.getFilename()));
        }
        Files.delete(productRoot);
        productImageService.deleteByIds(imageIds);
        String catName = product.getCategory().getName();
        productService.delete(product);
        sellerCategoryService.delete(email, catName);
        categoryService.deleteIfNoAssociation(catName);
        return ResponseEntity.ok().build();
    }

    private Product createProductDependencies(String email, ProductDtoin p) {
        Category category;
        Seller seller = sellerService.getByEmail(email);
        SellerCategory sellerCategory = sellerCategoryService.find(email, p.category);
        if (sellerCategory != null) {
            category = sellerCategory.getCategory();
        } else {
            category = categoryService.getByName(p.category);
            if (category == null) {
                category = categoryService.save(new Category(null, p.category, null, null));
            }
            sellerCategoryService.save(new SellerCategory(new SellerCategoryPK(seller.getId(), category.getId()), seller, category));
        }
        Product product = productService.getByUuid(p.uuid);
        product.setTitle(p.title);
        product.setPrice(p.price);
        product.setDescription(p.description);
        product.setCategory(category);
        product.setSeller(seller);
        return productService.save(product);
    }

    private ProductDtoout mapToDto(Product product) {
        String uuidStr = product.getUuid().toString();
        return new ProductDtoout(uuidStr, productImageService.selectPrimaryFilename(uuidStr, PRIMARY_PRODUCT_IMAGE_MARK), product.getTitle(), product.getPrice(), product.getDescription());
    }
}
