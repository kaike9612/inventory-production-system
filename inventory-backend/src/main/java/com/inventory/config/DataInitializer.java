package com.inventory.config;

import com.inventory.entity.Product;
import com.inventory.entity.ProductRawMaterial;
import com.inventory.entity.RawMaterial;
import com.inventory.repository.ProductRepository;
import com.inventory.repository.ProductRawMaterialRepository;
import com.inventory.repository.RawMaterialRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Optional;

@Component
@RequiredArgsConstructor
@Slf4j
@Profile("!test")
public class DataInitializer implements CommandLineRunner {

    private final RawMaterialRepository rawMaterialRepository;
    private final ProductRepository productRepository;
    private final ProductRawMaterialRepository productRawMaterialRepository;

    @Override
    @Transactional
    public void run(String... args) {
        // Only initialize if database is empty
        if (rawMaterialRepository.count() > 0) {
            log.info("Banco de dados ja contem dados. Pulando inicializacao.");
            return;
        }

        log.info("Inicializando dados de exemplo...");

        // Create Raw Materials (Matérias-Primas)
        RawMaterial aco = rawMaterialRepository.save(RawMaterial.builder()
                .name("Aco")
                .stockQuantity(50)
                .build());

        RawMaterial plastico = rawMaterialRepository.save(RawMaterial.builder()
                .name("Plastico")
                .stockQuantity(30)
                .build());

        RawMaterial parafuso = rawMaterialRepository.save(RawMaterial.builder()
                .name("Parafuso")
                .stockQuantity(500)
                .build());

        RawMaterial tinta = rawMaterialRepository.save(RawMaterial.builder()
                .name("Tinta")
                .stockQuantity(2000)
                .build());

        log.info("Materias-primas criadas: Aco, Plastico, Parafuso, Tinta");

        // Create Products (Produtos)
        Product suporte = productRepository.save(Product.builder()
                .name("Suporte de Parede")
                .price(new BigDecimal("25.00"))
                .build());

        Product caixa = productRepository.save(Product.builder()
                .name("Caixa Plastica")
                .price(new BigDecimal("15.00"))
                .build());

        Product kit = productRepository.save(Product.builder()
                .name("Kit Montagem")
                .price(new BigDecimal("45.00"))
                .build());

        log.info("Produtos criados: Suporte de Parede, Caixa Plastica, Kit Montagem");

        // Create BOM (Bill of Materials) - Associações
        // Suporte de Parede → 2kg aco + 8 parafusos + 50ml tinta
        productRawMaterialRepository.save(ProductRawMaterial.builder()
                .product(suporte)
                .rawMaterial(aco)
                .quantity(2)
                .build());

        productRawMaterialRepository.save(ProductRawMaterial.builder()
                .product(suporte)
                .rawMaterial(parafuso)
                .quantity(8)
                .build());

        productRawMaterialRepository.save(ProductRawMaterial.builder()
                .product(suporte)
                .rawMaterial(tinta)
                .quantity(50)
                .build());

        // Caixa Plastica → 1.5kg plastico
        productRawMaterialRepository.save(ProductRawMaterial.builder()
                .product(caixa)
                .rawMaterial(plastico)
                .quantity(15) // 1.5kg = 1500g, stored as 15 (interpreting as hectograms)
                .build());

        // Kit Montagem → 12 parafusos
        productRawMaterialRepository.save(ProductRawMaterial.builder()
                .product(kit)
                .rawMaterial(parafuso)
                .quantity(12)
                .build());

        log.info("Associacoes BOM criadas com sucesso");
        log.info("Dados de exemplo inicializados com sucesso!");
    }
}
