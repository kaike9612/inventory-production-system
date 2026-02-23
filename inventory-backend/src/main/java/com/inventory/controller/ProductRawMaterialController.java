package com.inventory.controller;

import com.inventory.dto.ProductRawMaterialDTO;
import com.inventory.service.ProductRawMaterialService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product-raw-materials")
@RequiredArgsConstructor
public class ProductRawMaterialController {

    private final ProductRawMaterialService productRawMaterialService;

    @PostMapping
    public ResponseEntity<ProductRawMaterialDTO> createProductRawMaterial(
            @Valid @RequestBody ProductRawMaterialDTO productRawMaterialDTO) {
        ProductRawMaterialDTO created = productRawMaterialService.createProductRawMaterial(productRawMaterialDTO);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ProductRawMaterialDTO>> getAllProductRawMaterials() {
        List<ProductRawMaterialDTO> list = productRawMaterialService.getAllProductRawMaterials();
        return ResponseEntity.ok(list);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProductRawMaterial(@PathVariable Long id) {
        productRawMaterialService.deleteProductRawMaterial(id);
        return ResponseEntity.noContent().build();
    }
}
