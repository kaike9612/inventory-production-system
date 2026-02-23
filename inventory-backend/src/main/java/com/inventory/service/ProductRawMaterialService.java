package com.inventory.service;

import com.inventory.dto.ProductRawMaterialDTO;
import com.inventory.entity.Product;
import com.inventory.entity.ProductRawMaterial;
import com.inventory.entity.RawMaterial;
import com.inventory.exception.ResourceNotFoundException;
import com.inventory.mapper.ProductRawMaterialMapper;
import com.inventory.repository.ProductRawMaterialRepository;
import com.inventory.repository.ProductRepository;
import com.inventory.repository.RawMaterialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductRawMaterialService {

    private final ProductRawMaterialRepository productRawMaterialRepository;
    private final ProductRepository productRepository;
    private final RawMaterialRepository rawMaterialRepository;
    private final ProductRawMaterialMapper productRawMaterialMapper;

    @Transactional
    public ProductRawMaterialDTO createProductRawMaterial(ProductRawMaterialDTO dto) {
        Product product = productRepository.findById(dto.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product", "id", dto.getProductId()));
        
        RawMaterial rawMaterial = rawMaterialRepository.findById(dto.getRawMaterialId())
                .orElseThrow(() -> new ResourceNotFoundException("RawMaterial", "id", dto.getRawMaterialId()));

        ProductRawMaterial productRawMaterial = ProductRawMaterial.builder()
                .product(product)
                .rawMaterial(rawMaterial)
                .requiredQuantity(dto.getRequiredQuantity())
                .build();

        ProductRawMaterial saved = productRawMaterialRepository.save(productRawMaterial);
        return productRawMaterialMapper.toDTO(saved);
    }

    @Transactional(readOnly = true)
    public List<ProductRawMaterialDTO> getAllProductRawMaterials() {
        List<ProductRawMaterial> list = productRawMaterialRepository.findAllWithDetails();
        return productRawMaterialMapper.toDTOList(list);
    }

    @Transactional
    public void deleteProductRawMaterial(Long id) {
        if (!productRawMaterialRepository.existsById(id)) {
            throw new ResourceNotFoundException("ProductRawMaterial", "id", id);
        }
        productRawMaterialRepository.deleteById(id);
    }
}
