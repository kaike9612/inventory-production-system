package com.inventory.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductRawMaterialDTO {

    private Long id;

    @NotNull(message = "Product ID is required")
    private Long productId;

    private String productName;

    @NotNull(message = "Raw material ID is required")
    private Long rawMaterialId;

    private String rawMaterialName;

    @NotNull(message = "Required quantity is required")
    @Min(value = 1, message = "Required quantity must be at least 1")
    private Integer requiredQuantity;
}
