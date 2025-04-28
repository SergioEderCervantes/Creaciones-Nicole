CREATE DATABASE CreacionesNicole;

USE CreacionesNicole;

-- Tabla categorias
CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT
);

-- Tabla productos
CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    categoria_id INTEGER NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    imagen VARCHAR(255),
    FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE RESTRICT
);

-- Tabla admin
CREATE TABLE admin (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    contraseña VARCHAR(255) NOT NULL
);

-- Tabla pedidos 
CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    estado VARCHAR(50) NOT NULL,
    descripcion TEXT,
    monto DECIMAL(10, 2) NOT NULL,
    fecha_entrega DATE
);