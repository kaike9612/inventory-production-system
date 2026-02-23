-- Industrial Sample Data for Inventory Production System
-- Beverage Manufacturing Industry

-- Insert RAW MATERIALS
INSERT INTO raw_materials (name, stock_quantity) VALUES 
    ('Concentrado de Cola', 500),
    ('Acucar', 800),
    ('Agua', 5000),
    ('Garrafa PET 500ml', 2000),
    ('Garrafa Vidro 600ml', 1500),
    ('Lata Aluminio 350ml', 3000),
    ('Concentrado de Laranja', 400),
    ('Malte', 600),
    ('Lupulo', 200)
ON CONFLICT DO NOTHING;

-- Insert PRODUCTS
INSERT INTO products (name, price) VALUES 
    ('Refrigerante Cola 350ml', 5.50),
    ('Suco de Laranja 1L', 7.90),
    ('Agua Mineral 500ml', 3.00),
    ('Cerveja Pilsen 600ml', 9.50)
ON CONFLICT DO NOTHING;

-- Insert PRODUCT_RAW_MATERIAL relationships
-- Refrigerante Cola (product_id=1)
INSERT INTO product_raw_materials (product_id, raw_material_id, required_quantity) 
SELECT p.id, r.id, 5
FROM products p, raw_materials r
WHERE p.name = 'Refrigerante Cola 350ml' AND r.name = 'Concentrado de Cola'
ON CONFLICT DO NOTHING;

INSERT INTO product_raw_materials (product_id, raw_material_id, required_quantity) 
SELECT p.id, r.id, 3
FROM products p, raw_materials r
WHERE p.name = 'Refrigerante Cola 350ml' AND r.name = 'Acucar'
ON CONFLICT DO NOTHING;

INSERT INTO product_raw_materials (product_id, raw_material_id, required_quantity) 
SELECT p.id, r.id, 30
FROM products p, raw_materials r
WHERE p.name = 'Refrigerante Cola 350ml' AND r.name = 'Agua'
ON CONFLICT DO NOTHING;

INSERT INTO product_raw_materials (product_id, raw_material_id, required_quantity) 
SELECT p.id, r.id, 1
FROM products p, raw_materials r
WHERE p.name = 'Refrigerante Cola 350ml' AND r.name = 'Lata Aluminio 350ml'
ON CONFLICT DO NOTHING;

-- Suco de Laranja (product_id=2)
INSERT INTO product_raw_materials (product_id, raw_material_id, required_quantity) 
SELECT p.id, r.id, 40
FROM products p, raw_materials r
WHERE p.name = 'Suco de Laranja 1L' AND r.name = 'Concentrado de Laranja'
ON CONFLICT DO NOTHING;

INSERT INTO product_raw_materials (product_id, raw_material_id, required_quantity) 
SELECT p.id, r.id, 60
FROM products p, raw_materials r
WHERE p.name = 'Suco de Laranja 1L' AND r.name = 'Agua'
ON CONFLICT DO NOTHING;

INSERT INTO product_raw_materials (product_id, raw_material_id, required_quantity) 
SELECT p.id, r.id, 1
FROM products p, raw_materials r
WHERE p.name = 'Suco de Laranja 1L' AND r.name = 'Garrafa PET 500ml'
ON CONFLICT DO NOTHING;

-- Agua Mineral (product_id=3)
INSERT INTO product_raw_materials (product_id, raw_material_id, required_quantity) 
SELECT p.id, r.id, 50
FROM products p, raw_materials r
WHERE p.name = 'Agua Mineral 500ml' AND r.name = 'Agua'
ON CONFLICT DO NOTHING;

INSERT INTO product_raw_materials (product_id, raw_material_id, required_quantity) 
SELECT p.id, r.id, 1
FROM products p, raw_materials r
WHERE p.name = 'Agua Mineral 500ml' AND r.name = 'Garrafa PET 500ml'
ON CONFLICT DO NOTHING;

-- Cerveja Pilsen (product_id=4)
INSERT INTO product_raw_materials (product_id, raw_material_id, required_quantity) 
SELECT p.id, r.id, 50
FROM products p, raw_materials r
WHERE p.name = 'Cerveja Pilsen 600ml' AND r.name = 'Agua'
ON CONFLICT DO NOTHING;

INSERT INTO product_raw_materials (product_id, raw_material_id, required_quantity) 
SELECT p.id, r.id, 10
FROM products p, raw_materials r
WHERE p.name = 'Cerveja Pilsen 600ml' AND r.name = 'Malte'
ON CONFLICT DO NOTHING;

INSERT INTO product_raw_materials (product_id, raw_material_id, required_quantity) 
SELECT p.id, r.id, 2
FROM products p, raw_materials r
WHERE p.name = 'Cerveja Pilsen 600ml' AND r.name = 'Lupulo'
ON CONFLICT DO NOTHING;

INSERT INTO product_raw_materials (product_id, raw_material_id, required_quantity) 
SELECT p.id, r.id, 1
FROM products p, raw_materials r
WHERE p.name = 'Cerveja Pilsen 600ml' AND r.name = 'Garrafa Vidro 600ml'
ON CONFLICT DO NOTHING;
