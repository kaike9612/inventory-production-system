package com.inventory.repository;

import com.inventory.entity.ProductRawMaterial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRawMaterialRepository extends JpaRepository<ProductRawMaterial, Long> {

    @Query("SELECT prm FROM ProductRawMaterial prm WHERE prm.product.id = :productId")
    List<ProductRawMaterial> findByProductId(@Param("productId") Long productId);

    @Query("SELECT prm FROM ProductRawMaterial prm JOIN FETCH prm.product JOIN FETCH prm.rawMaterial")
    List<ProductRawMaterial> findAllWithDetails();
}
