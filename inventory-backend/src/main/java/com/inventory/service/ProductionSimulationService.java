package com.inventory.service;

import com.inventory.dto.ProductionSimulationDTO;
import com.inventory.entity.Product;
import com.inventory.entity.ProductRawMaterial;
import com.inventory.entity.RawMaterial;
import com.inventory.repository.ProductRepository;
import com.inventory.repository.RawMaterialRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
        log.info("Iniciando simulacao de producao");
        
        // Get all products with their required materials using JOIN FETCH
        List<Product> products = productRepository.findAllWithRawMaterials();
        log.info("Total de produtos encontrados: {}", products.size());
        
        // Get all raw materials with their stock
        List<RawMaterial> rawMaterials = rawMaterialRepository.findAll();
        log.info("Total de materias-primas encontradas: {}", rawMaterials.size());
        
        // Create a map of raw material stock for quick lookup
        Map<String, Integer> stockMap = new HashMap<>();
        for (RawMaterial rawMaterial : rawMaterials) {
            stockMap.put(rawMaterial.getName(), rawMaterial.getStockQuantity());
        }
        
        // Calculate production possibilities for each product
        List<ProductionSimulationDTO> results = new ArrayList<>();
        
        for (Product product : products) {
            try {
                // Get required raw materials for this product - verificacao defensiva
                List<ProductRawMaterial> requiredMaterials = product.getProductRawMaterials() != null 
                    ? new ArrayList<>(product.getProductRawMaterials()) 
                    : new ArrayList<>();
                
                if (requiredMaterials.isEmpty()) {
                    log.debug("Produto {} sem materias-primas associadas", product.getName());
                    continue;
                }
                
                // Calculate maximum producible quantity based on stock
                Integer maxQuantity = null;
                for (ProductRawMaterial required : requiredMaterials) {
                    // Verificacao defensiva para evitar NullPointerException
                    if (required.getRawMaterial() == null) {
                        log.warn("Produto {} tem materia-prima sem associacao", product.getName());
                        continue;
                    }
                    
                    String materialName = required.getRawMaterial().getName();
                    Integer availableStock = stockMap.get(materialName);
                    Integer requiredQty = required.getQuantity();
                    
                    if (availableStock == null || availableStock == 0) {
                        maxQuantity = 0;
                        log.debug("Material {} com estoque insuficiente para produto {}", materialName, product.getName());
                        break;
                    }
                    
                    if (requiredQty == null || requiredQty <= 0) {
                        log.warn("Produto {} tem quantidade requerida invalida para material {}", product.getName(), materialName);
                        continue;
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
                    log.debug("Produto {} pode produzir {} unidades", product.getName(), maxQuantity);
                }
            } catch (Exception e) {
                log.error("Erro ao processar produto {}: {}", product.getName(), e.getMessage());
            }
        }
        
        log.info("Simulacao concluida. Total de produtos produisiveis: {}", results.size());
        
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
