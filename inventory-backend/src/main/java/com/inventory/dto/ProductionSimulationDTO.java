package com.inventory.dto;

import lombok.*;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductionSimulationDTO {

    private String productName;
    private Integer quantityPossible;
    private BigDecimal totalValue;
}
