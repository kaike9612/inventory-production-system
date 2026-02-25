package com.inventory.controller;

import com.inventory.dto.ProductionSimulationDTO;
import com.inventory.service.ProductionSimulationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/production")
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:3001"})
@RequiredArgsConstructor
public class ProductionSimulationController {

    private final ProductionSimulationService productionSimulationService;

    @GetMapping("/simulation")
    public ResponseEntity<List<ProductionSimulationDTO>> simulateProduction() {
        List<ProductionSimulationDTO> simulationResults = productionSimulationService.simulateProduction();
        return ResponseEntity.ok(simulationResults);
    }
}
