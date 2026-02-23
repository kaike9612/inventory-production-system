package com.inventory.mapper;

import com.inventory.dto.RawMaterialDTO;
import com.inventory.entity.RawMaterial;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class RawMaterialMapper {

    public RawMaterial toEntity(RawMaterialDTO dto) {
        if (dto == null) {
            return null;
        }
        return RawMaterial.builder()
                .id(dto.getId())
                .name(dto.getName())
                .stockQuantity(dto.getStockQuantity())
                .build();
    }

    public RawMaterialDTO toDTO(RawMaterial entity) {
        if (entity == null) {
            return null;
        }
        return RawMaterialDTO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .stockQuantity(entity.getStockQuantity())
                .build();
    }

    public List<RawMaterialDTO> toDTOList(List<RawMaterial> entities) {
        if (entities == null) {
            return null;
        }
        return entities.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
}
