-- Tabla categorias
CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

-- Insertar categorias
INSERT INTO category (name, description) VALUES 
('Reposteria', 'Seccion dedicada a productos de reposteria.'),
('Decoracion', 'Seccion dedicada a artículos de decoracion.'),
('Carritos', 'Seccion dedicada a carritos y servicios relacionados.');

-- Tabla productos
CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    category_id INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image VARCHAR(255),
    tags VARCHAR (255),
    FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE RESTRICT
);

-- Insertar productos
INSERT INTO product (category_id, name, description, image, tags) VALUES
(1, 'Pastel de Chocolate', 'Delicioso pastel de chocolate decorado.', 'pastel_chocolate.jpg', 'bodas,elegante'),
(1, 'Cupcakes Vainilla', 'Cupcakes de vainilla con buttercream.', 'cupcakes_vainilla.jpg', 'cumpleaños,infantil'),
(1, 'Galletas Decoradas', 'Galletas de mantequilla decoradas a mano.', 'galletas_decoradas.jpg', 'bautizo,personalizado'),
(2, 'Centro de Mesa Floral', 'Centro de mesa con flores artificiales.', 'centro_mesa_floral.jpg', 'bodas,elegante,decoracion'),
(2, 'Guirnalda Personalizada', 'Guirnalda con nombre personalizado.', 'guirnalda_personalizada.jpg', 'cumpleaños,personalizado,infantil'),
(2, 'Topper para Pastel', 'Topper acrílico personalizado para pastel.', 'topper_pastel.jpg', 'bodas,XV años,personalizado'),
(3, 'Carrito de Algodón de Azúcar', 'Servicio de carrito de algodón de azúcar para eventos.', 'carrito_algodon.jpg', 'eventos,infantil'),
(3, 'Carrito de Palomitas', 'Carrito de palomitas para fiestas.', 'carrito_palomitas.jpg', 'fiestas,infantil,eventos'),
(3, 'Carrito de Hot Dogs', 'Carrito de hot dogs para eventos.', 'carrito_hotdogs.jpg', 'eventos,fiestas'),
(1, 'Brownies Artesanales', 'Brownies de chocolate hechos a mano.', 'brownies_artesanales.jpg', 'cumpleaños,casual');


-- Tabla admin
CREATE TABLE admin (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Tabla pedidos 
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL, 
    state VARCHAR(50) NOT NULL,
    description TEXT,
    amount DECIMAL(10, 2) NOT NULL,
    delivery_date DATE
);