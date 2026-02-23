package com.inventory.mapper;

import com.inventory.dto.ProductRawMaterialDTO;
import com.inventory.entity.Product;
import com.inventory.entity.ProductRawMaterial;
import com.inventory.entity.RawMaterial;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ProductRawMaterialMapper {

    public ProductRawMaterial toEntity(ProductRawMaterialDTO dto) {
        if (dto == null) {
            return null;
        }
        return ProductRawMaterial.builder()
                .id(dto.getId())
                .product(Product.builder().id(dto.getProductId()).build())
                .rawMaterial(RawMaterial.builder().id(dto.getRawMaterialId()).build())
                .requiredQuantity(dto.getRequiredQuantity())
                .build();
    }

    public ProductRawMaterialDTO toDTO(ProductRawMaterial entity) {
        if (entity == null) {
            return null;
        }
        return ProductRawMaterialDTO.builder()
                .id(entity.getId())
                .productId(entity.getProduct().getId())
                .productName(entity.getProduct().getName())
                .rawMaterialId(entity.getRawMaterial().getId())
                .rawMaterialName(entity.getRawMaterial().getName())
                .requiredQuantity(entity.getRequiredQuantity())
                .build();
    }

    public List<ProductRawMaterialDTO> toDTOList(List<ProductRawMaterial> entities) {
        if (entities == null) {
            return null;
        }
        return entities.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
}
