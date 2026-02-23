package com.inventory.service;

import com.inventory.dto.RawMaterialDTO;
import com.inventory.exception.ResourceNotFoundException;
import com.inventory.mapper.RawMaterialMapper;
import com.inventory.repository.RawMaterialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RawMaterialService {

    private final RawMaterialRepository rawMaterialRepository;
    private final RawMaterialMapper rawMaterialMapper;

    @Transactional
    public RawMaterialDTO createRawMaterial(RawMaterialDTO rawMaterialDTO) {
        RawMaterial rawMaterial = rawMaterialMapper.toEntity(rawMaterialDTO);
        RawMaterial savedRawMaterial = rawMaterialRepository.save(rawMaterial);
        return rawMaterialMapper.toDTO(savedRawMaterial);
    }

    @Transactional(readOnly = true)
    public List<RawMaterialDTO> getAllRawMaterials() {
        List<RawMaterial> rawMaterials = rawMaterialRepository.findAll();
        return rawMaterialMapper.toDTOList(rawMaterials);
    }

    @Transactional(readOnly = true)
    public RawMaterialDTO getRawMaterialById(Long id) {
        RawMaterial rawMaterial = rawMaterialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("RawMaterial", "id", id));
        return rawMaterialMapper.toDTO(rawMaterial);
    }

    @Transactional
    public RawMaterialDTO updateRawMaterial(Long id, RawMaterialDTO rawMaterialDTO) {
        RawMaterial existingRawMaterial = rawMaterialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("RawMaterial", "id", id));

        existingRawMaterial.setName(rawMaterialDTO.getName());
        existingRawMaterial.setStockQuantity(rawMaterialDTO.getStockQuantity());

        RawMaterial updatedRawMaterial = rawMaterialRepository.save(existingRawMaterial);
        return rawMaterialMapper.toDTO(updatedRawMaterial);
    }

    @Transactional
    public void deleteRawMaterial(Long id) {
        if (!rawMaterialRepository.existsById(id)) {
            throw new ResourceNotFoundException("RawMaterial", "id", id);
        }
        rawMaterialRepository.deleteById(id);
    }
}
