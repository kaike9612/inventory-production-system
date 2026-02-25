-- Industrial Sample Data for Inventory Production System
-- Beverage Manufacturing Industry
-- H2 Database compatible

-- Insert RAW MATERIALS
INSERT INTO raw_materials (name, stock_quantity) VALUES ('Concentrado de Cola', 500);
INSERT INTO raw_materials (name, stock_quantity) VALUES ('Acucar', 800);
INSERT INTO raw_materials (name, stock_quantity) VALUES ('Agua', 5000);
INSERT INTO raw_materials (name, stock_quantity) VALUES ('Garrafa PET 500ml', 2000);
INSERT INTO raw_materials (name, stock_quantity) VALUES ('Garrafa Vidro 600ml', 1500);
INSERT INTO raw_materials (name, stock_quantity) VALUES ('Lata Aluminio 350ml', 3000);
INSERT INTO raw_materials (name, stock_quantity) VALUES ('Concentrado de Laranja', 400);
INSERT INTO raw_materials (name, stock_quantity) VALUES ('Malte', 600);
INSERT INTO raw_materials (name, stock_quantity) VALUES ('Lupulo', 200);

-- Insert PRODUCTS
INSERT INTO products (name, price) VALUES ('Refrigerante Cola 350ml', 5.50);
INSERT INTO products (name, price) VALUES ('Suco de Laranja 1L', 7.90);
INSERT INTO products (name, price) VALUES ('Agua Mineral 500ml', 3.00);
INSERT INTO products (name, price) VALUES ('Cerveja Pilsen 600ml', 9.50);

-- Insert PRODUCT_RAW_MATERIAL relationships
-- Refrigerante Cola (product_id=1)
INSERT INTO product_raw_materials (product_id, raw_material_id, quantity) 
SELECT p.id, r.id, 5 FROM products p, raw_materials r WHERE p.name = 'Refrigerante Cola 350ml' AND r.name = 'Concentrado de Cola';

INSERT INTO product_raw_materials (product_id, raw_material_id, quantity) 
SELECT p.id, r.id, 3 FROM products p, raw_materials r WHERE p.name = 'Refrigerante Cola 350ml' AND r.name = 'Acucar';

INSERT INTO product_raw_materials (product_id, raw_material_id, quantity) 
SELECT p.id, r.id, 30 FROM products p, raw_materials r WHERE p.name = 'Refrigerante Cola 350ml' AND r.name = 'Agua';

INSERT INTO product_raw_materials (product_id, raw_material_id, quantity) 
SELECT p.id, r.id, 1 FROM products p, raw_materials r WHERE p.name = 'Refrigerante Cola 350ml' AND r.name = 'Lata Aluminio 350ml';

-- Suco de Laranja (product_id=2)
INSERT INTO product_raw_materials (product_id, raw_material_id, quantity) 
SELECT p.id, r.id, 40 FROM products p, raw_materials r WHERE p.name = 'Suco de Laranja 1L' AND r.name = 'Concentrado de Laranja';

INSERT INTO product_raw_materials (product_id, raw_material_id, quantity) 
SELECT p.id, r.id, 60 FROM products p, raw_materials r WHERE p.name = 'Suco de Laranja 1L' AND r.name = 'Agua';

INSERT INTO product_raw_materials (product_id, raw_material_id, quantity) 
SELECT p.id, r.id, 1 FROM products p, raw_materials r WHERE p.name = 'Suco de Laranja 1L' AND r.name = 'Garrafa PET 500ml';

-- Agua Mineral (product_id=3)
INSERT INTO product_raw_materials (product_id, raw_material_id, quantity) 
SELECT p.id, r.id, 50 FROM products p, raw_materials r WHERE p.name = 'Agua Mineral 500ml' AND r.name = 'Agua';

INSERT INTO product_raw_materials (product_id, raw_material_id, quantity) 
SELECT p.id, r.id, 1 FROM products p, raw_materials r WHERE p.name = 'Agua Mineral 500ml' AND r.name = 'Garrafa PET 500ml';

-- Cerveja Pilsen (product_id=4)
INSERT INTO product_raw_materials (product_id, raw_material_id, quantity) 
SELECT p.id, r.id, 50 FROM products p, raw_materials r WHERE p.name = 'Cerveja Pilsen 600ml' AND r.name = 'Agua';

INSERT INTO product_raw_materials (product_id, raw_material_id, quantity) 
SELECT p.id, r.id, 10 FROM products p, raw_materials r WHERE p.name = 'Cerveja Pilsen 600ml' AND r.name = 'Malte';

INSERT INTO product_raw_materials (product_id, raw_material_id, quantity) 
SELECT p.id, r.id, 2 FROM products p, raw_materials r WHERE p.name = 'Cerveja Pilsen 600ml' AND r.name = 'Lupulo';

INSERT INTO product_raw_materials (product_id, raw_material_id, quantity) 
SELECT p.id, r.id, 1 FROM products p, raw_materials r WHERE p.name = 'Cerveja Pilsen 600ml' AND r.name = 'Garrafa Vidro 600ml';
