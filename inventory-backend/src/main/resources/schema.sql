-- Inventory Production System Database Schema
-- H2 Database

-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

-- Create raw_materials table
CREATE TABLE IF NOT EXISTS raw_materials (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    stock_quantity INTEGER NOT NULL DEFAULT 0
);

-- Create product_raw_materials table (association table)
CREATE TABLE IF NOT EXISTS product_raw_materials (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT NOT NULL,
    raw_material_id BIGINT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (raw_material_id) REFERENCES raw_materials(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_product_raw_materials_product_id ON product_raw_materials(product_id);
CREATE INDEX IF NOT EXISTS idx_product_raw_materials_raw_material_id ON product_raw_materials(raw_material_id);
CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);
CREATE INDEX IF NOT EXISTS idx_raw_materials_name ON raw_materials(name);

-- Insert sample data for testing
-- Raw Materials
INSERT INTO raw_materials (name, stock_quantity) VALUES 
    ('Iron', 100),
    ('Plastic', 50),
    ('Copper', 80),
    ('Aluminum', 60),
    ('Glass', 40);

-- Products
INSERT INTO products (name, price) VALUES 
    ('Widget A', 25.00),
    ('Widget B', 50.00),
    ('Gadget X', 100.00),
    ('Gadget Y', 75.00);

-- Product Raw Materials associations
-- Widget A requires 10 Iron and 5 Plastic
-- Widget B requires 15 Iron and 10 Plastic
-- Gadget X requires 20 Iron, 10 Copper, and 5 Glass
-- Gadget Y requires 12 Iron, 8 Plastic, and 6 Aluminum

INSERT INTO product_raw_materials (product_id, raw_material_id, quantity) 
SELECT p.id, r.id, 10
FROM products p, raw_materials r
WHERE p.name = 'Widget A' AND r.name = 'Iron';

INSERT INTO product_raw_materials (product_id, raw_material_id, quantity) 
SELECT p.id, r.id, 5
FROM products p, raw_materials r
WHERE p.name = 'Widget A' AND r.name = 'Plastic';

INSERT INTO product_raw_materials (product_id, raw_material_id, quantity) 
SELECT p.id, r.id, 15
FROM products p, raw_materials r
WHERE p.name = 'Widget B' AND r.name = 'Iron';

INSERT INTO product_raw_materials (product_id, raw_material_id, quantity) 
SELECT p.id, r.id, 10
FROM products p, raw_materials r
WHERE p.name = 'Widget B' AND r.name = 'Plastic';

INSERT INTO product_raw_materials (product_id, raw_material_id, quantity) 
SELECT p.id, r.id, 20
FROM products p, raw_materials r
WHERE p.name = 'Gadget X' AND r.name = 'Iron';

INSERT INTO product_raw_materials (product_id, raw_material_id, quantity) 
SELECT p.id, r.id, 10
FROM products p, raw_materials r
WHERE p.name = 'Gadget X' AND r.name = 'Copper';

INSERT INTO product_raw_materials (product_id, raw_material_id, quantity) 
SELECT p.id, r.id, 5
FROM products p, raw_materials r
WHERE p.name = 'Gadget X' AND r.name = 'Glass';

INSERT INTO product_raw_materials (product_id, raw_material_id, quantity) 
SELECT p.id, r.id, 12
FROM products p, raw_materials r
WHERE p.name = 'Gadget Y' AND r.name = 'Iron';

INSERT INTO product_raw_materials (product_id, raw_material_id, quantity) 
SELECT p.id, r.id, 8
FROM products p, raw_materials r
WHERE p.name = 'Gadget Y' AND r.name = 'Plastic';

INSERT INTO product_raw_materials (product_id, raw_material_id, quantity) 
SELECT p.id, r.id, 6
FROM products p, raw_materials r
WHERE p.name = 'Gadget Y' AND r.name = 'Aluminum';
