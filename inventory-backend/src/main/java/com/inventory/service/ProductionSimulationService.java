package com.inventory.service;

import com.inventory.dto.ProductionSimulationDTO;
import com.inventory.entity.Product;
import com.inventory.entity.ProductRawMaterial;
import com.inventory.entity.RawMaterial;
import com.inventory.repository.ProductRepository;
import com.inventory.repository.RawMaterialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ProductionSimulationService {

    private final ProductRepository productRepository;
    private final RawMaterialRepository rawMaterialRepository;

    @Transactional(readOnly = true)
    public List<ProductionSimulationDTO> simulateProduction() {
        // Get all products with their required materials
        List<Product> products = productRepository.findAll();
        
        // Get all raw materials with their stock
        List<RawMaterial> rawMaterials = rawMaterialRepository.findAll();
        
        // Create a map of raw material stock for quick lookup
        Map<String, Integer> stockMap = new HashMap<>();
        for (RawMaterial rawMaterial : rawMaterials) {
            stockMap.put(rawMaterial.getName(), rawMaterial.getStockQuantity());
        }
        
        // Calculate production possibilities for each product
        List<ProductionSimulationDTO> results = new ArrayList<>();
        
        for (Product product : products) {
            // Get required raw materials for this product
            List<ProductRawMaterial> requiredMaterials = product.getProductRawMaterials();
            
            if (requiredMaterials.isEmpty()) {
                // If product has no required materials, it can be produced infinitely
                // But for this simulation, we'll set it to the available stock of any material
                continue;
            }
            
            // Calculate maximum producible quantity based on stock
            Integer maxQuantity = null;
            for (ProductRawMaterial required : requiredMaterials) {
                String materialName = required.getRawMaterial().getName();
                Integer availableStock = stockMap.get(materialName);
                Integer requiredQty = required.getQuantity();
                
                if (availableStock == null || availableStock == 0) {
                    maxQuantity = 0;
                    break;
                }
                
                int possibleQty = availableStock / requiredQty;
                
                if (maxQuantity == null || possibleQty < maxQuantity) {
                    maxQuantity = possibleQty;
                }
            }
            
            // Only add products that can be produced (quantity > 0)
            if (maxQuantity != null && maxQuantity > 0) {
                BigDecimal totalValue = product.getPrice().multiply(BigDecimal.valueOf(maxQuantity));
                
                results.add(ProductionSimulationDTO.builder()
                        .productName(product.getName())
                        .quantityPossible(maxQuantity)
                        .totalValue(totalValue)
                        .build());
            }
        }
        
        // Sort by product price descending
        results.sort((a, b) -> {
            Product productA = products.stream()
                    .filter(p -> p.getName().equals(a.getProductName()))
                    .findFirst()
                    .orElse(null);
            Product productB = products.stream()
                    .filter(p -> p.getName().equals(b.getProductName()))
                    .findFirst()
                    .orElse(null);
            
            if (productA == null || productB == null) {
                return 0;
            }
            return productB.getPrice().compareTo(productA.getPrice());
        });
        
        return results;
    }
}
